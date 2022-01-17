import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth'; //check stack overflow for change on v9 of firebase
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

import React, { useState, useEffect, createContext } from 'react';
import { Text, View, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import {
  NavigationContainer, DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native'
import { ThemeProvider } from "styled-components/native";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import Loader from './src/app_services/authentication/component/loader'
import { StoreProvider } from './src/app_services/authentication/context/store'
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from './src/app_infrastructure/theme'

//import { AppDrawer } from './src/app_drawer_menu/index.drawer'
import AccountNavigator from './src/app_services/authentication/navigation/index'
import { getVersion } from './src/app_services/firebase_database/about.get'

export const themeContext = createContext();
export default function App() {
  const appversion = 1.0;
  const [latestVersion, setLatestVersion] = useState(true)
  useEffect(() => {
    getVersion(load)
  }, [])

  const load = (info) => {
    if (appversion == info) {
      setLatestVersion(true)

    }
    else {
      setLatestVersion(false)
    }
  }
  const firebaseConfig = {
    apiKey: "AIzaSyBNN1t82sFc-CWUyyW8Mpsmo4zQnqot63s",
    authDomain: "dma-5c98f.firebaseapp.com",
    projectId: "dma-5c98f",
    storageBucket: "dma-5c98f.appspot.com",
    messagingSenderId: "601101583020",
    appId: "1:601101583020:web:08fcb8e80fa3e898fe9509",
    measurementId: "G-8T01HY2VVN",
    storageBucket: "gs://dma-5c98f.appspot.com"

  };
  if (!firebase.apps.length) {
    const firebaseApp = firebase.initializeApp(firebaseConfig);
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


  // const [isDarkTheme, setIsDarkTheme] = useState(false);
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#000003'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#000003',
      text: '#ffffff'
    }
  }
  const toggleTheme = () => {
    //setIsDarkTheme(isDarkTheme => !isDarkTheme);
  }
  // Check how to fix darkmode to enable toggle and end error Error: Rendered more hooks than during the previous render.
  //const Mytheme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  const Mytheme = CustomDefaultTheme;
  return (
    latestVersion ?
      <StoreProvider>
        <StatusBar barStyle="default" />
        <ThemeProvider theme={theme}>
          <PaperProvider theme={Mytheme}>
            <themeContext.Provider value={{ toggleTheme, }}>
              <NavigationContainer theme={Mytheme}>
                <AccountNavigator />
              </NavigationContainer>
            </themeContext.Provider>
          </PaperProvider>
        </ThemeProvider>
        <Loader />
      </StoreProvider> :
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ height: '30%', width: '50%', borderRadius: 20, backgroundColor: 'grey', paddingTop: '10%' }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: 'white', alignSelf: 'center', justifyContent: 'center', fontFamily: 'Oswald_400Regular' }}>Ooops</Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'red', alignSelf: 'center', justifyContent: 'center', fontFamily: 'Oswald_400Regular' }}>This DMA version is outdated</Text>
        </View>
      </View>
  );
}

