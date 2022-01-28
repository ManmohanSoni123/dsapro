import firebseConfig from "../firebase";
import { getFirestore,addDoc,collection  } from "firebase/firestore";

function Adddata(user) {
  const firestoredatabase = getFirestore();
  
  try {
    const docRef =   addDoc(collection(firestoredatabase, "users"), {
      first: "Mohit",
      last: "Soni",
      born: 2001,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export default Adddata;
