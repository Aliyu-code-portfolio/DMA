import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  Login,
  SignUp,
  Dashboard,
  Splash,
  ShowFullImg,
  Chat,
} from "../container";
import { color } from "../utility";

const Stack = createStackNavigator();

function NavContainer() {
  return (

    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#4CC417' },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        headerTintColor: color.WHITE,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DMA Chat"
        component={Dashboard}
        options={{
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="ShowFullImg"
        component={ShowFullImg}
        options={{
          headerBackTitle: null,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerBackTitle: null,
        }}
      />
    </Stack.Navigator>
  );
}
export default NavContainer;
