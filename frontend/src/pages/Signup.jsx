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
    <div className="flex min-h-screen">
      {/* Left side - Branded Area */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#5030E5] flex-col justify-between p-12 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-white blur-[120px]" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-purple-300 blur-[120px]" />
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#5030E5]">
            <CheckSquare size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight">Task Manager</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Join the revolution of teamwork.
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Create an account to start managing projects, tracking tasks, and collaborating seamlessly in one beautiful workspace.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-sm font-medium text-white/60">© 2026 Task Manager. All rights reserved.</p>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 sm:px-16 xl:px-32 relative bg-white py-12">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5030E5] text-white">
              <CheckSquare size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">Task Manager</span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Create an account</h2>
            <p className="text-gray-500 text-[15px]">Sign up to get started with Task Manager.</p>
          </div>

          {(isError || passwordError) && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-100 flex items-center">
              <p className="text-sm text-red-600 font-medium">{passwordError || message}</p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[15px] outline-none transition-all placeholder:text-gray-400 focus:border-[#5030E5] focus:ring-1 focus:ring-[#5030E5]"
                id="name"
                name="name"
                value={name}
                placeholder="John Doe"
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[15px] outline-none transition-all placeholder:text-gray-400 focus:border-[#5030E5] focus:ring-1 focus:ring-[#5030E5]"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[15px] outline-none transition-all placeholder:text-gray-400 focus:border-[#5030E5] focus:ring-1 focus:ring-[#5030E5]"
                id="password"
                name="password"
                value={password}
                placeholder="Create a password"
                onChange={onChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                type="password"
                className={`w-full rounded-xl border px-4 py-3 text-[15px] outline-none transition-all placeholder:text-gray-400 focus:ring-1 ${
                  passwordError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-[#5030E5] focus:ring-[#5030E5]'
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
              className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#5030E5] px-4 py-3.5 text-[15px] font-semibold text-white shadow-sm transition-all hover:bg-[#5030E5]/90 hover:shadow disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[15px] text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#5030E5] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
