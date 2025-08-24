
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export async function addEnrollment(name, email, phone, course) {
  try {
    await addDoc(collection(db, "enrollments"), {
      name,
      email,
      phone,
      course
    });
    console.log("Enrollment saved!");
  } catch (e) {
    console.error("Error adding enrollment: ", e);
  }
}
