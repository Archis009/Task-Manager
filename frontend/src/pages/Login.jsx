import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { CheckSquare } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
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
          <span className="text-2xl font-bold tracking-tight">Project M.</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Empower your team's workflow.
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            Manage projects, track tasks, and collaborate seamlessly in one beautiful workspace designed for modern teams.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-sm font-medium text-white/60">© 2026 Project M. All rights reserved.</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center px-8 sm:px-16 xl:px-32 relative bg-white">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5030E5] text-white">
              <CheckSquare size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">Project M.</span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Welcome back</h2>
            <p className="text-gray-500 text-[15px]">Please enter your details to sign in.</p>
          </div>

          {isError && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-100 flex items-center">
              <p className="text-sm text-red-600 font-medium">{message}</p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
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
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-[#5030E5] hover:text-[#5030E5]/80">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[15px] outline-none transition-all placeholder:text-gray-400 focus:border-[#5030E5] focus:ring-1 focus:ring-[#5030E5]"
                id="password"
                name="password"
                value={password}
                placeholder="••••••••"
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
                'Sign in'
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-[15px] text-gray-500">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-[#5030E5] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
