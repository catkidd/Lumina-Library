import { FileText, CheckCircle, Scale, AlertTriangle } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    { id: 'acceptance', label: '1. Acceptance of Terms' },
    { id: 'eligibility', label: '2. User Accounts & Eligibility' },
    { id: 'circulation-rules', label: '3. Circulation & Asset Management' },
    { id: 'copyright-rules', label: '4. Copyright & E-Resources' },
    { id: 'termination', label: '5. Account Actions & Suspensions' },
    { id: 'disclaimer', label: '6. Disclaimer of Warranties' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#04050a] text-slate-200 py-20 px-6 max-w-7xl mx-auto w-full font-body select-none">
      
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-600/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-900/5 blur-[130px] pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
        <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 mb-6 mx-auto shadow-inner">
          <Scale className="w-7 h-7" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-display font-serif">
          Terms of Service
        </h1>
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed uppercase tracking-wider font-semibold">
          Effective Date: May 17, 2026 • Document ID: L-TOS-2026-V1.0
        </p>
        <div className="h-[1px] w-24 bg-gradient-to-r from-indigo-500 to-indigo-800 mx-auto mt-6 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-20">
        
        {/* SIDEBAR NAVIGATION INDEX */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28 bg-slate-950/70 p-6 rounded-2xl border border-slate-900/80 backdrop-blur-md">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Document Outline</span>
            </h3>
            <ul className="space-y-4">
              {sections.map((sec) => (
                <li key={sec.id}>
                  <button
                    onClick={() => scrollToSection(sec.id)}
                    className="w-full text-left text-xs font-bold text-slate-400 hover:text-indigo-400 transition-colors uppercase tracking-wider block font-body"
                  >
                    {sec.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* POLICY CONTENTS BLOCK */}
        <div className="lg:col-span-9 space-y-12">
          
          <div className="glass-panel p-8 md:p-12 rounded-[24px] border border-slate-900/70 shadow-xl space-y-12 bg-slate-950/20">
            
            {/* 1. Acceptance */}
            <section id="acceptance" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-500 font-body text-lg font-bold">1.0</span>
                <span>Acceptance of Terms</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                These Terms of Service ("TOS", "Terms") govern your access to and legal use of the Lumina Library Portal ("the service", "the portal"), including physical transactions, e-book indexing search requests, and reservation APIs.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                By creating a student profile, logging in with JWT access tokens, or querying library catalogues, you agree to be bound by these Terms, all applicable university charters, and regional administrative regulations.
              </p>
            </section>

            {/* 2. Eligibility */}
            <section id="eligibility" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-500 font-body text-lg font-bold">2.0</span>
                <span>User Accounts &amp; Eligibility</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Access to borrowing queues is limited strictly to verified active campus students, postgraduate fellows, academic researchers, and authorized system administrators.
              </p>
              <ul className="space-y-3 text-slate-400 text-sm list-none pl-0">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Users must supply a verified academic email address to register profiles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>You are solely responsible for preserving the confidentiality of your JWT access credentials and registered session.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Transfer of library card credentials or account sharing with external students is strictly prohibited.</span>
                </li>
              </ul>
            </section>

            {/* 3. Circulation & Asset Management */}
            <section id="circulation-rules" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-500 font-body text-lg font-bold">3.0</span>
                <span>Circulation &amp; Asset Management</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                To guarantee equal access to academic volumes, borrowing cycles are subject to strict system limits and cron-audited return windows.
              </p>
              
              {/* TABLE */}
              <div className="overflow-x-auto border border-slate-900 rounded-xl mt-4">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-950/80 border-b border-slate-900 text-slate-300">
                      <th className="p-4 font-bold uppercase tracking-widest text-[10px]">Metric</th>
                      <th className="p-4 font-bold uppercase tracking-widest text-[10px]">System Rule Limit</th>
                      <th className="p-4 font-bold uppercase tracking-widest text-[10px]">Overdue Consequences</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60 text-slate-400 bg-slate-950/20">
                    <tr>
                      <td className="p-4 font-bold text-slate-200">Max Concurrent Books</td>
                      <td className="p-4">5 Physical Volumes</td>
                      <td className="p-4">Queue blocks further checkout calls instantly.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-200">Standard Loan Duration</td>
                      <td className="p-4">14 Calendar Days</td>
                      <td className="p-4">Accrues fine flags; auto-email dispatched daily.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-200">Overdue Fines (Accrual)</td>
                      <td className="p-4">$0.50 USD per day overdue</td>
                      <td className="p-4">Account status marked restricted if debt exceeded.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <blockquote className="border-l-4 border-indigo-500 bg-indigo-950/20 p-4 rounded-r-xl mt-4">
                <p className="text-xs text-indigo-300 italic font-medium leading-relaxed">
                  <strong>Academic Note:</strong> All returned volumes must be checked in physical drop boxes. Librarians verify physical asset integrity (binding, page count, annotations) post-return prior to clearing pending borrowing records.
                </p>
              </blockquote>
            </section>

            {/* 4. Copyright & E-Resources */}
            <section id="copyright-rules" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-500 font-body text-lg font-bold">4.0</span>
                <span>Copyright &amp; E-Resources</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                All electronic materials, academic e-journals, publications, and scanning databases indexed on Lumina are protected under international copyright regulations.
              </p>
              <ul className="space-y-3 text-slate-400 text-sm pl-4 list-disc">
                <li><strong className="text-slate-200">Personal Study Use Only:</strong> Users can download e-resources only for personal academic analysis, thesis preparation, and individual research.</li>
                <li><strong className="text-slate-200">No Commercial Syndication:</strong> Downloading large batches, bulk scraping journals, or republishing electronic files externally is strictly prohibited and constitutes a violation of copyright law.</li>
              </ul>
            </section>

            {/* 5. Account Actions & Suspensions */}
            <section id="termination" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-500 font-body text-lg font-bold">5.0</span>
                <span>Account Actions &amp; Suspensions</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Lumina reserves the absolute authority to suspend, deactivate, or restrict student profiles immediately under the following violation flags:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-950/80 p-5 border border-slate-900/60 rounded-xl flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wide mb-1">Unreturned Critical Assets</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Holding volumes past 30 days overdue triggers automatic deactivation of circulation privileges.</p>
                  </div>
                </div>
                <div className="bg-slate-950/80 p-5 border border-slate-900/60 rounded-xl flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wide mb-1">Session Tampering</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Injecting script sequences, parsing backend tokens maliciously, or scanning endpoints deactivates profiles permanently.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Disclaimer of Warranties */}
            <section id="disclaimer" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-500 font-body text-lg font-bold">6.0</span>
                <span>Disclaimer of Warranties</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed uppercase">
                THE LUMINA LIBRARY PORTAL SERVICE IS DELIVERED ON AN "AS IS" AND "AS AVAILABLE" STRUCTURAL BASIS. WE DISCLAIM ALL REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESSED OR IMPLIED, COVERING PORTAL DOWNTIMES, CRON DEADBANDS, SYSTEM OUTAGES, OR LOSS OF DIGITAL BIBLIOGRAPHY LOGS.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed uppercase">
                IN NO EVENT SHALL LUMINA OR ITS COOPERATING CAMPUS DEPARTMENTS BE LIABLE FOR ANY CONSEQUENTIAL, INDIRECT, SPECIAL, OR INDIRECT DAMAGES RESULTING FROM ACCOUNT ACCESS DISRUPTIONS OR LOSS OF SYSTEM METRICS.
              </p>
            </section>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TermsOfService;
