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
    <div className="relative min-h-[100dvh] bg-[#FFFFFF] text-[#111111] font-sans py-16 px-6 md:px-12 select-none">
      
      {/* Dynamic Toast System */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 border rounded-lg transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-[#EDF3EC] border-[#cce3cb] text-[#346538]' 
            : 'bg-[#FDEBEC] border-[#f5c6c6] text-[#9F2F2D]'
        }`}>
          {toast.type === 'success' ? <CheckSquare className="w-4 h-4 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 flex-shrink-0" />}
          <span className="text-xs font-bold tracking-wide">{toast.text}</span>
        </div>
      )}

      {/* Main Container constrained to Max width */}
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Header Block - Meticulous Spacing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#EAEAEA]">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#787774]">Administrative Console</span>
            <h1 className="text-3xl font-bold tracking-tight text-[#111111] font-serif leading-tight">
              Control Panel
            </h1>
            <p className="text-[#787774] text-xs font-medium max-w-[65ch]">
              Overview active inventory, manage title metadata catalogs, and supervise global checkout transactions.
            </p>
          </div>
          
          <button
            onClick={fetchData}
            className="p-2.5 bg-white hover:bg-stone-50 border border-[#EAEAEA] text-[#787774] hover:text-[#111111] rounded-lg transition-all active:scale-[0.98]"
            title="Refresh Logs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Bento Grid Metrics Panels - flat crisp boxes, no heavy shadows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-[#FBFBFA] border border-[#EAEAEA] p-6 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#787774]">Total Cataloged</span>
              <BookOpen className="w-4 h-4 text-[#787774]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold tracking-tight font-serif">{totalBooks}</span>
              <span className="text-[10px] text-[#787774] font-medium">Distinct digital & physical titles</span>
            </div>
          </div>

          <div className="bg-[#FBFBFA] border border-[#EAEAEA] p-6 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#787774]">Circulation Out</span>
              <ShoppingBag className="w-4 h-4 text-[#787774]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold tracking-tight font-serif">{activeBorrows}</span>
              <span className="text-[10px] text-[#787774] font-medium">Active loans in campus registry</span>
            </div>
          </div>

          <div className="bg-[#FBFBFA] border border-[#EAEAEA] p-6 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#787774]">Overdue Logs</span>
              <AlertTriangle className="w-4 h-4 text-[#787774]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold tracking-tight font-serif text-[#9F2F2D]">{overdueBorrows}</span>
              <span className="text-[10px] text-[#787774] font-medium">Requires immediate return alerts</span>
            </div>
          </div>

          <div className="bg-[#FBFBFA] border border-[#EAEAEA] p-6 rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#787774]">Registered Readers</span>
              <Users className="w-4 h-4 text-[#787774]" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold tracking-tight font-serif">{uniqueReaders}</span>
              <span className="text-[10px] text-[#787774] font-medium">Unique active student accounts</span>
            </div>
          </div>

        </div>

        {/* Tab Controls */}
        <div className="flex gap-6 border-b border-[#EAEAEA] pb-px">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-3.5 px-1.5 border-b-2 font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === 'inventory'
                ? 'border-[#111111] text-[#111111]'
                : 'border-transparent text-[#787774] hover:text-[#111111]'
            }`}
          >
            Manage Inventory
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-3.5 px-1.5 border-b-2 font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === 'transactions'
                ? 'border-[#111111] text-[#111111]'
                : 'border-transparent text-[#787774] hover:text-[#111111]'
            }`}
          >
            Transaction Logs
          </button>
        </div>

        {/* Core Workspace Sections */}
        {loading ? (
          <div className="bg-stone-50 border border-[#EAEAEA] rounded-xl h-96 animate-pulse"></div>
        ) : activeTab === 'inventory' ? (
          
          <div className="flex flex-col gap-6">
            
            {/* Catalog Subheading & Add Action */}
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-base font-bold text-[#111111] font-serif">Cataloged Library Titles</h3>
                <span className="text-[10px] text-[#787774] font-medium">Verify available inventory quantities below.</span>
              </div>
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 px-4 py-2.5 bg-[#111111] hover:bg-[#2A2A2A] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all active:scale-[0.98] border border-[#111111]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Title</span>
              </button>
            </div>

            {/* Crisp Flat Table Container */}
            <div className="bg-white border border-[#EAEAEA] rounded-xl overflow-hidden shadow-sm shadow-slate-100/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FBFBFA] border-b border-[#EAEAEA] text-[#787774] font-bold uppercase tracking-wider text-[9px]">
                      <th className="py-4 px-6">Book Title</th>
                      <th className="py-4 px-6">Author Name</th>
                      <th className="py-4 px-6">Genre / Tag</th>
                      <th className="py-4 px-6">ISBN Registry</th>
                      <th className="py-4 px-6 text-center">Circulation Stock</th>
                      <th className="py-4 px-6 text-right">Metadata Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAEAEA] text-[#111111] font-medium">
                    {books.map((b) => (
                      <tr key={b.id} className="hover:bg-[#FBFBFA]/50 transition-colors">
                        <td className="py-4 px-6 font-bold text-[#111111] text-sm font-serif">{b.title}</td>
                        <td className="py-4 px-6 text-[#2F3437]">{b.author}</td>
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 text-[9px] font-bold bg-[#FBF3DB] border border-[#f0dfb8] text-[#956400] rounded uppercase tracking-wider">
                            {b.genre}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-mono text-[10px] text-[#787774]">{b.isbn}</td>
                        <td className="py-4 px-6 text-center font-mono font-bold">
                          <span className={b.availableCopies === 0 ? 'text-[#9F2F2D] bg-[#FDEBEC] px-2 py-0.5 rounded border border-[#f5c6c6]' : 'text-[#111111]'}>
                            {b.availableCopies}
                          </span>
                          <span className="text-[#787774] font-normal mx-1">/</span>
                          <span className="text-[#787774]">{b.totalCopies}</span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => openEditModal(b)}
                              className="p-2 bg-white hover:bg-stone-50 border border-[#EAEAEA] text-[#787774] hover:text-[#111111] rounded-lg transition-colors shadow-none"
                              title="Edit Entry"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDelete(b.id, b.title)}
                              className="p-2 bg-white hover:bg-[#FDEBEC]/40 border border-[#EAEAEA] hover:border-[#f5c6c6] text-[#787774] hover:text-[#9F2F2D] rounded-lg transition-colors shadow-none"
                              title="Delete Entry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
        ) : (
          
          <div className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-0.5">
              <h3 className="text-base font-bold text-[#111111] font-serif">Global Circulation Logs</h3>
              <span className="text-[10px] text-[#787774] font-medium">Verify structural borrow logs across student files.</span>
            </div>

            <div className="bg-white border border-[#EAEAEA] rounded-xl overflow-hidden shadow-sm shadow-slate-100/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#FBFBFA] border-b border-[#EAEAEA] text-[#787774] font-bold uppercase tracking-wider text-[9px]">
                      <th className="py-4 px-6">Student Account</th>
                      <th className="py-4 px-6">Book Title</th>
                      <th className="py-4 px-6">Checkout Date</th>
                      <th className="py-4 px-6">Due Registry Date</th>
                      <th className="py-4 px-6">Return Logged Date</th>
                      <th className="py-4 px-6 text-right">Circulation Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAEAEA] text-[#111111] font-medium">
                    {transactions.map((t) => (
                      <tr key={t.id} className="hover:bg-[#FBFBFA]/50 transition-colors">
                        <td className="py-4 px-6 font-bold text-[#111111]">{t.userEmail}</td>
                        <td className="py-4 px-6 font-bold text-[#111111] text-sm font-serif">{t.bookTitle}</td>
                        <td className="py-4 px-6 text-[#787774] font-mono text-[10px]">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#787774]" />
                            {formatDate(t.checkoutDate)}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-[#787774] font-mono text-[10px]">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#787774]" />
                            {formatDate(t.dueDate)}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-[#787774] font-mono text-[10px]">
                          {t.returnDate ? (
                            <span className="flex items-center gap-1.5 text-[#346538] font-bold bg-[#EDF3EC] px-2 py-0.5 rounded border border-[#cce3cb] w-max">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(t.returnDate)}
                            </span>
                          ) : (
                            <span className="text-[#787774] font-bold">-</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className={`px-2.5 py-0.5 text-[9px] font-bold border rounded uppercase tracking-wider ${
                            t.status === 'RETURNED'
                              ? 'bg-[#EDF3EC] border-[#cce3cb] text-[#346538]'
                              : t.status === 'OVERDUE'
                              ? 'bg-[#FDEBEC] border-[#f5c6c6] text-[#9F2F2D]'
                              : 'bg-[#E1F3FE] border-[#bce3fc] text-[#1F6C9F]'
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
        )}

      </div>

      {/* POPUP MODAL OVERLAY - Flat clean boxes, crisp buttons */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/20 backdrop-blur-sm p-4">
          <div className="bg-white border border-[#EAEAEA] w-full max-w-lg rounded-xl p-6 relative shadow-lg">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#787774] hover:text-[#111111] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold text-[#111111] font-serif border-b border-[#EAEAEA] pb-3 mb-6">
              {modalMode === 'add' ? 'Add New Catalog Title' : 'Edit Catalog Title Metadata'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
              
              <div>
                <label htmlFor="book-title" className="block text-[#787774] uppercase tracking-wider mb-2 text-[9px]">Book Title</label>
                <input
                  id="book-title"
                  name="title"
                  type="text"
                  required
                  placeholder="e.g. Systems Design"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EAEAEA] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-lg text-[#111111] placeholder-stone-400 focus:outline-none transition-all text-sm font-medium shadow-none"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
                {formErrors.title && <span className="text-[10px] text-[#9F2F2D] mt-1 block">{formErrors.title}</span>}
              </div>

              <div>
                <label htmlFor="book-author" className="block text-[#787774] uppercase tracking-wider mb-2 text-[9px]">Author Name</label>
                <input
                  id="book-author"
                  name="author"
                  type="text"
                  required
                  placeholder="e.g. Martin Kleppmann"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EAEAEA] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-lg text-[#111111] placeholder-stone-400 focus:outline-none transition-all text-sm font-medium shadow-none"
                  value={formAuthor}
                  onChange={(e) => setFormAuthor(e.target.value)}
                />
                {formErrors.author && <span className="text-[10px] text-[#9F2F2D] mt-1 block">{formErrors.author}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="book-isbn" className="block text-[#787774] uppercase tracking-wider mb-2 text-[9px]">ISBN Registry</label>
                  <input
                    id="book-isbn"
                    name="isbn"
                    type="text"
                    required
                    placeholder="e.g. 978-1449373320"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EAEAEA] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-lg text-[#111111] placeholder-stone-400 focus:outline-none transition-all text-xs font-mono shadow-none"
                    value={formIsbn}
                    onChange={(e) => setFormIsbn(e.target.value)}
                  />
                  {formErrors.isbn && <span className="text-[10px] text-[#9F2F2D] mt-1 block">{formErrors.isbn}</span>}
                </div>

                <div>
                  <label htmlFor="book-genre" className="block text-[#787774] uppercase tracking-wider mb-2 text-[9px]">Genre / Classification</label>
                  <input
                    id="book-genre"
                    name="genre"
                    type="text"
                    required
                    placeholder="e.g. Distributed Systems"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EAEAEA] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-lg text-[#111111] placeholder-stone-400 focus:outline-none transition-all text-sm font-medium shadow-none"
                    value={formGenre}
                    onChange={(e) => setFormGenre(e.target.value)}
                  />
                  {formErrors.genre && <span className="text-[10px] text-[#9F2F2D] mt-1 block">{formErrors.genre}</span>}
                </div>
              </div>

              <div>
                <label htmlFor="book-copies" className="block text-[#787774] uppercase tracking-wider mb-2 text-[9px]">Total Stock Copies</label>
                <input
                  id="book-copies"
                  name="totalCopies"
                  type="number"
                  required
                  min="0"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EAEAEA] focus:border-[#111111] focus:ring-1 focus:ring-[#111111] rounded-lg text-[#111111] placeholder-stone-400 focus:outline-none transition-all text-sm font-medium shadow-none"
                  value={formTotalCopies}
                  onChange={(e) => setFormTotalCopies(e.target.value)}
                />
                {formErrors.totalCopies && <span className="text-[10px] text-[#9F2F2D] mt-1 block">{formErrors.totalCopies}</span>}
              </div>

              <div className="flex gap-4 mt-8 pt-4 border-t border-[#EAEAEA]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 bg-white hover:bg-stone-50 text-[#787774] hover:text-[#111111] border border-[#EAEAEA] rounded-lg font-bold uppercase tracking-wider transition-all active:scale-[0.98]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#111111] hover:bg-[#2A2A2A] text-white border border-[#111111] rounded-lg font-bold uppercase tracking-wider transition-all active:scale-[0.98]"
                >
                  Confirm Registry
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
