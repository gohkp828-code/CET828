import React from 'react';
import { BookOpen, Sparkles, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenGlossary: () => void;
  onOpenAiAnalyst: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenGlossary,
  onOpenAiAnalyst,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'breakdown', label: 'IHL Breakdown' },
    { id: 'deep-dive', label: 'IHL Deep Dive' },
    { id: 'data-crusher', label: 'Data Crusher' },
    { id: 'simulator', label: 'Subsidy Simulator' },
    { id: 'api-hub', label: 'Open Data & AI' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
              SG
            </div>
            <button
              onClick={() => setActiveTab('overview')}
              className="text-left cursor-pointer group"
            >
              <span className="text-base font-bold text-slate-900 tracking-tight group-hover:text-red-600 transition-colors whitespace-nowrap">
                Singapore IHL CET Tracker
              </span>
              <span className="hidden sm:block text-[11px] text-slate-500 font-normal">
                Open Data Portal & SingStat Analytics
              </span>
            </button>
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-1 transition-colors whitespace-nowrap cursor-pointer text-sm ${
                  activeTab === item.id
                    ? 'text-red-600 font-semibold border-b-2 border-red-600'
                    : 'hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Functional actions (Public Guide & AI Assistant) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenGlossary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              title="Learn about CET terms and Singapore lifelong learning"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>Public Guide</span>
            </button>

            <button
              onClick={onOpenAiAnalyst}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Data Analyst</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-3 border-t border-slate-100 no-scrollbar text-xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap cursor-pointer ${
                activeTab === item.id
                  ? 'bg-red-50 text-red-700 font-semibold border border-red-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
