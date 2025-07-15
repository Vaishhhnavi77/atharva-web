
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
      // Check if user already exists in enrollments
      const { data: existingEnrollment } = await supabase
        .from('enrollments')
        .select('email')
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

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
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
        } else if (error.message.includes('email_provider_disabled') || error.message.includes('Email signups are disabled')) {
          toast({
            title: "Account Creation Pending",
            description: "Your enrollment has been received. Please contact our admin team to activate your account as email signups are currently disabled.",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "Please check your email to confirm your account.",
        });
      }
    } catch (error) {
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          // Check if user exists in enrollments but not in auth
          const { data: enrollment } = await supabase
            .from('enrollments')
            .select('email, full_name')
            .eq('email', email)
            .single();

          if (enrollment) {
            toast({
              title: "Account Not Activated",
              description: "Your enrollment was received but your account hasn't been activated yet. Please contact our admin team or try creating an account if signups are enabled.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Invalid Credentials",
              description: "No account found with these credentials. Please check your email and password, or complete enrollment first.",
              variant: "destructive",
            });
          }
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Success!",
          description: "You have been signed in successfully.",
        });
      }
    } catch (error) {
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
            {isLogin ? 'Welcome back to Atharva Computer Institute' : 'Complete your enrollment by creating an account'}
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
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 hover:text-blue-300 text-sm"
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
