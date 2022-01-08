
import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import { getAuth, } from "firebase/auth";
import { uuid } from '../../utility/constants'
import { SignUpRequest } from '../signUp'
import { LogOutUser } from '../../network'

export const AddRequest = async (name, email, id, profileImg, phone, ethnic, title) => {

  try {
    return await firebase
      .database()
      .ref("requests/" + id)
      .set({
        name: name,
        email: email,
        id: id,
        profileImg: profileImg,
        phone: phone,
        title: title,
        ethnic: ethnic
      });
  } catch (error) {
    return error;
  }
};

export const AllRequests = (data) => {

  try {
    firebase
      .database()
      .ref("requests")
      .on("value", (dataSnapshot) => {
        let request = [];

        dataSnapshot.forEach((child) => {

          request.push({
            id: child.val().id,
            name: child.val().name,
            profileImg: child.val().profileImg,
            state: 'Nasarawa',
            ethnic: child.val().ethnic,
            email: child.val().email,
            phone: child.val().phone,
            title: child.val().title,
            gender: true,
          });

        });
        data(request);
      });
  } catch (error) {
    alert(error);

  }
}

export const continueReg = async (name, email, password, phone, ethnic, title) => {
  return LogOutUser().then(() => {
    SignUpRequest(email, password)
      .then((res) => {
        let auth = getAuth()
        let uid = auth.currentUser.uid;
        let profileImg = "";
        AddUser(name, email, uid, profileImg, phone, title, ethnic)
          .then(() => {
            alert('Successfully added ' + title + ' ' + name + '. Please login again')

          })
          .catch((err) => {
            console.log(err)
            alert('Failed to save user details. Please contact the developer');
          });
      })
      .catch((err) => {
        console.log(err)
        alert('Failed to Register ' + title + ' ' + name);
      });

  })

}

export const removeRequest = async (id) => {
  try {
    return await firebase
      .database()
      .ref("requests/" + id)
      .remove()
  }
  catch (err) {
    alert('Failed to cancel request')
  }
}


const AddUser = async (name, email, uid, profileImg, phone, title, ethnic) => {

  try {
    return await firebase
      .database()
      .ref("users/" + uid)
      .set({
        name: name,
        email: email,
        uuid: uid,
        profileImg: profileImg,
        phone: phone,
        title: title,
        ethnic: ethnic,
        state: 'Nasarawa',
        gender: true,
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

export const myData = (data) => {
  try {
    firebase
      .database()
      .ref("users/" + uuid)
      .on("value", (dataSnapshot) => {

        let info = dataSnapshot.val()
        data(info)
      });
  } catch (error) {
    alert(error);

  }
}
export const AllUsers = (data) => {

  try {
    firebase
      .database()
      .ref("users")
      .on("value", (dataSnapshot) => {
        let users = [];

        dataSnapshot.forEach((child) => {

          users.push({
            id: child.val().uuid,
            name: child.val().name,
            profileImg: child.val().profileImg,
            state: child.val().state,
            ethnic: child.val().ethnic,
            fb: child.val().fb ? child.val().fb : null,
            email: child.val().email,
            phone: child.val().phone,
            website: child.val().website ? child.val().website : null,
            title: child.val().title,
            gender: child.val().gender,
            admin: child.val().admin
          });

        });
        data(users);
      });
  } catch (error) {
    alert(error);

  }
}
