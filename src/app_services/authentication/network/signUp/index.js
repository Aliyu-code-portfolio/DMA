import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const SignUpRequest = async (email, password) => {
  const auth = getAuth()
  try {
    return await createUserWithEmailAndPassword(auth, email, password).catch((err) => {
      if (err.toString() == 'FirebaseError: Firebase: Error (auth/invalid-email).') {
        alert('Invalid email address')
      }
      else if (err.toString() == 'FirebaseError: Firebase: Error (auth/network-request-failed).') {
        alert('Network error occurred')
      }
      else {
        alert(err)
        console.log(err.toString())
      }
    });
  } catch (error) {

  }
};
