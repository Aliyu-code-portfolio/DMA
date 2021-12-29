
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const loginRequest = async (email, password) => {
  const auth = getAuth();
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error;
  }
};

export default loginRequest;
