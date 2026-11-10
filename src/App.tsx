/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { MetricCards } from './components/MetricCards';
import { IHLBreakdownView } from './components/IHLBreakdownView';
import { IHLDeepDiveView } from './components/IHLDeepDiveView';
import { DataCrusherView } from './components/DataCrusherView';
import { SkillsFutureSimulator } from './components/SkillsFutureSimulator';
import { ApiHubAndAI } from './components/ApiHubAndAI';
import { PublicGlossaryModal } from './components/PublicGlossaryModal';
import { IHL_INSTITUTIONS, NATIONAL_CET_METRICS } from './data/singstatSnapshot';
import { ArrowRight, BarChart3, Building2, Calculator, Database, GraduationCap, ShieldCheck, Sparkles, TrendingUp, Users } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedIHLId, setSelectedIHLId] = useState<string>('suss');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [simulatedCourse, setSimulatedCourse] = useState<{
    title: string;
    fullFee: number;
    subsidisedFeeSingaporean: number;
    subsidisedFeeMidCareer: number;
  } | null>(null);

  const handleSelectIHL = (id: string) => {
    setSelectedIHLId(id);
    setActiveTab('deep-dive');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSimulateCourse = (
    title: string,
    fullFee: number,
    subsidisedFeeSingaporean: number,
    subsidisedFeeMidCareer: number
  ) => {
    setSimulatedCourse({
      title,
      fullFee,
      subsidisedFeeSingaporean,
      subsidisedFeeMidCareer,
    });
    setActiveTab('simulator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenAiAnalyst={() => {
          setActiveTab('api-hub');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Strip (Visible on Overview, Breakdown, Deep Dive) */}
        {['overview', 'breakdown', 'deep-dive'].includes(activeTab) && (
          <MetricCards
            selectedYear={selectedYear}
            onSelectYear={setSelectedYear}
          />
        )}

        {/* Tab 1: Holistic Executive Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Hero Banner */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-10 relative overflow-hidden shadow-xs">
              <div className="max-w-3xl space-y-4 relative z-10">
                <div className="flex items-center gap-2 text-xs font-mono text-red-400">
                  <span>OFFICIAL SINGAPORE OPEN DATA METRICS</span>
                  <span aria-hidden="true">·</span>
                  <span>SINGSTAT & SSG</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Adult Learning & Continuing Education (CET) Across Singapore IHLs
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Track adult training capacity, post-diplomas, modular micro-credentials, and graduate outcomes across Singapore's 6 Autonomous Universities, 5 Polytechnics, and ITE. Powered by live data from Singapore's Open Data Portal.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('breakdown')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Explore IHL Breakdown</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab('data-crusher')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Launch Data Crusher</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('simulator')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>SkillsFuture Level-Up Calculator</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3 Pillar Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div
                onClick={() => setActiveTab('breakdown')}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer group space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                  01. Cross-IHL Breakdown
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  View how CET enrolment is distributed between Autonomous Universities (NUS, NTU, SMU, SUSS, SIT, SUTD), Polytechnics (SP, NP, NYP, TP, RP), and ITE.
                </p>
                <div className="text-xs font-semibold text-red-600 flex items-center gap-1 pt-1">
                  <span>View Sector Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Feature 2 */}
              <div
                onClick={() => setActiveTab('deep-dive')}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer group space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                  02. Deep Dive by Specific IHL
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Audit institutional specialisms, flagship micro-credentials, annual graduation rates, and subsidized course fee matrices for any of Singapore's 13 IHLs.
                </p>
                <div className="text-xs font-semibold text-red-600 flex items-center gap-1 pt-1">
                  <span>Select an Institution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Feature 3 */}
              <div
                onClick={() => setActiveTab('data-crusher')}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-300 transition-all cursor-pointer group space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                  03. Granular Data Crusher
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Multi-variate pivot tools, YoY growth calculations, side-by-side cohort comparators, and clean CSV downloaders for researchers and analysts.
                </p>
                <div className="text-xs font-semibold text-red-600 flex items-center gap-1 pt-1">
                  <span>Crush & Export CSV</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Executive IHL Quick Overview Strip */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Singapore Institutes of Higher Learning Directory
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official CET continuing education entities and centers of excellence
                  </p>
                </div>
                <button
                  onClick={() => setIsGlossaryOpen(true)}
                  className="text-xs text-red-600 hover:underline font-semibold cursor-pointer text-left"
                >
                  Understanding IHL & CET terminology →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {IHL_INSTITUTIONS.slice(0, 12).map((inst) => (
                  <button
                    key={inst.id}
                    onClick={() => handleSelectIHL(inst.id)}
                    className="p-3 text-left rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <div className="font-mono font-bold text-xs text-slate-900">{inst.code}</div>
                    <div className="text-xs font-semibold text-slate-700 truncate mt-0.5">{inst.shortName}</div>
                    <div className="text-[11px] text-slate-500 truncate mt-1">{inst.cetArm}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Breakdown Across IHLs */}
        {activeTab === 'breakdown' && (
          <IHLBreakdownView
            selectedYear={selectedYear}
            onSelectIHL={handleSelectIHL}
          />
        )}

        {/* Tab 3: Deep Dive Data in Specific IHL */}
        {activeTab === 'deep-dive' && (
          <IHLDeepDiveView
            selectedIHLId={selectedIHLId}
            onSelectIHL={setSelectedIHLId}
            onSimulateCourse={handleSimulateCourse}
          />
        )}

        {/* Tab 4: Granular Data Crusher */}
        {activeTab === 'data-crusher' && <DataCrusherView />}

        {/* Tab 5: SkillsFuture Subsidy Simulator */}
        {activeTab === 'simulator' && (
          <SkillsFutureSimulator initialCourse={simulatedCourse} />
        )}

        {/* Tab 6: Singapore Open Data API Hub & Gemini AI Analyst */}
        {activeTab === 'api-hub' && <ApiHubAndAI />}
      </main>

      {/* Public Glossary Modal */}
      <PublicGlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Singapore IHL CET Tracker</span>
            <span aria-hidden="true">·</span>
            <span>Data source: Singapore Open Data Portal (data.gov.sg) & SingStat TableBuilder</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Public Guide
            </button>
            <span aria-hidden="true">·</span>
            <a
              href="https://data.gov.sg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              data.gov.sg
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://tablebuilder.singstat.gov.sg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              SingStat TableBuilder
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
