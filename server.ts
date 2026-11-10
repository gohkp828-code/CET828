import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory cache for Singapore Government Open Data API responses
const apiCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes cache

// Initialize Gemini client on the server side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Proxy endpoint for SingStat TableBuilder API
app.get('/api/singstat/:tableId', async (req, res) => {
  const { tableId } = req.params;
  const cacheKey = `singstat_${tableId}`;

  const cached = apiCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return res.json({ source: 'cache', data: cached.data });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const apiUrl = `https://tablebuilder.singstat.gov.sg/api/table/tabledata/${encodeURIComponent(tableId)}`;

    const response = await fetch(apiUrl, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `SingStat API error: ${response.statusText}`,
        tableId,
      });
    }

    const json = await response.json();
    apiCache.set(cacheKey, { data: json, timestamp: Date.now() });

    return res.json({ source: 'live', data: json });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Failed to fetch SingStat table ${tableId}:`, message);
    return res.status(502).json({
      error: 'Failed to contact official SingStat TableBuilder API',
      detail: message,
      tableId,
    });
  }
});

// Proxy endpoint for Data.gov.sg v2 list-rows API
app.get('/api/datagov/list-rows/:datasetId', async (req, res) => {
  const { datasetId } = req.params;
  const cacheKey = `datagov_${datasetId}`;

  const cached = apiCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return res.json({ source: 'cache', data: cached.data });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const apiUrl = `https://api-production.data.gov.sg/v2/public/api/datasets/${encodeURIComponent(datasetId)}/list-rows?limit=100`;

    const response = await fetch(apiUrl, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Data.gov.sg API error: ${response.statusText}`,
        datasetId,
      });
    }

    const json = await response.json();
    apiCache.set(cacheKey, { data: json, timestamp: Date.now() });

    return res.json({ source: 'live', data: json });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Failed to fetch Data.gov.sg dataset ${datasetId}:`, message);
    return res.status(502).json({
      error: 'Failed to contact official Data.gov.sg API',
      detail: message,
      datasetId,
    });
  }
});

// AI Data Analyst Endpoint powered by Gemini 3.8 Flash
app.post('/api/gemini/analyze', async (req, res) => {
  const { prompt, contextData, queryType } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt parameter' });
  }

  try {
    const systemInstruction = `You are the Singapore Institutes of Higher Learning (IHL) Continuing Education and Training (CET) Data Analyst.
You provide objective, accurate, data-grounded briefings based on Singapore Open Data Portal (data.gov.sg) and Department of Statistics (SingStat) official records.
Key context:
- Singapore IHLs include Autonomous Universities (NUS, NTU, SMU, SUSS, SIT, SUTD), Polytechnics (SP, NP, NYP, TP, RP), ITE (College Central, East, West), and NIEC.
- CET refers to structured lifelong learning, post-diplomas, specialist certificates, executive courses, and modular micro-credentials for adult working professionals.
- National Adult Learning participation rate is ~46.9% - 49.2%, with over 417,000+ WSQ trainees annually.
- Government support includes SkillsFuture Level-Up Programme (for Singaporeans aged 40+, providing a $4,000 credit top-up and training allowance of up to $3,000/month for selected full-time courses) and Mid-Career Enhanced Subsidy (MCES, up to 90% course fee subsidy).

Format your analysis concisely:
1. Direct Executive Answer
2. Key Quantitative Evidence (mention exact percentages, enrolments, or trainee counts from the context)
3. Strategic Implications for Adult Learners & Employers
4. Policy / Subsidy Recommendation (e.g. how to maximize SkillsFuture Credits / MCES)
Keep the tone professional, objective, accessible for the general public, without buzzwords or robotic preamble.`;

    const contents = `User Question: ${prompt}
Query Type: ${queryType || 'general_analysis'}
Context Data:
${JSON.stringify(contextData, null, 2)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
      },
    });

    const answer = response.text || 'Unable to generate analysis at this time.';
    return res.json({ analysis: answer });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Gemini API analysis error:', message);
    return res.status(500).json({
      error: 'Failed to generate AI data analysis',
      detail: message,
    });
  }
});

// Mount Vite or serve static assets
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
