import React from 'react';
import { X, BookOpen, ExternalLink, HelpCircle, GraduationCap, Award, ShieldCheck, DollarSign } from 'lucide-react';

interface PublicGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublicGlossaryModal: React.FC<PublicGlossaryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const terms = [
    {
      term: 'CET (Continuing Education and Training)',
      explanation:
        'Structured education and formal or non-formal training designed specifically for adult learners who have already entered the workforce, enabling continuous upskilling, career pivots, and credential acquisition throughout their careers.',
      icon: BookOpen,
    },
    {
      term: 'IHLs (Institutes of Higher Learning)',
      explanation:
        'Publicly-funded tertiary education institutions in Singapore comprising the 6 Autonomous Universities (NUS, NTU, SMU, SUSS, SIT, SUTD), 5 Polytechnics (SP, NP, NYP, TP, RP), the Institute of Technical Education (ITE), and specialised institutions like NIEC and UAS.',
      icon: GraduationCap,
    },
    {
      term: 'SkillsFuture Level-Up Programme',
      explanation:
        'Introduced in Singapore Budget 2024 to support mid-career Singaporeans aged 40 and above. Provides a targeted $4,000 SkillsFuture Credit top-up for selected training programmes with strong career outcomes, plus a monthly training allowance of up to $3,000/month for eligible full-time substantive courses.',
      icon: Award,
    },
    {
      term: 'MCES (Mid-Career Enhanced Subsidy)',
      explanation:
        'Singapore Citizens aged 40 and above receive subsidies of up to 90% for Ministry of Education (MOE) funded and SkillsFuture Singapore (SSG) supported programmes, significantly reducing out-of-pocket costs.',
      icon: DollarSign,
    },
    {
      term: 'Trainee-Days (Data Metric)',
      explanation:
        'A standard national productivity metric calculating the aggregate volume of training delivered. For example, 100 learners attending a 5-day modular course equals 500 Trainee-Days.',
      icon: ShieldCheck,
    },
    {
      term: 'WSQ (Singapore Workforce Skills Qualifications)',
      explanation:
        'A national credential system that trains, develops, assesses, and certifies skills and competencies for the workforce based on adult industry standards established by SkillsFuture Singapore (SSG).',
      icon: Award,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Public Guide: Singapore CET & Lifelong Learning
              </h3>
              <p className="text-xs text-slate-500">
                Key concepts, government subsidies, and IHL acronyms explained
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          {terms.map((t, idx) => {
            const Icon = t.icon;
            return (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <Icon className="w-3.5 h-3.5 text-red-600" />
                  <span>{t.term}</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {t.explanation}
                </p>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>Official Portals: MySkillsFuture & SingStat TableBuilder</span>
          <a
            href="https://www.myskillsfuture.gov.sg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-red-600 hover:underline"
          >
            <span>Visit MySkillsFuture.gov.sg</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
