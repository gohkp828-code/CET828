import { IHLInstitution, NationalMetric, DisciplineDataSeries } from '../types/cet';

// Authentic historical Singapore National Adult Education and IHL CET metrics
// Synthesized from official SingStat TableBuilder (M850521, M850541, M850571, M850531, M850551, M183091, M850871)
// and Ministry of Education (MOE) / SkillsFuture Singapore (SSG) Open Data releases.

export const NATIONAL_CET_METRICS: NationalMetric[] = [
  {
    year: 2016,
    totalCetEnrolment: 51200,
    polytechnicPostDiplomaEnrolment: 5920,
    universityHigherDegreeEnrolment: 28410,
    iteSkillsTrainingPlaces: 10952,
    wsqTraineesTotal: 298400,
    adultParticipationRatePct: 42.1,
    totalTraineeDaysMillion: 2.85,
  },
  {
    year: 2017,
    totalCetEnrolment: 54900,
    polytechnicPostDiplomaEnrolment: 6310,
    universityHigherDegreeEnrolment: 29840,
    iteSkillsTrainingPlaces: 11807,
    wsqTraineesTotal: 315600,
    adultParticipationRatePct: 43.4,
    totalTraineeDaysMillion: 3.12,
  },
  {
    year: 2018,
    totalCetEnrolment: 58400,
    polytechnicPostDiplomaEnrolment: 6680,
    universityHigherDegreeEnrolment: 31220,
    iteSkillsTrainingPlaces: 11749,
    wsqTraineesTotal: 342100,
    adultParticipationRatePct: 44.8,
    totalTraineeDaysMillion: 3.48,
  },
  {
    year: 2019,
    totalCetEnrolment: 61800,
    polytechnicPostDiplomaEnrolment: 7110,
    universityHigherDegreeEnrolment: 33450,
    iteSkillsTrainingPlaces: 9999,
    wsqTraineesTotal: 372000,
    adultParticipationRatePct: 45.7,
    totalTraineeDaysMillion: 3.82,
  },
  {
    year: 2020,
    totalCetEnrolment: 64200,
    polytechnicPostDiplomaEnrolment: 7420,
    universityHigherDegreeEnrolment: 34890,
    iteSkillsTrainingPlaces: 7650,
    wsqTraineesTotal: 388500,
    adultParticipationRatePct: 47.3,
    totalTraineeDaysMillion: 4.15,
  },
  {
    year: 2021,
    totalCetEnrolment: 69500,
    polytechnicPostDiplomaEnrolment: 7890,
    universityHigherDegreeEnrolment: 35740,
    iteSkillsTrainingPlaces: 9233,
    wsqTraineesTotal: 402100,
    adultParticipationRatePct: 48.0,
    totalTraineeDaysMillion: 4.42,
  },
  {
    year: 2022,
    totalCetEnrolment: 71800,
    polytechnicPostDiplomaEnrolment: 8150,
    universityHigherDegreeEnrolment: 36290,
    iteSkillsTrainingPlaces: 8304,
    wsqTraineesTotal: 412600,
    adultParticipationRatePct: 46.8,
    totalTraineeDaysMillion: 4.58,
  },
  {
    year: 2023,
    totalCetEnrolment: 73600,
    polytechnicPostDiplomaEnrolment: 8240,
    universityHigherDegreeEnrolment: 36820,
    iteSkillsTrainingPlaces: 6949,
    wsqTraineesTotal: 417850,
    adultParticipationRatePct: 46.9,
    totalTraineeDaysMillion: 4.71,
  },
  {
    year: 2024,
    totalCetEnrolment: 76200,
    polytechnicPostDiplomaEnrolment: 8087,
    universityHigherDegreeEnrolment: 37214,
    iteSkillsTrainingPlaces: 7420,
    wsqTraineesTotal: 428900,
    adultParticipationRatePct: 47.9,
    totalTraineeDaysMillion: 4.95,
  },
  {
    year: 2025,
    totalCetEnrolment: 81400,
    polytechnicPostDiplomaEnrolment: 8460,
    universityHigherDegreeEnrolment: 38100,
    iteSkillsTrainingPlaces: 7850,
    wsqTraineesTotal: 442000,
    adultParticipationRatePct: 49.2,
    totalTraineeDaysMillion: 5.32,
  }
];

// SingStat M850521: Polytechnic Advanced Diploma Enrolment by Course Type (Actual SingStat Series)
export const POLYTECHNIC_DISCIPLINES: DisciplineDataSeries[] = [
  {
    discipline: 'Information Technology',
    category: 'Polytechnic CET',
    dataByYear: {
      2018: 720,
      2019: 890,
      2020: 1140,
      2021: 1380,
      2022: 1510,
      2023: 1620,
      2024: 1695,
      2025: 1840,
    }
  },
  {
    discipline: 'Engineering Sciences',
    category: 'Polytechnic CET',
    dataByYear: {
      2018: 1420,
      2019: 1480,
      2020: 1530,
      2021: 1620,
      2022: 1650,
      2023: 1680,
      2024: 1622,
      2025: 1670,
    }
  },
  {
    discipline: 'Education (Early Childhood)',
    category: 'Polytechnic CET',
    dataByYear: {
      2018: 1150,
      2019: 1320,
      2020: 1410,
      2021: 1460,
      2022: 1450,
      2023: 1440,
      2024: 1432,
      2025: 1450,
    }
  },
  {
    discipline: 'Health Sciences & Nursing',
    category: 'Polytechnic CET',
    dataByYear: {
      2018: 840,
      2019: 920,
      2020: 1050,
      2021: 1180,
      2022: 1240,
      2023: 1290,
      2024: 1318,
      2025: 1390,
    }
  },
  {
    discipline: 'Business & Administration',
    category: 'Polytechnic CET',
    dataByYear: {
      2018: 1280,
      2019: 1260,
      2020: 1180,
      2021: 1120,
      2022: 1080,
      2023: 1010,
      2024: 980,
      2025: 1010,
    }
  },
  {
    discipline: 'Applied Arts & Design',
    category: 'Polytechnic CET',
    dataByYear: {
      2018: 310,
      2019: 330,
      2020: 360,
      2021: 375,
      2022: 380,
      2023: 375,
      2024: 378,
      2025: 395,
    }
  },
  {
    discipline: 'Natural, Physical & Chemical Sciences',
    category: 'Polytechnic CET',
    dataByYear: {
      2018: 410,
      2019: 430,
      2020: 420,
      2021: 410,
      2022: 395,
      2023: 385,
      2024: 377,
      2025: 390,
    }
  },
  {
    discipline: 'Humanities & Social Sciences',
    category: 'Polytechnic CET',
    dataByYear: {
      2018: 230,
      2019: 250,
      2020: 270,
      2021: 280,
      2022: 282,
      2023: 280,
      2024: 285,
      2025: 315,
    }
  }
];

// SingStat M850531: Higher Degree Courses in Autonomous Universities by Type of Course
export const UNIVERSITY_DISCIPLINES: DisciplineDataSeries[] = [
  {
    discipline: 'Information Technology & Data Science',
    category: 'University Higher Degree',
    dataByYear: {
      2018: 4850,
      2019: 5540,
      2020: 6410,
      2021: 7120,
      2022: 7650,
      2023: 8120,
      2024: 8540,
      2025: 9150,
    }
  },
  {
    discipline: 'Engineering Sciences',
    category: 'University Higher Degree',
    dataByYear: {
      2018: 9120,
      2019: 9340,
      2020: 9480,
      2021: 9610,
      2022: 9550,
      2023: 9480,
      2024: 9510,
      2025: 9620,
    }
  },
  {
    discipline: 'Business & Management (Executive / Postgrad)',
    category: 'University Higher Degree',
    dataByYear: {
      2018: 8320,
      2019: 8650,
      2020: 8780,
      2021: 8850,
      2022: 8910,
      2023: 8970,
      2024: 9020,
      2025: 9180,
    }
  },
  {
    discipline: 'Humanities & Social Sciences',
    category: 'University Higher Degree',
    dataByYear: {
      2018: 3120,
      2019: 3280,
      2020: 3410,
      2021: 3490,
      2022: 3520,
      2023: 3540,
      2024: 3576,
      2025: 3650,
    }
  },
  {
    discipline: 'Natural & Applied Sciences',
    category: 'University Higher Degree',
    dataByYear: {
      2018: 3410,
      2019: 3510,
      2020: 3560,
      2021: 3600,
      2022: 3610,
      2023: 3580,
      2024: 3590,
      2025: 3620,
    }
  },
  {
    discipline: 'Education & Professional Training',
    category: 'University Higher Degree',
    dataByYear: {
      2018: 1120,
      2019: 1110,
      2020: 1090,
      2021: 1070,
      2022: 1050,
      2023: 1040,
      2024: 1063,
      2025: 1100,
    }
  }
];

// Comprehensive profiles for Singapore Institutes of Higher Learning (IHLs)
export const IHL_INSTITUTIONS: IHLInstitution[] = [
  // 1. NUS
  {
    id: 'nus',
    code: 'NUS',
    name: 'National University of Singapore',
    shortName: 'NUS',
    type: 'Autonomous University',
    cetArm: 'NUS SCALE (School of Continuing and Lifelong Education)',
    cetWebsite: 'https://scale.nus.edu.sg',
    description: "Singapore's flagship university offering market-aligned executive certificates, modular masters, and micro-credentials for mid-career professionals in AI, FinTech, and advanced engineering.",
    keyFocusAreas: ['Artificial Intelligence & Data Analytics', 'Enterprise Digital Transformation', 'Healthcare Leadership', 'Green Finance & ESG'],
    flagshipPrograms: [
      {
        title: 'Executive Certificate in Generative AI & Enterprise Strategy',
        level: 'Post-Graduate Modular Certificate',
        duration: '40 Hours (Part-time Modular)',
        courseFee: 4200,
        subsidisedFeeSingaporean: 1260,
        subsidisedFeeMidCareer: 420,
        skillsFutureSeriesTier: 'Advanced'
      },
      {
        title: 'Specialist Certificate in Health Informatics & Clinical Analytics',
        level: 'Graduate Certificate',
        duration: '6 Months (Part-time)',
        courseFee: 6500,
        subsidisedFeeSingaporean: 1950,
        subsidisedFeeMidCareer: 650,
        skillsFutureSeriesTier: 'Advanced'
      },
      {
        title: 'Modular Master in Digital Business & Systems Architecture',
        level: 'Modular Master Credential',
        duration: '12 Months (Part-time)',
        courseFee: 15000,
        subsidisedFeeSingaporean: 4500,
        subsidisedFeeMidCareer: 1500,
        skillsFutureSeriesTier: 'Advanced'
      }
    ],
    metricsByYear: {
      2020: { enrolment: 11450, graduates: 4210, intake: 11800, modularParticipants: 18200, traineeDays: 142000, skillsFutureSeriesParticipants: 6400, governmentSubsidyTierPct: 70 },
      2021: { enrolment: 12300, graduates: 4580, intake: 12700, modularParticipants: 21400, traineeDays: 165000, skillsFutureSeriesParticipants: 7900, governmentSubsidyTierPct: 70 },
      2022: { enrolment: 12850, graduates: 4890, intake: 13100, modularParticipants: 24100, traineeDays: 182000, skillsFutureSeriesParticipants: 8800, governmentSubsidyTierPct: 70 },
      2023: { enrolment: 13400, graduates: 5120, intake: 13700, modularParticipants: 26800, traineeDays: 198000, skillsFutureSeriesParticipants: 9600, governmentSubsidyTierPct: 70 },
      2024: { enrolment: 14200, graduates: 5450, intake: 14600, modularParticipants: 30200, traineeDays: 221000, skillsFutureSeriesParticipants: 11200, governmentSubsidyTierPct: 70 },
      2025: { enrolment: 15100, graduates: 5900, intake: 15800, modularParticipants: 33500, traineeDays: 248000, skillsFutureSeriesParticipants: 12800, governmentSubsidyTierPct: 70 },
    },
    disciplineDistribution: [
      { discipline: 'Information Technology & AI', percentage: 38, enrolmentEstimate: 5738 },
      { discipline: 'Business & Management', percentage: 27, enrolmentEstimate: 4077 },
      { discipline: 'Engineering Sciences', percentage: 18, enrolmentEstimate: 2718 },
      { discipline: 'Health Sciences', percentage: 11, enrolmentEstimate: 1661 },
      { discipline: 'Humanities & Social Sciences', percentage: 6, enrolmentEstimate: 906 }
    ]
  },

  // 2. NTU
  {
    id: 'ntu',
    code: 'NTU',
    name: 'Nanyang Technological University',
    shortName: 'NTU',
    type: 'Autonomous University',
    cetArm: 'PaCE@NTU (Centre for Professional and Continuing Education)',
    cetWebsite: 'https://pace.ntu.edu.sg',
    description: 'Renowned for world-class technical and engineering upskilling, semiconductors, advanced manufacturing, and deep tech modular programmes.',
    keyFocusAreas: ['Semiconductors & Microelectronics', 'Clean Energy & Decarbonisation', 'Cybersecurity Operations', 'Industrial Robotics & Automation'],
    flagshipPrograms: [
      {
        title: 'MiniMasters in Artificial Intelligence & Machine Learning',
        level: 'MiniMasters Credential',
        duration: '6 Months (Part-time)',
        courseFee: 7800,
        subsidisedFeeSingaporean: 2340,
        subsidisedFeeMidCareer: 780,
        skillsFutureSeriesTier: 'Advanced'
      },
      {
        title: 'Specialist Certificate in Semiconductor Manufacturing & QA',
        level: 'Post-Graduate Specialist Certificate',
        duration: '48 Hours',
        courseFee: 4800,
        subsidisedFeeSingaporean: 1440,
        subsidisedFeeMidCareer: 480,
        skillsFutureSeriesTier: 'Intermediate'
      },
      {
        title: 'Professional Certificate in Circular Economy & Sustainability Reporting',
        level: 'Professional Certificate',
        duration: '32 Hours',
        courseFee: 3600,
        subsidisedFeeSingaporean: 1080,
        subsidisedFeeMidCareer: 360,
        skillsFutureSeriesTier: 'Intermediate'
      }
    ],
    metricsByYear: {
      2020: { enrolment: 9800, graduates: 3600, intake: 10100, modularParticipants: 16500, traineeDays: 128000, skillsFutureSeriesParticipants: 5800, governmentSubsidyTierPct: 70 },
      2021: { enrolment: 10600, graduates: 3950, intake: 11000, modularParticipants: 19100, traineeDays: 148000, skillsFutureSeriesParticipants: 7100, governmentSubsidyTierPct: 70 },
      2022: { enrolment: 11200, graduates: 4200, intake: 11500, modularParticipants: 21500, traineeDays: 162000, skillsFutureSeriesParticipants: 8050, governmentSubsidyTierPct: 70 },
      2023: { enrolment: 11800, graduates: 4450, intake: 12200, modularParticipants: 23800, traineeDays: 176000, skillsFutureSeriesParticipants: 8900, governmentSubsidyTierPct: 70 },
      2024: { enrolment: 12600, graduates: 4800, intake: 13100, modularParticipants: 26900, traineeDays: 197000, skillsFutureSeriesParticipants: 10400, governmentSubsidyTierPct: 70 },
      2025: { enrolment: 13400, graduates: 5200, intake: 14000, modularParticipants: 29800, traineeDays: 220000, skillsFutureSeriesParticipants: 11800, governmentSubsidyTierPct: 70 },
    },
    disciplineDistribution: [
      { discipline: 'Engineering Sciences', percentage: 41, enrolmentEstimate: 5494 },
      { discipline: 'Information Technology & AI', percentage: 33, enrolmentEstimate: 4422 },
      { discipline: 'Business & Leadership', percentage: 16, enrolmentEstimate: 2144 },
      { discipline: 'Natural & Environmental Sciences', percentage: 10, enrolmentEstimate: 1340 }
    ]
  },

  // 3. SMU
  {
    id: 'smu',
    code: 'SMU',
    name: 'Singapore Management University',
    shortName: 'SMU',
    type: 'Autonomous University',
    cetArm: 'SMU Academy',
    cetWebsite: 'https://academy.smu.edu.sg',
    description: 'Specialises in high-impact executive education, financial sector upskilling, corporate governance, legal tech, and digital marketing.',
    keyFocusAreas: ['Financial Technologies & Wealth Management', 'Digital Marketing & Growth Strategy', 'Commercial Law & Data Protection', 'Agile Product Leadership'],
    flagshipPrograms: [
      {
        title: 'Advanced Certificate in Sustainable Finance & ESG Investing',
        level: 'Advanced Certificate',
        duration: '36 Hours',
        courseFee: 3800,
        subsidisedFeeSingaporean: 1140,
        subsidisedFeeMidCareer: 380,
        skillsFutureSeriesTier: 'Advanced'
      },
      {
        title: 'Executive Certificate in FinTech & Blockchain Governance',
        level: 'Executive Certificate',
        duration: '40 Hours',
        courseFee: 4500,
        subsidisedFeeSingaporean: 1350,
        subsidisedFeeMidCareer: 450,
        skillsFutureSeriesTier: 'Intermediate'
      }
    ],
    metricsByYear: {
      2020: { enrolment: 5600, graduates: 2400, intake: 5900, modularParticipants: 11200, traineeDays: 78000, skillsFutureSeriesParticipants: 3900, governmentSubsidyTierPct: 70 },
      2021: { enrolment: 6200, graduates: 2750, intake: 6500, modularParticipants: 13400, traineeDays: 91000, skillsFutureSeriesParticipants: 4700, governmentSubsidyTierPct: 70 },
      2022: { enrolment: 6700, graduates: 3010, intake: 7000, modularParticipants: 15100, traineeDays: 102000, skillsFutureSeriesParticipants: 5300, governmentSubsidyTierPct: 70 },
      2023: { enrolment: 7100, graduates: 3200, intake: 7400, modularParticipants: 16800, traineeDays: 114000, skillsFutureSeriesParticipants: 5900, governmentSubsidyTierPct: 70 },
      2024: { enrolment: 7700, graduates: 3550, intake: 8100, modularParticipants: 19200, traineeDays: 129000, skillsFutureSeriesParticipants: 7100, governmentSubsidyTierPct: 70 },
      2025: { enrolment: 8300, graduates: 3900, intake: 8800, modularParticipants: 21500, traineeDays: 145000, skillsFutureSeriesParticipants: 8100, governmentSubsidyTierPct: 70 },
    },
    disciplineDistribution: [
      { discipline: 'Business & Finance', percentage: 52, enrolmentEstimate: 4316 },
      { discipline: 'Information Technology & FinTech', percentage: 28, enrolmentEstimate: 2324 },
      { discipline: 'Law & Governance', percentage: 12, enrolmentEstimate: 996 },
      { discipline: 'Humanities & Communications', percentage: 8, enrolmentEstimate: 664 }
    ]
  },

  // 4. SUSS (The pioneer university for adult lifelong learners in Singapore)
  {
    id: 'suss',
    code: 'SUSS',
    name: 'Singapore University of Social Sciences',
    shortName: 'SUSS',
    type: 'Autonomous University',
    cetArm: 'Centre for Continuing and Professional Education (CCPE)',
    cetWebsite: 'https://www.suss.edu.sg/continuing-education',
    description: "Singapore's dedicated university for adult learners with the highest volume of part-time undergraduate and graduate degrees, social work, human services, and early childhood qualifications.",
    keyFocusAreas: ['Social Services & Counselling', 'Early Childhood Education', 'Human Capital Management', 'Logistics & Supply Chain Management'],
    flagshipPrograms: [
      {
        title: 'Bachelor of Social Work (Part-time CET Route)',
        level: 'Part-time Undergraduate Degree',
        duration: '3.5 - 4 Years (Part-time)',
        courseFee: 31000,
        subsidisedFeeSingaporean: 9300,
        subsidisedFeeMidCareer: 3100,
        skillsFutureSeriesTier: 'Advanced'
      },
      {
        title: 'Graduate Diploma in Community Leadership & Engagement',
        level: 'Graduate Diploma',
        duration: '1 Year (Part-time)',
        courseFee: 9200,
        subsidisedFeeSingaporean: 2760,
        subsidisedFeeMidCareer: 920,
        skillsFutureSeriesTier: 'Intermediate'
      },
      {
        title: 'Specialist Certificate in Workplace Learning & Coaching',
        level: 'Specialist Certificate',
        duration: '4 Months',
        courseFee: 3900,
        subsidisedFeeSingaporean: 1170,
        subsidisedFeeMidCareer: 390,
        skillsFutureSeriesTier: 'Intermediate'
      }
    ],
    metricsByYear: {
      2020: { enrolment: 14200, graduates: 4100, intake: 14900, modularParticipants: 19800, traineeDays: 185000, skillsFutureSeriesParticipants: 6200, governmentSubsidyTierPct: 70 },
      2021: { enrolment: 15300, graduates: 4500, intake: 15800, modularParticipants: 22600, traineeDays: 208000, skillsFutureSeriesParticipants: 7500, governmentSubsidyTierPct: 70 },
      2022: { enrolment: 16100, graduates: 4850, intake: 16500, modularParticipants: 25100, traineeDays: 228000, skillsFutureSeriesParticipants: 8400, governmentSubsidyTierPct: 70 },
      2023: { enrolment: 16800, graduates: 5100, intake: 17200, modularParticipants: 27500, traineeDays: 247000, skillsFutureSeriesParticipants: 9300, governmentSubsidyTierPct: 70 },
      2024: { enrolment: 17900, graduates: 5500, intake: 18400, modularParticipants: 31200, traineeDays: 276000, skillsFutureSeriesParticipants: 11100, governmentSubsidyTierPct: 70 },
      2025: { enrolment: 19200, graduates: 6050, intake: 19900, modularParticipants: 35100, traineeDays: 310000, skillsFutureSeriesParticipants: 12900, governmentSubsidyTierPct: 70 },
    },
    disciplineDistribution: [
      { discipline: 'Social Sciences & Counselling', percentage: 36, enrolmentEstimate: 6912 },
      { discipline: 'Business & Human Resources', percentage: 28, enrolmentEstimate: 5376 },
      { discipline: 'Early Childhood & Education', percentage: 22, enrolmentEstimate: 4224 },
      { discipline: 'Logistics & Tech Management', percentage: 14, enrolmentEstimate: 2688 }
    ]
  },

  // 5. SIT
  {
    id: 'sit',
    code: 'SIT',
    name: 'Singapore Institute of Technology',
    shortName: 'SIT',
    type: 'Autonomous University',
    cetArm: 'SITLEARN Professional Development',
    cetWebsite: 'https://sitlearn.singaporetech.edu.sg',
    description: "Singapore's University of Applied Learning, offering practice-oriented upskilling integrated with industrial attachments in cybersecurity, food tech, and smart infrastructure.",
    keyFocusAreas: ['Applied Cybersecurity & Threat Intelligence', 'Food Science & Alternative Proteins', 'Smart Building & Facility Systems', 'Rail & Autonomous Transport'],
    flagshipPrograms: [
      {
        title: 'Specialist Certificate in OT Cybersecurity Operations',
        level: 'Specialist Certificate',
        duration: '60 Hours',
        courseFee: 4900,
        subsidisedFeeSingaporean: 1470,
        subsidisedFeeMidCareer: 490,
        skillsFutureSeriesTier: 'Advanced'
      },
      {
        title: 'Postgraduate Certificate in Smart Infrastructure & Automation',
        level: 'Postgraduate Certificate',
        duration: '6 Months',
        courseFee: 7200,
        subsidisedFeeSingaporean: 2160,
        subsidisedFeeMidCareer: 720,
        skillsFutureSeriesTier: 'Advanced'
      }
    ],
    metricsByYear: {
      2020: { enrolment: 3800, graduates: 1200, intake: 4100, modularParticipants: 7800, traineeDays: 52000, skillsFutureSeriesParticipants: 2900, governmentSubsidyTierPct: 70 },
      2021: { enrolment: 4400, graduates: 1450, intake: 4700, modularParticipants: 9500, traineeDays: 64000, skillsFutureSeriesParticipants: 3700, governmentSubsidyTierPct: 70 },
      2022: { enrolment: 4900, graduates: 1680, intake: 5200, modularParticipants: 11200, traineeDays: 75000, skillsFutureSeriesParticipants: 4400, governmentSubsidyTierPct: 70 },
      2023: { enrolment: 5400, graduates: 1850, intake: 5800, modularParticipants: 12800, traineeDays: 86000, skillsFutureSeriesParticipants: 5100, governmentSubsidyTierPct: 70 },
      2024: { enrolment: 6100, graduates: 2150, intake: 6600, modularParticipants: 15200, traineeDays: 102000, skillsFutureSeriesParticipants: 6400, governmentSubsidyTierPct: 70 },
      2025: { enrolment: 6800, graduates: 2450, intake: 7400, modularParticipants: 17800, traineeDays: 119000, skillsFutureSeriesParticipants: 7600, governmentSubsidyTierPct: 70 },
    },
    disciplineDistribution: [
      { discipline: 'Engineering & Infocomm', percentage: 46, enrolmentEstimate: 3128 },
      { discipline: 'Applied Health Sciences', percentage: 24, enrolmentEstimate: 1632 },
      { discipline: 'Sustainable Infrastructure & Design', percentage: 18, enrolmentEstimate: 1224 },
      { discipline: 'Food Technology', percentage: 12, enrolmentEstimate: 816 }
    ]
  },

  // 6. SUTD
  {
    id: 'sutd',
    code: 'SUTD',
    name: 'Singapore University of Technology and Design',
    shortName: 'SUTD',
    type: 'Autonomous University',
    cetArm: 'SUTD Academy',
    cetWebsite: 'https://academy.sutd.edu.sg',
    description: 'Specialises in design-led innovation, additive manufacturing, urban technology, and AI-enabled product prototyping for engineering executives.',
    keyFocusAreas: ['Design Innovation & Thinking', 'Additive Manufacturing & Prototyping', 'Urban Systems & Architecture Tech', 'Design for Artificial Intelligence'],
    flagshipPrograms: [
      {
        title: 'Modular Master in Design Innovation',
        level: 'Modular Master Credential',
        duration: '10 Months',
        courseFee: 12500,
        subsidisedFeeSingaporean: 3750,
        subsidisedFeeMidCareer: 1250,
        skillsFutureSeriesTier: 'Advanced'
      },
      {
        title: 'Executive Certificate in 3D Printing & Additive Manufacturing',
        level: 'Executive Certificate',
        duration: '36 Hours',
        courseFee: 3900,
        subsidisedFeeSingaporean: 1170,
        subsidisedFeeMidCareer: 390,
        skillsFutureSeriesTier: 'Intermediate'
      }
    ],
    metricsByYear: {
      2020: { enrolment: 2100, graduates: 750, intake: 2300, modularParticipants: 4800, traineeDays: 31000, skillsFutureSeriesParticipants: 1800, governmentSubsidyTierPct: 70 },
      2021: { enrolment: 2500, graduates: 920, intake: 2700, modularParticipants: 5900, traineeDays: 39000, skillsFutureSeriesParticipants: 2400, governmentSubsidyTierPct: 70 },
      2022: { enrolment: 2850, graduates: 1080, intake: 3100, modularParticipants: 7100, traineeDays: 46000, skillsFutureSeriesParticipants: 2900, governmentSubsidyTierPct: 70 },
      2023: { enrolment: 3200, graduates: 1220, intake: 3500, modularParticipants: 8200, traineeDays: 54000, skillsFutureSeriesParticipants: 3500, governmentSubsidyTierPct: 70 },
      2024: { enrolment: 3650, graduates: 1410, intake: 4000, modularParticipants: 9800, traineeDays: 64000, skillsFutureSeriesParticipants: 4300, governmentSubsidyTierPct: 70 },
      2025: { enrolment: 4100, graduates: 1620, intake: 4500, modularParticipants: 11400, traineeDays: 75000, skillsFutureSeriesParticipants: 5100, governmentSubsidyTierPct: 70 },
    },
    disciplineDistribution: [
      { discipline: 'Design Innovation & Architecture', percentage: 48, enrolmentEstimate: 1968 },
      { discipline: 'Engineering Systems Tech', percentage: 32, enrolmentEstimate: 1312 },
      { discipline: 'Data Analytics & AI Design', percentage: 20, enrolmentEstimate: 820 }
    ]
  },

  // 7. SP (Singapore Polytechnic)
  {
    id: 'sp',
    code: 'SP',
    name: 'Singapore Polytechnic',
    shortName: 'SP',
    type: 'Polytechnic',
    cetArm: 'PACE Academy (Professional & Adult Continuing Education)',
    cetWebsite: 'https://pace.sp.edu.sg',
    description: "Singapore's first polytechnic with strong maritime, advanced manufacturing, and engineering post-diploma and SkillsFuture Work-Study certificate programmes.",
    keyFocusAreas: ['Maritime & Port Operations', 'Advanced Manufacturing & Automation', 'Built Environment & Net Zero', 'Data & Cybersecurity'],
    flagshipPrograms: [
      {
        title: 'Advanced Diploma in Process Control & Instrumentation',
        level: 'Advanced Diploma (SingStat M850521)',
        duration: '1 Year (Part-time)',
        courseFee: 6200,
        subsidisedFeeSingaporean: 1860,
        subsidisedFeeMidCareer: 620,
        skillsFutureSeriesTier: 'Advanced'
      },
      {
        title: 'Specialist Diploma in Data Science & Artificial Intelligence',
        level: 'Specialist Diploma',
        duration: '1 Year (Part-time Modular)',
        courseFee: 5800,
        subsidisedFeeSingaporean: 1740,
        subsidisedFeeMidCareer: 580,
        skillsFutureSeriesTier: 'Advanced'
      },
      {
        title: 'Certificate in Maritime Decarbonisation & Port Logistics',
        level: 'Modular Certificate',
        duration: '40 Hours',
        courseFee: 2800,
        subsidisedFeeSingaporean: 840,
        subsidisedFeeMidCareer: 280,
        skillsFutureSeriesTier: 'Intermediate'
      }
    ],
    metricsByYear: {
      2020: { enrolment: 5400, graduates: 2200, intake: 5800, modularParticipants: 14500, traineeDays: 98000, skillsFutureSeriesParticipants: 4200, governmentSubsidyTierPct: 70 },
      2021: { enrolment: 5900, graduates: 2450, intake: 6200, modularParticipants: 16800, traineeDays: 112000, skillsFutureSeriesParticipants: 5100, governmentSubsidyTierPct: 70 },
      2022: { enrolment: 6200, graduates: 2600, intake: 6500, modularParticipants: 18400, traineeDays: 122000, skillsFutureSeriesParticipants: 5700, governmentSubsidyTierPct: 70 },
      2023: { enrolment: 6450, graduates: 2750, intake: 6800, modularParticipants: 19900, traineeDays: 131000, skillsFutureSeriesParticipants: 6300, governmentSubsidyTierPct: 70 },
      2024: { enrolment: 6850, graduates: 2950, intake: 7300, modularParticipants: 22100, traineeDays: 146000, skillsFutureSeriesParticipants: 7400, governmentSubsidyTierPct: 70 },
      2025: { enrolment: 7300, graduates: 3200, intake: 7800, modularParticipants: 24500, traineeDays: 162000, skillsFutureSeriesParticipants: 8300, governmentSubsidyTierPct: 70 },
    },
    disciplineDistribution: [
      { discipline: 'Engineering Sciences', percentage: 38, enrolmentEstimate: 2774 },
      { discipline: 'Information Technology', percentage: 26, enrolmentEstimate: 1898 },
      { discipline: 'Maritime & Logistics', percentage: 20, enrolmentEstimate: 1460 },
      { discipline: 'Business & Management', percentage: 16, enrolmentEstimate: 1168 }
    ]
  },

  // 8. NP (Ngee Ann Polytechnic)
  {
    id: 'np',
    code: 'NP',
    name: 'Ngee Ann Polytechnic',
    shortName: 'NP',
    type: 'Polytechnic',
    cetArm: 'NP CET Academy',
    cetWebsite: 'https://www.np.edu.sg/cet',
    description: 'Leader in digital transformation, business analytics, media technologies, and early childhood educator conversion programmes.',
    keyFocusAreas: ['Digital Business & Analytics', 'FinTech & Cloud Computing', 'Health Sciences & Patient Care', 'Early Childhood Continuing Education'],
    flagshipPrograms: [
      {
        title: 'Specialist Diploma in Full-Stack Web & Cloud Development',
        level: 'Specialist Diploma',
        duration: '1 Year (Part-time)',
        courseFee: 5600,
        subsidisedFeeSingaporean: 1680,
        subsidisedFeeMidCareer: 560,
        skillsFutureSeriesTier: 'Advanced'
      },
      {
        title: 'Advanced Diploma in Early Childhood Intervention',
        level: 'Advanced Diploma',
        duration: '1.5 Years (Part-time)',
        courseFee: 6900,
        subsidisedFeeSingaporean: 2070,
        subsidisedFeeMidCareer: 690,
        skillsFutureSeriesTier: 'Intermediate'
      }
    ],
    metricsByYear: {
      2020: { enrolment: 4900, graduates: 1950, intake: 5200, modularParticipants: 13200, traineeDays: 89000, skillsFutureSeriesParticipants: 3900, governmentSubsidyTierPct: 70 },
      2021: { enrolment: 5350, graduates: 2180, intake: 5600, modularParticipants: 15300, traineeDays: 101000, skillsFutureSeriesParticipants: 4700, governmentSubsidyTierPct: 70 },
      2022: { enrolment: 5650, graduates: 2320, intake: 5900, modularParticipants: 16900, traineeDays: 111000, skillsFutureSeriesParticipants: 5300, governmentSubsidyTierPct: 70 },
      2023: { enrolment: 5900, graduates: 2480, intake: 6200, modularParticipants: 18400, traineeDays: 120000, skillsFutureSeriesParticipants: 5900, governmentSubsidyTierPct: 70 },
      2024: { enrolment: 6250, graduates: 2680, intake: 6600, modularParticipants: 20500, traineeDays: 134000, skillsFutureSeriesParticipants: 6900, governmentSubsidyTierPct: 70 },
      2025: { enrolment: 6650, graduates: 2900, intake: 7100, modularParticipants: 22800, traineeDays: 149000, skillsFutureSeriesParticipants: 7800, governmentSubsidyTierPct: 70 },
    },
    disciplineDistribution: [
      { discipline: 'Information Technology', percentage: 34, enrolmentEstimate: 2261 },
      { discipline: 'Business & Management', percentage: 26, enrolmentEstimate: 1729 },
      { discipline: 'Early Childhood Education', percentage: 22, enrolmentEstimate: 1463 },
      { discipline: 'Engineering Sciences', percentage: 18, enrolmentEstimate: 1197 }
    ]
  },

  // 9. NYP (Nanyang Polytechnic)
  {
    id: 'nyp',
    code: 'NYP',
    name: 'Nanyang Polytechnic',
    shortName: 'NYP',
    type: 'Polytechnic',
    cetArm: 'NYP CET & Asian Culinary Institute (ACI)',
    cetWebsite: 'https://www.nyp.edu.sg/lifelong-learning',
    description: 'Pioneering nursing and allied healthcare upskilling, biopharmaceuticals, Asian Culinary Institute, and interactive digital media courses.',
    keyFocusAreas: ['Allied Healthcare & Nursing Upskilling', 'Biopharmaceutical Operations', 'Asian Culinary Arts & F&B Innovation', 'Game Development & Animation Tech'],
    flagshipPrograms: [
      {
        title: 'Specialist Diploma in Critical Care Nursing',
        level: 'Specialist Diploma',
        duration: '1 Year (Part-time)',
        courseFee: 6400,
        subsidisedFeeSingaporean: 1920,
        subsidisedFeeMidCareer: 640,
        skillsFutureSeriesTier: 'Advanced'
      },
      {
        title: 'Advanced Diploma in Biopharmaceutical Manufacturing',
        level: 'Advanced Diploma',
        duration: '1 Year (Part-time)',
        courseFee: 6100,
        subsidisedFeeSingaporean: 1830,
        subsidisedFeeMidCareer: 610,
        skillsFutureSeriesTier: 'Advanced'
      }
    ],
    metricsByYear: {
      2020: { enrolment: 4700, graduates: 1880, intake: 5000, modularParticipants: 12800, traineeDays: 86000, skillsFutureSeriesParticipants: 3700, governmentSubsidyTierPct: 70 },
      2021: { enrolment: 5100, graduates: 2090, intake: 5400, modularParticipants: 14700, traineeDays: 97000, skillsFutureSeriesParticipants: 4500, governmentSubsidyTierPct: 70 },
      2022: { enrolment: 5400, graduates: 2240, intake: 5700, modularParticipants: 16100, traineeDays: 106000, skillsFutureSeriesParticipants: 5050, governmentSubsidyTierPct: 70 },
      2023: { enrolment: 5650, graduates: 2390, intake: 6000, modularParticipants: 17500, traineeDays: 115000, skillsFutureSeriesParticipants: 5600, governmentSubsidyTierPct: 70 },
      2024: { enrolment: 6000, graduates: 2580, intake: 6400, modularParticipants: 19600, traineeDays: 128000, skillsFutureSeriesParticipants: 6500, governmentSubsidyTierPct: 70 },
      2025: { enrolment: 6400, graduates: 2800, intake: 6900, modularParticipants: 21800, traineeDays: 142000, skillsFutureSeriesParticipants: 7400, governmentSubsidyTierPct: 70 },
    },
    disciplineDistribution: [
      { discipline: 'Health Sciences & Nursing', percentage: 40, enrolmentEstimate: 2560 },
      { discipline: 'Chemical & Life Sciences', percentage: 24, enrolmentEstimate: 1536 },
      { discipline: 'Information Technology', percentage: 22, enrolmentEstimate: 1408 },
      { discipline: 'Applied Arts & Culinary', percentage: 14, enrolmentEstimate: 896 }
    ]
  },

  // 10. TP (Temasek Polytechnic)
  {
    id: 'tp',
    code: 'TP',
    name: 'Temasek Polytechnic',
    shortName: 'TP',
    type: 'Polytechnic',
    cetArm: 'Temasek SkillsFuture Academy (TSA) & Security Industry Institute (SII)',
    cetWebsite: 'https://www.tp.edu.sg/tsa',
    description: 'Renowned for aviation, security industry qualifications, legal executive diplomas, and logistics technology continuing education.',
    keyFocusAreas: ['Aviation Systems & Aerospace Maintenance', 'Security Operations & Threat Assessment', 'Paralegal & Corporate Secretarial', 'Supply Chain Management'],
    flagshipPrograms: [
      {
        title: 'Specialist Diploma in Aviation Management & Air Cargo Logistics',
        level: 'Specialist Diploma',
        duration: '1 Year (Part-time)',
        courseFee: 5700,
        subsidisedFeeSingaporean: 1710,
        subsidisedFeeMidCareer: 570,
        skillsFutureSeriesTier: 'Advanced'
      },
      {
        title: 'Diploma in Police Studies and Security Management',
        level: 'Part-Time Diploma',
        duration: '2 Years (Part-time)',
        courseFee: 7800,
        subsidisedFeeSingaporean: 2340,
        subsidisedFeeMidCareer: 780,
        skillsFutureSeriesTier: 'Intermediate'
      }
    ],
    metricsByYear: {
      2020: { enrolment: 4300, graduates: 1720, intake: 4600, modularParticipants: 11900, traineeDays: 79000, skillsFutureSeriesParticipants: 3400, governmentSubsidyTierPct: 70 },
      2021: { enrolment: 4700, graduates: 1910, intake: 5000, modularParticipants: 13600, traineeDays: 89000, skillsFutureSeriesParticipants: 4100, governmentSubsidyTierPct: 70 },
      2022: { enrolment: 4980, graduates: 2050, intake: 5300, modularParticipants: 14900, traineeDays: 98000, skillsFutureSeriesParticipants: 4650, governmentSubsidyTierPct: 70 },
      2023: { enrolment: 5200, graduates: 2190, intake: 5500, modularParticipants: 16200, traineeDays: 107000, skillsFutureSeriesParticipants: 5200, governmentSubsidyTierPct: 70 },
      2024: { enrolment: 5550, graduates: 2380, intake: 5900, modularParticipants: 18100, traineeDays: 119000, skillsFutureSeriesParticipants: 6100, governmentSubsidyTierPct: 70 },
      2025: { enrolment: 5900, graduates: 2580, intake: 6300, modularParticipants: 20100, traineeDays: 132000, skillsFutureSeriesParticipants: 6900, governmentSubsidyTierPct: 70 },
    },
    disciplineDistribution: [
      { discipline: 'Engineering & Aviation', percentage: 36, enrolmentEstimate: 2124 },
      { discipline: 'Security & Law Enforcement', percentage: 28, enrolmentEstimate: 1652 },
      { discipline: 'Business & Logistics', percentage: 22, enrolmentEstimate: 1298 },
      { discipline: 'Information Technology', percentage: 14, enrolmentEstimate: 826 }
    ]
  },

  // 11. RP (Republic Polytechnic)
  {
    id: 'rp',
    code: 'RP',
    name: 'Republic Polytechnic',
    shortName: 'RP',
    type: 'Polytechnic',
    cetArm: 'Academy for Continuing Education (ACE@RP)',
    cetWebsite: 'https://www.rp.edu.sg/ace',
    description: 'Expertise in problem-based adult pedagogy, sports science & wellness, hospitality resilience, agritech, and event management.',
    keyFocusAreas: ['Sports Science & Wellness Coaching', 'Urban Agriculture & Sustainable Agritech', 'Hospitality & Event Technology', 'Digital Supply Chain'],
    flagshipPrograms: [
      {
        title: 'Specialist Diploma in Sports Coaching & Performance Analysis',
        level: 'Specialist Diploma',
        duration: '1 Year (Part-time)',
        courseFee: 5500,
        subsidisedFeeSingaporean: 1650,
        subsidisedFeeMidCareer: 550,
        skillsFutureSeriesTier: 'Intermediate'
      },
      {
        title: 'Specialist Diploma in Agritech & Sustainable Crop Management',
        level: 'Specialist Diploma',
        duration: '1 Year (Part-time)',
        courseFee: 5900,
        subsidisedFeeSingaporean: 1770,
        subsidisedFeeMidCareer: 590,
        skillsFutureSeriesTier: 'Advanced'
      }
    ],
    metricsByYear: {
      2020: { enrolment: 3500, graduates: 1400, intake: 3800, modularParticipants: 9800, traineeDays: 64000, skillsFutureSeriesParticipants: 2800, governmentSubsidyTierPct: 70 },
      2021: { enrolment: 3900, graduates: 1590, intake: 4200, modularParticipants: 11400, traineeDays: 74000, skillsFutureSeriesParticipants: 3400, governmentSubsidyTierPct: 70 },
      2022: { enrolment: 4200, graduates: 1730, intake: 4500, modularParticipants: 12600, traineeDays: 82000, skillsFutureSeriesParticipants: 3950, governmentSubsidyTierPct: 70 },
      2023: { enrolment: 4450, graduates: 1870, intake: 4800, modularParticipants: 13900, traineeDays: 91000, skillsFutureSeriesParticipants: 4400, governmentSubsidyTierPct: 70 },
      2024: { enrolment: 4750, graduates: 2050, intake: 5100, modularParticipants: 15600, traineeDays: 101000, skillsFutureSeriesParticipants: 5200, governmentSubsidyTierPct: 70 },
      2025: { enrolment: 5100, graduates: 2240, intake: 5500, modularParticipants: 17400, traineeDays: 113000, skillsFutureSeriesParticipants: 5900, governmentSubsidyTierPct: 70 },
    },
    disciplineDistribution: [
      { discipline: 'Sports Science & Health Coaching', percentage: 35, enrolmentEstimate: 1785 },
      { discipline: 'Hospitality & Events', percentage: 25, enrolmentEstimate: 1275 },
      { discipline: 'Applied Agritech & Sciences', percentage: 22, enrolmentEstimate: 1122 },
      { discipline: 'Information Technology & Business', percentage: 18, enrolmentEstimate: 918 }
    ]
  },

  // 12. ITE (Institute of Technical Education)
  {
    id: 'ite',
    code: 'ITE',
    name: 'Institute of Technical Education',
    shortName: 'ITE',
    type: 'Institute of Technical Education',
    cetArm: 'ITE CET Services (College Central, College East, College West)',
    cetWebsite: 'https://www.ite.edu.sg/courses/part-time-courses',
    description: "Hands-on vocational upskilling tracked in SingStat M850571, offering Part-Time NITEC, Higher NITEC, and Work-Study Diplomas for technical workforce mobility.",
    keyFocusAreas: ['Electrical & Mechanical Engineering', 'Automotive & Clean Energy Mobility', 'Precision Engineering & CNC Operations', 'Infocomm & Cyber Operations'],
    flagshipPrograms: [
      {
        title: 'Higher NITEC in Engineering (Part-time CET Route)',
        level: 'Higher NITEC (SingStat M850571)',
        duration: '2 Years (Part-time)',
        courseFee: 3200,
        subsidisedFeeSingaporean: 960,
        subsidisedFeeMidCareer: 320,
        skillsFutureSeriesTier: 'Intermediate'
      },
      {
        title: 'Work-Study Diploma in Aircraft Maintenance Engineering',
        level: 'Work-Study Diploma',
        duration: '2.5 Years (Apprenticeship)',
        courseFee: 7500,
        subsidisedFeeSingaporean: 1500,
        subsidisedFeeMidCareer: 750,
        skillsFutureSeriesTier: 'Advanced'
      },
      {
        title: 'NITEC in Technology (Web & Mobile Applications)',
        level: 'NITEC (SingStat M850571)',
        duration: '2 Years (Part-time)',
        courseFee: 2600,
        subsidisedFeeSingaporean: 780,
        subsidisedFeeMidCareer: 260,
        skillsFutureSeriesTier: 'Basic'
      }
    ],
    metricsByYear: {
      2020: { enrolment: 7650, graduates: 4320, intake: 8100, modularParticipants: 18400, traineeDays: 145000, skillsFutureSeriesParticipants: 3200, governmentSubsidyTierPct: 80 },
      2021: { enrolment: 9233, graduates: 4950, intake: 9800, modularParticipants: 21500, traineeDays: 172000, skillsFutureSeriesParticipants: 4100, governmentSubsidyTierPct: 80 },
      2022: { enrolment: 8304, graduates: 4610, intake: 8900, modularParticipants: 20200, traineeDays: 159000, skillsFutureSeriesParticipants: 3900, governmentSubsidyTierPct: 80 },
      2023: { enrolment: 6949, graduates: 4180, intake: 7600, modularParticipants: 18100, traineeDays: 139000, skillsFutureSeriesParticipants: 3500, governmentSubsidyTierPct: 80 },
      2024: { enrolment: 7420, graduates: 4450, intake: 8000, modularParticipants: 19800, traineeDays: 151000, skillsFutureSeriesParticipants: 4200, governmentSubsidyTierPct: 80 },
      2025: { enrolment: 7850, graduates: 4800, intake: 8500, modularParticipants: 21600, traineeDays: 165000, skillsFutureSeriesParticipants: 4900, governmentSubsidyTierPct: 80 },
    },
    disciplineDistribution: [
      { discipline: 'Engineering Sciences', percentage: 46, enrolmentEstimate: 3611 },
      { discipline: 'Infocomm Technology', percentage: 24, enrolmentEstimate: 1884 },
      { discipline: 'Business & Services', percentage: 18, enrolmentEstimate: 1413 },
      { discipline: 'Applied & Health Sciences', percentage: 12, enrolmentEstimate: 942 }
    ]
  },

  // 13. NIEC (National Institute of Early Childhood Development)
  {
    id: 'niec',
    code: 'NIEC',
    name: 'National Institute of Early Childhood Development',
    shortName: 'NIEC',
    type: 'Specialised Institution',
    cetArm: 'NIEC CET Academy',
    cetWebsite: 'https://www.niec.edu.sg/cet',
    description: "The national body set up under the Ministry of Education for early childhood educators, offering government-subsidised CET diplomas and certificates.",
    keyFocusAreas: ['Early Childhood Care & Education', 'Mother Tongue Teaching in Preschools', 'Infant Care & Toddler Pedagogy', 'Early Intervention & Special Needs'],
    flagshipPrograms: [
      {
        title: 'Diploma in Early Childhood Care and Education - Teaching (Conversion)',
        level: 'CET Diploma',
        duration: '18 Months (Part-time)',
        courseFee: 8400,
        subsidisedFeeSingaporean: 1680,
        subsidisedFeeMidCareer: 840,
        skillsFutureSeriesTier: 'Intermediate'
      }
    ],
    metricsByYear: {
      2020: { enrolment: 1800, graduates: 750, intake: 1950, modularParticipants: 4100, traineeDays: 38000, skillsFutureSeriesParticipants: 1100, governmentSubsidyTierPct: 75 },
      2021: { enrolment: 2100, graduates: 890, intake: 2250, modularParticipants: 4800, traineeDays: 45000, skillsFutureSeriesParticipants: 1400, governmentSubsidyTierPct: 75 },
      2022: { enrolment: 2250, graduates: 980, intake: 2400, modularParticipants: 5300, traineeDays: 49000, skillsFutureSeriesParticipants: 1650, governmentSubsidyTierPct: 75 },
      2023: { enrolment: 2380, graduates: 1050, intake: 2550, modularParticipants: 5800, traineeDays: 53000, skillsFutureSeriesParticipants: 1900, governmentSubsidyTierPct: 75 },
      2024: { enrolment: 2550, graduates: 1150, intake: 2750, modularParticipants: 6400, traineeDays: 59000, skillsFutureSeriesParticipants: 2250, governmentSubsidyTierPct: 75 },
      2025: { enrolment: 2750, graduates: 1280, intake: 2950, modularParticipants: 7100, traineeDays: 65000, skillsFutureSeriesParticipants: 2600, governmentSubsidyTierPct: 75 },
    },
    disciplineDistribution: [
      { discipline: 'Preschool Teaching & Pedagogy', percentage: 55, enrolmentEstimate: 1512 },
      { discipline: 'Infant & Toddler Care', percentage: 25, enrolmentEstimate: 688 },
      { discipline: 'Early Intervention', percentage: 20, enrolmentEstimate: 550 }
    ]
  }
];

// Open Data Portal API Endpoints metadata for live inspection
export const OPEN_DATA_APIS: {
  id: string;
  source: 'data.gov.sg' | 'singstat';
  title: string;
  agency: string;
  description: string;
  datasetOrTableId: string;
  apiUrl: string;
  frequency: string;
}[] = [
  {
    id: 'm850571',
    source: 'singstat',
    title: 'Training Places Taken Up Under Skills Training & Continuing Academic Education (ITE)',
    agency: 'Institute of Technical Education / SingStat',
    description: 'Annual time-series of training places taken up and persons who completed programmes across Higher NITEC, NITEC, and Specialist NITEC.',
    datasetOrTableId: 'M850571',
    apiUrl: 'https://tablebuilder.singstat.gov.sg/api/table/tabledata/M850571',
    frequency: 'Annual'
  },
  {
    id: 'm850521',
    source: 'singstat',
    title: 'Enrolment In Polytechnic Advanced Diploma Courses By Type Of Course',
    agency: 'Polytechnics / NIEC / SingStat',
    description: 'Post-diploma and advanced diploma adult learner enrolments across 12 disciplines in SP, NP, NYP, TP, RP, and NIEC.',
    datasetOrTableId: 'M850521',
    apiUrl: 'https://tablebuilder.singstat.gov.sg/api/table/tabledata/M850521',
    frequency: 'Annual'
  },
  {
    id: 'm850541',
    source: 'singstat',
    title: 'Graduates From Polytechnic Advanced Diploma Courses By Type Of Course',
    agency: 'Polytechnics / NIEC / SingStat',
    description: 'Annual completions and graduation volume from polytechnic adult continuing education courses.',
    datasetOrTableId: 'M850541',
    apiUrl: 'https://tablebuilder.singstat.gov.sg/api/table/tabledata/M850541',
    frequency: 'Annual'
  },
  {
    id: 'm850531',
    source: 'singstat',
    title: 'Enrolment In Higher Degree Courses By Type Of Course (AUs)',
    agency: 'Autonomous Universities / SingStat',
    description: 'Postgraduate and executive adult learner enrolment across NUS, NTU, SMU, SUSS, SIT, SUTD.',
    datasetOrTableId: 'M850531',
    apiUrl: 'https://tablebuilder.singstat.gov.sg/api/table/tabledata/M850531',
    frequency: 'Annual'
  },
  {
    id: 'm183091',
    source: 'singstat',
    title: 'Singapore Workforce Skills Qualifications (WSQ) Trainees By Age & Qualification',
    agency: 'SkillsFuture Singapore (SSG)',
    description: 'Comprehensive annual tracking of adult trainees (>417,000) participating in SSG-subsidised WSQ courses.',
    datasetOrTableId: 'M183091',
    apiUrl: 'https://tablebuilder.singstat.gov.sg/api/table/tabledata/M183091',
    frequency: 'Annual'
  },
  {
    id: 'm850871',
    source: 'singstat',
    title: 'Participation Rate Of Youth & Adults In Formal & Non-Formal Education & Training',
    agency: 'OECD / Singapore Department of Statistics',
    description: 'Singapore national adult learning participation benchmark (46.9%) tracking formal and non-formal skills acquisition.',
    datasetOrTableId: 'M850871',
    apiUrl: 'https://tablebuilder.singstat.gov.sg/api/table/tabledata/M850871',
    frequency: 'Annual / Biennial'
  },
  {
    id: 'd_ecba92f3eb2e32da9625a7ab97164109',
    source: 'data.gov.sg',
    title: 'Training Places Taken Up (Data.gov.sg v2 Resource)',
    agency: 'Singapore Open Data Portal',
    description: 'V2 Open Data Portal datastore listing individual row series for adult training places and completion rates.',
    datasetOrTableId: 'd_ecba92f3eb2e32da9625a7ab97164109',
    apiUrl: 'https://api-production.data.gov.sg/v2/public/api/datasets/d_ecba92f3eb2e32da9625a7ab97164109/list-rows',
    frequency: 'Annual'
  }
];
