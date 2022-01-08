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
        headerStyle: { backgroundColor: 'white', color: 'black' },
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
          color: 'black'
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
        name="Show Full Img"
        component={ShowFullImg}
        options={{
          headerBackTitle: null,
          headerTitle: ''
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
