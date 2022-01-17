import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, Alert, Text, View, FlatList, } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Profile, ShowUsers, StickyHeader } from "../../component";
import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import { AsyncStorage } from '@react-native-async-storage/async-storage'
import { color } from "../../utility";
import { Store } from "../../../../../../app_services/authentication/context/store";
import { LOADING_STOP, LOADING_START } from "../../../../../../app_services/authentication/context/actions/type";
import { uuid, smallDeviceHeight } from "../../../../../../app_services/authentication/utility/constants";

import { deviceHeight } from "../../../../../../app_services/authentication/utility/styleHelper/appStyle";
import { UpdateUser } from "../../../../../../app_services/authentication/network";
import { storage } from '../../../../../../app_services/firebase_database/storage'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;

  const [userDetail, setUserDetail] = useState({
    id: "",
    name: "",
    profileImg: "",
  });
  const [getScrollPosition, setScrollPosition] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const { profileImg, name } = userDetail;
  const [image, setImage] = useState(null)


  useEffect(() => {
    dispatchLoaderAction({
      type: LOADING_START,
    });
    try {
      firebase
        .database()
        .ref("users")
        .on("value", (dataSnapshot) => {
          let users = [];
          let currentUser = {
            id: "",
            name: "",
            profileImg: "",
          };
          dataSnapshot.forEach((child) => {
            if (uuid === child.val().uuid) {
              currentUser.id = uuid;
              currentUser.name = child.val().name;
              currentUser.profileImg = child.val().profileImg;
              setImage(child.val().profileImg)
            } else {
              users.push({
                id: child.val().uuid,
                name: child.val().name,
                profileImg: child.val().profileImg,
              });
            }
          });
          setUserDetail(currentUser);
          setAllUsers(users);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        });
    } catch (error) {
      alert(error);
      dispatchLoaderAction({
        type: LOADING_STOP,
      });
    }
  }, []);

  //Firebase storage

  uriToBlob = (uri) => {

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.onload = function () {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        // something went wrong
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
        reject(new Error('uriToBlob failed'));
      };

      // this helps us get a blob
      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);
      xhr.send(null);

    });

  }

  uploadToFirebase = async (blob) => {

    const profileImagesRef = ref(storage, `profilePictures/${uuid}`);
    const snapshot = await uploadBytes(profileImagesRef, blob).then((snapshot) => {

      blob.close();

    }).catch((error) => {
      dispatchLoaderAction({
        type: LOADING_STOP,
      });
      console.log(error);

    });

  }

  const downloadFromStorage = async () => {
    const img = ref(storage, `profilePictures/${uuid}`);
    getDownloadURL(img)
      .then((url) => {
        UpdateUser(uuid, url).then(() => { setImage(url) })
          .catch(() => {
            alert(err);
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
          });
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
      })
      .catch((error) => {
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            alert("File doesn't exist")
            break;
          case 'storage/unauthorized':
            alert("User doesn't have permission to access the object")
            break;
          case 'storage/canceled':
            alert("User canceled the upload")
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }


  const selectPhotoTapped = async (type) => {
    if (type == 'media') {

      ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      }).then((result) => {

        if (!result.cancelled) {
          // User picked an image
          const { height, width, type, uri } = result;
          dispatchLoaderAction({
            type: LOADING_START,
          });
          return uriToBlob(uri);

        }

      }).then((blob) => {

        return uploadToFirebase(blob);

      }).then((snapshot) => {
        downloadFromStorage()
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
        console.log("File uploaded");

      }).catch((error) => {
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
        throw error;

      });

    }


    else if (type == 'cam') {

      ImagePicker.launchCameraAsync().then((result) => {

        if (!result.cancelled) {
          // User picked an image
          const { height, width, type, uri } = result;
          dispatchLoaderAction({
            type: LOADING_START,
          });
          return uriToBlob(uri);

        }

      }).then((blob) => {

        return uploadToFirebase(blob);

      }).then((snapshot) => {
        downloadFromStorage()
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
        console.log("File uploaded");


      }).catch((error) => {
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
        throw error;

      });

    }



  };

  // * ON IMAGE TAP
  const imgTap = (profileImg, name) => {
    if (!profileImg) {
      navigation.navigate("Show Full Img", {
        name,
        imgText: name.charAt(0),
      });
    } else {
      navigation.navigate("Show Full Img", { name, img: profileImg });
    }
  };

  // * ON NAME TAP
  const nameTap = (profileImg, name, guestUserId) => {
    if (!profileImg) {
      navigation.navigate("Chat", {
        name,
        imgText: name.charAt(0),
        guestUserId,
        currentUserId: uuid,
      });
    } else {
      navigation.navigate("Chat", {
        name,
        img: profileImg,
        guestUserId,
        currentUserId: uuid,
      });
    }
  };
  // * GET OPACITY

  const getOpacity = () => {
    if (deviceHeight < smallDeviceHeight) {
      return deviceHeight / 4;
    } else {
      return deviceHeight / 6;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: color.BLACK }}>
      {getScrollPosition > getOpacity() && (
        <StickyHeader
          name={name}
          img={image}
          onImgTap={() => imgTap(image, name)}
        />
      )}

      {/* ALL USERS */}
      <FlatList
        alwaysBounceVertical={false}
        data={allUsers}
        keyExtractor={(_, index) => index.toString()}
        onScroll={(event) =>
          setScrollPosition(event.nativeEvent.contentOffset.y)
        }
        ListHeaderComponent={
          <View
            style={{
              opacity:
                getScrollPosition < getOpacity()
                  ? (getOpacity() - getScrollPosition) / 100
                  : 0,
            }}
          >
            <Profile
              img={profileImg}
              onImgTap={() => imgTap(profileImg, name)}
              onEditImgTap={() => {
                Alert.alert(
                  "Choose",
                  "Select where to upload from",
                  [
                    {
                      text: "Camera",
                      onPress: () => selectPhotoTapped('cam'),
                    },
                    {
                      text: "Media",
                      onPress: () => selectPhotoTapped('media'),
                    },
                  ],
                  { cancelable: false }
                )
              }}
              name={name}
            />
          </View>
        }
        renderItem={({ item }) => (
          <ShowUsers
            name={item.name}
            img={item.profileImg}
            onImgTap={() => imgTap(item.profileImg, item.name)}
            onNameTap={() => nameTap(item.profileImg, item.name, item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};
