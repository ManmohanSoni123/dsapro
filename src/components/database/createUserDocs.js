import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

function createUserDocument(res) {
  const firestore = firebase.firestore();

  if (!res) return;

  const userRef = firestore.doc(`users/${res.user.uid}`);
  const snapshot = userRef.get();

  if (!snapshot.exists) {
    let array = {
      topicName: "array",
      questions: 13,
      isStarted:false,
      doneQuestions: 0,
    };

    try {
      userRef.set({ array });
    } catch (err) {
         
        console.log("Error in creating user",err);
    }
  }
}

export default createUserDocument;
