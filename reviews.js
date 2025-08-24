import { db, auth } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function addReview(reviewText) {
  const user = auth.currentUser;
  if (!user) {
    console.log("User not logged in");
    return;
  }

  try {
    await addDoc(collection(db, "reviews"), {
      userId: user.uid,
      reviewText,
      createdAt: serverTimestamp()
    });
    console.log("Review saved!");
  } catch (e) {
    console.error("Error adding review: ", e);
  }
}
