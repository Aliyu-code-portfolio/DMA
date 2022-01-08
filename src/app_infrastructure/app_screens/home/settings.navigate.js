import React from 'react';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { Setting } from './bottom/setting.screen';
import { ShowFullImg } from '../../../app_components/showFullImg'

const SettingStack = createStackNavigator();

export const SettingNav = () => {


    return (
        <SettingStack.Navigator
            screenOptions={{
                headerShown: false,
                ...TransitionPresets.ModalPresentationIOS,
            }}
        >
            <SettingStack.Screen name="Settings" component={Setting} />
            <SettingStack.Screen name="View" component={ShowFullImg} />

        </SettingStack.Navigator>
    );
};
