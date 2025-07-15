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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You have been signed in successfully.",
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: error instanceof Error ? error.message : "Failed to sign in",
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
            Sign In to Your Account
          </CardTitle>
          <p className="text-slate-300">
            Welcome back to Atharva Computer Institute
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
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
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <div className="bg-slate-700/30 p-4 rounded-lg border border-slate-600">
              <p className="text-slate-300 text-sm mb-2">
                Don't have an account yet?
              </p>
              <p className="text-slate-400 text-xs mb-3">
                Create your account by filling out the enrollment form on our homepage.
              </p>
              <a 
                href="/#contact" 
                className="inline-block bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:from-teal-600 hover:to-blue-600 transition-all duration-300"
              >
                Go to Enrollment Form
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
