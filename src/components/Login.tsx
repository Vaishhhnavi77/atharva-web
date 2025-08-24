import { useState } from "react";
import { auth } from "../firebase/firebase.ts";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // toggle between login/register
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        // login
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // register
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 shadow-lg rounded-xl">
      <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-3 text-blue-600 text-sm"
      >
        {isLogin ? "Create new account" : "Already have an account? Login"}
      </button>
    </div>
  );
}
