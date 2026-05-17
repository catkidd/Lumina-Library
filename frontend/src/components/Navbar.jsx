import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Library, BookOpen, Clock, Shield, LogOut, User, Compass, MapPin } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
      isActive(path)
        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/35 shadow-lg shadow-indigo-500/5'
        : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border-transparent'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-4 mx-4 xl:mx-auto max-w-7xl z-50 glass-panel rounded-[20px] px-6 py-3.5 flex items-center justify-between shadow-2xl backdrop-blur-xl border border-white/5 transition-all duration-300">
      
      {/* CLASSIC ACADEMIC LOGO */}
      <Link to={user ? "/catalog" : "/"} className="flex items-center gap-2.5 group">
        <div className="p-2 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-xl shadow-lg shadow-indigo-900/45 group-hover:scale-105 active:scale-95 transition-all duration-300 border border-indigo-400/20">
          <Library className="w-5 h-5 text-indigo-200" />
        </div>
        <span className="font-display font-extrabold text-2xl tracking-normal text-white flex items-center gap-2 select-none">
          Lumina
          <span className="text-[9px] font-bold tracking-widest bg-indigo-950/80 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30 uppercase font-body">
            Library
          </span>
        </span>
      </Link>

      {/* CORE NAVIGATION */}
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <Link to="/catalog" className={linkClass('/catalog')}>
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Catalog</span>
            </Link>

            {user.role === 'STUDENT' && (
              <Link to="/history" className={linkClass('/history')}>
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Borrowing Logs</span>
              </Link>
            )}

            {user.role === 'ADMIN' && (
              <Link to="/admin" className={linkClass('/admin')}>
                <Shield className="w-4 h-4 text-indigo-400" />
                <span>Control Panel</span>
              </Link>
            )}
          </>
        ) : (
          <div className="hidden lg:flex items-center gap-5">
            <Link to="/login" className="text-slate-400 hover:text-indigo-400 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5 font-body">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>Books</span>
            </Link>
            <Link to="/login" className="text-slate-400 hover:text-indigo-400 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5 font-body">
              <Compass className="w-3.5 h-3.5 text-indigo-500" />
              <span>E-Resources</span>
            </Link>
            <div className="w-px h-3.5 bg-slate-800" />
            <div className="text-slate-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 select-none bg-slate-900/40 px-3 py-1.5 border border-slate-800/80 rounded-xl font-body">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Mon - Sat: 8AM - 10PM</span>
            </div>
            <div className="text-slate-400 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 select-none bg-slate-900/40 px-3 py-1.5 border border-slate-800/80 rounded-xl font-body">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>Campus Core</span>
            </div>
          </div>
        )}
      </div>

      {/* ACTION BLOCK */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-900/40 border border-slate-800/85 rounded-xl text-xs font-semibold text-slate-300 font-body">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span className="max-w-[120px] truncate">{user.email}</span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/25 rounded-md uppercase">
                {user.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/30 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-97 font-body"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-xl border border-indigo-400/20 shadow-lg hover:shadow-indigo-500/15 active:scale-97 transition-all duration-300 text-xs uppercase tracking-wider font-body"
          >
            <User className="w-3.5 h-3.5" />
            <span>Portal Access</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
