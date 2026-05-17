import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Search, Book, User, Bookmark, Layers, AlertCircle, ShoppingBag, CheckCircle, ArrowRight } from 'lucide-react';

const BookCatalog = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [genres, setGenres] = useState(['All']);
  
  const [loading, setLoading] = useState(true);
  const [borrowingId, setBorrowingId] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/books');
      setBooks(res.data);
      
      const uniqueGenres = ['All', ...new Set(res.data.map((b) => b.genre))];
      setGenres(uniqueGenres);
    } catch {
      showToast('error', 'Failed to fetch book catalog');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchBooks();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.get(`/api/books/search?q=${searchQuery}`);
      setBooks(res.data);
    } catch {
      showToast('error', 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery === '') {
      Promise.resolve().then(() => {
        fetchBooks();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleBorrow = async (bookId) => {
    setBorrowingId(bookId);
    try {
      const res = await api.post('/api/books/borrow', { bookId });
      showToast('success', `Successfully checked out "${res.data.bookTitle}"! Due in 14 days.`);
      fetchBooks();
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not borrow book';
      showToast('error', msg);
    } finally {
      setBorrowingId(null);
    }
  };

  const filteredBooks = books.filter(
    (b) => selectedGenre === 'All' || b.genre.toLowerCase() === selectedGenre.toLowerCase()
  );

  return (
    <div className="relative min-h-[100dvh] bg-[#fbfaf6] text-stone-800 font-sans selection:bg-amber-100/80 select-none py-20 px-6 after:fixed after:inset-0 after:z-40 after:opacity-[0.02] after:pointer-events-none after:bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.8%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22/%3E%3C/svg%3E')]">
      
      {/* TOAST SYSTEM (Double Bezel Aesthetic) */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-[100] bg-[#f2efe8]/90 p-1 rounded-[1.5rem] border border-stone-200/50 shadow-2xl backdrop-blur-md animate-slide-up">
          <div className={`px-5 py-4 rounded-[calc(1.5rem-0.25rem)] flex items-center gap-3 bg-white font-bold text-xs uppercase tracking-wider ${
            toast.type === 'success' ? 'text-emerald-700' : 'text-amber-800'
          }`}>
            {toast.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-amber-700" />}
            <span>{toast.text}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 relative z-10">
        
        {/* HEADER & EXPANSIVE SEARCH */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-stone-200/50">
          <div className="flex flex-col gap-3">
            <span className="text-amber-800 text-[9px] font-bold uppercase tracking-[0.25em]">Catalog Index</span>
            <h1 className="font-serif font-extrabold text-4xl tracking-tight text-stone-900">
              Lumina Book Catalog
            </h1>
            <p className="text-stone-600 text-sm max-w-md font-medium leading-relaxed">
              Explore our curated inventory of tech, sciences, software engineering, and classical computing.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex gap-3 w-full lg:max-w-md items-center">
            <div className="relative flex-grow flex items-center bg-[#f2efe8]/80 p-1.5 rounded-[1.8rem] border border-stone-200/50 shadow-inner w-full">
              <Search className="w-4 h-4 text-stone-450 absolute left-5" />
              <input
                type="text"
                placeholder="Search by title, author, isbn..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-transparent focus:outline-none rounded-[calc(1.8rem-0.375rem)] text-xs font-semibold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-stone-100 hover:text-white text-xs font-bold rounded-2xl transition-all duration-300 active:scale-[0.97] uppercase tracking-wider shadow-sm border border-indigo-500"
            >
              Search
            </button>
          </form>
        </div>

        {/* GENRE TAG FILTERS (Concentric borders) */}
        <div className="flex flex-wrap gap-2 pb-2">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold border uppercase tracking-wider transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                selectedGenre === g
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/10'
                  : 'bg-white text-stone-605 border-stone-200 hover:bg-stone-50 hover:text-indigo-605'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* BOOK CARDS OR PLACES */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-[#f2efe8]/50 p-2 rounded-[2.2rem] h-72 animate-pulse">
                <div className="bg-white rounded-[calc(2.2rem-0.5rem)] h-full w-full"></div>
              </div>
            ))}
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="bg-[#f2efe8]/80 p-2 rounded-[2.2rem] border border-stone-200/50 max-w-xl mx-auto w-full mt-10">
            <div className="bg-white p-12 text-center rounded-[calc(2.2rem-0.5rem)] shadow-inner space-y-4">
              <Book className="w-10 h-10 text-stone-400 mx-auto stroke-[1.2]" />
              <h3 className="text-base font-bold text-stone-855 uppercase tracking-wider">No Books Found</h3>
              <p className="text-stone-600 text-xs leading-relaxed font-medium">
                We couldn't find any books matching your current search parameters. Try expanding your search terms!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((b) => {
              const isAvailable = b.availableCopies > 0;
              return (
                <div
                  key={b.id}
                  className="bg-[#f2efe8]/80 p-2 rounded-[2.2rem] border border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-transform duration-700 hover:scale-[1.01] flex flex-col justify-between group"
                >
                  <div className="bg-white p-7 rounded-[calc(2.2rem-0.5rem)] flex flex-col justify-between h-full relative overflow-hidden shadow-[0_20px_40px_-15px_rgba(139,120,95,0.05)]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-stone-100/10 rounded-full blur-2xl pointer-events-none"></div>

                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 text-[8px] font-bold bg-stone-105 text-stone-600 border border-stone-200 rounded-full uppercase tracking-wider">
                          {b.genre}
                        </span>
                        <span className={`px-3 py-1 text-[8px] font-bold rounded-full uppercase tracking-wider border ${
                          isAvailable 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' 
                            : 'bg-amber-50 text-amber-800 border-amber-200/60'
                        }`}>
                          {isAvailable ? `${b.availableCopies} available` : 'Out of Stock'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h3 className="text-xl font-serif font-extrabold text-stone-900 leading-tight">
                          {b.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-stone-600 text-xs font-semibold">
                          <User className="w-3.5 h-3.5 text-stone-400 stroke-[1.5]" />
                          <span>{b.author}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-stone-100 space-y-3 text-xs font-medium">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[8px] text-stone-450">
                            <Bookmark className="w-3.5 h-3.5 text-stone-400 stroke-[1.5]" /> ISBN
                          </span>
                          <span className="font-mono text-stone-750 font-bold">{b.isbn}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[8px] text-stone-450">
                            <Layers className="w-3.5 h-3.5 text-stone-400 stroke-[1.5]" /> Total Copies
                          </span>
                          <span className="text-stone-750 font-bold">{b.totalCopies} copies</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100">
                      {user.role === 'STUDENT' ? (
                        <button
                          onClick={() => handleBorrow(b.id)}
                          disabled={!isAvailable || borrowingId === b.id}
                          className={`w-full py-4 rounded-full text-xs font-bold flex items-center justify-center gap-3 transition-all duration-300 uppercase tracking-widest border ${
                            isAvailable
                              ? 'bg-indigo-600 hover:bg-indigo-700 text-stone-100 hover:text-white border-indigo-500 shadow-md active:scale-[0.98]'
                              : 'bg-stone-50 text-stone-400 border border-stone-200 cursor-not-allowed'
                          }`}
                        >
                          {borrowingId === b.id ? (
                            <div className="w-4 h-4 border-2 border-stone-200 border-t-indigo-600 rounded-full animate-spin"></div>
                          ) : !isAvailable ? (
                            'Out of Stock'
                          ) : (
                            <>
                              <span>Borrow Book</span>
                              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <ArrowRight className="w-3 h-3 text-stone-100" />
                              </div>
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="text-center text-[9px] text-stone-500 bg-stone-50 border border-stone-200/50 py-2.5 rounded-full font-bold uppercase tracking-wider">
                          Managed via Admin Panel
                        </div>
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

export default BookCatalog;
