import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Plan } from '../../../app_infrastructure/app_screens/plan/bottom/plan'
import { TeamNav } from '../../../app_infrastructure/app_screens/plan/team.navigate'
import { Admin } from '../../../app_infrastructure/app_screens/plan/bottom/admin'
import { isAdmin } from '../../../app_services/authentication/network/user'
const Tab = createBottomTabNavigator();

export const PlanDrawer = () => {
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        isAdmin(isAdministrator)
    }, [])

    const isAdministrator = (info) => {
        setAdmin(info)
    }

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
                    else if (route.name === 'Administrator') {
                        iconName = 'cube-outline'
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
            {admin && <Tab.Screen name="Administrator" component={Admin} options={{ headerShown: false }} />}
        </Tab.Navigator>
    );
}