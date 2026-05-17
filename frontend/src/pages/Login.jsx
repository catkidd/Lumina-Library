import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Library, AlertTriangle, CheckCircle } from 'lucide-react';

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/catalog');
    }

    const params = new URLSearchParams(location.search);
    if (params.get('expired') === 'true') {
      setInfo('Session expired. Please log in again to continue.');
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/catalog');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8fb] px-4 relative overflow-hidden font-body select-none">
      
      {/* GLOWING BACKGROUND ORBS */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-50/20 rounded-full blur-[100px] -z-10"></div>

      <div className="w-full max-w-md bg-white/80 border border-slate-200/80 p-8 rounded-3xl shadow-2xl relative">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200/50 mb-3 shadow-sm">
            <Library className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 font-serif">
            Lumina Library Portal
          </h2>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-1">
            Authenticate for secure access
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2.5 p-4 bg-rose-50 border border-rose-200/60 rounded-2xl text-rose-600 text-sm mb-6">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span className="font-bold">{error}</span>
          </div>
        )}

        {info && (
          <div className="flex items-center gap-2.5 p-4 bg-indigo-50 border border-indigo-200/60 rounded-2xl text-indigo-600 text-sm mb-6">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-bold">{info}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="block text-slate-750 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-sm font-medium"
                placeholder="you@library.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-slate-750 text-xs font-bold uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="w-full pl-11 pr-12 py-3 bg-white border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none transition-all shadow-sm font-medium"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-2xl shadow-md hover:shadow-indigo-500/10 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center text-xs uppercase tracking-widest border border-indigo-400/20"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-wider mt-8">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-700 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
