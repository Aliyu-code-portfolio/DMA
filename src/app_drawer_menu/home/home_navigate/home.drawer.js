import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Home } from '../../../app_infrastructure/app_screens/home/bottom/home.screen'
import { Search } from '../../../app_infrastructure/app_screens/home/bottom/search.screen'
import App from '../../../app_infrastructure/app_screens/home/bottom/reminder_tab'
import { SettingNav } from '../../../app_infrastructure/app_screens/home/settings.navigate'
const Tab = createBottomTabNavigator();

export const HomeDrawer = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Search') {
                        iconName = 'search1';
                    }
                    else if (route.name === 'Reminder') {
                        iconName = 'bells';
                    }
                    else if (route.name === 'Settings') {
                        iconName = 'setting';
                    }

                    // You can return any component that you like here!
                    return <AntDesign name={iconName} color={focused ? 'green' : 'gray'} size={focused ? 26 : 15} />;
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            {/*use inside screen //options={{
                title: 'Welcome',
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }, */}
            <Tab.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Tab.Screen name="Reminder" component={App} options={{ headerShown: false }} />
            <Tab.Screen name="Settings" component={SettingNav} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}