import { Phone, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';

import { useToast } from '@/hooks/use-toast';
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";



const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    courseInterest: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.fullName || !formData.email || !formData.phone || !formData.courseInterest || !formData.password) {
    toast({
      title: "Error",
      description: "Please fill in all fields",
      variant: "destructive"
    });
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    toast({
      title: "Error",
      description: "Passwords do not match",
      variant: "destructive"
    });
    return;
  }

  if (formData.password.length < 6) {
    toast({
      title: "Error",
      description: "Password must be at least 6 characters long",
      variant: "destructive"
    });
    return;
  }

  setIsSubmitting(true);

  try {
    // 1. Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;

    // 2. Save enrollment data
    await addDoc(collection(db, "enrollments"), {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      course_interest: formData.courseInterest,
      created_at: new Date()
    });

    // 3. Save profile
    await setDoc(doc(db, "profiles", user.uid), {
      full_name: formData.fullName,
      email: formData.email,
      created_at: new Date()
    });

    toast({
      title: "Account Created Successfully!",
      description: "You can now log in with your email and password.",
    });

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      courseInterest: "",
      password: "",
      confirmPassword: ""
    });

  } catch (error: any) {
    console.error("Firebase error:", error);
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive"
    });
  } finally {
    setIsSubmitting(false);
  }
};





async function handleAddTest() {
  try {
    await addDoc(collection(db, "testCollection"), {
      name: "Vaishnavi",
      createdAt: new Date(),
    });
    console.log("Test document added!");
  } catch (err) {
    console.error("Error:", err);
  }
}







  return (
    <section id="contact" className="py-20 bg-slate-900/50">


      <button onClick={handleAddTest}>Add Test</button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 px-4">
            Contact{' '}
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Us
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto px-4">
            Ready to start your learning journey? Get in touch with us today!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          <div className="space-y-8">
            <div className="bg-slate-800/50 p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-700">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Get Started Today</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Phone</h4>
                    <p className="text-slate-300">+91 82082 67009</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Email</h4>
                    <p className="text-slate-300">atharvacomputersbhosari@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Address</h4>
                    <p className="text-slate-300">Opp.Sandwik Colony Dighi road, Bhosari, Pune 411039</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-teal-500/10 p-8 rounded-2xl border border-blue-500/30">
              <h3 className="text-xl font-bold text-white mb-4">Why Choose Us?</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Expert instructors with industry experience
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-teal-400 rounded-full mr-3"></div>
                  Hands-on practical learning approach
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  Flexible batch timings
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                  Quality education at affordable rates
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-800/30 p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-700">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Create Your Account</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-slate-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div>
                <label className="block text-slate-300 mb-2">Course Interest</label>
                <select 
                  name="courseInterest"
                  value={formData.courseInterest}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select a course</option>
                  <option value="C Programming">C Programming</option>
                  <option value="C++ Programming">C++ Programming</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Python Programming">Python Programming</option>
                  <option value="Tally Prime">Tally Prime</option>
                  <option value="English Speaking">English Speaking</option>
                  <option value="Advanced Excel">Advanced Excel</option>
                  <option value="CCSS">CCSS</option>
                  <option value="MS Office">MS Office</option>
                  <option value="Java Programming">Java Programming</option>
                </select>
              </div>

              <div className="border-t border-slate-600 pt-6 mt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Set Your Password</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-300 mb-2">Create Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Create a password (min. 6 characters)"
                      required
                      minLength={6}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-slate-300 mb-2">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Create Account & Enroll'}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-slate-400 text-sm">
                Already have an account?{' '}
                <a href="/auth" className="text-blue-400 hover:text-blue-300 underline">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
