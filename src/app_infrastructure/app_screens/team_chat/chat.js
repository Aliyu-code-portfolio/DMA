import React, { useLayoutEffect, useState, useEffect, Fragment, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalStyle, color, appStyle } from "../chat/src/utility";
import styles from "./components/styles";
import { InputField } from "../chat/src/component";
import { ChatBox } from './components/chatBox'
import firebase from "../chat/src/firebase/config";
import { senderMsg } from "./components/messaging";
import { myData } from '../../../app_services/authentication/network/user'
import { deviceHeight } from "../chat/src/utility/styleHelper/appStyle";
import { smallDeviceHeight } from "../../../app_services/authentication/utility/constants";
import { LOADING_START, LOADING_STOP } from '../../../app_services/authentication/context/actions/type'
import { Store } from '../../../app_services/authentication/context/store'
import { storage } from '../../../app_services/firebase_database/storage'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const TeamChat = ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [msgValue, setMsgValue] = useState("");
  const [messeges, setMesseges] = useState([]);
  const [user, setUser] = useState();
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: <Text>{name}</Text>,
  //   });
  // }, [navigation]);

  useEffect(() => {
    myData(useData)
    try {
      firebase
        .database()
        .ref("teammesseges")
        .on("value", (dataSnapshot) => {
          let msgs = [];
          dataSnapshot.forEach((child) => {
            msgs.push({
              sendBy: child.val().messege.sender,
              username: child.val().messege.username,
              msg: child.val().messege.msg,
              img: child.val().messege.img,
            });
          });
          setMesseges(msgs.reverse());
        });
    } catch (error) {
      alert(error);
    }
  }, []);

  const useData = (info) => {
    setUser(info)
  }

  const handleSend = () => {
    setMsgValue("");
    if (msgValue) {
      senderMsg(msgValue, user.uuid, user.title + ' ' + user.name, "")
        .then(() => { })
        .catch((err) => alert(err));

      // * guest user

      // recieverMsg(msgValue, currentUserId, guestUserId, "")
      //   .then(() => { })
      //   .catch((err) => alert(err));
    }
  };


  // Storage vitals
  const uriToBlob = (uri) => {

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

  const uploadToFirebase = async (blob) => {
    let fileName = Date.now() + Math.random()

    const profileImagesRef = ref(storage, `messages/${fileName}`);
    const snapshot = await uploadBytes(profileImagesRef, blob).then((snapshot) => {
      downloadFromStorage(fileName)
      blob.close();

    }).catch((error) => {
      dispatchLoaderAction({
        type: LOADING_STOP,
      });
      console.log(error);

    });

  }

  const downloadFromStorage = async (file) => {
    const img = ref(storage, `messages/${file}`);
    getDownloadURL(img)
      .then((url) => {
        senderMsg(msgValue, user.uuid, user.title + ' ' + user.name, url)
          .then(() => { })
          .catch((err) => {
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
            alert(err)
          });

        dispatchLoaderAction({
          type: LOADING_STOP,
        });
      })
      .catch((error) => {
        alert("Error")
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

  const handleCamera = async (type) => {

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
          return uriToBlob(uri)
        }

      }).then((blob) => {

        return uploadToFirebase(blob);

      }).then((snapshot) => {

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
          // user picked an image
          const { height, width, type, uri } = result;
          dispatchLoaderAction({
            type: LOADING_START,
          });
          return uriToBlob(uri);

        }

      }).then((blob) => {
        console.log(fileName)
        return uploadToFirebase(blob);

      }).then((snapshot) => {
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

  const handleOnChange = (text) => {
    setMsgValue(text);
  };

  //   * On image tap
  const imgTap = (chatImg) => {
    navigation.navigate("View", { img: chatImg });
  };
  return (
    <SafeAreaView style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={deviceHeight > smallDeviceHeight ? 100 : 70}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
      >
        <TouchableWithoutFeedback
          style={[globalStyle.flex1]}
          onPress={Keyboard.dismiss}
        >
          <Fragment>
            <FlatList
              inverted
              data={messeges}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <ChatBox
                  msg={item.msg}
                  userId={item.sendBy}
                  username={item.username}
                  img={item.img}
                  onImgTap={() => imgTap(item.img)}
                />
              )}
            />

            {/* Send Message */}
            <View style={styles.sendMessageContainer}>
              <InputField
                placeholder="Type Here"
                numberOfLines={10}
                inputStyle={styles.input}
                value={msgValue}
                onChangeText={(text) => handleOnChange(text)}
              />
              <View style={styles.sendBtnContainer}>
                <MaterialCommunityIcons
                  name="camera"
                  color={color.WHITE}
                  size={appStyle.fieldHeight}
                  onPress={() => user && Alert.alert(
                    "Choose",
                    "Select where to upload from",
                    [
                      {
                        text: "Camera",
                        onPress: () => handleCamera('cam'),
                      },
                      {
                        text: "Media",
                        onPress: () => handleCamera('media'),
                      },
                    ],
                    { cancelable: false }
                  )}
                />
                <MaterialCommunityIcons
                  name="send-circle"
                  color={color.GREEN}
                  size={appStyle.fieldHeight}
                  onPress={() => user && handleSend()}
                />
              </View>
            </View>
          </Fragment>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
