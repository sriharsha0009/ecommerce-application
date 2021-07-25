import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyAPl8nV04FteCN0KLtqwDSUqsSuQtLeKsw",
    authDomain: "crwn-db-d4714.firebaseapp.com",
    projectId: "crwn-db-d4714",
    storageBucket: "crwn-db-d4714.appspot.com",
    messagingSenderId: "436141126802",
    appId: "1:436141126802:web:92c19813793ee33e25e24b",
    measurementId: "G-4LY26LZKLN"
  };


export const createUserProfileDocument =async (userAuth, additionalData)=>{
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);

  if(!snapShot.exists) {
    const{displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }
    catch(error){
      console.log('error creating', error.message);
    }
  }
  return userRef;
}


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle =()=> auth.signInWithPopup(provider);

export default firebase;