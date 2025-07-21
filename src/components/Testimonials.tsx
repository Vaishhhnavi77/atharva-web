
const Testimonials = () => {
  const testimonials = [
    {
      name: "Rahul Sharma",
      course: "Web Development",
      text: "The course was excellent! I learned everything from HTML to React and now I'm working as a frontend developer. The instructors were very supportive.",
      rating: 5
    },
    {
      name: "Priya Patel", 
      course: "Python Programming",
      text: "Amazing teaching methodology! The hands-on approach helped me understand concepts clearly. Now I'm confident in Python development.",
      rating: 5
    },
    {
      name: "Amit Desai",
      course: "C++ Programming", 
      text: "Great learning experience. The course structure was perfect and the practical sessions were very helpful. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 px-4">
            What Our{' '}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Students Say
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4">
            Don't just take our word for it. Here's what our successful students have to say about their learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-slate-800/50 p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              
              <p className="text-slate-300 mb-6 italic">
                "{testimonial.text}"
              </p>
              
              <div className="border-t border-slate-700 pt-4">
                <h4 className="text-white font-semibold">{testimonial.name}</h4>
                <p className="text-blue-400 text-sm">{testimonial.course}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
