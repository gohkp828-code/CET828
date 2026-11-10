import React, { useState } from 'react';
import { OPEN_DATA_APIS } from '../data/singstatSnapshot';
import { Database, Sparkles, Send, RefreshCw, CheckCircle2, AlertCircle, ExternalLink, Code2, Terminal } from 'lucide-react';

export const ApiHubAndAI: React.FC = () => {
  // Live API test state
  const [testingApiId, setTestingApiId] = useState<string | null>(null);
  const [apiResponses, setApiResponses] = useState<Record<string, { status: number; source: string; dataSnippet: string; latencyMs: number }>>({});

  // Gemini AI state
  const [prompt, setPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Pre-curated prompts for general public
  const samplePrompts = [
    'Which IHLs have seen the largest expansion in adult technology and data science programmes?',
    'Explain how the SkillsFuture Mid-Career Level-Up Programme ($4,000 credit) alters adult learner enrolment economics.',
    'Compare the role of Autonomous Universities (NUS, NTU, SUSS) vs Polytechnics in continuing education.',
    'What are the highest-demand CET qualifications for mid-career workers aged 40 and above in Singapore?',
  ];

  const [liveCetData, setLiveCetData] = useState<any>(null);

  const handleTestApi = async (api: typeof OPEN_DATA_APIS[0]) => {
    setTestingApiId(api.id);
    const start = performance.now();

    try {
      let endpoint = '';
      if (api.id === 'd_d1fbb24161f78e72bed494bd2ba9d091') {
        endpoint = '/api/cet';
      } else if (api.source === 'singstat') {
        endpoint = `/api/singstat/${api.datasetOrTableId}`;
      } else {
        endpoint = `/api/datagov/list-rows/${api.datasetOrTableId}`;
      }

      const res = await fetch(endpoint);
      const latency = Math.round(performance.now() - start);
      const json = await res.json();

      if (api.id === 'd_d1fbb24161f78e72bed494bd2ba9d091' && json.success) {
        setLiveCetData(json);
      }

      setApiResponses((prev) => ({
        ...prev,
        [api.id]: {
          status: res.status,
          source: json.source || (res.ok ? 'live' : 'error'),
          dataSnippet: JSON.stringify(json, null, 2).slice(0, 800) + '...',
          latencyMs: latency,
        },
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Connection failed';
      setApiResponses((prev) => ({
        ...prev,
        [api.id]: {
          status: 500,
          source: 'error',
          dataSnippet: `Error: ${message}`,
          latencyMs: Math.round(performance.now() - start),
        },
      }));
    } finally {
      setTestingApiId(null);
    }
  };

  const handleRunAiAnalysis = async (customPrompt?: string) => {
    const q = customPrompt || prompt;
    if (!q.trim()) return;

    setIsAiLoading(true);
    setAiError(null);
    setAiAnalysis(null);

    try {
      const res = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: q,
          queryType: 'public_citizen_briefing',
          contextData: {
            nationalSummary: {
              totalAnnualWSQTrainees: 428900,
              totalIhlCetEnrolment: 81400,
              nationalAdultParticipationRate: '49.2%',
              singstatTablesTracked: ['M850571', 'M850521', 'M850541', 'M850531', 'M183091'],
            },
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`API returned ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      setAiAnalysis(data.analysis || 'No analysis returned.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Analysis failed';
      setAiError(message);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          05. Live Singapore Open Data Portal APIs & Gemini AI Analyst
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-4xl">
          Direct programmatic connectivity to Singapore Open Data Portal (data.gov.sg v2) and Singapore Department of Statistics (SingStat TableBuilder) APIs, paired with Gemini 3.8 Flash for data synthesis and public advisory.
        </p>
      </div>

      {/* Two Column Layout: API Hub on Left, Gemini AI on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Open Data API Connectivity (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <Database className="w-4 h-4 text-slate-500" />
                <span>Connected Singapore Government Data Feeds</span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                data.gov.sg & SingStat
              </span>
            </div>

            <p className="text-xs text-slate-500">
              The application queries official Singapore open data APIs live, with automatic local caching to respect API rate limits.
            </p>

            <div className="space-y-3">
              {OPEN_DATA_APIS.map((api) => {
                const response = apiResponses[api.id];
                const isTesting = testingApiId === api.id;

                return (
                  <div
                    key={api.id}
                    className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2 hover:border-slate-300 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1">{api.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Agency: {api.agency} · {api.datasetOrTableId}
                        </div>
                      </div>

                      <button
                        onClick={() => handleTestApi(api)}
                        disabled={isTesting}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
                        <span>{isTesting ? 'Testing...' : 'Test API'}</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-600 font-mono break-all opacity-80">
                      {api.apiUrl}
                    </div>

                    {/* Test result status bar */}
                    {response && (
                      <div className="mt-2 pt-2 border-t border-slate-200/80 space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="flex items-center gap-1.5 font-medium text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>HTTP {response.status} OK ({response.source})</span>
                          </span>
                          <span className="font-mono text-slate-500">{response.latencyMs}ms</span>
                        </div>
                        <pre className="p-2 bg-slate-900 text-slate-200 rounded text-[10px] font-mono overflow-x-auto max-h-36">
                          {response.dataSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Datastore Visualizer Card for d_d1fbb24161f78e72bed494bd2ba9d091 */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <Terminal className="w-4 h-4 text-blue-600" />
                <span>Live Datastore Viewer (d_d1fbb24161f78e72bed494bd2ba9d091)</span>
              </div>
              <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                /api/cet
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Connected live to official endpoint: <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px] font-mono">https://data.gov.sg/api/action/datastore_search?resource_id=d_d1fbb24161f78e72bed494bd2ba9d091</code>
            </p>

            {liveCetData ? (
              <div className="space-y-4 text-xs">
                {/* Highlights */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-[10px] text-slate-500">Records Pulled</div>
                    <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                      {liveCetData.totalRecords} rows
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-[10px] text-slate-500">Years Span</div>
                    <div className="text-base font-bold font-mono text-slate-900 mt-0.5">
                      {liveCetData.yearsAvailable?.[0]} - {liveCetData.yearsAvailable?.[liveCetData.yearsAvailable.length - 1]}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-[10px] text-slate-500">Source Mode</div>
                    <div className="text-base font-bold font-mono text-emerald-600 mt-0.5">
                      {liveCetData.source.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Gender Split */}
                {liveCetData.genderTotals && (
                  <div>
                    <div className="font-semibold text-slate-700 mb-2">Gender Breakdown (Total Training Places):</div>
                    <div className="grid grid-cols-2 gap-3">
                      {liveCetData.genderTotals.map((g: any) => (
                        <div key={g.gender} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="font-bold text-slate-800">{g.gender}</span>
                            <span className="font-mono font-semibold text-slate-900">{g.percentage}%</span>
                          </div>
                          <div className="text-[11px] font-mono text-slate-500">
                            {g.totalPlaces.toLocaleString()} places
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Top Course Levels */}
                {liveCetData.courseLevelTotals && (
                  <div>
                    <div className="font-semibold text-slate-700 mb-2">Top Course Levels Tracked:</div>
                    <div className="space-y-1.5">
                      {liveCetData.courseLevelTotals.slice(0, 5).map((cl: any) => (
                        <div key={cl.courseLevel} className="flex justify-between items-center text-[11px] p-2 bg-slate-50 rounded border border-slate-100">
                          <span className="text-slate-700 font-medium truncate max-w-[240px]">{cl.courseLevel}</span>
                          <span className="font-mono tabular-nums font-bold text-slate-900">{cl.totalPlaces.toLocaleString()} ({cl.percentage}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center border border-dashed border-slate-200 rounded-lg space-y-2">
                <p className="text-xs text-slate-500">
                  Click below to fetch and visualize live records from the serverless <code className="font-mono text-slate-700">/api/cet</code> connection.
                </p>
                <button
                  onClick={() => {
                    const api = OPEN_DATA_APIS.find((a) => a.id === 'd_d1fbb24161f78e72bed494bd2ba9d091') || OPEN_DATA_APIS[0];
                    handleTestApi(api);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Fetch Live Datastore Records</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: AI Data Analyst Powered by Gemini 3.8 Flash (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Sparkles className="w-4 h-4 text-red-500" />
                  <span>Gemini 3.8 Flash IHL CET Analyst</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  Server-side @google/genai
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Ask analytical questions regarding Singapore Continuing Education & Training datasets, institutional specialisations, skills forecasts, or subsidy calculations.
              </p>

              {/* Sample Question Chips */}
              <div className="mt-3 space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Suggested Public Inquiries:
                </span>
                <div className="flex flex-col gap-1.5">
                  {samplePrompts.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setPrompt(q);
                        handleRunAiAnalysis(q);
                      }}
                      className="text-left text-xs p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 text-slate-700 transition-colors cursor-pointer"
                    >
                      "{q}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Form */}
              <div className="mt-4 space-y-2">
                <div className="relative">
                  <textarea
                    rows={3}
                    placeholder="Type your question about Singapore IHL CET data or subsidies..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleRunAiAnalysis()}
                    disabled={isAiLoading || !prompt.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isAiLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Generating Briefing...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Ask Data Analyst</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* AI Output Card */}
            {aiError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{aiError}</span>
              </div>
            )}

            {aiAnalysis && (
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900">Analyst Briefing:</span>
                  <span className="text-[10px] font-mono text-slate-500">Gemini 3.8 Flash</span>
                </div>
                <div className="text-slate-800 leading-relaxed whitespace-pre-line text-xs font-sans">
                  {aiAnalysis}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
