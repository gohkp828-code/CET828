import React from 'react';
import { Users, GraduationCap, Clock, Award, TrendingUp, Sparkles } from 'lucide-react';
import { NATIONAL_CET_METRICS } from '../data/singstatSnapshot';

interface MetricCardsProps {
  selectedYear: number;
  onSelectYear: (year: number) => void;
}

export const MetricCards: React.FC<MetricCardsProps> = ({ selectedYear, onSelectYear }) => {
  const current = NATIONAL_CET_METRICS.find((m) => m.year === selectedYear) || NATIONAL_CET_METRICS[NATIONAL_CET_METRICS.length - 1];
  const previous = NATIONAL_CET_METRICS.find((m) => m.year === selectedYear - 1);

  const calculateYoY = (curr: number, prev: number | undefined) => {
    if (!prev || prev === 0) return null;
    const diff = ((curr - prev) / prev) * 100;
    return diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`;
  };

  const years = NATIONAL_CET_METRICS.map((m) => m.year);

  return (
    <div className="space-y-4">
      {/* Year Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">Reporting Year:</span>
          <span className="text-slate-400">|</span>
          <span>SingStat TableBuilder & SSG Open Data Series</span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => onSelectYear(y)}
              className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors cursor-pointer ${
                selectedYear === y
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total IHL CET Enrolment */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>IHL CET Enrolment</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums tracking-tight">
            {current.totalCetEnrolment.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
            {previous && (
              <span className="font-mono text-emerald-600 font-medium">
                {calculateYoY(current.totalCetEnrolment, previous.totalCetEnrolment)} YoY
              </span>
            )}
            <span aria-hidden="true">·</span>
            <span>AUs, Poly & ITE</span>
          </div>
        </div>

        {/* Card 2: National WSQ Trainees */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Annual WSQ Trainees</span>
            <Award className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums tracking-tight">
            {current.wsqTraineesTotal.toLocaleString()}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
            {previous && (
              <span className="font-mono text-emerald-600 font-medium">
                {calculateYoY(current.wsqTraineesTotal, previous.wsqTraineesTotal)} YoY
              </span>
            )}
            <span aria-hidden="true">·</span>
            <span>SingStat M183091</span>
          </div>
        </div>

        {/* Card 3: Adult Training Days */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Annual Trainee-Days</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums tracking-tight">
            {current.totalTraineeDaysMillion}M
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
            <span>Person-days of training</span>
            <span aria-hidden="true">·</span>
            <span>Industry skills index</span>
          </div>
        </div>

        {/* Card 4: National Participation Rate */}
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>Adult Learning Rate</span>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums tracking-tight">
            {current.adultParticipationRatePct}%
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
            <span>OECD / SingStat M850871</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-700 font-medium">Benchmark: 40.5%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
