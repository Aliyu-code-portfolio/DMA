
import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import { uuid } from '../../utility/constants'

export const AddUser = async (name, email, uid, profileImg) => {
  try {
    return await firebase
      .database()
      .ref("users/" + uid)
      .set({
        name: name,
        email: email,
        uuid: uid,
        profileImg: profileImg,
      });
  } catch (error) {
    return error;
  }
};

export const UpdateUser = async (uuid, imgSource) => {
  try {
    return await firebase
      .database()
      .ref("users/" + uuid)
      .update({
        profileImg: imgSource,
      });
  } catch (error) {
    return error;
  }
};
export const userCount = (setter) => {
  try {
    firebase
      .database()
      .ref("users")
      .on("value", (dataSnapshot) => {
        let number = 0;

        dataSnapshot.forEach((child) => {
          number = number + 1
        });
        setter(number)
      });
  } catch (error) {
    alert(error);

  }
}
export const isAdmin = (admin) => {
  try {
    firebase
      .database()
      .ref("users/" + uuid)
      .on("value", (dataSnapshot) => {

        let info = dataSnapshot.val().admin
        admin(info)
      });
  } catch (error) {
    alert(error);

  }
}
