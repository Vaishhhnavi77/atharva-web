// // src/components/AuthPage.tsx
// import { useState, useEffect } from "react";
// import { auth, provider } from "../firebase/firebase";
// import {
//   signInWithPopup,
//   signOut,
//   onAuthStateChanged,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";

// export default function AuthPage() {
//   const [user, setUser] = useState<any>(null);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Track auth state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Google Login
//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       alert(`Welcome ${result.user.displayName}`);
//     } catch (error: any) {
//       alert(error.message);
//     }
//   };

//   // Logout
//   const handleLogout = async () => {
//     await signOut(auth);
//     alert("Logged out successfully!");
//   };

//   // Email Signup
//   const handleEmailSignup = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       alert(`Signup successful! Welcome ${userCredential.user.email}`);
//       setEmail("");
//       setPassword("");
//     } catch (error: any) {
//       alert(error.message);
//     }
//   };

//   // Email Login
//   const handleEmailLogin = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       alert(`Welcome back ${userCredential.user.email}`);
//       setEmail("");
//       setPassword("");
//     } catch (error: any) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       {user ? (
//         <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
//           <h2 className="text-xl font-bold mb-4">Welcome, {user.displayName || user.email}</h2>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Logout
//           </button>
//         </div>
//       ) : (
//         <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-4 text-center">Login / Signup</h2>

//           {/* Google Login */}
//           <button
//             onClick={handleGoogleLogin}
//             className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4"
//           >
//             Sign in with Google
//           </button>

//           <div className="border-t my-4"></div>

//           {/* Email/Password */}
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="border p-2 rounded w-full mb-4"
//           />

//           <div className="flex gap-2">
//             <button
//               onClick={handleEmailSignup}
//               className="bg-green-500 text-white px-4 py-2 rounded w-1/2"
//             >
//               Sign Up
//             </button>
//             <button
//               onClick={handleEmailLogin}
//               className="bg-blue-500 text-white px-4 py-2 rounded w-1/2"
//             >
//               Log In
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
