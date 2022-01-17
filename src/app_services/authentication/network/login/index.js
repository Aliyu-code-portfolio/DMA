
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { checkRequestList } from '../user'

const loginRequest = async (email, password) => {
  const auth = getAuth();
  try {
    return await signInWithEmailAndPassword(auth, email, password).catch((err) => {
      if (err.toString() == 'FirebaseError: Firebase: Error (auth/invalid-email).') {
        alert('Invalid email address')
      }
      else if (err.toString() == 'FirebaseError: Firebase: Error (auth/user-not-found).') {
        checkRequestList(email, password)

        // alert('User not registered')
      }
      else if (err.toString() == 'FirebaseError: Firebase: Error (auth/network-request-failed).') {
        alert('Network error occurred')
      }
      else if (err.toString() == 'FirebaseError: Firebase: Error (auth/wrong-password).') {
        alert('Password is incorrect')
      }
      else {
        alert(err)
        console.log(err.toString())
      }
    });
  } catch (error) {

  }
};

export default loginRequest;
