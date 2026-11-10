import type { Request, Response } from 'express';

export interface HealthResponse {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptimeSeconds: number;
  service: string;
  version: string;
  environment: string;
  nodeVersion: string;
  endpoints: {
    path: string;
    description: string;
    method: string;
  }[];
}

/**
 * Serverless / Express handler for /api/health
 */
export default async function handler(req: Request, res: Response) {
  try {
    const responsePayload: HealthResponse = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      service: 'Singapore IHL Continuing Education & Training (CET) Tracker API',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      endpoints: [
        {
          path: '/api/health',
          method: 'GET',
          description: 'Health check and runtime diagnostics',
        },
        {
          path: '/api/cet',
          method: 'GET',
          description:
            'Live Singapore Open Data Portal CET records (resource_id: d_d1fbb24161f78e72bed494bd2ba9d091)',
        },
        {
          path: '/api/singstat/:tableId',
          method: 'GET',
          description: 'Proxy for official SingStat TableBuilder time-series datasets',
        },
        {
          path: '/api/datagov/list-rows/:datasetId',
          method: 'GET',
          description: 'Proxy for data.gov.sg v2 list-rows API',
        },
        {
          path: '/api/gemini/analyze',
          method: 'POST',
          description: 'AI Data Analyst briefings powered by Gemini 3.8 Flash',
        },
      ],
    };

    return res.status(200).json(responsePayload);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({
      status: 'error',
      message: 'Health check failure',
      error: message,
      timestamp: new Date().toISOString(),
    });
  }
}
