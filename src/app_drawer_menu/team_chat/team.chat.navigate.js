import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { LogoShow } from '../../app_infrastructure/app_screens/team_chat/components/splash/index'
import { TeamChat } from '../../app_infrastructure/app_screens/team_chat/chat';
import { ShowFullImg } from '../../app_components/showFullImg/index'

const TeamChatStack = createStackNavigator();

export const TeamChatNav = () => {


    return (
        <TeamChatStack.Navigator
            screenOptions={{
                headerShown: true,
                ...TransitionPresets.ModalPresentationIOS,
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 20,
                    color: 'black'
                },
            }}
        >
            <TeamChatStack.Screen name="Logo" component={LogoShow} options={{ headerShown: false }} />
            <TeamChatStack.Screen name="Team Chat" component={TeamChat} options={{ headerShown: false }} />
            <TeamChatStack.Screen name="View" component={ShowFullImg} options={{ headerShown: false }} />

        </TeamChatStack.Navigator>
    );
};
