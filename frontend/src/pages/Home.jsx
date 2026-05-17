import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, BookOpen, Users, Globe, BookMarked, 
  MapPin, Clock, Calendar, ArrowRight, ChevronDown, 
  ChevronUp, Star, GraduationCap, Award, HelpCircle,
  MessageSquare, Library, Mail, Phone, CalendarDays
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openFaq, setOpenFaq] = useState(null);
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // High-fidelity local database of library books for instantaneous, satisfying search interactions
  const catalogDatabase = useMemo(() => [
    { id: 1, title: "The Art of Computer Programming", author: "Donald Knuth", category: "Computer Science", year: "2021", rating: 5, status: "Available", desc: "The definitive guide to classical computer science algorithms." },
    { id: 2, title: "Clean Architecture", author: "Robert C. Martin", category: "Software Engineering", year: "2017", rating: 5, status: "Available", desc: "A craftsman's guide to software structure and design." },
    { id: 3, title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Algorithms", year: "2022", rating: 4.8, status: "Borrowed", desc: "The standard academic reference for modern algorithms." },
    { id: 4, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "Systems Design", year: "2017", rating: 4.9, status: "Available", desc: "An exhaustive guide to data systems architecture." },
    { id: 5, title: "Quantum Computing: A Gentle Introduction", author: "Eleanor Rieffel", category: "Emerging Tech", year: "2011", rating: 4.6, status: "Available", desc: "A mathematical introduction to quantum information science." },
    { id: 6, title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", category: "AI / ML", year: "2020", rating: 4.9, status: "Available", desc: "The global gold standard textbook for AI." },
    { id: 7, title: "Compilers: Principles, Techniques, and Tools", author: "Alfred Aho", category: "Computer Science", year: "2006", rating: 4.7, status: "Available", desc: "The classic 'Dragon Book' on compiler design." },
    { id: 8, title: "Pattern Recognition and Machine Learning", author: "Christopher Bishop", category: "AI / ML", year: "2006", rating: 4.8, status: "Available", desc: "An excellent Bayesian-focused textbook on machine learning." }
  ], []);

  // Filter recommendations
  const recommendedBooks = useMemo(() => {
    if (activeCategory === 'All') return catalogDatabase.slice(0, 4);
    return catalogDatabase.filter(b => b.category === activeCategory).slice(0, 4);
  }, [activeCategory, catalogDatabase]);

  // Handle instant global search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return catalogDatabase.filter(b => 
      b.title.toLowerCase().includes(query) || 
      b.author.toLowerCase().includes(query) ||
      b.category.toLowerCase().includes(query)
    );
  }, [searchQuery, catalogDatabase]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (user) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/login', { state: { redirectSearch: searchQuery } });
    }
  };

  const handleBookClick = (book) => {
    if (user) {
      navigate('/catalog');
    } else {
      navigate('/login');
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscriberEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setSubscriberEmail('');
      }, 4000);
    }
  };

  // FAQ Data
  const faqs = [
    { q: "How do I register for a digital library card?", a: "Click the prominent 'Sign In / Register' button in the top navigation. Once registered, a student profile is automatically provisioned for borrowing." },
    { q: "What are the active borrowing rules and limits?", a: "Standard members can borrow up to 5 books simultaneously for 14 days. Fines accrue daily for overdue items, and you will receive automatic email reminders." },
    { q: "How do I access electronic journals and resources?", a: "Our premium E-Resources catalog is accessible to logged-in members. Navigate to the catalog page post-login and select the digital resources filter." },
    { q: "Can I reserve study rooms and research booths?", a: "Yes. Study rooms can be reserved dynamically through the Student Portal or requested directly at the central assistance counter." },
    { q: "Does the library support Interlibrary Loans (ILL)?", a: "Absolutely. If we don't possess a specific monograph or journal volume, our librarians will source it from cooperating partner systems at zero cost." }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0b0f19] text-slate-100 flex flex-col font-sans select-none pb-0">
      
      {/* GLOWING AMBIENT BACKGROUND ORBS */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center">
        
        {/* Category tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold tracking-wide mb-6 animate-fade-in shadow-inner">
          <GraduationCap className="w-4 h-4" />
          <span>WELCOME TO LUMINA ACADEMIC PORTAL</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl text-slate-100 mb-6 drop-shadow-sm font-sans">
          Your Gateway to <span className="bg-gradient-to-r from-indigo-400 via-indigo-200 to-indigo-500 bg-clip-text text-transparent">Infinite Knowledge</span> & Research
        </h1>

        {/* Tagline */}
        <p className="text-lg text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Unlock access to over 130,000 physical volumes, digital publications, journals, and high-tech academic study spaces inside a state-of-the-art learning portal.
        </p>

        {/* Global Search Bar */}
        <div className="w-full max-w-3xl relative z-40 mb-4">
          <form onSubmit={handleSearchSubmit} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-400 transition-colors">
              <Search className="w-6 h-6" />
            </div>
            <input
              type="text"
              placeholder="Search books, journals, authors, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-32 py-5 rounded-2xl glass-input text-lg focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/10 shadow-2xl transition-all duration-300"
            />
            <button
              type="submit"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold rounded-xl border border-indigo-400/20 shadow-lg hover:shadow-indigo-500/20 active:scale-98 transition-all duration-200 flex items-center gap-1.5"
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Instant Search Results Dropdown */}
          {searchQuery && (
            <div className="absolute left-0 right-0 mt-3 p-3 rounded-2xl glass-panel border border-slate-700/50 shadow-2xl z-50 text-left max-h-[380px] overflow-y-auto backdrop-blur-xl animate-slide-up">
              <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 flex justify-between items-center mb-2">
                <span>Matching Titles ({searchResults.length})</span>
                <span className="text-[10px] text-indigo-400 italic">Press enter or click to explore</span>
              </div>
              {searchResults.length > 0 ? (
                <div className="space-y-1">
                  {searchResults.map((book) => (
                    <button
                      key={book.id}
                      onClick={() => handleBookClick(book)}
                      className="w-full text-left p-3 hover:bg-slate-800/40 rounded-xl flex items-center justify-between group transition-colors"
                    >
                      <div>
                        <h4 className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors text-sm">{book.title}</h4>
                        <p className="text-xs text-slate-400">by {book.author} • <span className="text-indigo-400/80">{book.category}</span></p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                          book.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {book.status}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-400 text-sm">
                  <BookMarked className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
                  No results found matching "{searchQuery}". Try "Computer", "Algorithms", or "AI".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick helper metadata */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center text-sm text-slate-400 opacity-95">
          <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-indigo-400" /> <span>Mon - Sat: 8:00 AM - 10:00 PM</span></div>
          <div className="w-1.5 h-1.5 bg-slate-700 rounded-full self-center hidden sm:block" />
          <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-indigo-400" /> <span>Central Campus, Level 3</span></div>
        </div>

      </section>

      {/* ================= QUICK STATS SECTION ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-slate-700/60 hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-6 -bottom-6 text-slate-800/10 group-hover:text-indigo-600/5 group-hover:scale-110 transition-all duration-500">
              <Library className="w-36 h-36" />
            </div>
            <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/20 mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-4xl font-extrabold tracking-tight text-white mb-2 bg-gradient-to-r from-slate-100 to-indigo-100 bg-clip-text">135,000+</h3>
            <p className="text-base font-medium text-indigo-400/90 mb-1">Total Volumes</p>
            <p className="text-sm text-slate-400">Physical editions, research treatises, monographs, and journals.</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-slate-700/60 hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-6 -bottom-6 text-slate-800/10 group-hover:text-indigo-600/5 group-hover:scale-110 transition-all duration-500">
              <Users className="w-36 h-36" />
            </div>
            <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/20 mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-4xl font-extrabold tracking-tight text-white mb-2 bg-gradient-to-r from-slate-100 to-indigo-100 bg-clip-text">14,200+</h3>
            <p className="text-base font-medium text-indigo-400/90 mb-1">Active Members</p>
            <p className="text-sm text-slate-400">Undergraduates, doctorates, research associates, and faculty.</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden group hover:border-slate-700/60 hover:-translate-y-1 transition-all duration-300">
            <div className="absolute -right-6 -bottom-6 text-slate-800/10 group-hover:text-indigo-600/5 group-hover:scale-110 transition-all duration-500">
              <Globe className="w-36 h-36" />
            </div>
            <div className="w-12 h-12 bg-indigo-600/20 text-indigo-400 rounded-xl flex items-center justify-center border border-indigo-500/20 mb-6">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-4xl font-extrabold tracking-tight text-white mb-2 bg-gradient-to-r from-slate-100 to-indigo-100 bg-clip-text">45,000+</h3>
            <p className="text-base font-medium text-indigo-400/90 mb-1">Digital Resources</p>
            <p className="text-sm text-slate-400">Overdrive e-books, institutional papers, and high-impact journals.</p>
          </div>

        </div>
      </section>

      {/* ================= RECOMMENDED SECTION ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-32">
        
        {/* Headers */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-100 mb-3 tracking-tight">Recommended Collections</h2>
            <p className="text-slate-400 text-sm max-w-xl">Curated books and treatises recommended by academic departments for this semester.</p>
          </div>
          
          {/* Tabs Filter */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800 max-w-fit">
            {['All', 'Computer Science', 'AI / ML', 'Algorithms'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10 border border-indigo-400/20' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedBooks.map((book) => (
            <div 
              key={book.id}
              onClick={() => handleBookClick(book)}
              className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/30 hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group relative overflow-hidden"
            >
              
              {/* Virtual Glowing Corner Cover Accent */}
              <div className="w-full aspect-[4/5] bg-gradient-to-br from-indigo-900/30 to-slate-900 rounded-xl mb-4 border border-slate-800 flex flex-col justify-between p-4 relative group-hover:border-indigo-500/20 transition-all">
                <div className="text-[10px] font-bold tracking-widest text-indigo-400/70 uppercase">{book.category}</div>
                
                {/* Book Title & Author inside virtual cover */}
                <div className="my-auto text-center px-2">
                  <h4 className="font-extrabold text-sm text-slate-200 line-clamp-3 mb-1 group-hover:text-indigo-300 transition-colors">{book.title}</h4>
                  <p className="text-[10px] text-slate-400 italic">by {book.author}</p>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-800/40 pt-2.5">
                  <span>EDITION {book.year}</span>
                  <span className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span className="font-bold">{book.rating}</span>
                  </span>
                </div>
              </div>

              {/* Outside cover metadata */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-slate-200 mb-1 group-hover:text-indigo-400 transition-colors line-clamp-1">{book.title}</h3>
                  <p className="text-xs text-slate-400 mb-3">by {book.author}</p>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">{book.desc}</p>
                </div>

                {/* Bottom button indicator */}
                <div className="flex items-center justify-between border-t border-slate-800/40 pt-3">
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                    book.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {book.status}
                  </span>
                  <span className="text-xs font-semibold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition-all">
                    <span>Borrow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES/SERVICES GRID ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-32">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-100 tracking-tight mb-4">Elite Library Services</h2>
          <p className="text-slate-400 text-sm">Beyond standard borrowing, we offer premium research infrastructure and inter-institutional support to accelerate your academic career.</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative hover:border-indigo-500/20 hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 mb-6 group-hover:scale-105 transition-transform duration-300">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Study Room Booking</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Reserve soundproof, high-speed Wi-Fi equipped media rooms, group discussion booths, or individual quiet study zones instantly online.</p>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="text-xs font-bold text-indigo-400 flex items-center gap-2 group-hover:gap-3 transition-all"
            >
              <span>RESERVE SPACE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative hover:border-indigo-500/20 hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 mb-6 group-hover:scale-105 transition-transform duration-300">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Interlibrary Loans</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Need a volume outside our collection? We coordinate with premium national library systems to courier external books directly to campus.</p>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="text-xs font-bold text-indigo-400 flex items-center gap-2 group-hover:gap-3 transition-all"
            >
              <span>REQUEST VOLUME</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative hover:border-indigo-500/20 hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 mb-6 group-hover:scale-105 transition-transform duration-300">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Research Consultations</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Schedule 1-on-1 brainstorming or search sessions with expert resource curators to optimize literature reviews and citations.</p>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="text-xs font-bold text-indigo-400 flex items-center gap-2 group-hover:gap-3 transition-all"
            >
              <span>SCHEDULE CALL</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ================= DYNAMIC ANNOUNCEMENT SECTION ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left info column */}
          <div className="lg:col-span-1 flex flex-col justify-between py-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-6">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>DYNAMIC BROADCASTS</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-100 mb-4 tracking-tight">Announcements &amp; News</h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md">Stay synchronized with upcoming university library events, workshops, special guest sessions, and holiday operational changes.</p>
            </div>
            <div className="hidden lg:block mt-8 p-5 bg-indigo-600/5 border border-indigo-500/10 rounded-2xl">
              <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-2">QUICK NOTICE</h4>
              <p className="text-xs text-slate-400 leading-relaxed">Central server maintenance scheduled this Sunday 2:00 AM - 4:00 AM. Local databases will perform hot-swaps; minimal catalog downtime expected.</p>
            </div>
          </div>

          {/* Right announcements panel */}
          <div className="lg:col-span-2 space-y-4">
            
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex gap-5 items-start hover:border-slate-700/60 transition-colors">
              <div className="px-3.5 py-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl font-bold text-center border border-indigo-500/20 min-w-[70px]">
                <div className="text-lg">MAY</div>
                <div className="text-2xl leading-none">20</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase bg-indigo-500/5 px-2 py-0.5 rounded">WORKSHOP</span>
                <h3 className="font-bold text-slate-100 text-lg mt-1 mb-2 hover:text-indigo-400 transition-colors cursor-pointer">Advanced Literature Search &amp; Citations using BibTeX</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Join our lead database curators in Room 304 to master automated literature harvesting and bibliography generation using modern tools.</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex gap-5 items-start hover:border-slate-700/60 transition-colors">
              <div className="px-3.5 py-2.5 bg-amber-500/10 text-amber-400 rounded-xl font-bold text-center border border-amber-500/20 min-w-[70px]">
                <div className="text-lg">JUN</div>
                <div className="text-2xl leading-none">05</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase bg-amber-500/5 px-2 py-0.5 rounded">HOLIDAY NOTICE</span>
                <h3 className="font-bold text-slate-100 text-lg mt-1 mb-2 hover:text-amber-400 transition-colors cursor-pointer">Global Environment Day Schedule Shift</h3>
                <p className="text-slate-400 text-xs leading-relaxed">On June 5th, the library reading halls will follow custom holiday hours (10:00 AM - 6:00 PM). Digital resources will continue functioning 24/7.</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex gap-5 items-start hover:border-slate-700/60 transition-colors">
              <div className="px-3.5 py-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl font-bold text-center border border-indigo-500/20 min-w-[70px]">
                <div className="text-lg">JUN</div>
                <div className="text-2xl leading-none">12</div>
              </div>
              <div>
                <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase bg-indigo-500/5 px-2 py-0.5 rounded">NEW ARRIVALS</span>
                <h3 className="font-bold text-slate-100 text-lg mt-1 mb-2 hover:text-indigo-400 transition-colors cursor-pointer">50+ New Computer Science Research Monographs Added</h3>
                <p className="text-slate-400 text-xs leading-relaxed">The Department of Information Science has just received and indexed fresh, high-impact volumes covering LLM tuning, deep learning, and advanced rust programming.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-32">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-100 tracking-tight mb-4">Academic Voices</h2>
          <p className="text-slate-400 text-sm">See how Lumina Library Portal supports the daily research workflows of our faculty and student body.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col justify-between hover:border-slate-700/60 transition-all duration-300">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic mb-8">
                "The JWT token rotation system and quick search capabilities on Lumina have drastically simplified our literature review workflows. I can easily search, verify book statuses, and secure digital resources instantly."
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-800/40 pt-5">
              <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center font-bold text-indigo-400 border border-indigo-500/20 text-xs">
                AN
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-xs">Dr. Aaron Nelson</h4>
                <p className="text-[10px] text-slate-500">Associate Professor, CS Department</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col justify-between hover:border-slate-700/60 transition-all duration-300">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic mb-8">
                "Lumina is incredibly user-friendly. Being able to browse recommended reading lists for our algorithms class and submit borrow requests with one click has saved me countless hours at the start of this semester."
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-800/40 pt-5">
              <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center font-bold text-indigo-400 border border-indigo-500/20 text-xs">
                SP
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-xs">Samantha Pierce</h4>
                <p className="text-[10px] text-slate-500">Undergraduate Student, Software Engineering</p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-slate-800 flex flex-col justify-between hover:border-slate-700/60 transition-all duration-300">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic mb-8">
                "As an administrator, the transparency provided by the transaction log system has streamlined auditing. I can instantly monitor active checkouts, track overdue alerts, and manage catalog acquisitions effortlessly."
              </p>
            </div>
            <div className="flex items-center gap-3 border-t border-slate-800/40 pt-5">
              <div className="w-10 h-10 rounded-full bg-indigo-600/30 flex items-center justify-center font-bold text-indigo-400 border border-indigo-500/20 text-xs">
                EM
              </div>
              <div>
                <h4 className="font-bold text-slate-100 text-xs">Eleanor Martinez</h4>
                <p className="text-[10px] text-slate-500">Chief System Librarian</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="relative px-6 max-w-4xl mx-auto w-full mb-36">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl flex items-center justify-center border border-indigo-500/20 mb-4 mx-auto">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-100 tracking-tight mb-3">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Find fast solutions to common inquiries regarding digital library cards, borrow regulations, and E-Resources.</p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className="glass-panel rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700/60 transition-colors"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full px-6 py-5 text-left flex items-center justify-between text-slate-100 hover:text-indigo-400 transition-colors"
              >
                <span className="font-bold text-base md:text-lg pr-4">{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp className="w-5 h-5 text-indigo-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openFaq === i ? 'max-h-[300px] border-t border-slate-800/60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <p className="px-6 py-5 text-slate-400 text-sm leading-relaxed bg-slate-900/30">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="w-full relative z-40 bg-[#070b13] border-t border-slate-800/80 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
            
            {/* Column 1: Brand & Desc */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/20">
                  <Library className="w-5 h-5" />
                </div>
                <span className="font-semibold text-lg tracking-wider bg-gradient-to-r from-indigo-300 to-indigo-100 bg-clip-text text-transparent">
                  Lumina Library Portal
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
                Providing comprehensive access to cutting-edge research databases, academic media booths, study infrastructures, and multi-disciplinary libraries since 1998.
              </p>
              <div className="space-y-2">
                <a href="mailto:support@luminalibrary.edu" className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors text-xs">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  <span>support@luminalibrary.edu</span>
                </a>
                <a href="tel:+15550198" className="flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors text-xs">
                  <Phone className="w-4 h-4 text-indigo-500" />
                  <span>+1 (555) 019-8234</span>
                </a>
              </div>
            </div>

            {/* Column 2: Hours */}
            <div className="md:col-span-3">
              <h3 className="font-bold text-xs uppercase tracking-widest text-indigo-400 mb-6">Operational Hours</h3>
              <ul className="space-y-3 text-xs text-slate-400">
                <li className="flex justify-between border-b border-slate-800/40 pb-1.5">
                  <span className="font-semibold text-slate-300">Mon - Fri:</span>
                  <span>8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/40 pb-1.5">
                  <span className="font-semibold text-slate-300">Saturday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between pb-1.5">
                  <span className="font-semibold text-slate-300">Sunday:</span>
                  <span className="text-indigo-400/80 font-bold uppercase tracking-wider">Closed</span>
                </li>
                <li className="text-[10px] text-slate-500 italic mt-2">
                  * Note: E-catalog is active 24/7. Holiday schedule shifts are broadcasted via announcements.
                </li>
              </ul>
            </div>

            {/* Column 3: Newsletter & Actions */}
            <div className="md:col-span-4">
              <h3 className="font-bold text-xs uppercase tracking-widest text-indigo-400 mb-6">Library Newsletter</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Subscribe to receive hot updates on new acquisitions, guest speaker workshops, and holiday operating hours.
              </p>
              
              <form onSubmit={handleSubscribe} className="relative mb-3">
                <input
                  type="email"
                  placeholder="Enter academic email address"
                  required
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 text-slate-100 rounded-xl px-4 py-3 text-xs focus:border-indigo-500/60 outline-none pr-28 transition-colors"
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="absolute right-1.5 top-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs tracking-wider border border-indigo-400/20 active:scale-95 transition-all"
                >
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </form>
              
              {subscribed && (
                <p className="text-[10px] text-emerald-400 font-semibold animate-pulse">
                  ✓ Successful subscription. Welcome to Lumina's updates list!
                </p>
              )}
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800/40 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © 2026 Lumina Academic Library Systems. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-indigo-400 transition-colors">Compliance</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Home;
