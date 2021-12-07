import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { About } from '../../../app_infrastructure/app_screens/about/main.about';
const AboutStack = createStackNavigator();

export const AboutDrawer = () => {
    return (
        <AboutStack.Navigator
            headerMode="none"
            screenOptions={{
                ...TransitionPresets.ModalPresentationIOS,
            }}
        >
            <AboutStack.Screen name="AboutPage" component={About} />
            <AboutStack.Screen name="University" component={About} />
        </AboutStack.Navigator>
    );
};
