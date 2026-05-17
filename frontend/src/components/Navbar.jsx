import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Library, BookOpen, Clock, Shield, LogOut, User, Compass, MapPin } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
      isActive(path)
        ? 'bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 shadow-lg shadow-indigo-500/10'
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-panel sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-xl backdrop-blur-md">
      {/* BRAND LOGO */}
      <Link to={user ? "/catalog" : "/"} className="flex items-center gap-3 group">
        <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/20 group-hover:scale-105 transition-all duration-200">
          <Library className="w-6 h-6 animate-pulse" />
        </div>
        <span className="font-semibold text-lg tracking-wider bg-gradient-to-r from-indigo-300 via-indigo-100 to-indigo-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
          Lumina Library
        </span>
      </Link>

      {/* CORE NAVIGATION */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link to="/catalog" className={linkClass('/catalog')}>
              <BookOpen className="w-4 h-4" />
              <span>Catalog</span>
            </Link>

            {user.role === 'STUDENT' && (
              <Link to="/history" className={linkClass('/history')}>
                <Clock className="w-4 h-4" />
                <span>Borrowing History</span>
              </Link>
            )}

            {user.role === 'ADMIN' && (
              <Link to="/admin" className={linkClass('/admin')}>
                <Shield className="w-4 h-4" />
                <span>Admin Control</span>
              </Link>
            )}
          </>
        ) : (
          <div className="hidden lg:flex items-center gap-6">
            <Link to="/login" className="text-slate-400 hover:text-indigo-400 font-medium text-sm transition-all flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-500/80" />
              <span>Books</span>
            </Link>
            <Link to="/login" className="text-slate-400 hover:text-indigo-400 font-medium text-sm transition-all flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-indigo-500/80" />
              <span>E-Resources</span>
            </Link>
            <div className="w-px h-4 bg-slate-800" />
            <div className="text-slate-400 font-medium text-xs flex items-center gap-1.5 select-none bg-slate-900/30 px-3 py-1.5 border border-slate-800/40 rounded-xl">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Mon - Sat: 8 AM - 10 PM</span>
            </div>
            <div className="text-slate-400 font-medium text-xs flex items-center gap-1.5 select-none bg-slate-900/30 px-3 py-1.5 border border-slate-800/40 rounded-xl">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>Central Campus</span>
            </div>
          </div>
        )}
      </div>

      {/* ACTION BLOCK */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-800/30 border border-slate-700/30 rounded-xl text-sm text-slate-400">
              <User className="w-4 h-4 text-indigo-400" />
              <span>{user.email}</span>
              <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md">
                {user.role}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 hover:border-rose-500/30 rounded-xl transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-xl border border-indigo-400/20 shadow-lg hover:shadow-indigo-500/15 active:scale-97 transition-all duration-200 text-sm"
          >
            <User className="w-4 h-4" />
            <span>Sign In / Register</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

