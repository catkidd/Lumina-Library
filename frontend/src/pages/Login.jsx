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
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f19] px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10"></div>

      <div className="w-full max-w-md glass-panel p-8 rounded-3xl shadow-2xl relative">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3.5 bg-indigo-600/20 text-indigo-400 rounded-2xl border border-indigo-500/20 mb-3 shadow-lg shadow-indigo-500/10">
            <Library className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-200 via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
            Lumina Library Portal
          </h2>
          <p className="text-slate-400 text-sm mt-1">Authenticate to access library services</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm mb-6">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {info && (
          <div className="flex items-center gap-2 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400 text-sm mb-6">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <span>{info}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="block text-slate-300 text-sm font-medium mb-2">Email Address</label>
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
                className="w-full pl-11 pr-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-indigo-500/50 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
                placeholder="you@library.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-slate-300 text-sm font-medium mb-2">Password</label>
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
                className="w-full pl-11 pr-12 py-3 bg-slate-950/40 border border-slate-800 focus:border-indigo-500/50 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/30 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm mt-8">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
