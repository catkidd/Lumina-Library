import { useState, useEffect } from 'react';
import api from '../services/api';
import { Plus, Edit2, Trash2, BookOpen, AlertTriangle, CheckSquare, RefreshCw, X, ShoppingBag, Users, Calendar } from 'lucide-react';

const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory');

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formIsbn, setFormIsbn] = useState('');
  const [formGenre, setFormGenre] = useState('');
  const [formTotalCopies, setFormTotalCopies] = useState(1);
  const [formErrors, setFormErrors] = useState({});

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [booksRes, transRes] = await Promise.all([
        api.get('/api/books'),
        api.get('/api/transactions'),
      ]);
      setBooks(booksRes.data);
      setTransactions(transRes.data);
    } catch {
      showToast('error', 'Failed to retrieve library catalog data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(() => {
      fetchData();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAddModal = () => {
    setModalMode('add');
    setSelectedBookId(null);
    setFormTitle('');
    setFormAuthor('');
    setFormIsbn('');
    setFormGenre('');
    setFormTotalCopies(1);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (book) => {
    setModalMode('edit');
    setSelectedBookId(book.id);
    setFormTitle(book.title);
    setFormAuthor(book.author);
    setFormIsbn(book.isbn);
    setFormGenre(book.genre);
    setFormTotalCopies(book.totalCopies);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formTitle.trim()) errors.title = 'Title is required';
    if (!formAuthor.trim()) errors.author = 'Author is required';
    if (!formIsbn.trim()) errors.isbn = 'ISBN is required';
    if (!formGenre.trim()) errors.genre = 'Genre is required';
    if (formTotalCopies < 0) errors.totalCopies = 'Copies cannot be negative';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      title: formTitle,
      author: formAuthor,
      isbn: formIsbn,
      genre: formGenre,
      totalCopies: parseInt(formTotalCopies, 10),
    };

    try {
      if (modalMode === 'add') {
        await api.post('/api/books', payload);
        showToast('success', `"${formTitle}" added to inventory successfully!`);
      } else {
        await api.put(`/api/books/${selectedBookId}`, payload);
        showToast('success', `"${formTitle}" updated successfully!`);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit form';
      showToast('error', msg);
    }
  };

  const handleDelete = async (bookId, title) => {
    if (!window.confirm(`Are you absolutely sure you want to delete "${title}"?`)) return;

    try {
      await api.delete(`/api/books/${bookId}`);
      showToast('success', `"${title}" has been removed from inventory.`);
      fetchData();
    } catch (err) {
      const msg = err.response?.data?.message || 'Could not delete book. It may have active borrowings.';
      showToast('error', msg);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const totalBooks = books.length;
  const activeBorrows = transactions.filter(t => t.status === 'ACTIVE' || t.status === 'OVERDUE').length;
  const overdueBorrows = transactions.filter(t => t.status === 'OVERDUE').length;
  const uniqueReaders = new Set(transactions.map(t => t.userEmail)).size;

  return (
    <div className="relative min-h-[100dvh] bg-[#030303] text-stone-100 font-sans py-24 px-6 md:px-12 select-none overflow-hidden">
      
      {/* Cinematic Radial Mesh Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Dynamic Toast System */}
      {toast && (
        <div className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 border rounded-[calc(1.5rem-4px)] shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] animate-bounce ${
          toast.type === 'success' 
            ? 'bg-stone-900/90 border-emerald-500/30 text-emerald-400 backdrop-blur-md' 
            : 'bg-stone-900/90 border-rose-500/30 text-rose-400 backdrop-blur-md'
        }`}>
          {toast.type === 'success' ? <CheckSquare className="w-4 h-4 stroke-[1.5] flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 stroke-[1.5] flex-shrink-0" />}
          <span className="text-xs font-bold tracking-wider">{toast.text}</span>
        </div>
      )}

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Header Block - Spatial Rhythm & Eyebrow Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/5">
          <div className="flex flex-col">
            <span className="rounded-full px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-semibold bg-white/5 text-stone-400 border border-white/10 w-max mb-4">
              Administrative Console
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white font-sans leading-tight">
              Control Panel
            </h1>
            <p className="text-stone-400 text-sm font-medium mt-3 max-w-[65ch] leading-relaxed">
              Overview active inventory, manage title metadata catalogs, and supervise global checkout transactions.
            </p>
          </div>
          
          <button
            onClick={fetchData}
            className="p-3.5 bg-stone-950 hover:bg-stone-900 border border-white/10 hover:border-white/20 text-stone-400 hover:text-white rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96]"
            title="Refresh Logs"
          >
            <RefreshCw className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Double-Bezel Bento Grid Metrics Panels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Panel 1: Cataloged */}
          <div className="group bg-white/5 p-1.5 rounded-2xl border border-white/5 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/10 hover:scale-[1.01]">
            <div className="bg-stone-950/80 backdrop-blur-md p-6 rounded-[calc(1rem-0.125rem)] border border-white/5 flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400">Total Cataloged</span>
                <BookOpen className="w-4 h-4 stroke-[1.5] text-stone-400 group-hover:text-indigo-400 transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3.5xl font-black tracking-tight text-white font-mono">{totalBooks}</span>
                <span className="text-[10px] text-stone-500 font-medium">Distinct cataloged volumes</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Circulation */}
          <div className="group bg-white/5 p-1.5 rounded-2xl border border-white/5 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/10 hover:scale-[1.01]">
            <div className="bg-stone-950/80 backdrop-blur-md p-6 rounded-[calc(1rem-0.125rem)] border border-white/5 flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400">Circulation Out</span>
                <ShoppingBag className="w-4 h-4 stroke-[1.5] text-stone-400 group-hover:text-amber-400 transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3.5xl font-black tracking-tight text-white font-mono">{activeBorrows}</span>
                <span className="text-[10px] text-stone-500 font-medium">Active borrowings register</span>
              </div>
            </div>
          </div>

          {/* Panel 3: Overdue */}
          <div className="group bg-white/5 p-1.5 rounded-2xl border border-white/5 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/10 hover:scale-[1.01]">
            <div className="bg-stone-950/80 backdrop-blur-md p-6 rounded-[calc(1rem-0.125rem)] border border-white/5 flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400">Overdue Logs</span>
                <AlertTriangle className="w-4 h-4 stroke-[1.5] text-stone-400 group-hover:text-rose-400 transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3.5xl font-black tracking-tight text-rose-400 font-mono">{overdueBorrows}</span>
                <span className="text-[10px] text-stone-500 font-medium">Requires immediate recovery</span>
              </div>
            </div>
          </div>

          {/* Panel 4: Registered Readers */}
          <div className="group bg-white/5 p-1.5 rounded-2xl border border-white/5 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-white/10 hover:scale-[1.01]">
            <div className="bg-stone-950/80 backdrop-blur-md p-6 rounded-[calc(1rem-0.125rem)] border border-white/5 flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-400">Registered Readers</span>
                <Users className="w-4 h-4 stroke-[1.5] text-stone-400 group-hover:text-emerald-400 transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3.5xl font-black tracking-tight text-white font-mono">{uniqueReaders}</span>
                <span className="text-[10px] text-stone-500 font-medium">Verified reader catalog profiles</span>
              </div>
            </div>
          </div>

        </div>

        {/* Tab Controls - Smooth Glass Navigation Pill */}
        <div className="flex p-1.5 bg-stone-950/90 border border-white/5 rounded-full w-max backdrop-blur-md self-center md:self-start">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-2.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              activeTab === 'inventory'
                ? 'bg-white text-black shadow-lg shadow-white/5'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Manage Inventory
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-2.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              activeTab === 'transactions'
                ? 'bg-white text-black shadow-lg shadow-white/5'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Transaction Logs
          </button>
        </div>

        {/* Core Workspace Sections */}
        {loading ? (
          <div className="bg-stone-950/40 p-2 rounded-2xl border border-white/5 animate-pulse">
            <div className="bg-stone-950 h-96 rounded-[calc(1rem-0.125rem)]"></div>
          </div>
        ) : activeTab === 'inventory' ? (
          
          <div className="flex flex-col gap-8">
            
            {/* Catalog Subheading & Add Action */}
            <div className="flex justify-between items-center px-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-white">Cataloged Library Titles</h3>
                <span className="text-xs text-stone-450 font-medium">Verify available inventory quantities below.</span>
              </div>
              
              {/* Button-in-Button CTA Architecture */}
              <button
                onClick={openAddModal}
                className="group pl-6 pr-2 py-2 bg-white text-black hover:bg-stone-100 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-4 active:scale-[0.98] border border-white"
              >
                <span>Add Title</span>
                <span className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  <Plus className="w-4 h-4 stroke-[2]" />
                </span>
              </button>
            </div>

            {/* Premium Double-Bezel Table Wrapper */}
            <div className="bg-white/5 p-2 rounded-2xl border border-white/5 shadow-2xl">
              <div className="bg-stone-950 rounded-[calc(1rem-0.25rem)] border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-stone-900/60 border-b border-white/5 text-stone-400 font-bold uppercase tracking-[0.15em] text-[9px]">
                        <th className="py-5 px-6">Book Title</th>
                        <th className="py-5 px-6">Author Name</th>
                        <th className="py-5 px-6">Genre / Tag</th>
                        <th className="py-5 px-6">ISBN Registry</th>
                        <th className="py-5 px-6 text-center">Circulation Stock</th>
                        <th className="py-5 px-6 text-right">Metadata Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-stone-200 font-medium">
                      {books.map((b) => (
                        <tr key={b.id} className="hover:bg-white/[0.02] transition-colors duration-300 group">
                          <td className="py-5 px-6 font-bold text-white text-sm font-sans">{b.title}</td>
                          <td className="py-5 px-6 text-stone-300">{b.author}</td>
                          <td className="py-5 px-6">
                            <span className="px-3 py-1 text-[9px] font-bold bg-white/5 border border-white/10 text-stone-300 rounded-full uppercase tracking-wider">
                              {b.genre}
                            </span>
                          </td>
                          <td className="py-5 px-6 font-mono text-[10px] text-stone-500">{b.isbn}</td>
                          <td className="py-5 px-6 text-center font-mono font-bold">
                            <span className={b.availableCopies === 0 ? 'text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20' : 'text-white'}>
                              {b.availableCopies}
                            </span>
                            <span className="text-stone-600 font-normal mx-1.5">/</span>
                            <span className="text-stone-500">{b.totalCopies}</span>
                          </td>
                          <td className="py-5 px-6 text-right">
                            <div className="flex justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => openEditModal(b)}
                                className="p-2 bg-stone-900 hover:bg-stone-850 border border-white/5 text-stone-400 hover:text-white rounded-full transition-all duration-500 active:scale-[0.94]"
                                title="Edit Entry"
                              >
                                <Edit2 className="w-3.5 h-3.5 stroke-[1.5]" />
                              </button>
                              <button
                                onClick={() => handleDelete(b.id, b.title)}
                                className="p-2 bg-stone-900 hover:bg-rose-950/20 border border-white/5 hover:border-rose-500/30 text-stone-450 hover:text-rose-400 rounded-full transition-all duration-500 active:scale-[0.94]"
                                title="Delete Entry"
                              >
                                <Trash2 className="w-3.5 h-3.5 stroke-[1.5]" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        ) : (
          
          <div className="flex flex-col gap-8">
            
            <div className="flex flex-col gap-1 px-2">
              <h3 className="text-lg font-bold text-white">Global Circulation Logs</h3>
              <span className="text-xs text-stone-450 font-medium">Verify structural borrow logs across student files.</span>
            </div>

            {/* Premium Double-Bezel Transactions Table Wrapper */}
            <div className="bg-white/5 p-2 rounded-2xl border border-white/5 shadow-2xl">
              <div className="bg-stone-950 rounded-[calc(1rem-0.25rem)] border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-stone-900/60 border-b border-white/5 text-stone-400 font-bold uppercase tracking-[0.15em] text-[9px]">
                        <th className="py-5 px-6">Student Account</th>
                        <th className="py-5 px-6">Book Title</th>
                        <th className="py-5 px-6">Checkout Date</th>
                        <th className="py-5 px-6">Due Registry Date</th>
                        <th className="py-5 px-6">Return Logged Date</th>
                        <th className="py-5 px-6 text-right">Circulation Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-stone-200 font-medium">
                      {transactions.map((t) => (
                        <tr key={t.id} className="hover:bg-white/[0.02] transition-colors duration-300">
                          <td className="py-5 px-6 font-bold text-white">{t.userEmail}</td>
                          <td className="py-5 px-6 font-bold text-stone-200 text-sm font-sans">{t.bookTitle}</td>
                          <td className="py-5 px-6 text-stone-400 font-mono text-[10px]">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 stroke-[1.5] text-stone-500" />
                              {formatDate(t.checkoutDate)}
                            </span>
                          </td>
                          <td className="py-5 px-6 text-stone-400 font-mono text-[10px]">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 stroke-[1.5] text-stone-500" />
                              {formatDate(t.dueDate)}
                            </span>
                          </td>
                          <td className="py-5 px-6 text-stone-400 font-mono text-[10px]">
                            {t.returnDate ? (
                              <span className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 w-max">
                                <Calendar className="w-3.5 h-3.5 stroke-[1.5]" />
                                {formatDate(t.returnDate)}
                              </span>
                            ) : (
                              <span className="text-stone-600 font-bold">-</span>
                            )}
                          </td>
                          <td className="py-5 px-6 text-right">
                            <span className={`px-3 py-1 text-[9px] font-bold border rounded-full uppercase tracking-wider ${
                              t.status === 'RETURNED'
                                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                : t.status === 'OVERDUE'
                                ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                : 'bg-sky-500/10 border-sky-500/20 text-sky-400'
                            }`}>
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* POPUP MODAL OVERLAY - Double Bezel & Glassmorphism */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/70 backdrop-blur-xl p-4">
          
          <div className="bg-white/5 p-1.5 w-full max-w-lg rounded-[2rem] border border-white/5 shadow-2xl relative">
            <div className="bg-stone-950 p-8 rounded-[calc(2rem-0.125rem)] border border-white/5 flex flex-col gap-6">
              
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 bg-stone-900 border border-white/10 text-stone-400 hover:text-white rounded-full transition-colors duration-300"
              >
                <X className="w-4 h-4 stroke-[1.5]" />
              </button>

              <h3 className="text-xl font-bold text-white border-b border-white/5 pb-4 mb-2">
                {modalMode === 'add' ? 'Add New Catalog Title' : 'Edit Catalog Title Metadata'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold">
                
                <div>
                  <label htmlFor="book-title" className="block text-stone-400 uppercase tracking-widest mb-2.5 text-[9px]">Book Title</label>
                  <input
                    id="book-title"
                    name="title"
                    type="text"
                    required
                    placeholder="e.g. Systems Design"
                    className="w-full px-4 py-3 bg-stone-900/50 border border-white/5 focus:border-indigo-500/50 rounded-xl text-white placeholder-stone-600 focus:outline-none transition-all text-sm font-medium focus:ring-1 focus:ring-indigo-500/30"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                  />
                  {formErrors.title && <span className="text-[10px] text-rose-450 mt-1 block">{formErrors.title}</span>}
                </div>

                <div>
                  <label htmlFor="book-author" className="block text-stone-400 uppercase tracking-widest mb-2.5 text-[9px]">Author Name</label>
                  <input
                    id="book-author"
                    name="author"
                    type="text"
                    required
                    placeholder="e.g. Martin Kleppmann"
                    className="w-full px-4 py-3 bg-stone-900/50 border border-white/5 focus:border-indigo-500/50 rounded-xl text-white placeholder-stone-600 focus:outline-none transition-all text-sm font-medium focus:ring-1 focus:ring-indigo-500/30"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                  />
                  {formErrors.author && <span className="text-[10px] text-rose-450 mt-1 block">{formErrors.author}</span>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="book-isbn" className="block text-stone-400 uppercase tracking-widest mb-2.5 text-[9px]">ISBN Registry</label>
                    <input
                      id="book-isbn"
                      name="isbn"
                      type="text"
                      required
                      placeholder="e.g. 978-1449373320"
                      className="w-full px-4 py-3 bg-stone-900/50 border border-white/5 focus:border-indigo-500/50 rounded-xl text-white placeholder-stone-600 focus:outline-none transition-all text-xs font-mono focus:ring-1 focus:ring-indigo-500/30"
                      value={formIsbn}
                      onChange={(e) => setFormIsbn(e.target.value)}
                    />
                    {formErrors.isbn && <span className="text-[10px] text-rose-450 mt-1 block">{formErrors.isbn}</span>}
                  </div>

                  <div>
                    <label htmlFor="book-genre" className="block text-stone-400 uppercase tracking-widest mb-2.5 text-[9px]">Genre / Classification</label>
                    <input
                      id="book-genre"
                      name="genre"
                      type="text"
                      required
                      placeholder="e.g. Distributed Systems"
                      className="w-full px-4 py-3 bg-stone-900/50 border border-white/5 focus:border-indigo-500/50 rounded-xl text-white placeholder-stone-600 focus:outline-none transition-all text-sm font-medium focus:ring-1 focus:ring-indigo-500/30"
                      value={formGenre}
                      onChange={(e) => setFormGenre(e.target.value)}
                    />
                    {formErrors.genre && <span className="text-[10px] text-rose-450 mt-1 block">{formErrors.genre}</span>}
                  </div>
                </div>

                <div>
                  <label htmlFor="book-copies" className="block text-stone-400 uppercase tracking-widest mb-2.5 text-[9px]">Total Stock Copies</label>
                  <input
                    id="book-copies"
                    name="totalCopies"
                    type="number"
                    required
                    min="0"
                    className="w-full px-4 py-3 bg-stone-900/50 border border-white/5 focus:border-indigo-500/50 rounded-xl text-white placeholder-stone-600 focus:outline-none transition-all text-sm font-medium focus:ring-1 focus:ring-indigo-500/30"
                    value={formTotalCopies}
                    onChange={(e) => setFormTotalCopies(e.target.value)}
                  />
                  {formErrors.totalCopies && <span className="text-[10px] text-rose-450 mt-1 block">{formErrors.totalCopies}</span>}
                </div>

                {/* Confirm / Cancel Actions */}
                <div className="flex gap-4 mt-8 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-1/2 py-3 bg-stone-900 hover:bg-stone-850 text-stone-450 hover:text-white border border-white/5 rounded-full font-bold uppercase tracking-wider transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3 bg-white hover:bg-stone-100 text-black border border-white rounded-full font-bold uppercase tracking-wider transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96]"
                  >
                    Confirm Registry
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
