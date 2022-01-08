import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { Team } from './bottom/team';
import { Info } from './bottom/info'
import { ShowFullImg } from '../../../app_components/showFullImg/index'

const TeamStack = createStackNavigator();

export const TeamNav = () => {


    return (
        <TeamStack.Navigator
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.ModalPresentationIOS,
            }}
        >
            <TeamStack.Screen name="Member" component={Team} />
            <TeamStack.Screen name="View" component={Info} />
            <TeamStack.Screen name="ViewImg" component={ShowFullImg} />

        </TeamStack.Navigator>
    );
};
