import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth'; //check stack overflow for change on v9 of firebase
import 'firebase/compat/firestore';
import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from './src/app_infrastructure/theme'

import { AppDrawer } from './src/app_drawer_menu/index.drawer'

export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyBNN1t82sFc-CWUyyW8Mpsmo4zQnqot63s",
    authDomain: "dma-5c98f.firebaseapp.com",
    projectId: "dma-5c98f",
    storageBucket: "dma-5c98f.appspot.com",
    messagingSenderId: "601101583020",
    appId: "1:601101583020:web:08fcb8e80fa3e898fe9509",
    measurementId: "G-8T01HY2VVN"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppDrawer />
    </ThemeProvider>
  );
}

