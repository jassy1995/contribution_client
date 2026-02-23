import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../lib/hooks/use-auth.jsx';
import { useLoginMutation } from '../lib/api/auth.js';
import Button from '../components/global/Button.jsx';
import { useToast } from '../lib/contexts/toast.js';
import { Input as UiInput } from '@/components/ui/input.jsx';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

const Login = () => {
  const { authenticate } = useAuth();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutateAsync: login } = useLoginMutation();

  const submit = async (values) => {
    setSubmitting(true);
    try {
      const res = await login({ phone: values.phone, password: values.password });
      const { user, token } = res.data;
      authenticate({ user, token });
    } catch (e) {
      console.log(e)
      const message = e?.response?.data?.message ?? e?.message ?? 'Something went wrong, please try again';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2ec] flex items-center justify-center px-4"
      style={{
        backgroundImage: `
          radial-gradient(ellipse 60% 50% at 80% 20%, rgba(201,168,76,0.12) 0%, transparent 70%),
          radial-gradient(ellipse 50% 60% at 10% 80%, rgba(201,168,76,0.08) 0%, transparent 60%)
        `
      }}
    >
      {/* Decorative corner accent */}
      <div className="pointer-events-none fixed top-0 right-0 w-72 h-72 border-l border-b border-[#c9a84c]/20 rounded-bl-full" />

      <div className="w-full max-w-[900px] bg-white shadow-2xl overflow-hidden flex" style={{ borderRadius: '2px', boxShadow: '0 4px 60px rgba(14,14,18,0.12), 0 1px 0 rgba(201,168,76,0.3)' }}>

        {/* ── Left decorative panel ── */}
        <div className="hidden lg:flex flex-col justify-between bg-[#0e0e12] px-12 py-14 w-[44%] relative overflow-hidden flex-shrink-0">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-72 h-72 rounded-full border border-[#c9a84c]/15" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 w-48 h-48 rounded-full border border-[#c9a84c]/10" />

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-[#c9a84c] flex items-center justify-center flex-shrink-0">
              <span style={{ fontFamily: "'Cormorant Garamond', serif", color: '#c9a84c', fontSize: '18px', fontWeight: 600 }}>V</span>
            </div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '19px', fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Collection
            </span>
          </div>

          {/* Copy */}
          <div className="flex-1 flex flex-col justify-center py-10">
            <p className="text-[#c9a84c] text-[11px] uppercase tracking-[0.18em] font-medium mb-5">Admin Portal</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '44px', fontWeight: 300, lineHeight: 1.15, marginBottom: '24px' }}>
              Welcome<br /><em style={{ color: '#e8c96b' }}>back.</em>
            </h2>
            <p className="text-white/40 text-[13.5px] leading-relaxed max-w-[260px]">
              Sign in to access the dashboard and continue where you left off.
            </p>
          </div>

          {/* Bottom rule */}
          <div className="relative pb-0">
            <div className="w-10 h-px bg-[#c9a84c] opacity-60" />
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="flex-1 px-8 lg:px-14 py-14 flex flex-col justify-center">

          {/* Header */}
          <div className="mb-10">
            <h1
              className="font-semibold text-[#0e0e12] mb-2.5"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '38px', fontWeight: 400, lineHeight: 1 }}
            >
              Sign In
            </h1>
            <p className="text-[#8a8780] text-[13.5px]">
              Enter your credentials below to sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(submit)}>
            <div className="space-y-5">
              <div>
                <label htmlFor="phone" className="block mb-1.5 text-sm text-neutral-700">Phone number</label>
                <UiInput
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                    className="w-full px-4 py-3 border h-14 border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoComplete="true"
                  disabled={submitting}
                  {...register('phone', { required: 'Phone number is required' })}
                />
                {errors?.phone?.message && <div className="text-sm text-red-500 mt-1">{errors.phone.message}</div>}
              </div>
              <div>
                <label htmlFor="password" className="block mb-1.5 text-sm text-neutral-700">Password</label>
                <div className="relative">
                  <UiInput
                    id="password"
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 border h-14 border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoComplete="true"
                    disabled={submitting}
                    {...register('password', { required: 'Password is required' })}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-600"
                    aria-label={passwordVisible ? 'Hide password' : 'Show password'}
                  >
                    {passwordVisible ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                  </button>
                </div>
                {errors?.password?.message && <div className="text-sm text-red-500 mt-1">{errors.password.message}</div>}
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end mt-3 mb-8">
            <button
              type="button"
              className="text-[12.5px] text-[#8a8780] hover:text-blue-900 cursor-pointer transition-colors duration-200"
            >
              Forgot password?
            </button>
            </div>

            <Button
              variant="filled"
              color="primary"
              type="submit"
              className="text-base w-full bg-[#0e0e12] text-center cursor-pointer hover:bg-[#1a1a20] h-14 inline-flex items-center justify-center"
              style={{
                background: '#0e0e12',
                // borderRadius: '2px',
                // height: '80px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                // letterSpacing: '0.4em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
              loading={submitting}
              block
            >
              Login
            </Button>
          </form>

          {/* Sign up prompt */}
          <div className="mt-8 text-center text-[13px] text-[#8a8780]">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              className="text-[#0e0e12] font-medium cursor-pointer border-[#c9a84c] hover:text-blue-800 transition-colors duration-200"
              style={{ textDecoration: 'none' }}
            >
              Create one
            </button>
          </div>
        </div>
      </div>

      {/* Google Fonts */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
      />
    </div>
  );
};

export default Login;
