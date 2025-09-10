import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, LogIn } from "lucide-react";
import { auth, provider } from "../firebase/firebase";
import { 
  onAuthStateChanged, 
  signOut, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close mobile menu or login modal when navigation changes
  useEffect(() => {
    setIsOpen(false);
    setShowLogin(false);
  }, [location]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      setShowLogin(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleEmailSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowLogin(false);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowLogin(false);
      setEmail("");
      setPassword("");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Atharva Computer Institute
            </span>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-20">
            {["about", "contact", "courses", "reviews"].map((path) => (
              <Link
                key={path}
                to={`/${path}`}
                className="text-white text-lg hover:text-blue-400 transition-colors"
              >
                {path.charAt(0).toUpperCase() + path.slice(1)}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-slate-300">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Welcome, {user.displayName || user.email}</span>
                </div>
                <Button
                  onClick={() => signOut(auth)}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setShowLogin(true)}
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-slate-800">
          {["about", "contact", "courses", "reviews"].map((path) => (
            <Link
              key={path}
              to={`/${path}`}
              className="block text-white py-2 px-4 hover:bg-slate-700 transition-colors"
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </Link>
          ))}
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-lg w-96 text-white relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-white"
            >
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Login / Signup</h2>

            <Button
              onClick={handleGoogleLogin}
              className="w-full mb-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <LogIn /> Sign in with Google
            </Button>

            <div className="border-t border-slate-700 my-4"></div>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded mb-2 text-black"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded mb-4 text-black"
            />

            <div className="flex gap-2">
              <Button onClick={handleEmailSignup} className="w-1/2 bg-green-600 hover:bg-green-700">
                Sign Up
              </Button>
              <Button onClick={handleEmailLogin} className="w-1/2 bg-blue-600 hover:bg-blue-700">
                Log In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
