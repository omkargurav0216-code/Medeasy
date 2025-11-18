import { useState } from 'react';
import { useForm } from 'react-hook-form@7.55.0';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { useAuth } from './AuthProvider';
import { GoogleLoginDialog } from './GoogleLoginDialog';
import { Eye, EyeOff, Mail } from 'lucide-react';

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignUpDialog({ open, onOpenChange }: SignUpDialogProps) {
  const { signup, loginWithGoogle, completeGoogleLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleDialogOpen, setGoogleDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SignUpFormData>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  const password = watch('password');

  const onSubmit = async (data: SignUpFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      const result = await signup(data.username, data.email, data.password);
      
      if (result.success) {
        toast.success(result.message, {
          description: 'You can now login with your credentials',
        });
        reset();
        setTimeout(() => {
          onOpenChange(false);
        }, 500);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(onSubmit)(e);
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    const result = await loginWithGoogle(true);
    setIsLoading(false);

    if (result.requiresEmail) {
      setGoogleDialogOpen(true);
    } else if (result.success) {
      toast.success(result.message, {
        description: 'Welcome to MedEasy!',
      });
      reset();
      onOpenChange(false);
    } else {
      toast.error(result.message);
    }
  };

  const handleGoogleEmailSubmit = async (email: string) => {
    const result = completeGoogleLogin(email, true);
    
    if (result.success) {
      setGoogleDialogOpen(false);
      onOpenChange(false);
      toast.success(result.message, {
        description: 'Welcome to MedEasy!',
      });
      reset();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="bg-white sm:max-w-[425px] max-h-[90vh] overflow-y-auto"
        onPointerDownOutside={(e) => {
          if (isLoading) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (isLoading) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-[#05045c]">Create Account</DialogTitle>
          <DialogDescription>
            Sign up to get started with MedEasy
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-username">Username</Label>
            <Input
              id="signup-username"
              placeholder="Enter username (min 3 characters)"
              autoComplete="username"
              {...register('username', {
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be at least 3 characters' },
                maxLength: { value: 20, message: 'Username must be less than 20 characters' },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: 'Username can only contain letters, numbers, and underscores'
                }
              })}
              className={errors.username ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="Enter email address"
              autoComplete="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
              className={errors.email ? 'border-red-500' : ''}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <div className="relative">
              <Input
                id="signup-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password (min 6 characters)"
                autoComplete="new-password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
                className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="signup-confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter password"
                autoComplete="new-password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                className={errors.confirmPassword ? 'border-red-500 pr-10' : 'pr-10'}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-[#05045c] hover:bg-[#07076e]"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>

          <div className="relative py-2">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
              OR
            </span>
          </div>

          <Button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isLoading}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-2"
          >
            <Mail className="w-5 h-5 text-red-500" />
            Sign up with Google
          </Button>
          
          <p className="text-xs text-center text-gray-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-[#05045c] hover:underline font-medium"
              disabled={isLoading}
            >
              Close and login
            </button>
          </p>
        </form>
      </DialogContent>
      <GoogleLoginDialog 
        open={googleDialogOpen} 
        onOpenChange={setGoogleDialogOpen} 
        onSubmit={handleGoogleEmailSubmit}
        isLoading={false}
      />
    </Dialog>
  );
}
