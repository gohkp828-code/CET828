export type IHLType = 'Autonomous University' | 'Polytechnic' | 'Institute of Technical Education' | 'Specialised Institution';

export interface IHLInstitution {
  id: string;
  code: string;
  name: string;
  shortName: string;
  type: IHLType;
  cetArm: string;
  cetWebsite: string;
  description: string;
  keyFocusAreas: string[];
  flagshipPrograms: {
    title: string;
    level: string;
    duration: string;
    courseFee: number;
    subsidisedFeeSingaporean: number;
    subsidisedFeeMidCareer: number; // 40+ years old (SkillsFuture Level-Up / MCES)
    skillsFutureSeriesTier: 'Basic' | 'Intermediate' | 'Advanced';
  }[];
  // Time series metrics: year -> metrics
  metricsByYear: Record<number, {
    enrolment: number;
    graduates: number;
    intake: number;
    modularParticipants: number;
    traineeDays: number;
    skillsFutureSeriesParticipants: number;
    governmentSubsidyTierPct: number;
  }>;
  disciplineDistribution: {
    discipline: string;
    percentage: number;
    enrolmentEstimate: number;
  }[];
}

export interface DisciplineDataSeries {
  discipline: string;
  category: 'Polytechnic CET' | 'University Higher Degree' | 'ITE CET';
  dataByYear: Record<number, number>;
}

export interface NationalMetric {
  year: number;
  totalCetEnrolment: number;
  polytechnicPostDiplomaEnrolment: number;
  universityHigherDegreeEnrolment: number;
  iteSkillsTrainingPlaces: number;
  wsqTraineesTotal: number;
  adultParticipationRatePct: number;
  totalTraineeDaysMillion: number;
}

export interface CrushedDataRow {
  id: string;
  year: number;
  institution: string;
  institutionType: IHLType;
  enrolment: number;
  graduates: number;
  intake: number;
  modularParticipants: number;
  traineeDays: number;
  yoyGrowthPct: number | null;
  completionRatePct: number;
  averageTraineeDays: number;
}

export interface OpenApiEndpointStatus {
  source: 'data.gov.sg' | 'singstat';
  endpointId: string;
  title: string;
  status: 'online' | 'cached' | 'error' | 'loading';
  lastUpdated: string;
  recordCount: number;
}
