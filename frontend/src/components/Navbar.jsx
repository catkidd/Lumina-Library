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
        ? 'bg-indigo-50 text-indigo-600 border-indigo-200/60 shadow-md shadow-indigo-500/5'
        : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100/50 border-transparent'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-4 mx-4 xl:mx-auto max-w-7xl z-50 glass-panel rounded-[20px] px-6 py-3.5 flex items-center justify-between shadow-xl backdrop-blur-xl border border-slate-200/40 transition-all duration-300">
      
      {/* CLASSIC ACADEMIC LOGO */}
      <Link to={user ? "/catalog" : "/"} className="flex items-center gap-2.5 group">
        <div className="p-2 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white rounded-xl shadow-md shadow-indigo-600/30 group-hover:scale-105 active:scale-95 transition-all duration-300 border border-indigo-400/20">
          <Library className="w-5 h-5 text-indigo-100" />
        </div>
        <span className="font-display font-extrabold text-2xl tracking-normal text-slate-900 flex items-center gap-2 select-none font-serif">
          Lumina
          <span className="text-[9px] font-bold tracking-widest bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded border border-indigo-200/60 uppercase font-body">
            Library
          </span>
        </span>
      </Link>

      {/* CORE NAVIGATION */}
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <Link to="/catalog" className={linkClass('/catalog')}>
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Catalog</span>
            </Link>

            {user.role === 'STUDENT' && (
              <Link to="/history" className={linkClass('/history')}>
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>Borrowing Logs</span>
              </Link>
            )}

            {user.role === 'ADMIN' && (
              <Link to="/admin" className={linkClass('/admin')}>
                <Shield className="w-4 h-4 text-indigo-600" />
                <span>Control Panel</span>
              </Link>
            )}
          </>
        ) : (
          <div className="hidden lg:flex items-center gap-5">
            <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5 font-body">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>Books</span>
            </Link>
            <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-1.5 font-body">
              <Compass className="w-3.5 h-3.5 text-indigo-500" />
              <span>E-Resources</span>
            </Link>
            <div className="w-px h-3.5 bg-slate-200" />
            <div className="text-slate-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 select-none bg-slate-100/60 px-3 py-1.5 border border-slate-200/60 rounded-xl font-body">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>Mon - Sat: 8AM - 10PM</span>
            </div>
            <div className="text-slate-600 font-bold text-[10px] uppercase tracking-widest flex items-center gap-1.5 select-none bg-slate-100/60 px-3 py-1.5 border border-slate-200/60 rounded-xl font-body">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>Campus Core</span>
            </div>
          </div>
        )}
      </div>

      {/* ACTION BLOCK */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100/60 border border-slate-200/60 rounded-xl text-xs font-bold text-slate-700 font-body">
              <User className="w-3.5 h-3.5 text-indigo-500" />
              <span className="max-w-[120px] truncate">{user.email}</span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-widest bg-indigo-50 text-indigo-600 border border-indigo-200/50 rounded-md uppercase font-body">
                {user.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100/80 text-rose-600 border border-rose-200/60 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-97 font-body"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-body">Logout</span>
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-xl border border-indigo-400/20 shadow-md hover:shadow-indigo-500/10 active:scale-97 transition-all duration-300 text-xs uppercase tracking-wider font-body"
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
