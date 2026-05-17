import { ShieldCheck, HardDrive, Terminal, FileText, CheckCircle } from 'lucide-react';

const Compliance = () => {
  const sections = [
    { id: 'overview', label: '1. Regulatory Frameworks' },
    { id: 'cryptographic', label: '2. Cryptographic Protocols' },
    { id: 'db-compliance', label: '3. Database Integrity Standards' },
    { id: 'cron-auditing', label: '4. Automated System Checks' },
    { id: 'wcag-access', label: '5. Accessibility (WCAG 2.1)' },
    { id: 'admin-contact', label: '6. Compliance Verification' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f6f8fb] text-slate-800 py-20 px-6 max-w-7xl mx-auto w-full font-body select-none">
      
      {/* BACKGROUND DECORATIONS */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-indigo-100/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-50/20 blur-[130px] pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-200/50 mb-6 mx-auto shadow-sm">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 font-display font-serif">
          Compliance &amp; Governance
        </h1>
        <p className="text-slate-500 text-xs md:text-sm leading-relaxed uppercase tracking-wider font-semibold">
          Effective Date: May 17, 2026 • Document ID: L-CMP-2026-V1.0
        </p>
        <div className="h-[1px] w-24 bg-gradient-to-r from-indigo-500 to-indigo-800 mx-auto mt-6 rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-20">
        
        {/* SIDEBAR NAVIGATION INDEX */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-md">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-6 flex items-center gap-2 font-body">
              <FileText className="w-4 h-4" />
              <span>Document Outline</span>
            </h3>
            <ul className="space-y-4">
              {sections.map((sec) => (
                <li key={sec.id}>
                  <button
                    onClick={() => scrollToSection(sec.id)}
                    className="w-full text-left text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors uppercase tracking-wider block font-body"
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
          
          <div className="glass-panel p-8 md:p-12 rounded-[24px] border border-slate-200/70 shadow-xl space-y-12 bg-white/80">
            
            {/* 1. Regulatory Overview */}
            <section id="overview" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-600 font-body text-lg font-bold">1.0</span>
                <span>Regulatory Frameworks</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Lumina Library Portal adheres to strict national and international regulatory frameworks to ensure data privacy, intellectual integrity, and non-disclosure of educational records.
              </p>
              
              <ul className="space-y-3 text-slate-600 text-sm list-none pl-0">
                <li className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">FERPA (Family Educational Rights and Privacy Act):</strong> We protect student education data by strictly limiting catalog loan histories from being exposed to unauthorized third parties.
                  </div>
                </li>
                <li className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">GDPR (General Data Protection Regulation):</strong> We enforce the principles of data minimization and storage limitations. Active user consents are required to handle system JWT session structures.
                  </div>
                </li>
                <li className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4.5 h-4.5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800">HECC (Higher Education Compliance Guidelines):</strong> Our library workflows align with administrative record keeping, automated logging, and transaction verification requirements.
                  </div>
                </li>
              </ul>
            </section>

            {/* 2. Cryptographic Protocols */}
            <section id="cryptographic" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-600 font-body text-lg font-bold">2.0</span>
                <span>Cryptographic Protocols</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Data security on Lumina is guaranteed through strong, modern cryptography, avoiding weak or vulnerable algorithms:
              </p>
              
              {/* TABLE */}
              <div className="overflow-x-auto border border-slate-200/60 rounded-xl mt-4">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-800">
                      <th className="p-4 font-bold uppercase tracking-widest text-[10px]">Protocol Layer</th>
                      <th className="p-4 font-bold uppercase tracking-widest text-[10px]">Cryptographic Standard</th>
                      <th className="p-4 font-bold uppercase tracking-widest text-[10px]">Implementation Context</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 text-slate-600 bg-white">
                    <tr>
                      <td className="p-4 font-bold text-slate-900">User Passwords</td>
                      <td className="p-4">Salted One-Way Hashing</td>
                      <td className="p-4">Passwords are hashed using salts prior to SQL database persistence.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Access Tokens</td>
                      <td className="p-4">HS512 JWT (256-bit signing secret)</td>
                      <td className="p-4">15-minute expiration cycle, stateless validation filter.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Refresh Tokens</td>
                      <td className="p-4">UUID Random Validation Keys</td>
                      <td className="p-4">7-day expiration cycle, verified against database tokens.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-slate-900">Network Transport</td>
                      <td className="p-4">TLS v1.3 (HTTPS)</td>
                      <td className="p-4">Enforces full encryption of headers, cookies, and SQL transactions.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3. Database Integrity Standards */}
            <section id="db-compliance" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-600 font-body text-lg font-bold">3.0</span>
                <span>Database Integrity Standards</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Lumina's backend architecture relies on structural relational schemas in MySQL 8.0 to guarantee strict data integrity, preventing ghost or corrupted database nodes:
              </p>
              <ul className="space-y-3 text-slate-600 text-sm pl-4 list-disc">
                <li><strong className="text-slate-800">Referential Constraints:</strong> All borrowings map strictly to active primary book and user IDs. Cascaded constraints block orphan transactions if catalog records shift.</li>
                <li><strong className="text-slate-800">JPA Schema Auto-Updates:</strong> Standardized Hibernate schemas sync with Java Spring models automatically, ensuring compile-time schema compliance.</li>
                <li><strong className="text-slate-800">Hot Backups:</strong> Database transaction logs execute binary logging for transaction rollbacks in case of physical node disruptions.</li>
              </ul>
              <blockquote className="border-l-4 border-indigo-600 bg-indigo-50/50 p-4 rounded-r-xl mt-4">
                <p className="text-xs text-indigo-800 italic font-bold leading-relaxed font-body">
                  <strong>Compliance Note:</strong> Personal accounts can be deleted on demand. Our database constraints enforce the clean purge of all associated refresh tokens, leaving zero trace in secondary credentials lists.
                </p>
              </blockquote>
            </section>

            {/* 4. Automated System Audits */}
            <section id="cron-auditing" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-600 font-body text-lg font-bold">4.0</span>
                <span>Automated System Checks</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                The Spring Boot Java backend runs automated compliance checking loops in the background using `@EnableScheduling` and automated scheduled task triggers:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-50 p-5 border border-slate-200/80 rounded-xl flex gap-3">
                  <Terminal className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1 font-body">Overdue Checking System</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Runs daily at midnight. Scans active borrowings, updates overdue status, and triggers system notice emails automatically.</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-5 border border-slate-200/80 rounded-xl flex gap-3">
                  <HardDrive className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1 font-body">Token Expiration Cleanup</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">Clears expired refresh tokens periodically from MySQL tables to maintain peak search execution performance.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Accessibility (WCAG 2.1) */}
            <section id="wcag-access" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-600 font-body text-lg font-bold">5.0</span>
                <span>Accessibility Compliance (WCAG 2.1)</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Lumina's client-side interface is fully optimized to fulfill the Web Content Accessibility Guidelines (WCAG 2.1 Level AA) criteria:
              </p>
              <ul className="space-y-3 text-slate-600 text-sm pl-4 list-disc">
                <li><strong className="text-slate-800">Contrast Optimization:</strong> Scholarly light-mode elements use calibrated high-contrast font ratios (at least 4.5:1) for optimal text scanability under varying campus lighting.</li>
                <li><strong className="text-slate-800">Semantic Layouts:</strong> Utilizes standard HTML5 semantic tags (`header`, `main`, `nav`, `footer`) and clear `aria-label` hooks to enable smooth screen-reader browsing.</li>
                <li><strong className="text-slate-800">Keyboard Traversal:</strong> Tabbing indices are logically structured across global search forms, login boxes, and FAQ accordion toggles.</li>
              </ul>
            </section>

            {/* 6. Compliance Verification */}
            <section id="admin-contact" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5 font-display font-serif">
                <span className="text-indigo-600 font-body text-lg font-bold">6.0</span>
                <span>Compliance Verification</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Any compliance inquiries regarding databases, checking records, or FERPA validation requests must be routed to our Central Systems Administrator:
              </p>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 max-w-fit">
                <p className="text-xs text-slate-900 font-bold mb-1 font-body">Office of Compliance &amp; Security</p>
                <p className="text-xs text-slate-600">Email: <a href="mailto:compliance@luminalibrary.edu" className="text-indigo-600 hover:underline">compliance@luminalibrary.edu</a></p>
                <p className="text-xs text-slate-500 font-body">Location: Administration Building, West Wing Room 410</p>
              </div>
            </section>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Compliance;
