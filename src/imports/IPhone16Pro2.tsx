import { useState } from 'react';
import { useForm } from 'react-hook-form@7.55.0';
import { Checkbox } from '../components/ui/checkbox';
import { toast } from 'sonner@2.0.3';
import { useAuth } from '../components/AuthProvider';
import { SignUpDialog } from '../components/SignUpDialog';
import { GoogleLoginDialog } from '../components/GoogleLoginDialog';
import { Eye, EyeOff, Mail } from 'lucide-react';

interface LoginFormData {
  username: string;
  password: string;
}

function IPhone16Pro({ className }: { className?: string }) {
  const { login, loginWithGoogle, completeGoogleLogin } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [googleDialogOpen, setGoogleDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const result = await login(data.username, data.password, rememberMe);
    setIsLoading(false);

    if (result.success) {
      toast.success(result.message, {
        description: `Welcome back, ${data.username}!`,
      });
    } else {
      toast.error(result.message, {
        description: 'Please check your credentials and try again.',
      });
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const result = await loginWithGoogle(rememberMe);
    setIsLoading(false);

    if (result.requiresEmail) {
      setGoogleDialogOpen(true);
    } else if (result.success) {
      toast.success(result.message, {
        description: 'Welcome to MedEasy!',
      });
    } else {
      toast.error(result.message);
    }
  };

  const handleGoogleEmailSubmit = async (email: string) => {
    const result = completeGoogleLogin(email, rememberMe);
    
    if (result.success) {
      setGoogleDialogOpen(false);
      toast.success(result.message, {
        description: 'Welcome to MedEasy!',
      });
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className={`bg-[#05045c] size-full md:rounded-[20px] overflow-hidden flex flex-col ${className}`} data-name="iPhone 16 Pro - 2">
      <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.6293203234672546)+(var(--transform-inner-height)*0.7771458625793457)))] items-center justify-center left-[-272px] top-[-56px] w-[calc(1px*((var(--transform-inner-height)*0.6293203234672546)+(var(--transform-inner-width)*0.7771458625793457)))]" style={{ "--transform-inner-width": "505", "--transform-inner-height": "755.5625" } as React.CSSProperties}>
        <div className="flex-none rotate-[39deg]">
          <div className="h-[755.574px] relative w-[505.004px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 505 756">
              <ellipse cx="252.502" cy="377.787" fill="var(--fill-0, white)" id="Ellipse 3" rx="252.502" ry="377.787" />
            </svg>
          </div>
        </div>
      </div>
      <p className="absolute font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[normal] left-1/2 -translate-x-1/2 text-[#05045c] text-[41px] text-nowrap top-[100px] md:top-[136px] tracking-[-0.697px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Log In
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full px-8 md:px-0">
        {/* Username Input */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[180px] md:top-[228px] w-[300px]">
          <input
            {...register('username', {
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters' },
            })}
            className="bg-[#d9d9d9] h-[40px] w-full rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-[17px] font-['Instrument_Sans:Regular',sans-serif] text-[20px] text-[#555353] outline-none focus:ring-2 focus:ring-[#05045c] transition-all"
            placeholder="Username"
            style={{ fontVariationSettings: "'wdth' 100" }}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1 ml-4">{errors.username.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[260px] md:top-[314px] w-[300px]">
          <div className="relative">
            <input
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              type={showPassword ? 'text' : 'password'}
              className="bg-[#d9d9d9] h-[40px] w-full rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-[17px] font-['Instrument_Sans:Regular',sans-serif] text-[20px] text-[#555353] outline-none focus:ring-2 focus:ring-[#05045c] transition-all"
              placeholder="Password"
              style={{ fontVariationSettings: "'wdth' 100" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555353] hover:text-[#05045c] transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 ml-4">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="absolute left-1/2 -translate-x-1/2 -ml-[130px] top-[335px] md:top-[385px] flex items-center gap-3">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="border-[#555353] data-[state=checked]:bg-[#05045c] data-[state=checked]:border-[#05045c]"
          />
          <label
            htmlFor="remember"
            className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-[#555353] tracking-[-0.238px] cursor-pointer select-none"
            style={{ fontVariationSettings: "'wdth' 100" }}
          >
            Remember Me
          </label>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="absolute bg-[#05045c] h-[50px] left-1/2 -translate-x-1/2 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[385px] md:top-[437px] w-[300px] cursor-pointer transition-all duration-300 hover:bg-[#07076e] hover:shadow-[0px_6px_6px_0px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <span className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[normal] text-[20px] text-white tracking-[-0.34px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {isLoading ? 'Logging In...' : 'Log In'}
          </span>
        </button>
      </form>

      {/* OR Divider */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[455px] md:top-[503px] w-[300px] flex items-center gap-3">
        <div className="flex-1 h-[1px] bg-gray-300" />
        <span className="font-['Instrument_Sans:Regular',sans-serif] text-[14px] text-gray-500">OR</span>
        <div className="flex-1 h-[1px] bg-gray-300" />
      </div>

      {/* Google Login Button */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="absolute bg-white h-[50px] left-1/2 -translate-x-1/2 rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[480px] md:top-[528px] w-[300px] cursor-pointer transition-all duration-300 hover:bg-gray-50 hover:shadow-[0px_6px_6px_0px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border-2 border-gray-200"
      >
        <Mail className="w-5 h-5 text-red-500" />
        <span className="font-['Instrument_Sans:Regular',sans-serif] font-normal leading-[normal] text-[18px] text-[#05045c] tracking-[-0.34px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Sign in with Google
        </span>
      </button>

      {/* Sign Up Link */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[550px] md:top-[604px] w-[300px] text-center">
        <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal text-[14px] text-[#555353] tracking-[-0.238px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Don't Have An Account?{' '}
          <button
            type="button"
            onClick={() => setSignUpOpen(true)}
            className="text-[#05045c] hover:underline font-medium transition-colors"
          >
            Sign Up
          </button>
        </p>
      </div>

      <SignUpDialog open={signUpOpen} onOpenChange={setSignUpOpen} />
      <GoogleLoginDialog 
        open={googleDialogOpen} 
        onOpenChange={setGoogleDialogOpen} 
        onSubmit={handleGoogleEmailSubmit}
        isLoading={false}
      />
    </div>
  );
}

export default function IPhone16Pro2() {
  return <IPhone16Pro className="bg-[#05045c] overflow-clip relative rounded-[20px] size-full" />;
}
