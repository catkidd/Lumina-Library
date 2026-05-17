import { useState, useEffect } from 'react';
import api from '../services/api';
import { Calendar, CheckSquare, AlertTriangle, RefreshCw, BookOpen, User, CheckCircle } from 'lucide-react';

const BorrowHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/transactions/my');
      setTransactions(res.data);
    } catch {
      showToast('error', 'Failed to retrieve borrowing history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchHistory();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReturn = async (transactionId) => {
    setReturningId(transactionId);
    try {
      await api.post('/api/books/return', { transactionId });
      showToast('success', 'Book successfully returned and inventory restocked!');
      fetchHistory();
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not process book return';
      showToast('error', msg);
    } finally {
      setReturningId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const calculateDaysRemaining = (dueDateString, status) => {
    if (status === 'RETURNED') return 0;
    const due = new Date(dueDateString);
    const now = new Date();
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#fbfaf6] text-stone-800 font-sans selection:bg-amber-100/80 select-none py-20 px-6 after:fixed after:inset-0 after:z-40 after:opacity-[0.02] after:pointer-events-none after:bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.8%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22/%3E%3C/svg%3E')]">
      
      {/* TOAST SYSTEM (Double Bezel Aesthetic) */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[100] bg-[#f2efe8]/90 p-1 rounded-[1.5rem] border border-stone-200/50 shadow-2xl backdrop-blur-md animate-slide-up">
          <div className={`px-5 py-4 rounded-[calc(1.5rem-0.25rem)] flex items-center gap-3 bg-white font-bold text-xs uppercase tracking-wider ${
            toast.type === 'success' ? 'text-emerald-700' : 'text-amber-850'
          }`}>
            {toast.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-705" />}
            <span>{toast.text}</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto w-full flex flex-col gap-12 relative z-10">
        
        {/* HEADER BLOCK */}
        <div className="flex items-center justify-between pb-8 border-b border-stone-200/50 gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-amber-800 text-[9px] font-bold uppercase tracking-[0.25em]">Borrowing History</span>
            <h1 className="font-serif font-extrabold text-4xl tracking-tight text-stone-900 leading-none">
              My Borrowing History
            </h1>
            <p className="text-stone-605 text-sm font-medium leading-relaxed">
              Monitor active checkouts, overdue dates, and past transaction records.
            </p>
          </div>
          <button
            onClick={fetchHistory}
            className="p-3 bg-white hover:bg-stone-50 text-stone-605 hover:text-stone-900 border border-stone-200 rounded-2xl shadow-sm transition-colors active:scale-[0.97]"
            title="Refresh History"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* LOG LIST */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2].map((n) => (
              <div key={n} className="bg-[#f2efe8]/50 p-2 rounded-[2.2rem] h-36 animate-pulse">
                <div className="bg-white rounded-[calc(2.2rem-0.5rem)] h-full w-full"></div>
              </div>
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-[#f2efe8]/80 p-2 rounded-[2.2rem] border border-stone-200/50 max-w-xl mx-auto w-full mt-10">
            <div className="bg-white p-12 text-center rounded-[calc(2.2rem-0.5rem)] shadow-inner space-y-4">
              <BookOpen className="w-10 h-10 text-stone-400 mx-auto stroke-[1.2]" />
              <h3 className="text-base font-bold text-stone-850 uppercase tracking-wider">No Transactions Found</h3>
              <p className="text-stone-600 text-xs leading-relaxed font-medium">
                You haven't borrowed any books from our catalog yet. Go to the Catalog tab to choose your first book!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {transactions.map((t) => {
              const daysRemaining = calculateDaysRemaining(t.dueDate, t.status);
              const isOverdue = t.status === 'OVERDUE' || (t.status === 'ACTIVE' && daysRemaining < 0);
              
              const progressPercent = t.status === 'RETURNED'
                ? 100
                : Math.max(0, Math.min(100, ((14 - Math.max(0, daysRemaining)) / 14) * 100));

              return (
                <div
                  key={t.id}
                  className="bg-[#f2efe8]/80 p-2 rounded-[2.2rem] border border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.01)] transition-transform duration-700 hover:scale-[1.005]"
                >
                  <div className="bg-white p-7 rounded-[calc(2.2rem-0.5rem)] flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-[0_20px_40px_-15px_rgba(139,120,95,0.05)]">
                    
                    <div className="flex-grow min-w-0 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-serif font-extrabold text-stone-900 leading-tight">{t.bookTitle}</h3>
                        <span className={`px-2.5 py-0.5 text-[8px] font-bold border rounded-md uppercase tracking-wider ${
                          t.status === 'RETURNED'
                            ? 'bg-emerald-50 border border-emerald-200/60 text-emerald-700'
                            : isOverdue
                            ? 'bg-amber-50 border border-amber-200/60 text-amber-800'
                            : 'bg-stone-50 border border-stone-200 text-stone-700'
                        }`}>
                          {t.status === 'RETURNED' ? 'RETURNED' : isOverdue ? 'OVERDUE' : 'ACTIVE'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-stone-605 text-xs font-semibold">
                        <User className="w-3.5 h-3.5 text-stone-400 stroke-[1.5]" />
                        <span>{t.bookAuthor}</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-medium">
                        <div>
                          <span className="block text-stone-400 font-bold uppercase tracking-wider text-[8px] mb-0.5">Checkout Date</span>
                          <span className="flex items-center gap-1.5 text-stone-750 font-bold">
                            <Calendar className="w-3.5 h-3.5 text-stone-400 stroke-[1.5]" />
                            {formatDate(t.checkoutDate)}
                          </span>
                        </div>

                        <div>
                          <span className="block text-stone-400 font-bold uppercase tracking-wider text-[8px] mb-0.5">Due Date</span>
                          <span className="flex items-center gap-1.5 text-stone-750 font-bold">
                            <Calendar className="w-3.5 h-3.5 text-stone-400 stroke-[1.5]" />
                            {formatDate(t.dueDate)}
                          </span>
                        </div>

                        {t.returnDate && (
                          <div>
                            <span className="block text-stone-400 font-bold uppercase tracking-wider text-[8px] mb-0.5">Returned Date</span>
                            <span className="flex items-center gap-1.5 text-stone-750 font-bold">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 stroke-[1.5]" />
                              {formatDate(t.returnDate)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-6 lg:w-64 flex-shrink-0">
                      {t.status !== 'RETURNED' && (
                        <div className="w-full">
                          <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                            <span className="text-stone-450 font-bold uppercase tracking-wider text-[8px]">Borrow Period</span>
                            <span className={`font-bold ${isOverdue ? 'text-amber-800 animate-pulse' : 'text-stone-750'}`}>
                              {daysRemaining < 0
                                ? `Overdue by ${Math.abs(daysRemaining)} days`
                                : `${daysRemaining} days remaining`}
                            </span>
                          </div>
                          <div className="w-full h-1 bg-stone-100 rounded-full overflow-hidden border border-stone-200/50">
                            <div
                              className={`h-full rounded-full transition-all duration-300 ${
                                isOverdue ? 'bg-amber-700' : 'bg-stone-900'
                              }`}
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {t.status !== 'RETURNED' && (
                        <button
                          onClick={() => handleReturn(t.id)}
                          disabled={returningId === t.id}
                          className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-750 hover:text-stone-950 border border-stone-200 hover:border-stone-300 text-xs font-bold uppercase tracking-widest rounded-full flex items-center justify-center gap-2 transition-all active:scale-[0.98] w-full shadow-sm"
                        >
                          {returningId === t.id ? (
                            <div className="w-4 h-4 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
                          ) : (
                            <>
                              <CheckSquare className="w-3.5 h-3.5 text-stone-500" />
                              <span>Return Book</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowHistory;
