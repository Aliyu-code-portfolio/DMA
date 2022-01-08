import React, { useLayoutEffect, useState, useEffect, Fragment } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
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

export const TeamChat = ({ navigation }) => {
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

  const handleCamera = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.cancelled) {
      senderMsg(msgValue, user.uuid, user.title + ' ' + user.name, result.uri)
        .then(() => { })
        .catch((err) => alert(err));

      // * guest user

      // recieverMsg(msgValue, currentUserId, guestUserId, result.uri)
      //   .then(() => { })
      //   .catch((err) => alert(err));


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
                  onPress={() => user && handleCamera()}
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
