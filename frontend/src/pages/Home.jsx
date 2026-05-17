import { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, BookOpen, Users, Globe, BookMarked, 
  MapPin, Clock, Calendar, ArrowRight, ChevronDown, 
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
    { id: 1, title: "The Art of Computer Programming", author: "Donald Knuth", category: "Computer Science", year: "2021", rating: 5, status: "Available", desc: "The definitive guide to classical computer science algorithms.", gradient: "from-indigo-800 to-indigo-950" },
    { id: 2, title: "Clean Architecture", author: "Robert C. Martin", category: "Software Engineering", year: "2017", rating: 5, status: "Available", desc: "A craftsman's guide to software structure and design.", gradient: "from-teal-800 to-teal-950" },
    { id: 3, title: "Introduction to Algorithms", author: "Thomas H. Cormen", category: "Algorithms", year: "2022", rating: 4.8, status: "Borrowed", desc: "The standard academic reference for modern algorithms.", gradient: "from-violet-800 to-violet-950" },
    { id: 4, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", category: "Systems Design", year: "2017", rating: 4.9, status: "Available", desc: "An exhaustive guide to data systems architecture.", gradient: "from-purple-800 to-purple-950" },
    { id: 5, title: "Quantum Computing: A Gentle Introduction", author: "Eleanor Rieffel", category: "Emerging Tech", year: "2011", rating: 4.6, status: "Available", desc: "A mathematical introduction to quantum information science.", gradient: "from-cyan-800 to-cyan-950" },
    { id: 6, title: "Artificial Intelligence: A Modern Approach", author: "Stuart Russell", category: "AI / ML", year: "2020", rating: 4.9, status: "Available", desc: "The global gold standard textbook for AI.", gradient: "from-rose-800 to-rose-955" },
    { id: 7, title: "Compilers: Principles, Techniques, and Tools", author: "Alfred Aho", category: "Computer Science", year: "2006", rating: 4.7, status: "Available", desc: "The classic 'Dragon Book' on compiler design.", gradient: "from-indigo-900 to-slate-950" },
    { id: 8, title: "Pattern Recognition and Machine Learning", author: "Christopher Bishop", category: "AI / ML", year: "2006", rating: 4.8, status: "Available", desc: "An excellent Bayesian-focused textbook on machine learning.", gradient: "from-fuchsia-800 to-fuchsia-955" }
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
    { q: "How do I register for a digital library card?", a: "Click the 'Portal Access' button in the top navigation. Once registered, an academic student profile is dynamically provisioned with checkout rights." },
    { q: "What are the active borrowing limits and fine structures?", a: "Standard members can borrow up to 5 physical volumes simultaneously for a period of 14 calendar days. Fines accrue at a rate of $0.50 USD per day for overdue assets." },
    { q: "How do I access electronic research databases?", a: "Log into the portal using your verified academic email. Navigate to the catalog page and filter by 'E-Resources' to access indexed publications, scientific papers, and journals." },
    { q: "Can I reserve study booths and research media rooms?", a: "Absolutely. Logged-in students can book research booths and group study rooms dynamically through the dashboard or by requesting assistance at the center counter." },
    { q: "Does Lumina support Interlibrary Loans?", a: "Yes. If we do not possess a specific volume, our network allows us to request catalog assets from cooperating partner university systems at zero cost to you." }
  ];

  const toggleFaq = (i) => {
    setOpenFaq(openFaq === i ? null : i);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f6f8fb] text-slate-800 flex flex-col font-body select-none pb-0">
      
      {/* SCROLL PROGRESS BAR */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 z-[100] transition-all duration-100" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* GLOWING AMBIENT BACKGROUND ORBS */}
      <div className="absolute top-[-10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-indigo-200/20 blur-[160px] pointer-events-none animate-pulse-slow" />
      <div className="absolute top-[35%] right-[-15%] w-[700px] h-[700px] rounded-full bg-amber-100/15 blur-[170px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2.5s' }} />

      {/* ================= HERO SECTION ================= */}
      <header className="relative px-6 max-w-7xl mx-auto w-full pt-24 pb-32 z-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT EDITORIAL HEADER COL */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold uppercase tracking-widest font-body">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
              <span>University Research Repository</span>
            </div>

            <h1 className="font-display font-extrabold text-5xl md:text-7xl tracking-tight text-slate-900 leading-[1.02] drop-shadow-sm font-serif">
              Curating the <br />
              <span className="gradient-text-indigo">World's Finest</span> <br />
              Academic Archives
            </h1>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl font-normal">
              Empowering research excellence through structured digital repositories, advanced media booth logistics, and seamless catalog management since 1998.
            </p>

            {/* EXPANSIVE SEARCH BAR */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl group">
              <div className="relative flex items-center">
                <Search className="w-5.5 h-5.5 text-slate-400 absolute left-5 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search books, journals, authors, systems design..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-2xl pl-14 pr-32 py-5 text-sm md:text-base focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-none shadow-xl shadow-slate-100 transition-all font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-5 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-widest border border-indigo-400/20 shadow-md active:scale-97 transition-all duration-200"
                >
                  Query Engine
                </button>
              </div>

              {/* QUICK RECOM TAGS */}
              <div className="flex flex-wrap gap-2 mt-4 items-center">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Trending Fields:</span>
                {['Algorithms', 'Systems Design', 'AI / ML'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      setActiveCategory(tag === 'Systems Design' ? 'Systems Design' : tag === 'Algorithms' ? 'Algorithms' : 'AI / ML');
                    }}
                    className="text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50/60 px-2.5 py-1 border border-slate-200/60 hover:border-indigo-300 rounded-md transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>

          </div>

          {/* RIGHT COL: 3D-EFFECT INTERACTIVE STACK */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative w-full h-[450px] flex items-center justify-center">
              
              {/* Stack Background Glow */}
              <div className="absolute w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[90px] -z-10" />

              {/* Front Floating Book Deck */}
              <div className="absolute transform translate-y-[-20px] translate-x-[-20px] rotate-[-5deg] z-30 transition-transform duration-500 hover:translate-y-[-40px] hover:rotate-[-1deg] cursor-pointer">
                <div className="w-[200px] h-[280px] bg-gradient-to-br from-indigo-800 to-indigo-950 rounded-[20px] shadow-2xl border border-indigo-400/20 p-5 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/5 rounded-full blur-xl pointer-events-none" />
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 text-white px-2 py-0.5 rounded border border-white/15">Volume I</span>
                    <BookOpen className="w-4 h-4 text-indigo-200" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-sm text-white leading-tight font-serif uppercase">THE ART OF COMPUTER PROGRAMMING</h4>
                    <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">Donald Knuth</p>
                  </div>
                </div>
              </div>

              <div className="absolute transform translate-y-[20px] translate-x-[30px] rotate-[7deg] z-20 transition-transform duration-500 hover:translate-y-[40px] hover:rotate-[3deg] cursor-pointer">
                <div className="w-[200px] h-[280px] bg-gradient-to-br from-rose-900 to-rose-955 rounded-[20px] shadow-2xl border border-rose-400/20 p-5 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-[120px] h-[120px] bg-white/5 rounded-full blur-lg pointer-events-none" />
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-white/10 text-white px-2 py-0.5 rounded border border-white/15">Core Manual</span>
                    <Globe className="w-4 h-4 text-rose-200" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-display font-bold text-sm text-white leading-tight font-serif uppercase">ARTIFICIAL INTELLIGENCE</h4>
                    <p className="text-[10px] text-rose-300 font-bold uppercase tracking-wider">Stuart Russell</p>
                  </div>
                </div>
              </div>

              {/* Central Information Widget */}
              <div className="absolute bottom-4 right-10 z-40 bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xl backdrop-blur-md max-w-[200px] space-y-2 animate-float">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 font-body">Live Operations</span>
                </div>
                <p className="text-xs font-bold text-slate-600">Overdue checked daemon ran successfully at 00:00.</p>
              </div>

            </div>
          </div>

        </div>
      </header>

      {/* ================= QUICK STATS SECTION ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-32 z-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Asset Collections', count: '14,280+', desc: 'Indexed monographic & digital volumes', icon: BookMarked, color: 'text-indigo-600' },
            { label: 'Active Scholars', count: '3,850+', desc: 'Registered student & faculty credentials', icon: Users, color: 'text-indigo-600' },
            { label: 'Scientific Sources', count: '9,420+', desc: 'Accessible e-journals & publications', icon: Globe, color: 'text-indigo-600' }
          ].map((stat, i) => (
            <div 
              key={i} 
              className="glass-panel p-8 rounded-[20px] border border-slate-200/70 relative overflow-hidden flex flex-col justify-between glass-panel-hover"
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[50px] -z-10 transition-all duration-300 bg-indigo-100/30" />
              
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl bg-slate-50 border border-slate-200/80 ${stat.color} shadow-sm`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-body">Security Audited</span>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-4xl text-slate-900 tracking-tight leading-none font-serif">
                  {stat.count}
                </h3>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 font-body">
                  {stat.label}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  {stat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= RECOMMENDED CATALOG SECTION ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-36 z-40">
        
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <h3 className="text-indigo-600 text-xs font-bold uppercase tracking-widest font-body">Top Curations</h3>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight font-serif">
              Scholarly Recommendations
            </h2>
            <p className="text-slate-600 text-sm max-w-lg leading-relaxed font-body">
              Explore our highly-vetted acquisitions recommended by chief university researchers, organized into specialized categories.
            </p>
          </div>

          {/* Category Capsule Triggers */}
          <div className="flex flex-wrap gap-2 bg-slate-100/80 p-2 rounded-2xl border border-slate-200/60 max-w-max">
            {['All', 'Computer Science', 'AI / ML', 'Software Engineering', 'Systems Design'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/10'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* BOOK DECK GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedBooks.map((book) => (
            <div 
              key={book.id} 
              className="glass-panel rounded-[20px] border border-slate-200/70 overflow-hidden flex flex-col justify-between glass-panel-hover group"
            >
              
              {/* CSS BOOK COVER */}
              <div className={`h-[180px] bg-gradient-to-br ${book.gradient} p-5 flex flex-col justify-between relative overflow-hidden group-hover:opacity-95 transition-opacity`}>
                <div className="absolute top-0 right-0 w-[120px] h-[120px] bg-white/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex justify-between items-start">
                  <span className="text-[8px] font-bold uppercase tracking-widest bg-white/10 text-white px-2 py-0.5 rounded border border-white/10 font-body">{book.category}</span>
                  <div className="flex items-center gap-0.5 text-amber-300 bg-black/30 px-1.5 py-0.5 rounded text-[9px] font-bold border border-white/5">
                    <Star className="w-3 h-3 fill-amber-300 shrink-0" />
                    <span>{book.rating}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-extrabold text-xs text-white uppercase leading-tight tracking-wide select-all line-clamp-2 font-serif">{book.title}</h4>
                  <p className="text-[9px] text-white/70 font-bold tracking-wider uppercase truncate font-body">{book.author}</p>
                </div>
              </div>

              {/* CARD DETAILS */}
              <div className="p-6 space-y-4 flex-grow flex flex-col justify-between bg-white/40">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-500 font-body">System Catalog</span>
                    <span className={book.status === 'Available' ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                      ● {book.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {book.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase font-body">
                    Year: {book.year}
                  </div>
                  
                  <button
                    onClick={handleBookClick}
                    className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-700 group-hover:translate-x-0.5 transition-all font-body"
                  >
                    <span>Borrow Queue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES/SERVICES GRID ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-32 z-40">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200/50 mb-4 shadow-sm">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight mb-4 font-serif">
            Core Academic Services
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed font-body">
            Optimized infrastructure components designed to satisfy rigorous scientific workflows and resource requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Study Booth Logistics", desc: "Reserve silent study pods, media rooms, and research stations directly connected to power backups and secure campus networks.", icon: Clock, label: "Logistics" },
            { title: "Interlibrary Sourcing", desc: "If our local inventories do not host your target volume, our global ILL daemon registers sourcing queries to partner universities.", icon: Globe, label: "ILL" },
            { title: "Research Intelligence", desc: "Engage with specialized reference libraries and AI-driven literature research systems to accelerate dissertation processes.", icon: GraduationCap, label: "Consultation" }
          ].map((service, i) => (
            <div 
              key={i} 
              className="glass-panel p-8 rounded-[20px] border border-slate-200/70 relative overflow-hidden flex flex-col justify-between glass-panel-hover"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="p-3 bg-slate-50 border border-slate-200/80 text-indigo-600 rounded-2xl shadow-sm">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 border border-indigo-200/40 rounded font-body">
                    {service.label}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-slate-900 tracking-tight leading-tight font-serif">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-750 font-body"
                >
                  <span>Access Terminal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DYNAMIC ANNOUNCEMENT TIMELINE ================= */}
      <section className="relative px-6 max-w-5xl mx-auto w-full mb-36 z-40">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200/60 mb-4 shadow-sm">
            <CalendarDays className="w-6 h-6" />
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-slate-900 tracking-tight mb-4 font-serif">
            Library Broadcasters
          </h2>
          <p className="text-slate-600 text-sm font-body">Upcoming academic convocations, infrastructure updates, and research forums.</p>
        </div>

        {/* Timeline */}
        <div className="space-y-6 relative before:absolute before:left-8 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 z-10">
          {[
            { date: "May 24, 2026", title: "Symposium: Machine Learning and Big Data Architectures", desc: "Chief researchers from the Systems Design Core host a guest seminar inside Media Room 3. Access requires profile reservation.", tag: "Academics", icon: Calendar },
            { date: "June 02, 2026", title: "Scheduled Database Schema & Maintenance Restructure", desc: "The portal catalogue search endpoints will undergo performance tuning from 02:00 to 04:00 AM. Access tokens will temporarily reset.", tag: "Systems Ops", icon: Clock },
            { date: "June 10, 2026", title: "Historical Archives Preservation Acquisitions", desc: "Lumina has secured a licensed digital catalog set containing classical computing manuscripts from the ACM collections.", tag: "Assets", icon: BookMarked }
          ].map((event, i) => (
            <div key={i} className="flex gap-8 relative items-start group pl-2">
              
              {/* Bullet Node */}
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-indigo-600 group-hover:border-indigo-500/40 transition-colors z-20 shrink-0 shadow-sm shadow-slate-100">
                <event.icon className="w-5 h-5" />
              </div>
              
              {/* Event Card */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-200/70 flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 items-center glass-panel-hover">
                <div className="md:col-span-1 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block font-body">
                    {event.date}
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-2 py-0.5 border border-indigo-200/60 rounded max-w-fit block font-body">
                    {event.tag}
                  </span>
                </div>
                <div className="md:col-span-3 space-y-1">
                  <h4 className="font-display font-bold text-base text-slate-900 group-hover:text-indigo-600 transition-colors font-serif">
                    {event.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-32 z-40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-4 pr-6 flex flex-col justify-center">
            <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest font-body">Campus Reviews</span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight font-serif">
              Scholars Voice
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-body">
              Find out how academic researchers, doctorate candidates, and students experience Lumina's platform operations every single day.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { text: "Lumina's microsecond catalog indexing and stateless borrowing queue saves substantial research hours during database audits. A standard of modern library execution.", author: "Dr. Adrian Vance", role: "Quantum Research Fellow", initial: "AV" },
              { text: "The scholarly responsive interface is exceptionally visually satisfying, while the underlying automated return notifications prevent overdue debts effortlessly.", author: "Eleanor Martinez", role: "Postgrad Systems Candidate", initial: "EM" }
            ].map((test, i) => (
              <div 
                key={i} 
                className="glass-panel p-8 rounded-2xl border border-slate-200/70 flex flex-col justify-between glass-panel-hover"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, star) => (
                      <Star key={star} className="w-4 h-4 fill-amber-400 shrink-0" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{test.text}"
                  </p>
                </div>
                
                <div className="flex items-center gap-3 border-t border-slate-100 pt-5 mt-6">
                  <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center font-display font-bold text-indigo-600 border border-indigo-200/50 text-xs shadow-inner">
                    {test.initial}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs font-body">{test.author}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-body">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="relative px-6 max-w-4xl mx-auto w-full mb-36 z-40">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-200/50 mb-4 mx-auto shadow-sm">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight mb-3 font-serif">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-sm font-body">Find fast solutions to common inquiries regarding digital library cards, borrow regulations, and E-Resources.</p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className="glass-panel rounded-2xl border border-slate-200/70 overflow-hidden hover:border-slate-300/60 transition-colors"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full px-6 py-5 text-left flex items-center justify-between text-slate-800 hover:text-indigo-600 transition-colors font-display"
              >
                <span className="font-bold text-base md:text-lg pr-4 font-serif">{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp className="w-5 h-5 text-indigo-600 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openFaq === i ? 'max-h-[300px] border-t border-slate-100 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <p className="px-6 py-5 text-slate-600 text-sm leading-relaxed bg-slate-50/55">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= NEWSLETTER FULL SECTION ================= */}
      <section className="relative px-6 max-w-7xl mx-auto w-full mb-32 z-40">
        <div className="glass-panel p-10 md:p-16 rounded-[30px] border border-slate-200/70 shadow-xl relative overflow-hidden text-center gradient-bg">
          {/* Decorative glowing gradient spheres */}
          <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] rounded-full bg-indigo-100/40 blur-[60px] pointer-events-none" />
          <div className="absolute bottom-[-100px] left-[-100px] w-[250px] h-[250px] rounded-full bg-indigo-50/20 blur-[50px] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-200/50 mb-8 mx-auto shadow-sm">
              <Mail className="w-7 h-7 animate-bounce" />
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight font-serif">
              Subscribe to the <span className="bg-gradient-to-r from-indigo-700 to-indigo-900 bg-clip-text text-transparent animate-pulse uppercase font-body font-bold">Lumina Gazette</span>
            </h2>
            
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-10 max-w-lg mx-auto font-normal">
              Get direct intelligence on monthly resource acquisitions, specialized research tutorials, guest lectures, and holiday scheduling adjustments sent to your mailbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter academic email address"
                required
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                className="flex-grow bg-white border border-slate-200 text-slate-900 rounded-xl px-5 py-4 text-sm focus:border-indigo-600 outline-none shadow-sm transition-colors font-medium"
              />
              <button
                type="submit"
                disabled={subscribed}
                className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-xl border border-indigo-400/20 shadow-md hover:shadow-indigo-500/10 active:scale-97 transition-all duration-200 text-xs uppercase tracking-wider"
              >
                {subscribed ? 'Subscribed Successfully' : 'Subscribe Now'}
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-emerald-600 font-bold mt-4 animate-pulse">
                ✓ Registration successful. Welcome to the Lumina Academic broadcast list!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="w-full relative z-40 bg-slate-50 border-t border-slate-200/80 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
            
            {/* Column 1: Brand & Desc */}
            <div className="md:col-span-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-200/40">
                  <Library className="w-5 h-5" />
                </div>
                <span className="font-display font-extrabold text-lg tracking-wider text-slate-900 font-serif">
                  Lumina Library Portal
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-sm font-normal">
                Providing comprehensive access to cutting-edge research databases, academic media booths, study infrastructures, and multi-disciplinary libraries since 1998.
              </p>
              <div className="space-y-2">
                <a href="mailto:support@luminalibrary.edu" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors text-xs font-bold font-body">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  <span>support@luminalibrary.edu</span>
                </a>
                <a href="tel:+15550198" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors text-xs font-bold font-body">
                  <Phone className="w-4 h-4 text-indigo-500" />
                  <span>+1 (555) 019-8234</span>
                </a>
              </div>
            </div>

            {/* Column 2: Hours */}
            <div className="md:col-span-3">
              <h3 className="font-bold text-xs uppercase tracking-widest text-indigo-600 mb-6 font-body">Operational Hours</h3>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="font-bold text-slate-800">Mon - Fri:</span>
                  <span>8:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="font-bold text-slate-800">Saturday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between pb-1.5">
                  <span className="font-bold text-slate-800">Sunday:</span>
                  <span className="text-indigo-600 font-bold uppercase tracking-wider">Closed</span>
                </li>
                <li className="text-[10px] text-slate-500 italic mt-2">
                  * Note: E-catalog is active 24/7. Holiday schedule shifts are broadcasted via announcements.
                </li>
              </ul>
            </div>

            {/* Column 3: Institutional Links */}
            <div className="md:col-span-3">
              <h3 className="font-bold text-xs uppercase tracking-widest text-indigo-600 mb-6 font-body">Quick Navigation</h3>
              <ul className="space-y-3 text-xs text-slate-600 font-body">
                <li>
                  <Link to="/catalog" className="hover:text-indigo-600 transition-colors font-bold">Book Catalog</Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-indigo-600 transition-colors font-bold">Study Booth Booking</Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-indigo-600 transition-colors font-bold">Research Support</Link>
                </li>
                <li>
                  <Link to="/compliance" className="hover:text-indigo-600 transition-colors font-bold">Compliance Audit</Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © 2026 Lumina Academic Library Systems. All rights reserved.
            </div>
            <div className="flex gap-6 font-bold font-body">
              <Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link>
              <Link to="/compliance" className="hover:text-indigo-600 transition-colors">Compliance</Link>
            </div>
          </div>

        </div>
      </footer>

      {/* BACK TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3.5 bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-2xl border border-indigo-400/30 shadow-xl shadow-indigo-500/10 hover:scale-105 active:scale-95 transition-all duration-300 z-50 backdrop-blur-md ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

    </div>
  );
};

export default Home;
