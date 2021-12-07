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
//import { ThemerProvider } from './src/app_components/theme.context'
//import { Provider } from 'react-redux'
//import globalStore from './src/app_services/redux/store'

import { AppDrawer } from './src/app_drawer_menu/index.drawer'

export default function App() {
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
      {/* <Provider store={globalStore}> */}

      <AppDrawer />

      {/* </Provider> */}
    </ThemeProvider>
  );
}

