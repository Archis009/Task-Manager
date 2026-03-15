import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';
import { CheckSquare } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/projects/active');
    }

    if (isError) {
      console.error(message);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setPasswordError(''); // Clear error when typing
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    dispatch(register({ name, email, password }));
  };

  return (
    <div 
      className="flex min-h-screen bg-cover bg-center relative"
      // Bright, modern office background
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1740&q=80')` }}
    >
      {/* Light Overlays for readability but keeping it bright */}
      <div className="absolute inset-0 bg-white/40" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/60 to-white/90 backdrop-blur-[2px]" />

      {/* Left side - Branded Area */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 text-slate-800 relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5030E5] text-white shadow-md shadow-[#5030E5]/20">
            <CheckSquare size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">Task Manager</span>
        </div>

        <div className="max-w-lg">
          <h1 className="text-5xl font-bold leading-tight mb-6 text-slate-900">
            Join the revolution of teamwork.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            Create an account to start managing projects, tracking tasks, and collaborating seamlessly in one beautiful workspace.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">© 2026 Task Manager. All rights reserved.</p>
        </div>
      </div>

      {/* Right side - Signup Form Container */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-6 sm:px-12 xl:px-24 relative z-10 py-12">
        <div className="mx-auto w-full max-w-md bg-white/80 backdrop-blur-xl border border-white p-8 sm:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5030E5] text-white shadow-md shadow-[#5030E5]/20">
              <CheckSquare size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">Task Manager</span>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Create an account</h2>
            <p className="text-slate-500 text-[15px]">Sign up to get started with Task Manager.</p>
          </div>

          {(isError || passwordError) && (
            <div className="mb-6 rounded-xl bg-red-50 p-4 border border-red-100 flex items-center">
              <p className="text-sm text-red-600 font-medium">{passwordError || message}</p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 bg-white/60 px-4 py-3 text-[15px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#5030E5] focus:bg-white focus:ring-1 focus:ring-[#5030E5] shadow-sm"
                id="name"
                name="name"
                value={name}
                placeholder="John Doe"
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-slate-200 bg-white/60 px-4 py-3 text-[15px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#5030E5] focus:bg-white focus:ring-1 focus:ring-[#5030E5] shadow-sm"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-xl border border-slate-200 bg-white/60 px-4 py-3 text-[15px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#5030E5] focus:bg-white focus:ring-1 focus:ring-[#5030E5] shadow-sm"
                id="password"
                name="password"
                value={password}
                placeholder="Create a password"
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                className={`w-full rounded-xl border bg-white/60 px-4 py-3 text-[15px] text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:ring-1 shadow-sm ${
                  passwordError 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-slate-200 focus:border-[#5030E5] focus:ring-[#5030E5]'
                }`}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm your password"
                onChange={onChange}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#5030E5] px-4 py-3.5 text-[15px] font-semibold text-white shadow-md shadow-[#5030E5]/20 transition-all hover:bg-[#5030E5]/90 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[15px] text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#5030E5] transition-colors underline-offset-4 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
