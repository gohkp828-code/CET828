import React, { useState, useMemo } from 'react';
import { IHL_INSTITUTIONS } from '../data/singstatSnapshot';
import { IHLType, CrushedDataRow } from '../types/cet';
import { Download, SlidersHorizontal, ArrowUpDown, Search, Copy, Check, Filter, Layers, BarChart2 } from 'lucide-react';

export const DataCrusherView: React.FC = () => {
  // Multi-variate filter state
  const [selectedYears, setSelectedYears] = useState<number[]>([2023, 2024, 2025]);
  const [selectedSectors, setSelectedSectors] = useState<IHLType[]>([
    'Autonomous University',
    'Polytechnic',
    'Institute of Technical Education',
    'Specialised Institution',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof CrushedDataRow>('enrolment');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [copied, setCopied] = useState(false);

  // Cohort comparator selection
  const [comparatorA, setComparatorA] = useState<string>('nus');
  const [comparatorB, setComparatorB] = useState<string>('ntu');

  const availableYears = [2020, 2021, 2022, 2023, 2024, 2025];
  const allSectors: IHLType[] = [
    'Autonomous University',
    'Polytechnic',
    'Institute of Technical Education',
    'Specialised Institution',
  ];

  // Flatten and crush data rows
  const crushedRows = useMemo(() => {
    const rows: CrushedDataRow[] = [];

    IHL_INSTITUTIONS.forEach((inst) => {
      if (!selectedSectors.includes(inst.type)) return;

      availableYears.forEach((year, yIdx) => {
        if (!selectedYears.includes(year)) return;

        const current = inst.metricsByYear[year];
        if (!current) return;

        // Calculate YoY
        const prevYear = year - 1;
        const prev = inst.metricsByYear[prevYear];
        const yoyGrowthPct =
          prev && prev.enrolment > 0
            ? Number((((current.enrolment - prev.enrolment) / prev.enrolment) * 100).toFixed(1))
            : null;

        const completionRatePct =
          current.enrolment > 0
            ? Number(((current.graduates / current.enrolment) * 100).toFixed(1))
            : 0;

        const averageTraineeDays =
          current.enrolment > 0
            ? Number((current.traineeDays / current.enrolment).toFixed(1))
            : 0;

        rows.push({
          id: `${inst.id}_${year}`,
          year,
          institution: inst.name,
          institutionType: inst.type,
          enrolment: current.enrolment,
          graduates: current.graduates,
          intake: current.intake,
          modularParticipants: current.modularParticipants,
          traineeDays: current.traineeDays,
          yoyGrowthPct,
          completionRatePct,
          averageTraineeDays,
        });
      });
    });

    // Apply text search
    let filtered = rows;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.institution.toLowerCase().includes(q) ||
          r.institutionType.toLowerCase().includes(q) ||
          String(r.year).includes(q)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (valA === null) return 1;
      if (valB === null) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return sortOrder === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    return filtered;
  }, [selectedYears, selectedSectors, searchQuery, sortField, sortOrder]);

  // Aggregate KPI stats from currently crushed view
  const aggregates = useMemo(() => {
    const totalEnrolment = crushedRows.reduce((s, r) => s + r.enrolment, 0);
    const totalGraduates = crushedRows.reduce((s, r) => s + r.graduates, 0);
    const totalTraineeDays = crushedRows.reduce((s, r) => s + r.traineeDays, 0);
    const totalModular = crushedRows.reduce((s, r) => s + r.modularParticipants, 0);
    const avgCompletion = totalEnrolment > 0 ? ((totalGraduates / totalEnrolment) * 100).toFixed(1) : '0';
    const avgDaysPerLearner = totalEnrolment > 0 ? (totalTraineeDays / totalEnrolment).toFixed(1) : '0';

    return {
      rowCount: crushedRows.length,
      totalEnrolment,
      totalGraduates,
      totalTraineeDays,
      totalModular,
      avgCompletion,
      avgDaysPerLearner,
    };
  }, [crushedRows]);

  // CSV Export Generator
  const handleExportCSV = () => {
    if (!crushedRows.length) return;

    const headers = [
      'Year',
      'Institution',
      'Sector',
      'Enrolment',
      'Intake',
      'Graduates',
      'Modular Participants',
      'Trainee-Days',
      'YoY Growth (%)',
      'Completion Rate (%)',
      'Avg Trainee Days per Learner',
    ];

    const rows = crushedRows.map((r) => [
      r.year,
      `"${r.institution.replace(/"/g, '""')}"`,
      `"${r.institutionType}"`,
      r.enrolment,
      r.intake,
      r.graduates,
      r.modularParticipants,
      r.traineeDays,
      r.yoyGrowthPct !== null ? r.yoyGrowthPct : '',
      r.completionRatePct,
      r.averageTraineeDays,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `singapore_ihl_cet_crushed_data_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySummary = () => {
    const text = `Singapore IHL CET Crushed Summary:
Total Rows: ${aggregates.rowCount}
Total Enrolments: ${aggregates.totalEnrolment.toLocaleString()}
Total Graduates: ${aggregates.totalGraduates.toLocaleString()}
Total Trainee Days: ${aggregates.totalTraineeDays.toLocaleString()}
Average Completion Rate: ${aggregates.avgCompletion}%
Average Trainee Days per Learner: ${aggregates.avgDaysPerLearner} days`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSort = (field: keyof CrushedDataRow) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const toggleYear = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? (prev.length > 1 ? prev.filter((y) => y !== year) : prev) : [...prev, year].sort()
    );
  };

  const toggleSector = (sector: IHLType) => {
    setSelectedSectors((prev) =>
      prev.includes(sector) ? (prev.length > 1 ? prev.filter((s) => s !== sector) : prev) : [...prev, sector]
    );
  };

  // Comparator Calculation
  const instA = IHL_INSTITUTIONS.find((i) => i.id === comparatorA) || IHL_INSTITUTIONS[0];
  const instB = IHL_INSTITUTIONS.find((i) => i.id === comparatorB) || IHL_INSTITUTIONS[1];
  const latestYear = 2025;
  const metricsA = instA.metricsByYear[latestYear];
  const metricsB = instB.metricsByYear[latestYear];

  const compareMetric = (valA: number, valB: number) => {
    const diff = valA - valB;
    const pct = valB > 0 ? ((diff / valB) * 100).toFixed(1) : '0';
    return {
      diff,
      pct,
    };
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-slate-200 pb-5">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          03. Granular Data Crusher & Multivariate Slicing Studio
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-4xl">
          Slice, pivot, and crush official Singapore IHL CET time-series data by year, institutional tier, completion intensity, and trainee-days. Includes side-by-side cohort comparison and instant CSV export.
        </p>
      </div>

      {/* Control Panel: Multi-variate Filters */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
            <SlidersHorizontal className="w-4 h-4 text-slate-500" />
            <span>Multivariate Crusher Controls</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied' : 'Copy Aggregates'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Crushed CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Year Multi-Select */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-700">Filter Years (Multi-select):</span>
            <div className="flex flex-wrap gap-1.5">
              {availableYears.map((y) => (
                <button
                  key={y}
                  onClick={() => toggleYear(y)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                    selectedYears.includes(y)
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Sector Multi-Select */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-700">Filter Sector:</span>
            <div className="flex flex-wrap gap-1.5">
              {allSectors.map((sector) => {
                const label = sector === 'Autonomous University' ? 'Universities' : sector === 'Institute of Technical Education' ? 'ITE' : sector === 'Specialised Institution' ? 'Specialised' : sector;
                return (
                  <button
                    key={sector}
                    onClick={() => toggleSector(sector)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      selectedSectors.includes(sector)
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Box */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-700">Instant Search & Filter:</span>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search institution, sector, or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Crushed Aggregates Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[11px] text-slate-500">Filtered Records</div>
          <div className="text-lg font-bold font-mono text-slate-900 mt-1 tabular-nums">{aggregates.rowCount}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[11px] text-slate-500">Crushed Enrolment</div>
          <div className="text-lg font-bold font-mono text-slate-900 mt-1 tabular-nums">{aggregates.totalEnrolment.toLocaleString()}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[11px] text-slate-500">Crushed Graduates</div>
          <div className="text-lg font-bold font-mono text-slate-900 mt-1 tabular-nums">{aggregates.totalGraduates.toLocaleString()}</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[11px] text-slate-500">Total Trainee-Days</div>
          <div className="text-lg font-bold font-mono text-slate-900 mt-1 tabular-nums">{(aggregates.totalTraineeDays / 1000).toFixed(0)}k</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[11px] text-slate-500">Avg Completion Rate</div>
          <div className="text-lg font-bold font-mono text-emerald-600 mt-1 tabular-nums">{aggregates.avgCompletion}%</div>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200">
          <div className="text-[11px] text-slate-500">Days per Learner</div>
          <div className="text-lg font-bold font-mono text-slate-900 mt-1 tabular-nums">{aggregates.avgDaysPerLearner}d</div>
        </div>
      </div>

      {/* High-Density Crushed Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="text-xs font-semibold text-slate-900">
            Crushed Records Table ({crushedRows.length} rows matched)
          </div>
          <span className="text-[11px] text-slate-500">
            Click column headers to sort ascending / descending
          </span>
        </div>

        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium sticky top-0 z-10">
              <tr>
                <th
                  onClick={() => toggleSort('year')}
                  className="py-3 px-3 cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center gap-1">
                    <span>Year</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('institution')}
                  className="py-3 px-3 cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center gap-1">
                    <span>Institution</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('institutionType')}
                  className="py-3 px-3 cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center gap-1">
                    <span>Sector</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('enrolment')}
                  className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Enrolment</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('intake')}
                  className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Intake</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('graduates')}
                  className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Graduates</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('traineeDays')}
                  className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Trainee Days</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('yoyGrowthPct')}
                  className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>YoY %</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('completionRatePct')}
                  className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Completion %</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('averageTraineeDays')}
                  className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Days / Head</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
              {crushedRows.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-sans font-bold text-slate-900">{r.year}</td>
                  <td className="py-2.5 px-3 font-sans font-medium text-slate-900 truncate max-w-[220px]" title={r.institution}>
                    {r.institution}
                  </td>
                  <td className="py-2.5 px-3 font-sans text-slate-500 text-[11px] truncate max-w-[140px]">
                    {r.institutionType}
                  </td>
                  <td className="py-2.5 px-3 text-right font-semibold text-slate-900">{r.enrolment.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">{r.intake.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">{r.graduates.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">{(r.traineeDays / 1000).toFixed(0)}k</td>
                  <td className="py-2.5 px-3 text-right">
                    {r.yoyGrowthPct !== null ? (
                      <span className={r.yoyGrowthPct >= 0 ? 'text-emerald-600' : 'text-red-500'}>
                        {r.yoyGrowthPct >= 0 ? `+${r.yoyGrowthPct}%` : `${r.yoyGrowthPct}%`}
                      </span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-700">{r.completionRatePct}%</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">{r.averageTraineeDays}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cohort Comparator Tool */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Institutional Cohort Comparator (Side-by-Side Analysis)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select two IHLs to benchmark metrics, graduate throughput, and delta percentages for {latestYear}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">IHL A:</span>
              <select
                value={comparatorA}
                onChange={(e) => setComparatorA(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-900 font-medium cursor-pointer"
              >
                {IHL_INSTITUTIONS.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.shortName} ({inst.code})
                  </option>
                ))}
              </select>
            </div>

            <span className="text-slate-400">vs</span>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-medium">IHL B:</span>
              <select
                value={comparatorB}
                onChange={(e) => setComparatorB(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-900 font-medium cursor-pointer"
              >
                {IHL_INSTITUTIONS.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.shortName} ({inst.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Comparison Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          {/* Enrolment Comparator */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs text-slate-500">CET Enrolment ({latestYear})</div>
            <div className="flex items-baseline justify-between font-mono">
              <span className="font-bold text-slate-900">{metricsA.enrolment.toLocaleString()}</span>
              <span className="text-xs text-slate-400">vs</span>
              <span className="font-bold text-slate-700">{metricsB.enrolment.toLocaleString()}</span>
            </div>
            <div className="text-[11px] text-slate-500 flex justify-between pt-1 border-t border-slate-200">
              <span>Delta:</span>
              <span className="font-mono font-medium text-slate-800">
                {compareMetric(metricsA.enrolment, metricsB.enrolment).diff > 0 ? '+' : ''}
                {compareMetric(metricsA.enrolment, metricsB.enrolment).diff.toLocaleString()} (
                {compareMetric(metricsA.enrolment, metricsB.enrolment).pct}%)
              </span>
            </div>
          </div>

          {/* Graduates Comparator */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs text-slate-500">Graduates ({latestYear})</div>
            <div className="flex items-baseline justify-between font-mono">
              <span className="font-bold text-slate-900">{metricsA.graduates.toLocaleString()}</span>
              <span className="text-xs text-slate-400">vs</span>
              <span className="font-bold text-slate-700">{metricsB.graduates.toLocaleString()}</span>
            </div>
            <div className="text-[11px] text-slate-500 flex justify-between pt-1 border-t border-slate-200">
              <span>Delta:</span>
              <span className="font-mono font-medium text-slate-800">
                {compareMetric(metricsA.graduates, metricsB.graduates).diff > 0 ? '+' : ''}
                {compareMetric(metricsA.graduates, metricsB.graduates).diff.toLocaleString()} (
                {compareMetric(metricsA.graduates, metricsB.graduates).pct}%)
              </span>
            </div>
          </div>

          {/* Trainee Days Comparator */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs text-slate-500">Trainee-Days ({latestYear})</div>
            <div className="flex items-baseline justify-between font-mono">
              <span className="font-bold text-slate-900">{(metricsA.traineeDays / 1000).toFixed(0)}k</span>
              <span className="text-xs text-slate-400">vs</span>
              <span className="font-bold text-slate-700">{(metricsB.traineeDays / 1000).toFixed(0)}k</span>
            </div>
            <div className="text-[11px] text-slate-500 flex justify-between pt-1 border-t border-slate-200">
              <span>Delta:</span>
              <span className="font-mono font-medium text-slate-800">
                {compareMetric(metricsA.traineeDays, metricsB.traineeDays).diff > 0 ? '+' : ''}
                {((compareMetric(metricsA.traineeDays, metricsB.traineeDays).diff) / 1000).toFixed(0)}k
              </span>
            </div>
          </div>

          {/* SkillsFuture Series Comparator */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="text-xs text-slate-500">SkillsFuture Series Learners</div>
            <div className="flex items-baseline justify-between font-mono">
              <span className="font-bold text-emerald-700">{metricsA.skillsFutureSeriesParticipants.toLocaleString()}</span>
              <span className="text-xs text-slate-400">vs</span>
              <span className="font-bold text-slate-700">{metricsB.skillsFutureSeriesParticipants.toLocaleString()}</span>
            </div>
            <div className="text-[11px] text-slate-500 flex justify-between pt-1 border-t border-slate-200">
              <span>Delta:</span>
              <span className="font-mono font-medium text-emerald-700">
                {compareMetric(metricsA.skillsFutureSeriesParticipants, metricsB.skillsFutureSeriesParticipants).diff > 0 ? '+' : ''}
                {compareMetric(metricsA.skillsFutureSeriesParticipants, metricsB.skillsFutureSeriesParticipants).diff.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
