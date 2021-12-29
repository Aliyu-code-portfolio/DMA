import { getAuth, signOut } from "firebase/auth";

const LogOutUser = async () => {
  try {
    return await signOut();
  } catch (error) {
    return error;
  }
};

export default LogOutUser;
