import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Home } from '../../../app_infrastructure/app_screens/home/bottom/home.screen'
import { Search } from '../../../app_infrastructure/app_screens/home/bottom/search.screen'
import { Reminder } from '../../../app_infrastructure/app_screens/home/bottom/reminder.screen'
import { Setting } from '../../../app_infrastructure/app_screens/home/bottom/setting.screen'
const Tab = createBottomTabNavigator();

export const HomeDrawer = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home Page') {
                        iconName = 'home';
                    } else if (route.name === 'Search Page') {
                        iconName = 'search1';
                    }
                    else if (route.name === 'Reminder Page') {
                        iconName = 'bells';
                    }
                    else if (route.name === 'Settings Page') {
                        iconName = 'setting';
                    }

                    // You can return any component that you like here!
                    return <AntDesign name={iconName} color={focused ? 'green' : 'gray'} size={focused ? 26 : 15} />;
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home Page" component={Home} options={{ headerShown: false }} />
            {/*use inside screen //options={{
                title: 'Welcome',
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }, */}
            <Tab.Screen name="Search Page" component={Search} options={{ headerShown: false }} />
            <Tab.Screen name="Reminder Page" component={Reminder} options={{ headerShown: false }} />
            <Tab.Screen name="Settings Page" component={Setting} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}