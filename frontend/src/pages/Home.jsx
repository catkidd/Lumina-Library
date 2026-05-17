import { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, BookOpen, Users, Globe, BookMarked, 
  Clock, Calendar, ArrowRight, ChevronDown, 
  ChevronUp, Star, GraduationCap, Award, HelpCircle,
  Library, Mail, Phone, CalendarDays, ArrowUp
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Dynamic Scroll Listeners for scroll bar & back to top button
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // High-fidelity local database of library books
  const catalogDatabase = useMemo(() => [
    { id: 1, title: "The Art of Computer Programming", author: "Donald Knuth", category: "Computer Science", year: "2021", rating: 5, status: "Available", desc: "The definitive guide to classical computer science algorithms.", gradient: "from-stone-850 to-stone-950" },
    { id: 2, title: "Clean Architecture", author: "Robert C. Martin", category: "Software Engineering", year: "2017", rating: 5, status: "Available", desc: "A craftsman's guide to software structure and design.", gradient: "from-stone-900 to-stone-950" },
    { id: 3, title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Algorithms", year: "2022", rating: 4.8, status: "Borrowed", desc: "The standard academic reference for modern algorithms.", gradient: "from-stone-850 to-stone-900" },
    { id: 4, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "Systems Design", year: "2017", rating: 4.9, status: "Available", desc: "An exhaustive guide to data systems architecture.", gradient: "from-stone-900 to-stone-950" },
    { id: 5, title: "Quantum Computing: A Gentle Introduction", author: "Eleanor Rieffel", category: "Emerging Tech", year: "2011", rating: 4.6, status: "Available", desc: "A mathematical introduction to quantum information science.", gradient: "from-stone-800 to-stone-900" },
    { id: 6, title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", category: "AI / ML", year: "2020", rating: 4.9, status: "Available", desc: "The global gold standard textbook for AI.", gradient: "from-stone-900 to-stone-955" }
  ], []);

  // Filter recommendations based on active categories
  const recommendedBooks = useMemo(() => {
    if (activeCategory === 'All') return catalogDatabase.slice(0, 4);
    return catalogDatabase.filter(b => b.category === activeCategory).slice(0, 4);
  }, [activeCategory, catalogDatabase]);

  // Global search redirect or actions
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (user) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/login', { state: { redirectSearch: searchQuery } });
    }
  };

  const handleBookClick = () => {
    if (user) {
      navigate('/catalog');
    } else {
      navigate('/login');
    }
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

  // FAQ Database
  const faqs = [
    { q: "How do I register for a digital library card?", a: "Click the 'Sign In / Register' button in the top navigation. Once registered, you will be able to check out books and resources." },
    { q: "What are the active borrowing limits and fine structures?", a: "Standard members can borrow up to 5 books at a time for up to 14 days. Fines accumulate at $0.50 per day for overdue books." },
    { q: "How do I access electronic research databases?", a: "Log into the portal using your verified academic email. Navigate to the catalog page and filter by 'E-Resources' to access indexed publications, scientific papers, and journals." },
    { q: "Can I reserve study booths and research media rooms?", a: "Absolutely. Logged-in students can book research booths and group study rooms dynamically through the dashboard or by requesting assistance at the center counter." },
    { q: "Does Lumina support Interlibrary Loans?", a: "Yes. If we do not have a specific book, our system allows us to request it from partner libraries at no cost to you." }
  ];

  const toggleFaq = (i) => {
    setOpenFaq(openFaq === i ? null : i);
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#fbfaf6] text-stone-800 font-sans selection:bg-amber-100/80 select-none overflow-x-hidden after:fixed after:inset-0 after:z-40 after:opacity-[0.02] after:pointer-events-none after:bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noise%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.8%22%20numOctaves=%224%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23noise)%22/%3E%3C/svg%3E')]">
      
      {/* SCROLL PROGRESS BAR */}
      <div 
        className="fixed top-0 left-0 h-1 bg-stone-900 z-[100] transition-[width] duration-300 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ================= HERO SECTION ================= */}
      <header className="relative px-6 max-w-7xl mx-auto w-full pt-32 pb-32 z-10 flex flex-col gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT EDITORIAL HEADER COL */}
          <div className="lg:col-span-7 flex flex-col gap-8 text-left">
            
            <div className="w-max flex items-center gap-2 rounded-full px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.25em] border border-amber-900/10 bg-amber-50/60 text-amber-900">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
              <span>University Research Repository</span>
            </div>

            <h1 className="font-serif font-extrabold text-5xl md:text-7xl tracking-tight text-stone-900 leading-[1.02] pr-4">
              Discovering the <br />
              <span className="italic font-normal text-stone-600">World's Finest</span> <br />
              Academic Archives
            </h1>

            <p className="text-stone-650 text-base md:text-lg leading-relaxed max-w-xl font-medium">
              Empowering research excellence through structured digital catalogs, easy study booth bookings, and seamless book inventory management since 1998.
            </p>

            {/* EXPANSIVE SEARCH BAR */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl group">
              <div className="relative flex items-center bg-[#f2efe8]/80 p-2 rounded-[1.8rem] border border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.01)] focus-within:border-stone-400 transition-all duration-300">
                <Search className="w-5 h-5 text-stone-450 absolute left-5 group-focus-within:text-stone-900 transition-colors" />
                <input
                  type="text"
                  placeholder="Search books, journals, authors, systems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-transparent text-stone-900 rounded-[calc(1.8rem-0.5rem)] pl-12 pr-44 py-4 text-sm focus:outline-none transition-all font-semibold shadow-inner"
                />
                
                {/* BUTTON IN BUTTON Pattern */}
                <button
                  type="submit"
                  className="absolute right-3.5 px-5 py-3 bg-stone-900 hover:bg-stone-850 text-stone-100 hover:text-white rounded-[calc(1.8rem-0.5rem)] text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-[0.97]"
                >
                  Query Engine
                </button>
              </div>

              {/* QUICK RECOM TAGS */}
              <div className="flex flex-wrap gap-2.5 mt-4 items-center">
                <span className="text-stone-500 text-[10px] uppercase font-bold tracking-wider">Trending Fields:</span>
                {['Algorithms', 'Systems Design', 'AI / ML'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      setActiveCategory(tag === 'Systems Design' ? 'Systems Design' : tag === 'Algorithms' ? 'Algorithms' : 'AI / ML');
                    }}
                    className="text-[9px] font-bold uppercase tracking-wider text-stone-750 hover:text-stone-950 bg-stone-100 hover:bg-stone-200/60 px-3 py-1 border border-stone-200 rounded-lg transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>

          </div>

          {/* RIGHT COL: 3D-EFFECT INTERACTIVE STACK WITH DOUBLE-BEZEL CONCEITS */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative w-full h-[450px] flex items-center justify-center">
              
              {/* Stack Background Glow */}
              <div className="absolute w-[300px] h-[300px] rounded-full bg-stone-200/20 blur-[100px] -z-10" />

              {/* Front Floating Book Deck using Double Bezel */}
              <div className="absolute transform translate-y-[-20px] translate-x-[-20px] rotate-[-5deg] z-30 transition-transform duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-y-[-40px] hover:rotate-[-1deg] cursor-pointer">
                <div className="bg-[#f2efe8]/80 p-2 rounded-[2.2rem] border border-stone-200/50 shadow-xl">
                  <div className="w-[190px] h-[260px] bg-gradient-to-br from-stone-900 to-stone-950 rounded-[calc(2.2rem-0.5rem)] text-stone-100 p-6 flex flex-col justify-between relative overflow-hidden shadow-inner">
                    <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/5 rounded-full blur-xl pointer-events-none" />
                    <div className="flex justify-between items-start">
                      <span className="text-[8px] font-bold uppercase tracking-widest bg-white/10 text-white px-2 py-0.5 rounded border border-white/15">Volume I</span>
                      <BookOpen className="w-3.5 h-3.5 text-stone-300" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-serif font-bold text-xs text-stone-100 leading-tight uppercase">THE ART OF PROGRAMMING</h4>
                      <p className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">Donald Knuth</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute transform translate-y-[20px] translate-x-[30px] rotate-[7deg] z-20 transition-transform duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-y-[40px] hover:rotate-[3deg] cursor-pointer">
                <div className="bg-[#f2efe8]/80 p-2 rounded-[2.2rem] border border-stone-200/50 shadow-xl">
                  <div className="w-[190px] h-[260px] bg-gradient-to-br from-stone-950 to-stone-900 rounded-[calc(2.2rem-0.5rem)] text-stone-100 p-6 flex flex-col justify-between relative overflow-hidden shadow-inner">
                    <div className="absolute bottom-0 left-0 w-[120px] h-[120px] bg-white/5 rounded-full blur-lg pointer-events-none" />
                    <div className="flex justify-between items-start">
                      <span className="text-[8px] font-bold uppercase tracking-widest bg-white/10 text-white px-2 py-0.5 rounded border border-white/15">Core Manual</span>
                      <Globe className="w-3.5 h-3.5 text-stone-300" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-serif font-bold text-xs text-stone-100 leading-tight uppercase">ARTIFICIAL INTELLIGENCE</h4>
                      <p className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">Stuart Russell</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Information Widget */}
              <div className="absolute bottom-4 right-10 z-40 bg-[#f2efe8]/85 p-1.5 rounded-[1.5rem] border border-stone-200/60 shadow-lg backdrop-blur-md max-w-[200px]">
                <div className="bg-white p-4 rounded-[calc(1.5rem-0.375rem)] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-600">Live Operations</span>
                  </div>
                  <p className="text-[10px] font-bold text-stone-600 leading-normal">Overdue check automated job completed successfully.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </header>

      {/* ================= QUICK STATS SECTION ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-32 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Book Catalog', count: '14,280+', desc: 'Indexed physical books & e-resources', icon: BookMarked },
            { label: 'Active Scholars', count: '3,850+', desc: 'Registered student and faculty members', icon: Users },
            { label: 'Scientific Sources', count: '9,420+', desc: 'Accessible e-journals & publications', icon: Globe }
          ].map((stat, i) => (
            <div 
              key={i} 
              className="bg-[#f2efe8]/85 p-2 rounded-[2.2rem] border border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-transform duration-700 hover:scale-[1.01]"
            >
              <div className="bg-white p-8 rounded-[calc(2.2rem-0.5rem)] flex flex-col justify-between h-full shadow-[0_20px_40px_-15px_rgba(139,120,95,0.05),inset_0_1px_1px_rgba(255,255,255,0.95)]">
                
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-150 text-stone-700">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-stone-400">Security Audited</span>
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-serif font-extrabold text-4xl text-stone-900 tracking-tight leading-none">
                    {stat.count}
                  </h3>
                  <h4 className="font-bold text-[10px] uppercase tracking-wider text-stone-700">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-stone-550 leading-relaxed pt-1">
                    {stat.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= RECOMMENDED CATALOG SECTION ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-36 z-10 flex flex-col gap-12">
        
        {/* Editorial Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-6 border-b border-stone-200/50">
          <div className="flex flex-col gap-3">
            <span className="text-amber-800 text-[9px] font-bold uppercase tracking-[0.25em]">Recommended Books</span>
            <h2 className="font-serif font-extrabold text-4xl md:text-5xl text-stone-900 tracking-tight leading-tight">
              Library Recommendations
            </h2>
            <p className="text-stone-600 text-sm max-w-lg leading-relaxed font-medium">
              Explore our top recommended books and study resources, curated by our librarians across key academic subjects.
            </p>
          </div>

          {/* Category Capsule Triggers (Concentric Border Pill) */}
          <div className="flex flex-wrap gap-1.5 bg-[#f2efe8]/80 p-1.5 rounded-full border border-stone-250/60 w-full lg:w-auto shadow-sm max-w-full lg:max-w-3xl">
            {['All', 'Computer Science', 'AI / ML', 'Software Engineering', 'Systems Design'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  activeCategory === cat
                    ? 'bg-stone-900 text-stone-100 shadow-md'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* BOOK DECK GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendedBooks.map((book) => (
            <div 
              key={book.id} 
              className="bg-[#f2efe8]/80 p-2 rounded-[2.2rem] border border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-all duration-700 hover:scale-[1.01] flex flex-col justify-between group"
            >
              <div className="bg-white rounded-[calc(2.2rem-0.5rem)] overflow-hidden flex flex-col justify-between h-full shadow-[0_20px_40px_-15px_rgba(139,120,95,0.05)]">
                
                {/* CSS BOOK COVER */}
                <div className={`h-[170px] bg-gradient-to-br ${book.gradient} p-5 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-white/5 rounded-full blur-xl pointer-events-none" />
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] font-bold uppercase tracking-widest bg-white/10 text-white px-2 py-0.5 rounded border border-white/10">{book.category}</span>
                    <div className="flex items-center gap-0.5 text-amber-300 bg-black/30 px-1.5 py-0.5 rounded text-[8px] font-bold border border-white/5">
                      <Star className="w-3 h-3 fill-amber-300 shrink-0 text-amber-300" />
                      <span>{book.rating}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-extrabold text-[11px] text-white uppercase leading-tight tracking-wide line-clamp-2">{book.title}</h4>
                    <p className="text-[8px] text-white/70 font-bold tracking-wider uppercase truncate">{book.author}</p>
                  </div>
                </div>

                {/* CARD DETAILS */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between bg-white">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest">
                      <span className="text-stone-400">System Catalog</span>
                      <span className={book.status === 'Available' ? 'text-emerald-600 font-bold' : 'text-amber-700 font-bold'}>
                        ● {book.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 font-medium">
                      {book.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3 font-semibold">
                    <div className="text-[9px] font-bold text-stone-500 uppercase">
                      Year: {book.year}
                    </div>
                    
                    <button
                      onClick={handleBookClick}
                      className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-stone-900 hover:text-stone-750 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Borrow Queue</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES/SERVICES GRID ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-32 z-10 flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4">
          <div className="inline-flex p-3.5 bg-amber-50 text-amber-900 rounded-2xl border border-amber-900/10 shadow-sm">
            <Award className="w-5 h-5 text-amber-850" />
          </div>
          <h2 className="font-serif font-extrabold text-4xl md:text-5xl text-stone-900 tracking-tight leading-tight">
            Core Academic Services
          </h2>
          <p className="text-stone-605 text-sm leading-relaxed font-medium">
            Optimized tools and services designed to support rigorous academic research and study requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Study Room Booking", desc: "Reserve quiet study booths, media rooms, and individual research desks with full campus network connectivity.", icon: Clock, label: "Booking" },
            { title: "Interlibrary Sourcing", desc: "If our local collection does not contain your target book, our global interlibrary loan system requests it from partner universities.", icon: Globe, label: "ILL" },
            { title: "Research Support", desc: "Engage with specialized reference libraries and literature search systems to help with your academic papers and research.", icon: GraduationCap, label: "Consultation" }
          ].map((service, i) => (
            <div 
              key={i} 
              className="bg-[#f2efe8]/80 p-2 rounded-[2.2rem] border border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-transform duration-700 hover:scale-[1.01]"
            >
              <div className="bg-white p-8 rounded-[calc(2.2rem-0.5rem)] flex flex-col justify-between h-full shadow-[0_20px_40px_-15px_rgba(139,120,95,0.05)]">
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="p-3 bg-stone-50 border border-stone-150 text-stone-700 rounded-2xl">
                      <service.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-amber-900 bg-amber-50 px-2 py-0.5 border border-amber-900/10 rounded">
                      {service.label}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-xl text-stone-900 tracking-tight leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-xs text-stone-605 leading-relaxed font-medium">
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100">
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-stone-900 hover:text-stone-750"
                  >
                    <span>Access Terminal</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DYNAMIC ANNOUNCEMENT TIMELINE ================= */}
      <section className="relative px-6 max-w-5xl mx-auto w-full mb-36 z-10 flex flex-col gap-16">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto flex flex-col items-center gap-4">
          <div className="inline-flex p-3.5 bg-amber-50 text-amber-900 rounded-2xl border border-amber-900/10 shadow-sm">
            <CalendarDays className="w-5 h-5 text-amber-855" />
          </div>
          <h2 className="font-serif font-extrabold text-4xl md:text-5xl text-stone-900 tracking-tight leading-tight">
            Library Announcements
          </h2>
          <p className="text-stone-600 text-sm font-medium">Upcoming library events, facilities updates, and research seminars.</p>
        </div>

        {/* Timeline (Delicate Lines) */}
        <div className="space-y-8 relative before:absolute before:left-8 before:top-2 before:bottom-2 before:w-px before:bg-stone-200 pl-2">
          {[
            { date: "May 24, 2026", title: "Symposium: Machine Learning and Big Data Architectures", desc: "Guest speakers from the engineering department host a guest seminar in Media Room 3. Reservation required.", tag: "Academics", icon: Calendar },
            { date: "June 02, 2026", title: "Scheduled Database and System Maintenance", desc: "The catalog search system will undergo scheduled maintenance from 2:00 AM to 4:00 AM.", tag: "Systems Ops", icon: Clock },
            { date: "June 10, 2026", title: "Historical Archives Preservation Additions", desc: "Lumina has added a new collection containing classic computing manuscripts.", tag: "Books", icon: BookMarked }
          ].map((event, i) => (
            <div key={i} className="flex gap-8 relative items-start group pl-0">
              
              {/* Bullet Node */}
              <div className="w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-750 group-hover:border-stone-400 transition-colors z-20 shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                <event.icon className="w-4.5 h-4.5" />
              </div>
              
              {/* Event Card (Double Bezel) */}
              <div className="bg-[#f2efe8]/80 p-2 rounded-[2rem] border border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.01)] flex-grow transition-transform duration-700 hover:scale-[1.005]">
                <div className="bg-white p-6 rounded-[calc(2rem-0.5rem)] grid grid-cols-1 md:grid-cols-4 gap-4 items-center shadow-inner">
                  <div className="md:col-span-1 space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-amber-900 block">
                      {event.date}
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-wider bg-stone-100 text-stone-605 px-2 py-0.5 border border-stone-200 rounded max-w-fit block">
                      {event.tag}
                    </span>
                  </div>
                  <div className="md:col-span-3 space-y-1">
                    <h4 className="font-serif font-bold text-base text-stone-900 group-hover:text-stone-700 transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed font-medium">
                      {event.desc}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-32 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-4 pr-6 flex flex-col justify-center text-left">
            <span className="text-amber-800 text-[9px] font-bold uppercase tracking-[0.25em]">Campus Reviews</span>
            <h2 className="font-serif font-extrabold text-4xl md:text-5xl text-stone-900 tracking-tight leading-tight">
              Scholars Voice
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed font-medium">
              Find out how academic researchers, doctorate candidates, and students experience Lumina's platform operations every single day.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { text: "Lumina's fast catalog search and automated borrowing system save substantial research time. A great standard of modern library management.", author: "Dr. Adrian Vance", role: "Quantum Research Fellow", initial: "AV" },
              { text: "The modern responsive interface is exceptionally clean, and the automated email notifications make returning books simple.", author: "Eleanor Martinez", role: "Postgrad Systems Candidate", initial: "EM" }
            ].map((test, i) => (
              <div 
                key={i} 
                className="bg-[#f2efe8]/80 p-2 rounded-[2.2rem] border border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.015)] transition-transform duration-700 hover:scale-[1.01]"
              >
                <div className="bg-white p-8 rounded-[calc(2.2rem-0.5rem)] flex flex-col justify-between h-full shadow-[0_20px_40px_-15px_rgba(139,120,95,0.05)]">
                  <div className="space-y-4">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, star) => (
                        <Star key={star} className="w-3.5 h-3.5 fill-amber-450 shrink-0 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed italic font-medium">
                      "{test.text}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 border-t border-stone-100 pt-5 mt-6">
                    <div className="w-9 h-9 rounded-full bg-stone-50 flex items-center justify-center font-serif font-bold text-stone-800 border border-stone-150 text-xs shadow-inner">
                      {test.initial}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-xs">{test.author}</h4>
                      <p className="text-[8px] text-stone-500 font-bold uppercase tracking-wider">{test.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="relative px-6 max-w-4xl mx-auto w-full mb-36 z-10 flex flex-col gap-16">
        
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-900 rounded-2xl flex items-center justify-center border border-amber-900/10 shadow-sm">
            <HelpCircle className="w-5 h-5 text-amber-850" />
          </div>
          <h2 className="font-serif font-extrabold text-3xl text-stone-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-stone-600 text-sm font-medium">Find fast solutions to common inquiries regarding digital library cards, borrow regulations, and E-Resources.</p>
        </div>

        {/* Accordions */}
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className="bg-[#f2efe8]/80 p-1.5 rounded-[1.8rem] border border-stone-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
            >
              <div className="bg-white rounded-[calc(1.8rem-0.375rem)] overflow-hidden">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between text-stone-850 hover:text-stone-950 transition-colors"
                >
                  <span className="font-bold text-base pr-4 font-serif">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4.5 h-4.5 text-stone-900 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4.5 h-4.5 text-stone-400 shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    openFaq === i ? 'max-h-[300px] border-t border-stone-100 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="px-6 py-5 text-stone-600 text-xs leading-relaxed font-medium bg-stone-50/50">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= NEWSLETTER FULL SECTION ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-32 z-10">
        <div className="bg-[#f2efe8]/80 p-2.5 rounded-[2.5rem] border border-stone-200/50 shadow-xl transition-transform duration-700 hover:scale-[1.005]">
          <div className="bg-white p-10 md:p-16 rounded-[calc(2.5rem-0.625rem)] text-center relative overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
            
            {/* Decorative glowing gradient spheres */}
            <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] rounded-full bg-amber-500/5 blur-[80px] pointer-events-none" />
            
            <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center gap-6">
              <div className="w-14 h-14 bg-amber-50 text-amber-900 rounded-2xl flex items-center justify-center border border-amber-900/10 shadow-sm">
                <Mail className="w-6 h-6 text-amber-850" />
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
                Subscribe to the <span className="italic font-normal text-stone-600">Lumina Gazette</span>
              </h2>
              
              <p className="text-stone-600 text-sm md:text-base leading-relaxed max-w-lg font-medium">
                Get direct intelligence on monthly resource acquisitions, specialized research tutorials, guest lectures, and holiday scheduling adjustments sent to your mailbox.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
                <input
                  type="email"
                  placeholder="Enter academic email address"
                  required
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  className="flex-grow bg-stone-50 border border-stone-200 text-stone-900 rounded-xl px-5 py-4 text-sm focus:border-stone-500 focus:bg-white outline-none shadow-inner font-semibold"
                />
                
                {/* CTA with Button in Button trailing circle */}
                <button
                  type="submit"
                  disabled={subscribed}
                  className="px-6 py-4 bg-stone-900 hover:bg-stone-850 text-stone-100 hover:text-white font-bold rounded-xl border border-stone-800 shadow-md transition-all duration-300 text-xs uppercase tracking-wider flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  <span>{subscribed ? 'Subscribed' : 'Subscribe Now'}</span>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <ArrowRight className="w-3.5 h-3.5 text-stone-100" />
                  </div>
                </button>
              </form>

              {subscribed && (
                <p className="text-xs text-emerald-700 font-bold mt-2 animate-pulse">
                  ✓ Registration successful. Welcome to the Lumina Academic broadcast list!
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="w-full relative z-10 bg-[#f2efe8]/30 border-t border-stone-200 pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-16 font-medium">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Column 1: Brand & Desc */}
            <div className="md:col-span-6 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-stone-100 text-stone-700 rounded-xl border border-stone-200/50">
                  <Library className="w-5 h-5 text-stone-800" />
                </div>
                <span className="font-serif font-extrabold text-xl tracking-wide text-stone-950">
                  Lumina Library Portal
                </span>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed max-w-md font-medium">
                Providing comprehensive access to cutting-edge research databases, academic media booths, study infrastructures, and multi-disciplinary libraries since 1998.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <a href="mailto:support@luminalibrary.edu" className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors text-xs font-bold">
                  <Mail className="w-4 h-4 text-stone-500" />
                  <span>support@luminalibrary.edu</span>
                </a>
                <a href="tel:+15550198" className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors text-xs font-bold">
                  <Phone className="w-4 h-4 text-stone-500" />
                  <span>+1 (555) 019-8234</span>
                </a>
              </div>
            </div>

            {/* Column 2: Institutional Links (Center) */}
            <div className="md:col-span-3 flex flex-col gap-6">
              <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-stone-500">Quick Navigation</h3>
              <ul className="space-y-3.5 text-xs text-stone-600">
                <li>
                  <Link to="/catalog" className="hover:text-stone-900 transition-colors font-bold">Book Catalog</Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-stone-900 transition-colors font-bold">Study Booth Booking</Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-stone-900 transition-colors font-bold">Research Support</Link>
                </li>
                <li>
                  <Link to="/compliance" className="hover:text-stone-900 transition-colors font-bold">Compliance Audit</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Hours (Right) */}
            <div className="md:col-span-3 flex flex-col gap-6">
              <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-stone-500">Operational Hours</h3>
              <ul className="space-y-3 text-xs text-stone-650">
                <li className="flex justify-between border-b border-stone-200/50 pb-2">
                  <span className="font-bold text-stone-850">Mon - Fri:</span>
                  <span>8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-stone-200/50 pb-2">
                  <span className="font-bold text-stone-850">Saturday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span className="font-bold text-stone-850">Sunday:</span>
                  <span className="text-amber-850 font-bold uppercase tracking-wider text-[10px]">Closed</span>
                </li>
                <li className="text-[10px] text-stone-500 italic mt-2 leading-relaxed">
                  * Note: E-catalog is active 24/7. Holiday schedule shifts are broadcasted via announcements.
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-stone-200 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4 font-bold">
            <div>
              © 2026 Lumina Academic Library Systems. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-stone-900 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-stone-900 transition-colors">Terms of Service</Link>
              <Link to="/compliance" className="hover:text-stone-900 transition-colors">Compliance</Link>
            </div>
          </div>

        </div>
      </footer>

      {/* BACK TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3.5 bg-stone-900/90 hover:bg-stone-950 text-stone-100 rounded-full border border-stone-800 shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 z-50 backdrop-blur-md ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

    </div>
  );
};

export default Home;
