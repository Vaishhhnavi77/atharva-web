
const Courses = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const courses = [
    {
      title: "C Programming",
      description: "Master the fundamentals of programming with C language",
      duration: "2 months",
      features: ["Variables & Data Types", "Control Structures", "Functions", "Pointers", "Arrays", "File Handling", "Memory Management", "Debugging Techniques"]
    },
    {
      title: "C++ Programming", 
      description: "Object-oriented programming concepts and advanced C++",
      duration: "2.5 months",
      features: ["OOP Concepts", "Classes & Objects", "Inheritance", "Polymorphism", "Templates", "STL", "Exception Handling", "Project Development"]
    },
    {
      title: "Web Development",
      description: "Full-stack web development with modern technologies",
      duration: "4 months",
      features: ["HTML5 & CSS3", "JavaScript", "React", "Node.js", "Database Integration", "API Development", "Responsive Design", "Version Control (Git)"]
    },
    {
      title: "Python Programming",
      description: "Learn Python for automation, data science, and web development",
      duration: "3 months", 
      features: ["Python Basics", "Data Structures", "Libraries (Pandas, NumPy)", "Web Development (Django/Flask)", "Automation Scripts", "Database Operations", "API Integration", "Real-world Projects"]
    },
    {
      title: "Tally Prime",
      description: "Complete accounting software training for business",
      duration: "1.5 months",
      features: ["Accounting Basics", "Inventory Management", "GST Compliance", "Financial Reports", "Payroll Management", "Banking", "TDS/TCS", "Data Import/Export"]
    },
    {
      title: "English Speaking",
      description: "Improve communication skills and confidence",
      duration: "2 months",
      features: ["Grammar Fundamentals", "Vocabulary Building", "Pronunciation Practice", "Confidence Building", "Public Speaking", "Interview Skills", "Business Communication", "Presentation Skills"]
    },
    {
      title: "Advanced Excel",
      description: "Master Excel for data analysis and automation",
      duration: "1 month",
      features: ["Advanced Formulas", "Pivot Tables", "Macros & VBA", "Data Analysis", "Dashboard Creation", "Charts & Graphs", "Data Validation", "Automation Techniques"]
    },
    {
      title: "CCSS",
      description: "Certificate Course In Sanganak Suvidya",
      duration: "3 months",
      features: ["Computer Basics", "MS Office (Word, Excel, PowerPoint)", "HTML Fundamentals", "Internet & Email", "Tally Basics", "Digital Literacy", "Government Certification", "Practical Training"]
    },
    {
      title: "MS Office",
      description: "Complete Microsoft Office suite training",
      duration: "1.5 months",
      features: ["MS Word (Advanced)", "MS Excel (Formulas & Functions)", "PowerPoint (Professional Presentations)", "Outlook (Email Management)", "Data Management", "Templates & Automation", "Collaboration Tools", "Integration Techniques"]
    },
    {
      title: "Java Programming",
      description: "Learn Java for enterprise applications and web development",
      duration: "3 months",
      features: ["Java Fundamentals", "OOP Concepts", "Collections Framework", "Exception Handling", "Multithreading", "JDBC", "Web Applications", "Spring Framework Basics"]
    }
  ];

  return (
    <section id="courses" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Courses
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto mb-6">
            Choose from our comprehensive range of programming and technology courses, all designed to make you industry-ready.
          </p>
          <div className="bg-gradient-to-r from-blue-500/20 to-teal-500/20 p-6 rounded-2xl border border-blue-500/30 max-w-2xl mx-auto">
            <p className="text-lg text-blue-300 font-semibold">
              🏆 Certificate Provided Upon Successful Course Completion
            </p>
            <p className="text-sm text-slate-300 mt-2">
              Get industry-recognized certificates to boost your career prospects
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, index) => (
            <div
              key={course.title}
              className="group bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-slate-300 text-base mb-4">{course.description}</p>
                
                <div className="mb-6">
                  <span className="text-blue-400 font-semibold text-lg">Duration: {course.duration}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <h4 className="text-white font-semibold text-lg mb-4">What You'll Learn:</h4>
                {course.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-slate-300 text-base">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-4 flex-shrink-0"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <button 
                onClick={scrollToContact}
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 group-hover:shadow-lg"
              >
                Explore Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
