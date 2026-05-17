import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, Library, AlertTriangle, ShieldCheck } from 'lucide-react';

const Register = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/catalog');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password || !role) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    const res = await register(email, password, role);
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
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-50/20 rounded-full blur-[100px] -z-10"></div>

      <div className="w-full max-w-md bg-white/80 border border-slate-200/80 p-8 rounded-3xl shadow-2xl relative">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-200/50 mb-3 shadow-sm">
            <Library className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 font-serif">
            Create Lumina Account
          </h2>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-1">
            Register to start borrowing books today
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2.5 p-4 bg-rose-50 border border-rose-200/60 rounded-2xl text-rose-600 text-sm mb-6">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span className="font-bold">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="register-email" className="block text-slate-750 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Mail className="w-5 h-5" />
              </span>
              <input
                id="register-email"
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
            <label htmlFor="register-password" className="block text-slate-750 text-xs font-bold uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <Lock className="w-5 h-5" />
              </span>
              <input
                id="register-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
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

          <div>
            <label htmlFor="register-role" className="block text-slate-750 text-xs font-bold uppercase tracking-wider mb-2">Account Role</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <select
                id="register-role"
                name="role"
                className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 rounded-2xl text-slate-900 focus:outline-none transition-all appearance-none cursor-pointer shadow-sm font-medium"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="STUDENT" className="bg-white text-slate-900">
                  Student Account
                </option>
                <option value="ADMIN" className="bg-white text-slate-900">
                  Librarian (Admin) Account
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
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
              'Create Account'
            )}
          </button>
        </form>

        <p className="text-center text-slate-500 text-xs font-bold uppercase tracking-wider mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-700 hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
