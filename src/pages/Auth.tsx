
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        window.location.href = '/';
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_IN' && session?.user) {
        window.location.href = '/';
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // First check if user exists in enrollments
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('email, full_name')
        .eq('email', email)
        .single();

      if (!existingEnrollment) {
        toast({
          title: "Enrollment Required",
          description: "Please complete the enrollment form on our homepage first before creating an account.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Try to create the account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName || existingEnrollment.full_name,
          }
        }
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Account Exists",
            description: "An account with this email already exists. Please try signing in instead.",
            variant: "destructive",
          });
          setIsLogin(true);
        } else if (error.message.includes('Signups not allowed')) {
          // Handle case where signups are disabled
          toast({
            title: "Account Creation Disabled",
            description: "Account creation is currently disabled. Please contact our admin team for assistance.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Signup Error",
            description: error.message,
            variant: "destructive",
          });
        }
      } else if (data.user) {
        if (data.user.email_confirmed_at) {
          toast({
            title: "Success!",
            description: "Account created successfully. You are now logged in.",
          });
        } else {
          toast({
            title: "Check Your Email",
            description: "Please check your email and click the confirmation link to complete your account setup.",
          });
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred during signup",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        
        if (error.message.includes('Invalid login credentials')) {
          // Check if user exists in enrollments but not in auth
          const { data: enrollment } = await supabase
            .from('enrollments')
            .select('email, full_name')
            .eq('email', email)
            .maybeSingle();

          if (enrollment) {
            toast({
              title: "Account Not Created",
              description: "You've completed enrollment but haven't created an account yet. Please use the 'Create Account' option below.",
              variant: "destructive",
            });
            setIsLogin(false);
            setFullName(enrollment.full_name);
          } else {
            toast({
              title: "Invalid Credentials",
              description: "No account found with these credentials. Please check your email and password, or complete enrollment first.",
              variant: "destructive",
            });
          }
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Not Confirmed",
            description: "Please check your email and click the confirmation link to activate your account.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login Error",
            description: error.message,
            variant: "destructive",
          });
        }
      } else if (data.user) {
        toast({
          title: "Success!",
          description: "You have been signed in successfully.",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">
            {isLogin ? 'Sign In' : 'Create Account'}
          </CardTitle>
          <p className="text-slate-300">
            {isLogin 
              ? 'Welcome back to Atharva Computer Institute' 
              : 'Create your account to start learning'
            }
          </p>
        </CardHeader>
        <CardContent>
          {!isLogin && (
            <div className="mb-4 p-3 bg-blue-900/30 border border-blue-700 rounded-lg">
              <p className="text-sm text-blue-200">
                <strong>Note:</strong> You must complete enrollment on our homepage before creating an account.
              </p>
            </div>
          )}

          <form onSubmit={isLogin ? handleSignIn : handleSignUp} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600"
            >
              {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFullName('');
                setPassword('');
              }}
              className="text-blue-400 hover:text-blue-300 text-sm underline"
            >
              {isLogin 
                ? "Need to create an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>

          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-slate-400 hover:text-slate-300 text-sm underline"
            >
              Back to Homepage
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
