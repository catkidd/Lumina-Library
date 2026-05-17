import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { User, Shield, BookOpen, Clock, BadgeCheck, ShieldAlert, KeyRound, ChevronRight, BookMarked, HelpCircle, Activity } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuth();
  const [borrowCount, setBorrowCount] = useState(0);
  const [hasOverdue, setHasOverdue] = useState(false);
  const [loadingStats, setLoadingStats] = useState(true);
  const [savedSettings, setSavedSettings] = useState(false);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) return;
      try {
        const res = await api.get('/api/transactions/my');
        const activeLoans = res.data.filter(t => t.status === 'ACTIVE' || t.status === 'OVERDUE');
        setBorrowCount(activeLoans.length);
        const overdueLoans = res.data.some(t => t.status === 'OVERDUE');
        setHasOverdue(overdueLoans);
      } catch (err) {
        console.error('Error fetching statistics for user profile:', err);
      } finally {
        setLoadingStats(false);
      }
    };
    
    Promise.resolve().then(() => {
      fetchUserStats();
    });
  }, [user]);

  const handleMockSave = (e) => {
    e.preventDefault();
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 3000);
  };

  if (!user) return null;

  return (
    <div className="relative min-h-[100dvh] bg-[#fbfaf6] text-stone-800 font-sans py-24 px-6 md:px-12 selection:bg-amber-100/80 select-none overflow-hidden after:fixed after:inset-0 after:z-40 after:opacity-[0.02] after:pointer-events-none after:bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.8%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22/%3E%3C/svg%3E')]">
      
      <div className="max-w-5xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* HEADER SECTION (EYEBROW + SERIF TITLE) */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2 rounded-full px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.25em] border border-amber-900/10 bg-amber-50/60 text-amber-900 select-none">
            <User className="w-3 h-3 text-amber-800" />
            <span>Academic Registry</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-stone-900 font-serif leading-none">
            Student Credentials
          </h1>
          <p className="text-stone-600 max-w-[60ch] leading-relaxed text-base font-medium">
            Manage your library identity card, review active lending limits, and adjust campus portal security parameters.
          </p>
        </div>

        {/* PROFILE WORKSPACE GRID - ASYMMETRICAL 2-COLUMN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT PANEL: ACADEMIC CARD (COLUMNS: 5) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* DOUBLE-BEZEL CARD CONTAINER */}
            <div className="bg-[#f2efe8]/80 p-2.5 rounded-[2.5rem] border border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.01]">
              <div className="bg-gradient-to-br from-stone-900 to-stone-950 p-8 rounded-[calc(2.5rem-0.625rem)] text-stone-100 flex flex-col gap-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden">
                
                {/* Decorative radial card glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
                
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="font-serif text-xl tracking-wide text-stone-200">LUMINA</span>
                    <span className="text-[8px] font-bold tracking-[0.3em] text-amber-400 uppercase">Library Registry</span>
                  </div>
                  <div className="p-2 bg-white/10 rounded-xl">
                    <BookMarked className="w-5 h-5 text-amber-300" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">Cardholder Email</span>
                  <span className="text-base font-bold tracking-wide truncate">{user.email}</span>
                </div>

                <div className="flex items-end justify-between mt-4 pt-4 border-t border-white/10">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400">Security Clearance</span>
                    <span className="text-xs font-bold tracking-widest text-amber-400 flex items-center gap-1.5 uppercase">
                      <Shield className="w-3.5 h-3.5" />
                      {user.role}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-stone-400 font-bold bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                    LUM-{user.role === 'ADMIN' ? 'ADM' : 'STU'}-0482
                  </div>
                </div>

              </div>
            </div>

            {/* STATUS SUMMARY */}
            <div className="bg-[#f2efe8]/80 p-2.5 rounded-[2.5rem] border border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
              <div className="bg-white p-8 rounded-[calc(2.5rem-0.625rem)] flex flex-col gap-6 shadow-[0_20px_40px_-15px_rgba(139,120,95,0.06)]">
                
                <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-stone-500" />
                  Lending Health
                </h3>

                {loadingStats ? (
                  <div className="flex flex-col gap-4 animate-pulse">
                    <div className="h-4 bg-stone-100 rounded w-2/3"></div>
                    <div className="h-4 bg-stone-100 rounded w-1/2"></div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-5 text-sm font-medium">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">Compliance Standing</span>
                      <span className={`flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full ${
                        hasOverdue 
                          ? 'bg-rose-50 border border-rose-200 text-rose-600' 
                          : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                      }`}>
                        {hasOverdue ? <ShieldAlert className="w-3 h-3" /> : <BadgeCheck className="w-3 h-3" />}
                        {hasOverdue ? 'Action Required' : 'In Good Standing'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">Active Borrowings</span>
                      <span className="font-bold text-stone-900 text-base">{borrowCount} volumes</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">Standard Allowance</span>
                      <span className="font-bold text-stone-900">
                        {user.role === 'ADMIN' ? 'Unlimited' : '5 volumes max'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: DETAILS & MOCK SETTINGS (COLUMNS: 7) */}
          <div className="lg:col-span-7">
            
            {/* DOUBLE-BEZEL CARD WRAPPER */}
            <div className="bg-[#f2efe8]/80 p-2.5 rounded-[2.5rem] border border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.015)]">
              <div className="bg-white p-8 md:p-10 rounded-[calc(2.5rem-0.625rem)] flex flex-col gap-8 shadow-[0_20px_40px_-15px_rgba(139,120,95,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)]">
                
                <div className="flex flex-col gap-1 border-b border-stone-100 pb-5">
                  <h3 className="font-serif text-xl font-bold text-stone-900">Portal Security</h3>
                  <p className="text-stone-500 text-xs font-semibold">Review your authentication credentials and regional library limits.</p>
                </div>

                <form onSubmit={handleMockSave} className="flex flex-col gap-6">
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Registered Email Address</label>
                    <input
                      type="text"
                      disabled
                      value={user.email}
                      className="w-full px-5 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-500 font-medium text-sm focus:outline-none cursor-not-allowed select-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Access Key Role</label>
                    <input
                      type="text"
                      disabled
                      value={user.role === 'ADMIN' ? 'Authorized System Administrator' : 'Standard Student Account'}
                      className="w-full px-5 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-500 font-medium text-sm focus:outline-none cursor-not-allowed uppercase tracking-wider text-[10px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Academic Term</label>
                      <input
                        type="text"
                        disabled
                        value="Spring Term 2026"
                        className="w-full px-5 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-500 font-medium text-sm focus:outline-none cursor-not-allowed"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Assigned Campus</label>
                      <input
                        type="text"
                        disabled
                        value="Central Core Campus"
                        className="w-full px-5 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-500 font-medium text-sm focus:outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* PREMIUM BUTTON WITH BUTTON-IN-BUTTON PATTERN */}
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-stone-100">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-stone-850 flex items-center gap-1">
                        <KeyRound className="w-3.5 h-3.5 text-stone-500" />
                        Credentials Secured
                      </span>
                      <span className="text-[10px] font-semibold text-stone-500 mt-0.5">Encrypted with standard academic JWT layers</span>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 bg-stone-900 hover:bg-stone-850 text-stone-100 hover:text-white rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center justify-between gap-4 group active:scale-[0.98] border border-stone-800 shadow-md shadow-stone-900/10"
                    >
                      <span>Update Credentials</span>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-all duration-300">
                        <ChevronRight className="w-4 h-4 text-stone-200" />
                      </div>
                    </button>
                  </div>

                </form>

                {savedSettings && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl text-xs font-bold animate-fade-in">
                    <BadgeCheck className="w-4 h-4" />
                    <span>Credentials logged successfully! Settings saved.</span>
                  </div>
                )}

              </div>
            </div>

            {/* FREQUENTLY ASKED ACCORDIONS - NO BORDERS, 1PX DIVIDERS */}
            <div className="mt-10 flex flex-col gap-6 px-4">
              <h4 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                <HelpCircle className="w-4 h-4 text-stone-500" />
                Frequently Asked Rules
              </h4>

              <div className="flex flex-col divide-y divide-stone-200/60 font-medium">
                <div className="py-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-1">What happens if a book is overdue?</h5>
                  <p className="text-stone-500 text-xs leading-relaxed">Compliance status shifts immediately to action required. Active borrowing privileges are paused on your account until overdue books are returned to the core campus counter.</p>
                </div>
                <div className="py-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-1">How can I extend checkout periods?</h5>
                  <p className="text-stone-500 text-xs leading-relaxed">Book extensions must be requested prior to due dates. Please contact library assistance or visit the registration counter in person to renew items.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default UserProfile;
