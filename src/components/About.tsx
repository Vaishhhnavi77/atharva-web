
const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 px-4">
            About Our{' '}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Coaching
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-slate-300 leading-relaxed animate-fade-in">
              At Atharva Institutions, we believe in transforming passion into expertise. Our comprehensive programming and technology courses are designed to equip students with industry-relevant skills and practical knowledge.
            </p>
            
            <p className="text-lg text-slate-300 leading-relaxed animate-fade-in delay-200">
              With experienced instructors, hands-on projects, and personalized attention, we ensure every student achieves their learning goals and builds a successful career in technology.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="bg-slate-700/30 p-4 sm:p-6 rounded-lg border border-blue-500/20">
                <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-2">Expert Instructors</h3>
                <p className="text-sm sm:text-base text-slate-300">Learn from industry professionals with years of experience</p>
              </div>
              
              <div className="bg-slate-700/30 p-4 sm:p-6 rounded-lg border border-teal-500/20">
                <h3 className="text-lg sm:text-xl font-semibold text-teal-400 mb-2">Hands-on Learning</h3>
                <p className="text-sm sm:text-base text-slate-300">Build real projects and gain practical experience</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500/20 to-teal-500/20 p-8 rounded-2xl border border-blue-500/30">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Learn Fundamentals</h4>
                    <p className="text-slate-300">Strong foundation in programming concepts</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Build Projects</h4>
                    <p className="text-slate-300">Apply knowledge through practical projects</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Career Ready</h4>
                    <p className="text-slate-300">Graduate with industry-ready skills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
