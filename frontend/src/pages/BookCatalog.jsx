import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Search, Book, User, Bookmark, Layers, AlertCircle, ShoppingBag, CheckCircle } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-6 py-10 relative">
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 border rounded-2xl shadow-2xl transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <span className="text-sm font-medium">{toast.text}</span>
        </div>
      )}

      <div className="text-center md:text-left md:flex md:items-center md:justify-between mb-10 pb-8 border-b border-slate-800/40">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-200 via-indigo-100 to-indigo-400 bg-clip-text text-transparent">
            Lumina Book Catalog
          </h1>
          <p className="text-slate-400 mt-2 text-sm md:text-base">
            Explore our curated inventory of tech, sciences, fantasy, and classics.
          </p>
        </div>

        <form onSubmit={handleSearch} className="mt-6 md:mt-0 flex gap-2 w-full md:max-w-md">
          <div className="relative flex-grow">
            <Search className="absolute inset-y-0 left-0 pl-3.5 w-5 h-5 text-slate-500 pointer-events-none mt-3.5" />
            <input
              type="text"
              placeholder="Search by title, author, isbn..."
              className="w-full pl-10 pr-4 py-3 bg-slate-900/40 border border-slate-800 focus:border-indigo-500/40 rounded-2xl text-sm placeholder-slate-500 focus:outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-2xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/20 transition-all active:scale-[0.98]"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-2.5 mb-10 overflow-x-auto pb-2">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => setSelectedGenre(g)}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium border transition-all duration-200 ${
              selectedGenre === g
                ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/40 shadow-md shadow-indigo-500/5'
                : 'bg-slate-900/30 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="glass-panel p-6 rounded-3xl h-64 animate-pulse bg-slate-900/10"></div>
          ))}
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-3xl border border-dashed border-slate-800 max-w-xl mx-auto">
          <Book className="w-12 h-12 text-slate-600 mx-auto mb-4 animate-bounce" />
          <h3 className="text-lg font-bold text-slate-300">No Books Found</h3>
          <p className="text-slate-500 text-sm mt-1">
            We couldn't find any books matching your current search parameters. Try expanding your query!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((b) => {
            const isAvailable = b.availableCopies > 0;
            return (
              <div
                key={b.id}
                className="glass-panel p-6 rounded-3xl flex flex-col justify-between hover:shadow-2xl hover:shadow-indigo-500/[0.03] hover:border-slate-700/40 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/[0.02] rounded-full blur-2xl group-hover:bg-indigo-500/[0.04] transition-colors"></div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg uppercase tracking-wider">
                      {b.genre}
                    </span>
                    <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg ${
                      isAvailable 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {isAvailable ? `${b.availableCopies} available` : 'Out of Stock'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-1">
                    {b.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-400 text-sm mt-1.5">
                    <User className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <span className="line-clamp-1">{b.author}</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-800/60 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Bookmark className="w-3.5 h-3.5" /> ISBN
                      </span>
                      <span className="font-mono text-slate-400">{b.isbn}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5" /> Total Inventory
                      </span>
                      <span className="text-slate-400">{b.totalCopies} copies</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  {user.role === 'STUDENT' ? (
                    <button
                      onClick={() => handleBorrow(b.id)}
                      disabled={!isAvailable || borrowingId === b.id}
                      className={`w-full py-3 rounded-2xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                        isAvailable
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/15 hover:shadow-indigo-500/20 active:scale-[0.98]'
                          : 'bg-slate-900/40 text-slate-600 border border-slate-800/40 cursor-not-allowed'
                      }`}
                    >
                      {borrowingId === b.id ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : !isAvailable ? (
                        'Out of Stock'
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Borrow Book</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="text-center text-xs text-slate-500 bg-slate-950/30 border border-slate-800/30 py-2.5 rounded-2xl font-medium">
                      Managed via Administrator Dashboard
                    </div>
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

export default BookCatalog;
