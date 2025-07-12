
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAuthenticated } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-300 cursor-default">
              Atharva Computer Institute
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="nav-link text-slate-300 hover:text-white px-4 py-2 text-lg font-semibold transition-all duration-300 relative overflow-hidden group transform hover:scale-105 hover:-translate-y-0.5"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-md"></div>
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="nav-link text-slate-300 hover:text-white px-4 py-2 text-lg font-semibold transition-all duration-300 relative overflow-hidden group transform hover:scale-105 hover:-translate-y-0.5"
              >
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-md"></div>
              </button>
              <button
                onClick={() => scrollToSection("courses")}
                className="nav-link text-slate-300 hover:text-white px-4 py-2 text-lg font-semibold transition-all duration-300 relative overflow-hidden group transform hover:scale-105 hover:-translate-y-0.5"
              >
                <span className="relative z-10">Courses</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-md"></div>
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="nav-link text-slate-300 hover:text-white px-4 py-2 text-lg font-semibold transition-all duration-300 relative overflow-hidden group transform hover:scale-105 hover:-translate-y-0.5"
              >
                <span className="relative z-10">Reviews</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-md"></div>
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="nav-link text-slate-300 hover:text-white px-4 py-2 text-lg font-semibold transition-all duration-300 relative overflow-hidden group transform hover:scale-105 hover:-translate-y-0.5"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-md"></div>
              </button>
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-slate-300 animate-fade-in">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Welcome!</span>
                </div>
                <Button
                  onClick={signOut}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 transform hover:scale-105 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => window.location.href = '/auth'}
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 transform hover:scale-105 hover:shadow-lg transition-all duration-200"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2 transform hover:scale-110 transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800/50 rounded-lg mt-2">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-slate-300 hover:text-white block px-3 py-2 text-lg font-semibold w-full text-left hover:bg-slate-700/50 rounded transition-all duration-200 transform hover:translate-x-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-slate-300 hover:text-white block px-3 py-2 text-lg font-semibold w-full text-left hover:bg-slate-700/50 rounded transition-all duration-200 transform hover:translate-x-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("courses")}
                className="text-slate-300 hover:text-white block px-3 py-2 text-lg font-semibold w-full text-left hover:bg-slate-700/50 rounded transition-all duration-200 transform hover:translate-x-2"
              >
                Courses
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className="text-slate-300 hover:text-white block px-3 py-2 text-lg font-semibold w-full text-left hover:bg-slate-700/50 rounded transition-all duration-200 transform hover:translate-x-2"
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-slate-300 hover:text-white block px-3 py-2 text-lg font-semibold w-full text-left hover:bg-slate-700/50 rounded transition-all duration-200 transform hover:translate-x-2"
              >
                Contact
              </button>
              
              <div className="border-t border-slate-700 pt-2">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-slate-300 text-sm animate-fade-in">
                      Welcome back!
                    </div>
                    <Button
                      onClick={signOut}
                      variant="outline"
                      size="sm"
                      className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 transform hover:scale-105 transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      window.location.href = '/auth';
                      setIsOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white hover:from-blue-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-200"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
