import React, { useState, createContext } from 'react'
import { View, Text, Button, Image } from 'react-native';
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import {
    Provider as PaperProvider,
    DefaultTheme as PaperDefaultTheme,
    DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { HomeDrawer } from './home/home_navigate/home.drawer'
import { CampaignDrawer } from './campaign/campaign_navigate/campaign.drawer'
import { PlanDrawer } from './plan/plan_navigate/plan.drawer'
import { Developer } from './developer/developer'
import { AboutDrawer } from './about/about_navigate/about.drawer'

import { DrawerTemplete } from '../app_components/drawerTemplete'
//import { ThemeContext } from '../app_components/theme.context'
const Drawer = createDrawerNavigator();
export const themeContext = createContext();
export function AppDrawer() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
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
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
    }
    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
    return (

        <PaperProvider theme={theme}>
            <themeContext.Provider value={{ toggleTheme, isDarkTheme }}>
                <NavigationContainer theme={theme}>
                    <Drawer.Navigator screenOptions={{
                        drawerLabel: () => null
                    }}
                        drawerContent={props => <DrawerTemplete {...props} />}>
                        <Drawer.Screen name="HomeNav" component={HomeDrawer} options={{ headerShown: false }} />
                        <Drawer.Screen name="Campaign" component={CampaignDrawer} options={{ headerShown: false }} />
                        <Drawer.Screen name="SettingsScreen" component={HomeDrawer} options={{ headerShown: false }} />
                        <Drawer.Screen name="Ok" component={HomeDrawer} options={{ headerShown: false }} />
                        <Drawer.Screen name="Planning" component={PlanDrawer} options={{ headerShown: false }} />
                        <Drawer.Screen name="Developers" component={Developer} options={{ headerShown: false }} />
                        <Drawer.Screen name="About" component={AboutDrawer} options={{ headerShown: false }} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </themeContext.Provider>
        </PaperProvider>
    );
}