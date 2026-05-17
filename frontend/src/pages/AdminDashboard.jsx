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
      showToast('error', 'Failed to retrieve administrative datasets.');
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
    <div className="max-w-7xl mx-auto px-6 py-10 relative font-body select-none">
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 border rounded-2xl shadow-2xl transition-all duration-300 ${
          toast.type === 'success' 
            ? 'bg-emerald-50 border border-emerald-200/60 text-emerald-600' 
            : 'bg-rose-50 border border-rose-200/60 text-rose-600'
        }`}>
          {toast.type === 'success' ? <CheckSquare className="w-5 h-5 flex-shrink-0" /> : <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
          <span className="text-sm font-bold">{toast.text}</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200/60">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-serif">
            Admin Management Console
          </h1>
          <p className="text-slate-600 mt-1.5 text-sm">
            Control library systems, oversee inventory, and review borrow logs.
          </p>
        </div>
        <button
          onClick={fetchData}
          className="p-3 bg-white hover:bg-slate-100/50 text-slate-600 hover:text-indigo-600 border border-slate-200 rounded-xl shadow-sm transition-all"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* METRIC CARD PANELS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="bg-white/80 border border-slate-200/80 p-5 rounded-2xl relative overflow-hidden group shadow-md">
          <BookOpen className="w-8 h-8 text-indigo-600 mb-3" />
          <span className="block text-slate-500 text-[10px] font-bold uppercase tracking-wider">Total Titles</span>
          <span className="block text-2xl font-extrabold text-slate-900 mt-1 font-serif">{totalBooks}</span>
        </div>

        <div className="bg-white/80 border border-slate-200/80 p-5 rounded-2xl relative overflow-hidden group shadow-md">
          <ShoppingBag className="w-8 h-8 text-emerald-600 mb-3" />
          <span className="block text-slate-500 text-[10px] font-bold uppercase tracking-wider">Active Borrows</span>
          <span className="block text-2xl font-extrabold text-slate-900 mt-1 font-serif">{activeBorrows}</span>
        </div>

        <div className="bg-white/80 border border-slate-200/80 p-5 rounded-2xl relative overflow-hidden group shadow-md">
          <AlertTriangle className="w-8 h-8 text-rose-600 mb-3" />
          <span className="block text-slate-500 text-[10px] font-bold uppercase tracking-wider">Overdue Items</span>
          <span className="block text-2xl font-extrabold text-slate-900 mt-1 font-serif">{overdueBorrows}</span>
        </div>

        <div className="bg-white/80 border border-slate-200/80 p-5 rounded-2xl relative overflow-hidden group shadow-md">
          <Users className="w-8 h-8 text-indigo-600 mb-3" />
          <span className="block text-slate-500 text-[10px] font-bold uppercase tracking-wider">Registered Readers</span>
          <span className="block text-2xl font-extrabold text-slate-900 mt-1 font-serif">{uniqueReaders}</span>
        </div>
      </div>

      <div className="flex gap-4 mb-8 border-b border-slate-200 pb-px">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`py-3 px-1 border-b-2 font-bold text-xs uppercase tracking-wider transition-all ${
            activeTab === 'inventory'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-indigo-600'
          }`}
        >
          Manage Inventory
        </button>
        <button
          onClick={() => setActiveTab('transactions')}
          className={`py-3 px-1 border-b-2 font-bold text-xs uppercase tracking-wider transition-all ${
            activeTab === 'transactions'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-indigo-600'
          }`}
        >
          System Transaction Logs
        </button>
      </div>

      {loading ? (
        <div className="bg-slate-200/40 border border-slate-200/60 p-8 rounded-3xl h-96 animate-pulse"></div>
      ) : activeTab === 'inventory' ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-950 font-serif">Cataloged Books</h3>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest rounded-2xl shadow-md hover:shadow-indigo-500/10 border border-indigo-400/20 transition-all active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Book</span>
            </button>
          </div>

          <div className="bg-white/80 border border-slate-200/80 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-4 px-6">Book Title</th>
                    <th className="py-4 px-6">Author</th>
                    <th className="py-4 px-6">Genre</th>
                    <th className="py-4 px-6">ISBN</th>
                    <th className="py-4 px-6 text-center">Stock (Avail / Total)</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                  {books.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-extrabold text-slate-900 font-serif">{b.title}</td>
                      <td className="py-4 px-6">{b.author}</td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-200/60 rounded uppercase tracking-wider">
                          {b.genre}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-600">{b.isbn}</td>
                      <td className="py-4 px-6 text-center font-bold text-slate-800">
                        <span className={b.availableCopies === 0 ? 'text-rose-600' : 'text-slate-800'}>
                          {b.availableCopies}
                        </span>
                        <span className="text-slate-400"> / </span>
                        <span>{b.totalCopies}</span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openEditModal(b)}
                            className="p-2 bg-indigo-50 hover:bg-indigo-100/85 text-indigo-600 border border-indigo-200/50 rounded-xl transition-all shadow-sm"
                            title="Edit Title"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(b.id, b.title)}
                            className="p-2 bg-rose-50 hover:bg-rose-100/85 text-rose-600 border border-rose-200/50 rounded-xl transition-all shadow-sm"
                            title="Delete Title"
                          >
                            <Trash2 className="w-4 h-4" />
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
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-950 font-serif">Global System Checkouts</h3>
          </div>

          <div className="bg-white/80 border border-slate-200/80 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-4 px-6">Reader Email</th>
                    <th className="py-4 px-6">Book Title</th>
                    <th className="py-4 px-6">Checkout Date</th>
                    <th className="py-4 px-6">Due Date</th>
                    <th className="py-4 px-6">Return Date</th>
                    <th className="py-4 px-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 text-slate-700 font-medium">
                  {transactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-800">{t.userEmail}</td>
                      <td className="py-4 px-6 font-extrabold text-slate-900 font-serif">{t.bookTitle}</td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                          {formatDate(t.checkoutDate)}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                          {formatDate(t.dueDate)}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs">
                        {t.returnDate ? (
                          <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(t.returnDate)}
                          </span>
                        ) : (
                          <span className="text-slate-450 font-bold">-</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className={`px-2.5 py-0.5 text-[10px] font-bold border rounded-md uppercase tracking-wider ${
                          t.status === 'RETURNED'
                            ? 'bg-emerald-50 border border-emerald-200/60 text-emerald-600'
                            : t.status === 'OVERDUE'
                            ? 'bg-rose-50 border border-rose-200/60 text-rose-600 animate-pulse'
                            : 'bg-indigo-50 border border-indigo-200/60 text-indigo-600'
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

      {/* POPUP CREATION/EDIT MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl p-6 relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-slate-900 font-serif mb-6">
              {modalMode === 'add' ? 'Add New Title' : 'Edit Title Information'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="book-title" className="block text-slate-750 text-xs font-bold uppercase tracking-wider mb-2">Book Title</label>
                <input
                  id="book-title"
                  name="title"
                  type="text"
                  required
                  placeholder="e.g. Clean Code"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-sm font-medium shadow-sm"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                />
                {formErrors.title && <span className="text-xs text-rose-600 font-bold mt-1 block">{formErrors.title}</span>}
              </div>

              <div>
                <label htmlFor="book-author" className="block text-slate-750 text-xs font-bold uppercase tracking-wider mb-2">Author Name</label>
                <input
                  id="book-author"
                  name="author"
                  type="text"
                  required
                  placeholder="e.g. Robert C. Martin"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-sm font-medium shadow-sm"
                  value={formAuthor}
                  onChange={(e) => setFormAuthor(e.target.value)}
                />
                {formErrors.author && <span className="text-xs text-rose-600 font-bold mt-1 block">{formErrors.author}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="book-isbn" className="block text-slate-750 text-xs font-bold uppercase tracking-wider mb-2">ISBN Number</label>
                  <input
                    id="book-isbn"
                    name="isbn"
                    type="text"
                    required
                    placeholder="e.g. 978-0132350884"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-sm font-mono font-bold shadow-sm"
                    value={formIsbn}
                    onChange={(e) => setFormIsbn(e.target.value)}
                  />
                  {formErrors.isbn && <span className="text-xs text-rose-600 font-bold mt-1 block">{formErrors.isbn}</span>}
                </div>

                <div>
                  <label htmlFor="book-genre" className="block text-slate-750 text-xs font-bold uppercase tracking-wider mb-2">Genre / Tag</label>
                  <input
                    id="book-genre"
                    name="genre"
                    type="text"
                    required
                    placeholder="e.g. Technology"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-sm font-medium shadow-sm"
                    value={formGenre}
                    onChange={(e) => setFormGenre(e.target.value)}
                  />
                  {formErrors.genre && <span className="text-xs text-rose-600 font-bold mt-1 block">{formErrors.genre}</span>}
                </div>
              </div>

              <div>
                <label htmlFor="book-copies" className="block text-slate-750 text-xs font-bold uppercase tracking-wider mb-2">Total Copies</label>
                <input
                  id="book-copies"
                  name="totalCopies"
                  type="number"
                  required
                  min="0"
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none transition-all text-sm font-medium shadow-sm"
                  value={formTotalCopies}
                  onChange={(e) => setFormTotalCopies(e.target.value)}
                />
                {formErrors.totalCopies && <span className="text-xs text-rose-600 font-bold mt-1 block">{formErrors.totalCopies}</span>}
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-3 bg-white hover:bg-slate-50 text-slate-700 hover:text-indigo-600 border border-slate-200 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-[0.98] shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-[0.98] shadow-md border border-indigo-400/20"
                >
                  {modalMode === 'add' ? 'Confirm Add' : 'Confirm Save'}
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
