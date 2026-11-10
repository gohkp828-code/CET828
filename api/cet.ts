import type { Request, Response } from 'express';

export interface RawCetRecord {
  _id: number;
  year: string;
  gender: string;
  nmc_course_level: string;
  training_places: string;
}

export interface DatastoreSearchResponse {
  help: string;
  success: boolean;
  result: {
    resource_id: string;
    fields: { type: string; id: string }[];
    records: RawCetRecord[];
    _links?: Record<string, string>;
    total?: number;
    limit?: number;
  };
}

export interface ProcessedYearlySummary {
  year: number;
  totalTrainingPlaces: number;
  malePlaces: number;
  femalePlaces: number;
  femalePercentage: number;
  byCourseLevel: Record<string, number>;
}

export interface CetApiResponse {
  success: boolean;
  source: 'live' | 'cache' | 'fallback';
  resource_id: string;
  endpoint: string;
  fetchedAt: string;
  totalRecords: number;
  yearsAvailable: number[];
  courseLevels: string[];
  yearlySummaries: ProcessedYearlySummary[];
  courseLevelTotals: { courseLevel: string; totalPlaces: number; percentage: number }[];
  genderTotals: { gender: string; totalPlaces: number; percentage: number }[];
  records: RawCetRecord[];
  error?: string;
}

// In-memory cache for serverless execution
let cachedData: {
  payload: CetApiResponse;
  timestamp: number;
} | null = null;

const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

const DATA_GOV_SG_URL =
  'https://data.gov.sg/api/action/datastore_search?resource_id=d_d1fbb24161f78e72bed494bd2ba9d091&limit=1000';

/**
 * Fetch and process records from Singapore Open Data Portal
 */
export async function fetchLiveCetData(forceRefresh = false): Promise<CetApiResponse> {
  const now = Date.now();
  if (!forceRefresh && cachedData && now - cachedData.timestamp < CACHE_TTL_MS) {
    return {
      ...cachedData.payload,
      source: 'cache',
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(DATA_GOV_SG_URL, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Singapore-IHL-CET-Tracker/1.0',
      },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Data.gov.sg returned HTTP ${res.status}: ${res.statusText}`);
    }

    const json: DatastoreSearchResponse = await res.json();
    if (!json.success || !json.result?.records) {
      throw new Error('Data.gov.sg API returned unsuccessful status or empty records');
    }

    const records: RawCetRecord[] = json.result.records;

    // Process & Aggregate Records
    const yearsSet = new Set<number>();
    const courseLevelsSet = new Set<string>();
    const yearlyMap = new Map<number, {
      total: number;
      male: number;
      female: number;
      byCourse: Record<string, number>;
    }>();

    const courseLevelTotalsMap = new Map<string, number>();
    let overallMale = 0;
    let overallFemale = 0;
    let overallTotal = 0;

    for (const r of records) {
      const year = parseInt(r.year, 10);
      const places = parseInt(r.training_places, 10) || 0;
      const gender = r.gender;
      const level = r.nmc_course_level;

      if (!isNaN(year)) yearsSet.add(year);
      if (level) courseLevelsSet.add(level);

      // Accumulate overall
      if (gender === 'Male') overallMale += places;
      if (gender === 'Female') overallFemale += places;
      overallTotal += places;

      // Accumulate course level
      courseLevelTotalsMap.set(level, (courseLevelTotalsMap.get(level) || 0) + places);

      // Accumulate yearly
      if (!yearlyMap.has(year)) {
        yearlyMap.set(year, {
          total: 0,
          male: 0,
          female: 0,
          byCourse: {},
        });
      }

      const yObj = yearlyMap.get(year)!;
      yObj.total += places;
      if (gender === 'Male') yObj.male += places;
      if (gender === 'Female') yObj.female += places;
      yObj.byCourse[level] = (yObj.byCourse[level] || 0) + places;
    }

    const sortedYears = Array.from(yearsSet).sort((a, b) => a - b);
    const sortedCourseLevels = Array.from(courseLevelsSet).sort();

    const yearlySummaries: ProcessedYearlySummary[] = sortedYears.map((yr) => {
      const yData = yearlyMap.get(yr)!;
      const femalePct = yData.total > 0 ? Number(((yData.female / yData.total) * 100).toFixed(1)) : 0;
      return {
        year: yr,
        totalTrainingPlaces: yData.total,
        malePlaces: yData.male,
        femalePlaces: yData.female,
        femalePercentage: femalePct,
        byCourseLevel: yData.byCourse,
      };
    });

    const courseLevelTotals = Array.from(courseLevelTotalsMap.entries())
      .map(([courseLevel, totalPlaces]) => ({
        courseLevel,
        totalPlaces,
        percentage: overallTotal > 0 ? Number(((totalPlaces / overallTotal) * 100).toFixed(1)) : 0,
      }))
      .sort((a, b) => b.totalPlaces - a.totalPlaces);

    const genderTotals = [
      {
        gender: 'Male',
        totalPlaces: overallMale,
        percentage: overallTotal > 0 ? Number(((overallMale / overallTotal) * 100).toFixed(1)) : 0,
      },
      {
        gender: 'Female',
        totalPlaces: overallFemale,
        percentage: overallTotal > 0 ? Number(((overallFemale / overallTotal) * 100).toFixed(1)) : 0,
      },
    ];

    const payload: CetApiResponse = {
      success: true,
      source: 'live',
      resource_id: 'd_d1fbb24161f78e72bed494bd2ba9d091',
      endpoint: DATA_GOV_SG_URL,
      fetchedAt: new Date().toISOString(),
      totalRecords: records.length,
      yearsAvailable: sortedYears,
      courseLevels: sortedCourseLevels,
      yearlySummaries,
      courseLevelTotals,
      genderTotals,
      records,
    };

    cachedData = {
      payload,
      timestamp: now,
    };

    return payload;
  } catch (err: unknown) {
    clearTimeout(timeout);
    const message = err instanceof Error ? err.message : 'Unknown error';

    // If cache is available, return stale cache with fallback note
    if (cachedData) {
      return {
        ...cachedData.payload,
        source: 'fallback',
        error: `Live fetch failed (${message}), returning cached data`,
      };
    }

    throw new Error(`Failed to fetch live CET data: ${message}`);
  }
}

/**
 * Serverless / Express handler for /api/cet
 */
export default async function handler(req: Request, res: Response) {
  try {
    const forceRefresh = req.query.refresh === 'true';
    const filterYear = req.query.year ? parseInt(req.query.year as string, 10) : null;
    const filterGender = req.query.gender as string | undefined;
    const filterCourse = req.query.course_level as string | undefined;

    const data = await fetchLiveCetData(forceRefresh);

    let filteredRecords = data.records;

    if (filterYear) {
      filteredRecords = filteredRecords.filter((r) => parseInt(r.year, 10) === filterYear);
    }
    if (filterGender) {
      filteredRecords = filteredRecords.filter(
        (r) => r.gender.toLowerCase() === filterGender.toLowerCase()
      );
    }
    if (filterCourse) {
      filteredRecords = filteredRecords.filter((r) =>
        r.nmc_course_level.toLowerCase().includes(filterCourse.toLowerCase())
      );
    }

    return res.status(200).json({
      ...data,
      filteredCount: filteredRecords.length,
      records: filteredRecords,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return res.status(502).json({
      success: false,
      error: message,
      resource_id: 'd_d1fbb24161f78e72bed494bd2ba9d091',
      endpoint: DATA_GOV_SG_URL,
      timestamp: new Date().toISOString(),
    });
  }
}
