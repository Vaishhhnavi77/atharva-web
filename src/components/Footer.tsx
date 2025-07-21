
const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-4">
              Atharva Computer Institute
            </div>
            <p className="text-slate-400">
              Empowering students with quality education in programming and technology since 2011.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#courses" className="hover:text-blue-400 transition-colors">Courses</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-slate-400">
              <p>Phone: +91 82082 67009</p>
              <p>Email: atharvacomputersbhosari@gmail.com</p>
              <p>Address: Opp.Sandwik Colony-Bhosari, Pune 411039, Maharashtra</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2025 Atharva Computer Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
