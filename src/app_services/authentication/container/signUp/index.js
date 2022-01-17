import React, { useState, useContext } from "react";
import {
  Text,
  SafeAreaView,
  View,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions
} from "react-native";
import { getAuth, } from "firebase/auth";
import uuid from 'react-native-uuid';
import { InputField, RoundCornerButton, Logo } from "../../component";
import { globalStyle, color } from "../../utility";
import { Store } from "../../context/store";
import { LOADING_START, LOADING_STOP } from "../../context/actions/type";
import { setAsyncStorage, keys } from "../../asyncStorage";
import {
  setUniqueValue,
  keyboardVerticalOffset,
} from "../../utility/constants";
import { AddRequest } from "../../network/user";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ({ navigation }) => {
  const globalState = useContext(Store);
  const { dispatchLoaderAction } = globalState;
  const [credential, setCredential] = useState({
    title: "",
    name: "",
    email: "",
    ethnic: "",
    phone: "",
    password: "",
    confirmPassword: "",

  });
  const [logo, toggleLogo] = useState(true);
  const { email, password, confirmPassword, name, title, ethnic, phone } = credential;

  const setInitialState = () => {
    setCredential({ email: "", password: "", confirmPassword: "", title: "", name: "", email: "", ethnic: "", phone: "", });
  };

  //   * ON SIGN UP PRESS
  const onSignUpPress = () => {
    Keyboard.dismiss();
    if (!name) {
      alert("Name is required");
    } else if (!email) {
      alert("Email is required");
    } else if (!password) {
      alert("Password is required");
    } else if (!title) {
      alert("Title is required");
    }
    else if (!ethnic) {
      alert("Ethnicity is required");
    }
    else if (!phone) {
      alert("Phone number is required");
    }
    else if (password.length < 6) {
      alert("Password must be at least six characters")
    }
    else if (password !== confirmPassword) {
      alert("Password did not match");
    } else {
      dispatchLoaderAction({
        type: LOADING_START,
      });
      const id = uuid.v4();
      let profileImg = ''
      AddRequest(name, email, password, id, profileImg, phone, ethnic, title).then(() => {
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
        alert('Sign up successfull, please wait for approval before you can log into your account.')
        navigation.replace("Login");

      }).catch((err) => {
        dispatchLoaderAction({
          type: LOADING_STOP,
        });
        alert(err);
      })


    }
  };
  // * HANDLE ON CHANGE
  const handleOnChange = (name, value) => {
    setCredential({
      ...credential,
      [name]: value,
    });
  };
  // * ON INPUT FOCUS

  const handleFocus = () => {
    setTimeout(() => {
      toggleLogo(false);
    }, 200);
  };
  // * ON INPUT BLUR

  const handleBlur = () => {
    setTimeout(() => {
      toggleLogo(true);
    }, 200);
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[globalStyle.flex1, { backgroundColor: color.BLACK }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1, backgroundColor: color.GREEN }}>
          <View style={{ height: '30%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 50, color: 'white', fontFamily: 'Oswald_400Regular' }}>DMA</Text>
            <Text style={{ fontSize: 14, color: 'white', fontStyle: 'italic' }}> By DR. MUSA ADAMU</Text>

          </View>

          <ScrollView style={{ height: '60%' }}>

            <View style={[globalStyle.flex2, globalStyle.sectionCentered, { borderTopRightRadius: 40, borderTopLeftRadius: 40, backgroundColor: 'white', elevation: 80 }]}>
              <View style={{ paddingBottom: 30 }} />
              <InputField
                placeholder="Title: Mr. Mal. Hon. Dr. Engr"
                value={title}
                onChangeText={(text) => handleOnChange("title", text)}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
              />
              <InputField
                placeholder="Enter name"
                value={name}
                onChangeText={(text) => handleOnChange("name", text)}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
              />
              <InputField
                placeholder="Enter email"
                value={email}
                onChangeText={(text) => handleOnChange("email", text)}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
                keyboardType='email-address'
              />
              <InputField
                placeholder="Enter phone"
                value={phone}
                keyboardType='numeric'
                onChangeText={(text) => handleOnChange("phone", text)}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
              />
              <InputField
                placeholder="Enter ethnicity"
                value={ethnic}
                onChangeText={(text) => handleOnChange("ethnic", text)}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
              />
              <InputField
                placeholder="Enter password"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => handleOnChange("password", text)}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
              />
              <InputField
                placeholder="Confirm Password"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={(text) => handleOnChange("confirmPassword", text)}
                onFocus={() => handleFocus()}
                onBlur={() => handleBlur()}
              />

              <RoundCornerButton
                title="Sign Up"
                onPress={() => onSignUpPress()}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: color.LIGHT_GREEN,
                }}
                onPress={() => {
                  setInitialState();
                  navigation.navigate("Login");
                }}
              >
                Login
            </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
