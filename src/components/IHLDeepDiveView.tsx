import React, { useState } from 'react';
import { IHL_INSTITUTIONS } from '../data/singstatSnapshot';
import { ExternalLink, Award, CheckCircle2, Calculator, ArrowRight, Building2, TrendingUp, Users, Calendar } from 'lucide-react';

interface IHLDeepDiveViewProps {
  selectedIHLId: string;
  onSelectIHL: (id: string) => void;
  onSimulateCourse: (courseTitle: string, fullFee: number, subsidisedFee: number, midCareerFee: number) => void;
}

export const IHLDeepDiveView: React.FC<IHLDeepDiveViewProps> = ({
  selectedIHLId,
  onSelectIHL,
  onSimulateCourse,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const selectedIHL = IHL_INSTITUTIONS.find((i) => i.id === selectedIHLId) || IHL_INSTITUTIONS[0];

  const filteredInstitutions = IHL_INSTITUTIONS.filter((inst) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'AUs') return inst.type === 'Autonomous University';
    if (activeCategory === 'Poly') return inst.type === 'Polytechnic';
    if (activeCategory === 'ITE') return inst.type === 'Institute of Technical Education';
    if (activeCategory === 'Specialist') return inst.type === 'Specialised Institution';
    return true;
  });

  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const history = years.map((y, idx) => {
    const current = selectedIHL.metricsByYear[y];
    const prev = idx > 0 ? selectedIHL.metricsByYear[years[idx - 1]] : null;
    const yoy = prev ? (((current.enrolment - prev.enrolment) / prev.enrolment) * 100).toFixed(1) : '-';
    const completionRate = current.enrolment > 0 ? ((current.graduates / current.enrolment) * 100).toFixed(1) : '-';
    return {
      year: y,
      ...current,
      yoy,
      completionRate,
    };
  });

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-5">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          02. Deep Dive Data in Specific Institute of Higher Learning (IHL)
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-4xl">
          Granular institutional profiles, longitudinal CET metrics (enrolment, completions, trainee-days), flagship micro-credentials, and SkillsFuture subsidy structures.
        </p>
      </div>

      {/* Institution Selector Horizontal Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-slate-700">Select Institution:</span>
          <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-md">
            {[
              { id: 'All', label: 'All (13)' },
              { id: 'AUs', label: 'Autonomous Universities (6)' },
              { id: 'Poly', label: 'Polytechnics (5)' },
              { id: 'ITE', label: 'ITE (1)' },
              { id: 'Specialist', label: 'Specialist (1)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
                  activeCategory === cat.id ? 'bg-white font-semibold text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {filteredInstitutions.map((inst) => {
            const isSelected = inst.id === selectedIHL.id;
            return (
              <button
                key={inst.id}
                onClick={() => onSelectIHL(inst.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span className="font-mono font-bold text-[11px] opacity-80">{inst.code}</span>
                <span>{inst.shortName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Institution Main Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-700">{selectedIHL.type}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedIHL.code}</span>
              <span aria-hidden="true">·</span>
              <span>Singapore Higher Education</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              {selectedIHL.name}
            </h3>

            <div className="text-sm font-semibold text-red-600">
              {selectedIHL.cetArm}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed pt-1">
              {selectedIHL.description}
            </p>

            {/* Strategic Focus Areas */}
            <div className="pt-3">
              <div className="text-xs font-semibold text-slate-700 mb-2">Strategic CET Priority Clusters:</div>
              <div className="flex flex-wrap gap-2">
                {selectedIHL.keyFocusAreas.map((area) => (
                  <span
                    key={area}
                    className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            <a
              href={selectedIHL.cetWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <span>Visit Official CET Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>

            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-800 space-y-1">
              <div className="font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SkillsFuture Supported</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                Eligible for SSG Baseline Subsidies (up to 70%) & Mid-Career Enhanced Subsidy (up to 90%).
              </p>
            </div>
          </div>
        </div>

        {/* Longitudinal Performance Metrics Table (2020 - 2025) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-slate-900">
              Longitudinal Metrics Tracker: {selectedIHL.shortName} (2020 - 2025)
            </h4>
            <span className="text-xs text-slate-500">
              Data source: Singapore Open Data Portal & IHL Annual Reports
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
                <tr>
                  <th className="py-2.5 px-3">Year</th>
                  <th className="py-2.5 px-3 text-right">Enrolment</th>
                  <th className="py-2.5 px-3 text-right">Intake</th>
                  <th className="py-2.5 px-3 text-right">Graduates</th>
                  <th className="py-2.5 px-3 text-right">Modular Trainees</th>
                  <th className="py-2.5 px-3 text-right">Trainee-Days</th>
                  <th className="py-2.5 px-3 text-right">SkillsFuture Series</th>
                  <th className="py-2.5 px-3 text-right">YoY Growth</th>
                  <th className="py-2.5 px-3 text-right">Completion Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
                {history.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-sans font-bold text-slate-900">{row.year}</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-slate-900">{row.enrolment.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-slate-700">{row.intake.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-slate-700">{row.graduates.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-slate-700">{row.modularParticipants.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right text-slate-700">{(row.traineeDays / 1000).toFixed(0)}k</td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 font-medium">{row.skillsFutureSeriesParticipants.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right">
                      {row.yoy !== '-' ? (
                        <span className={Number(row.yoy) >= 0 ? 'text-emerald-600' : 'text-red-500'}>
                          {Number(row.yoy) >= 0 ? `+${row.yoy}%` : `${row.yoy}%`}
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-700">{row.completionRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Discipline Composition */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-3">
            Discipline Breakdown & Enrolment Share
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {selectedIHL.disciplineDistribution.map((d) => (
              <div key={d.discipline} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="text-slate-700 font-medium truncate" title={d.discipline}>
                    {d.discipline}
                  </span>
                  <span className="font-mono font-bold text-slate-900">{d.percentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                  <div style={{ width: `${d.percentage}%` }} className="h-full bg-slate-800 rounded-full" />
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  ~{d.enrolmentEstimate.toLocaleString()} active learners
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flagship CET Programmes & Course Fee Subsidy Calculator */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Flagship Subsidised CET Programmes & Qualifications
              </h4>
              <p className="text-xs text-slate-500">
                Official pricing after SSG Baseline & Mid-Career Enhanced Subsidies (MCES) for Singaporeans
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedIHL.flagshipPrograms.map((prog, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium text-slate-700">{prog.level}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                      Tier: {prog.skillsFutureSeriesTier}
                    </span>
                  </div>

                  <h5 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                    {prog.title}
                  </h5>

                  <div className="text-xs text-slate-500 mb-4 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Duration: {prog.duration}</span>
                  </div>

                  {/* Fee comparison matrix */}
                  <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Full Course Fee:</span>
                      <span className="font-mono line-through">${prog.courseFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-700 font-medium">
                      <span>SG Citizen (&lt;40 yrs):</span>
                      <span className="font-mono text-slate-900">${prog.subsidisedFeeSingaporean.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-red-700 font-bold pt-1 border-t border-slate-200">
                      <span>Mid-Career (≥40 yrs / MCES):</span>
                      <span className="font-mono text-red-600">${prog.subsidisedFeeMidCareer.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <button
                    onClick={() =>
                      onSimulateCourse(
                        prog.title,
                        prog.courseFee,
                        prog.subsidisedFeeSingaporean,
                        prog.subsidisedFeeMidCareer
                      )
                    }
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Simulate Net Fees with Level-Up Credit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
