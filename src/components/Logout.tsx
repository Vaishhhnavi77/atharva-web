import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

export default function Logout() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-600 text-white px-4 py-2 rounded"
    >
      Logout
    </button>
  );
}
