import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Plan } from '../../../app_infrastructure/app_screens/plan/bottom/plan'
import { Team } from '../../../app_infrastructure/app_screens/plan/bottom/team'
const Tab = createBottomTabNavigator();

export const PlanDrawer = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Plans') {
                        iconName = 'stats-chart-outline';
                    } else if (route.name === 'Teams') {
                        iconName = 'people-outline';
                    }


                    // You can return any component that you like here!
                    return <Ionicons name={iconName} color={focused ? 'green' : 'gray'} size={focused ? 26 : 15} />;
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Plans" component={Plan} options={{ headerShown: false }} />
            <Tab.Screen name="Teams" component={Team} options={{ headerShown: false }} />

        </Tab.Navigator>
    );
}