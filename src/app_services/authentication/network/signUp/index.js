import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SignUpRequest = async (email, password) => {
  const auth = getAuth()
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    return error;
  }
};

export default SignUpRequest;
