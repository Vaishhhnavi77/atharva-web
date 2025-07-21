
import React from 'react';

const Hero = () => {
  const scrollToCourses = () => {
    const coursesSection = document.getElementById('courses');
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-teal-900/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 animate-pulse"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="inline-block animate-[slideInLeft_1s_ease-out] transform hover:scale-105 transition-transform duration-300">
              Code Your Future with{' '}
            </span>
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent animate-[slideInRight_1.2s_ease-out] inline-block transform hover:scale-110 transition-transform duration-300 relative sm:ml-4">
              Atharva!
              <span className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-teal-400/20 blur-lg animate-pulse"></span>
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto animate-[fadeInUp_1.5s_ease-out] px-4">
            From Basics to Brilliance — Only at Atharva.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fadeInUp_2s_ease-out] px-4">
            <button 
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
            >
              Enroll Now
            </button>
            <button 
              onClick={scrollToCourses}
              className="w-full sm:w-auto border-2 border-blue-400 text-blue-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-400/25"
            >
              View Courses
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
