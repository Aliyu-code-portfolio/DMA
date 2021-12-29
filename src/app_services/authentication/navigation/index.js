import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  Login,
  SignUp,
  Splash,
  ShowFullImg,
} from "../container";
import { AppDrawer } from '../../../app_drawer_menu/index.drawer'
import { color } from "../utility";

const Stack = createStackNavigator();

function AccountNavigator() {
  return (

    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,

      }}
    >
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={AppDrawer}
        options={{
          headerShown: false
        }}
      />
      {/* <Stack.Screen
        name="ShowFullImg"
        component={ShowFullImg}
        options={{
          headerBackTitle: null,
        }}
      /> */}

    </Stack.Navigator>
  );
}
export default AccountNavigator;
