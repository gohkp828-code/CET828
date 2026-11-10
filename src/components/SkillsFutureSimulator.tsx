import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { IHL_INSTITUTIONS } from '../data/singstatSnapshot';

interface SkillsFutureSimulatorProps {
  initialCourse?: {
    title: string;
    fullFee: number;
    subsidisedFeeSingaporean: number;
    subsidisedFeeMidCareer: number;
  } | null;
}

export const SkillsFutureSimulator: React.FC<SkillsFutureSimulatorProps> = ({ initialCourse }) => {
  const [learnerAge, setLearnerAge] = useState<number>(42);
  const [citizenship, setCitizenship] = useState<'citizen' | 'pr' | 'foreigner'>('citizen');
  const [selectedIhlId, setSelectedIhlId] = useState<string>('suss');
  const [selectedProgramIdx, setSelectedProgramIdx] = useState<number>(0);
  const [hasExistingSkillsFutureCredit, setHasExistingSkillsFutureCredit] = useState<boolean>(true);
  const [levelUpCreditAmount, setLevelUpCreditAmount] = useState<number>(4000);
  const [openingCreditAmount, setOpeningCreditAmount] = useState<number>(500);
  const [studyMode, setStudyMode] = useState<'part-time' | 'full-time'>('part-time');
  const [unemployedSeekingCareerSwitch, setUnemployedSeekingCareerSwitch] = useState<boolean>(false);

  const selectedIhl = IHL_INSTITUTIONS.find((i) => i.id === selectedIhlId) || IHL_INSTITUTIONS[0];
  const program = selectedIhl.flagshipPrograms[selectedProgramIdx] || selectedIhl.flagshipPrograms[0];

  // Calculation Logic based on official Singapore Ministry of Education & SkillsFuture guidelines:
  // - Singapore Citizens aged >= 40: Eligible for Mid-Career Enhanced Subsidy (MCES, up to 90% subsidy on course fees)
  // - Singapore Citizens aged < 40: Eligible for Baseline SSG Subsidy (up to 70% subsidy)
  // - Permanent Residents (PRs): Eligible for Baseline Subsidy (up to 70%)
  // - Non-Singaporeans / Foreigners: Pay Full Course Fee (0% subsidy)
  // - SkillsFuture Level-Up Programme (announced Budget 2024, launched May 2024):
  //   * $4,000 SkillsFuture Credit (Mid-Career) top-up for all Singaporeans aged 40 and above with no expiry
  //   * Monthly Training Allowance of up to 50% of average income (capped at $3,000/month) for eligible full-time courses (diplomas, post-diplomas, undergrad degrees).

  const isMidCareer = citizenship === 'citizen' && learnerAge >= 40;
  const isCitizenUnder40 = citizenship === 'citizen' && learnerAge < 40;
  const isPR = citizenship === 'pr';

  const fullFee = program.courseFee;
  let feeAfterGovSubsidy = fullFee;
  let subsidyPct = 0;
  let subsidyName = 'No Government Subsidy';

  if (isMidCareer) {
    feeAfterGovSubsidy = program.subsidisedFeeMidCareer;
    subsidyPct = 90;
    subsidyName = 'Mid-Career Enhanced Subsidy (MCES 90%)';
  } else if (isCitizenUnder40 || isPR) {
    feeAfterGovSubsidy = program.subsidisedFeeSingaporean;
    subsidyPct = 70;
    subsidyName = isCitizenUnder40 ? 'Singapore Citizen Baseline Subsidy (70%)' : 'Permanent Resident (PR) Subsidy (70%)';
  }

  // Available SkillsFuture Credits
  const availableCredits = citizenship === 'citizen'
    ? (isMidCareer ? levelUpCreditAmount : 0) + (hasExistingSkillsFutureCredit ? openingCreditAmount : 0)
    : 0;

  // Deduction from credits
  const creditDeduction = Math.min(feeAfterGovSubsidy, availableCredits);
  const outOfPocketPayable = Math.max(0, feeAfterGovSubsidy - creditDeduction);

  // Training allowance estimate if full-time & mid-career
  const trainingAllowanceMonthly = isMidCareer && studyMode === 'full-time' && unemployedSeekingCareerSwitch ? 3000 : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          04. SkillsFuture & Mid-Career Level-Up Subsidy Simulator
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-4xl">
          Interactive calculator for members of the general public. Estimate net payable course fees, government subsidies (up to 90% MCES), SkillsFuture Level-Up credits ($4,000 top-up for citizens aged 40+), and monthly training allowances.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 pb-3 border-b border-slate-100">
            <Calculator className="w-4 h-4 text-slate-500" />
            <span>Learner Profile & Course Configuration</span>
          </div>

          {/* Age and Citizenship */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Learner Age: <span className="font-mono text-red-600 font-bold">{learnerAge} years old</span>
              </label>
              <input
                type="range"
                min="20"
                max="75"
                value={learnerAge}
                onChange={(e) => setLearnerAge(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>20 yrs</span>
                <span className="font-semibold text-red-600">40 yrs (MCES Threshold)</span>
                <span>75 yrs</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Residential Status
              </label>
              <select
                value={citizenship}
                onChange={(e) => setCitizenship(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
              >
                <option value="citizen">Singapore Citizen (SC)</option>
                <option value="pr">Permanent Resident (PR)</option>
                <option value="foreigner">Non-Singaporean / International</option>
              </select>
            </div>
          </div>

          {/* IHL Institution & Course Selector */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Institute of Higher Learning (IHL):
              </label>
              <select
                value={selectedIhlId}
                onChange={(e) => {
                  setSelectedIhlId(e.target.value);
                  setSelectedProgramIdx(0);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 cursor-pointer"
              >
                {IHL_INSTITUTIONS.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name} ({inst.shortName}) — {inst.type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Select Subsidised CET Qualification / Programme:
              </label>
              <div className="space-y-2">
                {selectedIhl.flagshipPrograms.map((p, idx) => (
                  <label
                    key={idx}
                    className={`block p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                      selectedProgramIdx === idx
                        ? 'border-slate-900 bg-slate-50/80 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="program"
                      checked={selectedProgramIdx === idx}
                      onChange={() => setSelectedProgramIdx(idx)}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-slate-900">{p.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {p.level} · {p.duration}
                        </div>
                      </div>
                      <div className="text-right font-mono tabular-nums">
                        <div className="text-[11px] text-slate-400 line-through">${p.courseFee.toLocaleString()}</div>
                        <div className="font-bold text-slate-900">${p.subsidisedFeeSingaporean.toLocaleString()}</div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Study Mode & SkillsFuture Credit Config */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-slate-700">Study Mode:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStudyMode('part-time')}
                  className={`px-3 py-1 rounded text-xs cursor-pointer ${
                    studyMode === 'part-time' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Part-Time (Working Adult)
                </button>
                <button
                  onClick={() => setStudyMode('full-time')}
                  className={`px-3 py-1 rounded text-xs cursor-pointer ${
                    studyMode === 'full-time' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Full-Time (Substantive Upskilling)
                </button>
              </div>
            </div>

            {studyMode === 'full-time' && isMidCareer && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={unemployedSeekingCareerSwitch}
                    onChange={(e) => setUnemployedSeekingCareerSwitch(e.target.checked)}
                    className="accent-blue-600 rounded"
                  />
                  <span className="font-semibold text-blue-900">
                    Currently unemployed / taking training leave for career transition?
                  </span>
                </label>
                <p className="text-[11px] text-blue-700">
                  Under the SkillsFuture Level-Up Programme, eligible trainees receive a monthly training allowance of up to 50% of prior average monthly salary, capped at $3,000/month for up to 24 months.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Fee Breakdown Invoice (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-900">Official Subsidy & Fee Calculation</span>
              <span className="text-[11px] font-mono text-slate-500">SSG Framework</span>
            </div>

            {/* Status Banner */}
            <div
              className={`p-3.5 rounded-lg border text-xs space-y-1 ${
                isMidCareer
                  ? 'bg-red-50 border-red-200 text-red-900'
                  : isCitizenUnder40
                  ? 'bg-blue-50 border-blue-200 text-blue-900'
                  : isPR
                  ? 'bg-slate-100 border-slate-200 text-slate-800'
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{subsidyName}</span>
              </div>
              <p className="text-[11px] opacity-90 leading-relaxed">
                {isMidCareer
                  ? 'Qualifies for maximal 90% Mid-Career Enhanced Subsidy (MCES) + $4,000 SkillsFuture Level-Up Credit.'
                  : isCitizenUnder40
                  ? 'Qualifies for 70% Baseline MOE/SSG Singapore Citizen Subsidy.'
                  : isPR
                  ? 'Qualifies for 70% Baseline Permanent Resident Subsidy.'
                  : 'Full fees apply for non-residents without government funding.'}
              </p>
            </div>

            {/* Financial Ledger Breakdown */}
            <div className="space-y-2.5 text-xs pt-2">
              <div className="flex justify-between text-slate-600">
                <span>Standard Full Course Fee:</span>
                <span className="font-mono tabular-nums font-semibold">${fullFee.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-emerald-700">
                <span>Government Subsidy ({subsidyPct}%):</span>
                <span className="font-mono tabular-nums font-semibold">
                  -${(fullFee - feeAfterGovSubsidy).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-slate-700 pt-2 border-t border-slate-100 font-medium">
                <span>Fee After Government Subsidy:</span>
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  ${feeAfterGovSubsidy.toLocaleString()}
                </span>
              </div>

              {citizenship === 'citizen' && (
                <div className="flex justify-between text-blue-600">
                  <span>
                    SkillsFuture Credits Applied ({isMidCareer ? 'Level-Up + Base' : 'Opening'}):
                  </span>
                  <span className="font-mono tabular-nums font-semibold">
                    -${creditDeduction.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Net Out of Pocket */}
              <div className="pt-3 border-t-2 border-slate-900 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Net Out-of-Pocket Payable:</span>
                  <span className="text-[10px] text-slate-500">Payable via SkillsFuture Credit / Cash / PSEA</span>
                </div>
                <div className="text-2xl font-bold font-mono text-red-600 tabular-nums">
                  ${outOfPocketPayable.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Training Allowance Estimate */}
            {trainingAllowanceMonthly > 0 && (
              <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-800 space-y-1 mt-4">
                <div className="font-bold flex items-center justify-between">
                  <span>Monthly Training Allowance:</span>
                  <span className="font-mono text-sm">${trainingAllowanceMonthly.toLocaleString()} / mo</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  Payable for the duration of the full-time qualification (up to $3,000/month capped at 24 months).
                </p>
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 pt-4 border-t border-slate-100 leading-relaxed">
            * Estimates are indicative based on prevailing SkillsFuture Singapore (SSG) & Ministry of Education (MOE) subsidised course guidelines. Actual final fees are confirmed upon course enrolment at the respective IHL CET portal.
          </div>
        </div>
      </div>
    </div>
  );
};
