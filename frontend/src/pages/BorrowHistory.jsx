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
      showToast('error', 'Failed to retrieve borrowing logs');
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
    <div className="max-w-6xl mx-auto px-6 py-10 relative font-body select-none">
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 border rounded-2xl shadow-2xl transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-emerald-50 border border-emerald-200/60 text-emerald-600' 
            : 'bg-rose-50 border border-rose-200/60 text-rose-600'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
          <span className="text-sm font-bold">{toast.text}</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-200/60">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-serif">
            My Borrowing Logs
          </h1>
          <p className="text-slate-600 mt-1.5 text-sm">
            Monitor active checkouts, overdue dates, and past transaction records.
          </p>
        </div>
        <button
          onClick={fetchHistory}
          className="p-3 bg-white hover:bg-slate-100/50 text-slate-600 hover:text-indigo-600 border border-slate-200 rounded-xl shadow-sm transition-all"
          title="Refresh History"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="bg-slate-200/40 border border-slate-200/60 p-6 rounded-3xl h-36 animate-pulse"></div>
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-200 p-12 text-center rounded-3xl max-w-xl mx-auto shadow-md">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800">No Transactions Found</h3>
          <p className="text-slate-600 text-sm mt-1">
            You haven't borrowed any books from our catalog yet. Go to the Catalog tab to choose your first volume!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {transactions.map((t) => {
            const daysRemaining = calculateDaysRemaining(t.dueDate, t.status);
            const isOverdue = t.status === 'OVERDUE' || (t.status === 'ACTIVE' && daysRemaining < 0);
            
            const progressPercent = t.status === 'RETURNED'
              ? 100
              : Math.max(0, Math.min(100, ((14 - Math.max(0, daysRemaining)) / 14) * 100));

            return (
              <div
                key={t.id}
                className="bg-white/80 border border-slate-200/80 p-6 rounded-3xl hover:border-slate-355 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md"
              >
                <div className="flex-grow min-w-0">
                  <div className="flex flex-wrap items-center gap-3.5 mb-3">
                    <h3 className="text-lg font-extrabold text-slate-900 line-clamp-1 font-serif">{t.bookTitle}</h3>
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold border rounded-md uppercase tracking-wider ${
                      t.status === 'RETURNED'
                        ? 'bg-emerald-50 border border-emerald-200/60 text-emerald-600'
                        : isOverdue
                        ? 'bg-rose-50 border border-rose-200/60 text-rose-600'
                        : 'bg-indigo-50 border border-indigo-200/60 text-indigo-600'
                    }`}>
                      {t.status === 'RETURNED' ? 'RETURNED' : isOverdue ? 'OVERDUE' : 'ACTIVE'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-600 text-sm mb-4 font-medium">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>{t.bookAuthor}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-0.5">Checkout Date</span>
                      <span className="flex items-center gap-1 text-slate-750 font-bold">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        {formatDate(t.checkoutDate)}
                      </span>
                    </div>

                    <div>
                      <span className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-0.5">Due Date</span>
                      <span className="flex items-center gap-1 text-slate-750 font-bold">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        {formatDate(t.dueDate)}
                      </span>
                    </div>

                    {t.returnDate && (
                      <div>
                        <span className="block text-slate-500 font-bold uppercase tracking-wider text-[10px] mb-0.5">Returned Date</span>
                        <span className="flex items-center gap-1 text-slate-750 font-bold">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          {formatDate(t.returnDate)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end justify-between gap-6 md:w-64 flex-shrink-0">
                  {t.status !== 'RETURNED' && (
                    <div className="w-full">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-slate-500 font-semibold">Borrow Period</span>
                        <span className={`font-bold ${isOverdue ? 'text-rose-600 animate-pulse' : 'text-slate-750'}`}>
                          {daysRemaining < 0
                            ? `Overdue by ${Math.abs(daysRemaining)} days`
                            : `${daysRemaining} days remaining`}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 border border-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            isOverdue ? 'bg-rose-500' : 'bg-indigo-500'
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
                      className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-300 text-xs font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] w-full shadow-sm"
                    >
                      {returningId === t.id ? (
                        <div className="w-4 h-4 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <CheckSquare className="w-4 h-4 text-emerald-600" />
                          <span>Return Book</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BorrowHistory;
