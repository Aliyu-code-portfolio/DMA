import { getAuth, signOut } from "firebase/auth";

const LogOutUser = async () => {
  try {
    return await signOut().catch((err) => {
      if (err.toString() == 'FirebaseError: Firebase: Error (auth/network-request-failed).') {
        alert('Network error occurred')
      }
    });
  } catch (error) {

  }
};

export default LogOutUser;
