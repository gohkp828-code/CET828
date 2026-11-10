import React, { useState } from 'react';
import { IHL_INSTITUTIONS, POLYTECHNIC_DISCIPLINES, UNIVERSITY_DISCIPLINES, NATIONAL_CET_METRICS } from '../data/singstatSnapshot';
import { IHLType } from '../types/cet';
import { BarChart3, PieChart, Layers, ArrowUpRight, TrendingUp } from 'lucide-react';

interface IHLBreakdownViewProps {
  selectedYear: number;
  onSelectIHL: (ihlId: string) => void;
}

export const IHLBreakdownView: React.FC<IHLBreakdownViewProps> = ({ selectedYear, onSelectIHL }) => {
  const [selectedMetric, setSelectedMetric] = useState<'enrolment' | 'graduates' | 'traineeDays' | 'modularParticipants'>('enrolment');
  const [activeSector, setActiveSector] = useState<'All' | IHLType>('All');
  const [disciplineView, setDisciplineView] = useState<'polytechnic' | 'university'>('polytechnic');

  // Group institutions by type
  const institutionsByType = IHL_INSTITUTIONS.reduce((acc, inst) => {
    if (!acc[inst.type]) acc[inst.type] = [];
    acc[inst.type].push(inst);
    return acc;
  }, {} as Record<IHLType, typeof IHL_INSTITUTIONS>);

  // Compute sector totals for the selected year
  const sectorSummaries = (['Autonomous University', 'Polytechnic', 'Institute of Technical Education', 'Specialised Institution'] as IHLType[]).map((type) => {
    const insts = institutionsByType[type] || [];
    const totalEnrolment = insts.reduce((sum, inst) => sum + (inst.metricsByYear[selectedYear]?.enrolment || 0), 0);
    const totalGraduates = insts.reduce((sum, inst) => sum + (inst.metricsByYear[selectedYear]?.graduates || 0), 0);
    const totalTraineeDays = insts.reduce((sum, inst) => sum + (inst.metricsByYear[selectedYear]?.traineeDays || 0), 0);
    const totalModular = insts.reduce((sum, inst) => sum + (inst.metricsByYear[selectedYear]?.modularParticipants || 0), 0);

    return {
      type,
      institutionCount: insts.length,
      enrolment: totalEnrolment,
      graduates: totalGraduates,
      traineeDays: totalTraineeDays,
      modularParticipants: totalModular,
      completionRate: totalEnrolment > 0 ? ((totalGraduates / totalEnrolment) * 100).toFixed(1) : '0',
    };
  });

  const totalAllEnrolment = sectorSummaries.reduce((sum, s) => sum + s.enrolment, 0);

  // Filtered institutions
  const filteredInstitutions = IHL_INSTITUTIONS.filter((inst) => {
    if (activeSector === 'All') return true;
    return inst.type === activeSector;
  });

  // Historical yearly data for charts
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const yearlySectorTrends = years.map((y) => {
    const au = IHL_INSTITUTIONS.filter((i) => i.type === 'Autonomous University').reduce((s, i) => s + (i.metricsByYear[y]?.[selectedMetric] || 0), 0);
    const poly = IHL_INSTITUTIONS.filter((i) => i.type === 'Polytechnic').reduce((s, i) => s + (i.metricsByYear[y]?.[selectedMetric] || 0), 0);
    const ite = IHL_INSTITUTIONS.filter((i) => i.type === 'Institute of Technical Education').reduce((s, i) => s + (i.metricsByYear[y]?.[selectedMetric] || 0), 0);
    const spec = IHL_INSTITUTIONS.filter((i) => i.type === 'Specialised Institution').reduce((s, i) => s + (i.metricsByYear[y]?.[selectedMetric] || 0), 0);
    return {
      year: y,
      au,
      poly,
      ite,
      spec,
      total: au + poly + ite + spec,
    };
  });

  const maxTrendTotal = Math.max(...yearlySectorTrends.map((t) => t.total), 1);

  // Discipline series for selected view
  const activeDisciplines = disciplineView === 'polytechnic' ? POLYTECHNIC_DISCIPLINES : UNIVERSITY_DISCIPLINES;
  const sortedDisciplines = [...activeDisciplines].sort((a, b) => {
    const valA = a.dataByYear[selectedYear] || 0;
    const valB = b.dataByYear[selectedYear] || 0;
    return valB - valA;
  });
  const maxDisciplineVal = Math.max(...sortedDisciplines.map((d) => d.dataByYear[selectedYear] || 0), 1);

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-5">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          01. Continuing Education & Training (CET) Breakdown Across IHLs
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-4xl">
          Multi-sector distribution of adult learners, post-diplomas, specialist certificates, and modular continuing academic education across Autonomous Universities (AUs), Polytechnics, ITE, and specialized institutions.
        </p>
      </div>

      {/* Sector Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sectorSummaries.map((sector) => {
          const share = totalAllEnrolment > 0 ? ((sector.enrolment / totalAllEnrolment) * 100).toFixed(1) : '0';
          return (
            <div
              key={sector.type}
              onClick={() => setActiveSector(sector.type === activeSector ? 'All' : sector.type)}
              className={`p-5 rounded-xl border transition-all cursor-pointer ${
                activeSector === sector.type
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className={activeSector === sector.type ? 'text-slate-300' : 'text-slate-500'}>
                  {sector.institutionCount} Institutions
                </span>
                <span className="font-mono text-xs font-semibold">
                  {share}% Share
                </span>
              </div>

              <h3 className="text-sm font-bold line-clamp-1 mb-3">
                {sector.type}
              </h3>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className={activeSector === sector.type ? 'text-slate-400' : 'text-slate-500'}>Enrolment:</span>
                  <span className="font-mono tabular-nums font-semibold">{sector.enrolment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className={activeSector === sector.type ? 'text-slate-400' : 'text-slate-500'}>Graduates:</span>
                  <span className="font-mono tabular-nums">{sector.graduates.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className={activeSector === sector.type ? 'text-slate-400' : 'text-slate-500'}>Trainee Days:</span>
                  <span className="font-mono tabular-nums">{(sector.traineeDays / 1000).toFixed(0)}k</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <span className={activeSector === sector.type ? 'text-slate-400' : 'text-slate-500'}>Completion Rate:</span>
                <span className="font-mono font-medium text-emerald-600">{sector.completionRate}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Annual Trend & Sector Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Stacked Trend Visualizer */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Annual CET Trajectory by Sector (2020 - 2025)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Stacked breakdown across Autonomous Universities, Polytechnics, ITE, and Specialist institutes
              </p>
            </div>

            {/* Metric Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs">
              <button
                onClick={() => setSelectedMetric('enrolment')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  selectedMetric === 'enrolment' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Enrolment
              </button>
              <button
                onClick={() => setSelectedMetric('graduates')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  selectedMetric === 'graduates' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Graduates
              </button>
              <button
                onClick={() => setSelectedMetric('traineeDays')}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  selectedMetric === 'traineeDays' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Trainee-Days
              </button>
            </div>
          </div>

          {/* SVG Stacked Bar Chart */}
          <div className="space-y-4">
            <div className="grid grid-cols-6 gap-2 text-center text-xs text-slate-500 font-mono">
              {yearlySectorTrends.map((t) => (
                <div key={t.year} className={t.year === selectedYear ? 'font-bold text-slate-900' : ''}>
                  {t.year}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-6 gap-3 h-52 items-end pt-4 border-b border-slate-200">
              {yearlySectorTrends.map((t) => {
                const auPct = (t.au / maxTrendTotal) * 100;
                const polyPct = (t.poly / maxTrendTotal) * 100;
                const itePct = (t.ite / maxTrendTotal) * 100;
                const specPct = (t.spec / maxTrendTotal) * 100;
                const isSelected = t.year === selectedYear;

                return (
                  <div key={t.year} className="h-full flex flex-col justify-end items-center group relative">
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 z-20 bg-slate-900 text-white text-[11px] p-2 rounded-md shadow-lg pointer-events-none whitespace-nowrap font-mono">
                      {t.year}: {t.total.toLocaleString()} total
                    </div>

                    <div className={`w-full max-w-[42px] flex flex-col rounded-t overflow-hidden transition-all ${
                      isSelected ? 'ring-2 ring-red-500 ring-offset-2' : 'opacity-90 hover:opacity-100'
                    }`}>
                      <div style={{ height: `${specPct}%` }} className="bg-amber-400" title={`Specialised: ${t.spec.toLocaleString()}`} />
                      <div style={{ height: `${itePct}%` }} className="bg-emerald-500" title={`ITE: ${t.ite.toLocaleString()}`} />
                      <div style={{ height: `${polyPct}%` }} className="bg-blue-500" title={`Polytechnics: ${t.poly.toLocaleString()}`} />
                      <div style={{ height: `${auPct}%` }} className="bg-slate-800" title={`Universities: ${t.au.toLocaleString()}`} />
                    </div>

                    <div className="text-[10px] font-mono text-slate-500 mt-2 tabular-nums">
                      {t.total >= 1000 ? `${(t.total / 1000).toFixed(0)}k` : t.total}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-slate-800" />
                <span>Autonomous Universities (AUs)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-blue-500" />
                <span>Polytechnics</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-emerald-500" />
                <span>ITE Services</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-amber-400" />
                <span>NIEC / Specialist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Official SingStat Discipline Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">
                Discipline Distribution
              </h3>
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded text-[11px]">
                <button
                  onClick={() => setDisciplineView('polytechnic')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    disciplineView === 'polytechnic' ? 'bg-white font-medium text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Poly CET (M850521)
                </button>
                <button
                  onClick={() => setDisciplineView('university')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    disciplineView === 'university' ? 'bg-white font-medium text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  AU Degrees (M850531)
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              {disciplineView === 'polytechnic'
                ? 'SingStat Table M850521: Polytechnic Advanced & Post-Diploma Enrolment'
                : 'SingStat Table M850531: Autonomous Universities Higher Degree Enrolment'}
            </p>

            <div className="space-y-3">
              {sortedDisciplines.slice(0, 6).map((item) => {
                const count = item.dataByYear[selectedYear] || 0;
                const pct = ((count / maxDisciplineVal) * 100).toFixed(0);
                return (
                  <div key={item.discipline} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700 font-medium truncate max-w-[200px]" title={item.discipline}>
                        {item.discipline}
                      </span>
                      <span className="font-mono tabular-nums text-slate-900 font-semibold">
                        {count.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${pct}%` }}
                        className={`h-full rounded-full ${
                          disciplineView === 'polytechnic' ? 'bg-blue-600' : 'bg-slate-800'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>Source: Singapore Department of Statistics</span>
            <span className="font-mono text-slate-700 font-medium">Year {selectedYear}</span>
          </div>
        </div>
      </div>

      {/* Individual IHL Ranking & Quick Access Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Institutional Rankings & CET Volume ({selectedYear})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any IHL row to launch the dedicated Institutional Deep Dive
            </p>
          </div>

          {/* Sector filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs overflow-x-auto">
            {(['All', 'Autonomous University', 'Polytechnic', 'Institute of Technical Education', 'Specialised Institution'] as const).map((sector) => (
              <button
                key={sector}
                onClick={() => setActiveSector(sector)}
                className={`px-3 py-1 rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeSector === sector ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sector === 'Autonomous University' ? 'Universities' : sector === 'Institute of Technical Education' ? 'ITE' : sector === 'Specialised Institution' ? 'Specialised' : sector}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
              <tr>
                <th className="py-3 px-4">Institution</th>
                <th className="py-3 px-4">CET Arm</th>
                <th className="py-3 px-4 text-right">Enrolment</th>
                <th className="py-3 px-4 text-right">Intake</th>
                <th className="py-3 px-4 text-right">Graduates</th>
                <th className="py-3 px-4 text-right">Trainee Days</th>
                <th className="py-3 px-4 text-right">SkillsFuture Series</th>
                <th className="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInstitutions.map((inst) => {
                const metric = inst.metricsByYear[selectedYear] || inst.metricsByYear[2024];
                return (
                  <tr
                    key={inst.id}
                    onClick={() => onSelectIHL(inst.id)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors">
                        {inst.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {inst.type}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {inst.cetArm}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-slate-900">
                      {metric.enrolment.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-700">
                      {metric.intake.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-700">
                      {metric.graduates.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-700">
                      {(metric.traineeDays / 1000).toFixed(0)}k
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-emerald-700 font-medium">
                      {metric.skillsFutureSeriesParticipants.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-600 group-hover:underline">
                        <span>Deep Dive</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
