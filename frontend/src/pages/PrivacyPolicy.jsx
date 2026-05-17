import { Shield, Lock, Eye, FileText, CheckCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    { id: 'introduction', label: '1. Executive Summary' },
    { id: 'data-collection', label: '2. Information We Collect' },
    { id: 'data-usage', label: '3. Data Processing & Usage' },
    { id: 'data-protection', label: '4. Security & Cryptography' },
    { id: 'user-rights', label: '5. Rights & Recourse' },
    { id: 'compliance-stat', label: '6. Regulatory Alignment' }
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
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-650/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-900/5 blur-[130px] pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
        <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 mb-6 mx-auto shadow-inner">
          <Shield className="w-7 h-7" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-display font-serif">
          Privacy Policy
        </h1>
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed uppercase tracking-wider font-semibold">
          Effective Date: May 17, 2026 • Document ID: L-PRV-2026-V1.0
        </p>
        <div className="h-[1px] w-24 bg-gradient-to-r from-indigo-550 to-indigo-750 mx-auto mt-6 rounded-full" />
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
            
            {/* 1. Introduction */}
            <section id="introduction" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-500 font-body text-lg font-bold">1.0</span>
                <span>Executive Summary</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Lumina Academic Library Systems (referred to as "Lumina", "the portal", or "we") is fully committed to the ethical governance and security of your digital footprint. This document details our workflows regarding data collection, processing boundaries, database storage, and cryptographic protection of personal credentials inside our full-stack academic database.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                By maintaining a registered student or administrator profile on this portal, you assent to the information indexing protocols defined herein. If you disagree with these workflows, you must discontinue account access immediately.
              </p>
            </section>
 

            {/* 2. Information We Collect */}
            <section id="data-collection" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-500 font-body text-lg font-bold">2.0</span>
                <span>Information We Collect</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our database indexes restricted categories of academic metadata to facilitate authentication, transaction integrity, and automated loan auditing.
              </p>
              
              {/* TABLE */}
              <div className="overflow-x-auto border border-slate-900 rounded-xl mt-4">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-950/80 border-b border-slate-900 text-slate-300">
                      <th className="p-4 font-bold uppercase tracking-widest text-[10px]">Category</th>
                      <th className="p-4 font-bold uppercase tracking-widest text-[10px]">Indexed Databases</th>
                      <th className="p-4 font-bold uppercase tracking-widest text-[10px]">Functional Rationale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60 text-slate-400 bg-slate-950/20">
                    <tr>
                      <td className="p-4 font-bold text-slate-200">Account Credentials</td>
                      <td className="p-4">Academic Email Addresses, Hashed Passwords, Role Identifiers (Student/Admin)</td>
                      <td className="p-4">To provision roles and secure session validation.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-200">Transaction History</td>
                      <td className="p-4">Checkout timestamps, Return check-in logs, Book IDs, Overdue flags</td>
                      <td className="p-4">To audit library asset movements and calculate limits.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-200">Browser Metadata</td>
                      <td className="p-4">Local session tokens (JWTs), User agent data, IP addresses</td>
                      <td className="p-4">To prevent unauthorized session hijacking and cross-site scripting (XSS).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. Data Processing & Usage */}
            <section id="data-usage" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-500 font-body text-lg font-bold">3.0</span>
                <span>Data Processing &amp; Usage</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Information processing is bound strictly to operating the library portal. Specifically, data is utilized to:
              </p>
              <ul className="space-y-3 text-slate-400 text-sm list-none pl-0">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Verify credentials and issue access and refresh tokens.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Track book inventories, loan counts, and enforce standard limits (5 concurrent items).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>Send system reminders regarding approaching loan return deadlines.</span>
                </li>
              </ul>
              <blockquote className="border-l-4 border-indigo-500 bg-indigo-950/20 p-4 rounded-r-xl mt-4">
                <p className="text-xs text-indigo-300 italic font-medium leading-relaxed">
                  <strong>Design Note:</strong> Lumina operates under zero third-party commercial sharing policies. Academic metadata is never shared with, sold to, or syndicated with commercial analytics entities.
                </p>
              </blockquote>
            </section>

            {/* 4. Security & Cryptography */}
            <section id="data-protection" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-500 font-body text-lg font-bold">4.0</span>
                <span>Security &amp; Cryptography</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                To guarantee information confidentiality, Lumina implements strict enterprise-grade cryptographic controls at both the service layer and database boundary:
              </p>
              <ul className="space-y-3 text-slate-400 text-sm pl-4 list-disc">
                <li><strong className="text-slate-200">Password Hashing:</strong> Raw user passwords are encrypted using one-way salted hashing protocols at the persistence boundary.</li>
                <li><strong className="text-slate-200">Stateless JWTs:</strong> Session data is handled via stateless access tokens (15-minute expiration) and secure refresh tokens (7-day expiration) utilizing 256-bit signature secrets.</li>
                <li><strong className="text-slate-200">Transport Security:</strong> All data in transit utilizes secure cryptographic SSL/TLS tunnels to prevent man-in-the-middle (MITM) hijacking.</li>
              </ul>
            </section>

            {/* 5. Rights & Recourse */}
            <section id="user-rights" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-500 font-body text-lg font-bold">5.0</span>
                <span>Rights &amp; Recourse</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                As an academic user of Lumina, you maintain distinct privacy rights regarding your indexed record set:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-slate-950/80 p-4 border border-slate-900/60 rounded-xl">
                  <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wide mb-1">Right of Access</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">You can audit your full active record, profile data, and checkouts live inside the Student Portal.</p>
                </div>
                <div className="bg-slate-950/80 p-4 border border-slate-900/60 rounded-xl">
                  <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wide mb-1">Right of Correction</h4>
                  <p className="text-xs text-slate-550 leading-relaxed">You can request immediate profile corrections by contacting the System Administrator via email.</p>
                </div>
                <div className="bg-slate-950/80 p-4 border border-slate-900/60 rounded-xl">
                  <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wide mb-1">Right of Erasure</h4>
                  <p className="text-xs text-slate-550 leading-relaxed">Upon graduation or termination, you can request full erasure of your historical account credentials from databases.</p>
                </div>
              </div>
            </section>

            {/* 6. Regulatory Alignment */}
            <section id="compliance-stat" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-500 font-body text-lg font-bold">6.0</span>
                <span>Regulatory Alignment</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Lumina's data processing boundaries are structured to ensure compliance with privacy laws:
              </p>
              <div className="space-y-3">
                <div className="flex gap-3 items-start bg-slate-950/80 p-4 rounded-xl border border-slate-900/65">
                  <Lock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-200">FERPA Alignment</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">We strictly enforce the Family Educational Rights and Privacy Act (FERPA) by safeguarding student loan transactions and academic history against disclosures.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start bg-slate-950/80 p-4 rounded-xl border border-slate-900/65">
                  <Eye className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-200">GDPR Compliance</h4>
                    <p className="text-xs text-slate-550 leading-relaxed">Under the General Data Protection Regulation (GDPR), we establish legal basis for data processing, honor request erasures, and encrypt authentication parameters.</p>
                  </div>
                </div>
              </div>
            </section>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PrivacyPolicy;
