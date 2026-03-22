import React from 'react'
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../lib/api';

function AdminLogin() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-16">
          <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">Admin Access</p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Sign in to manage your portfolio
              </h1>
              <p className="max-w-xl text-base text-slate-300/90">
                Upload new work, edit highlights, and publish updates. Use your admin
                credentials to continue.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <span className="rounded-full border border-slate-700/70 px-4 py-1">Secure upload</span>
                <span className="rounded-full border border-slate-700/70 px-4 py-1">Private dashboard</span>
                <span className="rounded-full border border-slate-700/70 px-4 py-1">Role based</span>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur">
              <div className="mb-8 space-y-2">
                <h2 className="text-2xl font-semibold">Welcome back</h2>
                <p className="text-sm text-slate-400">
                  Enter your email and password to access the admin area.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <label className="block text-sm font-medium text-slate-300">
                  Email address
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@pratik.com"
                    className="mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 outline-none ring-emerald-400/50 transition focus:border-emerald-400/70 focus:ring"
                    autoComplete="email"
                    required
                  />
                </label>

                <label className="block text-sm font-medium text-slate-300">
                  Password
                  <div className="relative mt-2">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-slate-700/80 bg-slate-950/60 px-4 py-3 pr-20 text-sm text-slate-100 outline-none ring-emerald-400/50 transition focus:border-emerald-400/70 focus:ring"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-300 transition hover:text-emerald-200"
                      aria-pressed={showPassword}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </label>

                <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                  <label className="flex items-center gap-2 text-slate-400">
                    <input
                      type="checkbox"
                      name="remember"
                      className="h-4 w-4 rounded border-slate-700 bg-slate-950/60 text-emerald-400 focus:ring-emerald-400/60"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="text-emerald-300 transition hover:text-emerald-200"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              {error && (
                <p className="mt-4 text-sm text-rose-300">{error}</p>
              )}

              <p className="mt-8 text-xs text-slate-500">
                Need access? Contact the site administrator to request credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
