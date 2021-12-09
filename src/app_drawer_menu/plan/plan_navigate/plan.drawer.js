import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Plan } from '../../../app_infrastructure/app_screens/plan/bottom/plan'
import { TeamNav } from '../../../app_infrastructure/app_screens/plan/team.navigate'
const Tab = createBottomTabNavigator();

export const PlanDrawer = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Plan') {
                        iconName = 'stats-chart-outline';
                    } else if (route.name === 'Team') {
                        iconName = 'people-outline';
                    }


                    // You can return any component that you like here!
                    return <Ionicons name={iconName} color={focused ? 'green' : 'gray'} size={focused ? 26 : 15} />;
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Plan" component={Plan} options={{ headerShown: false }} />
            <Tab.Screen name="Team" component={TeamNav} options={{ headerShown: false }} />

        </Tab.Navigator>
    );
}