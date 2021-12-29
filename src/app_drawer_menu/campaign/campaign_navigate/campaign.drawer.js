import React, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Events } from '../../../app_infrastructure/app_screens/campaign/bottom/events.sceen'
import { Votes } from '../../../app_infrastructure/app_screens/campaign/bottom/votes.screen'
import { Budgets } from '../../../app_infrastructure/app_screens/campaign/bottom/budget.screen'

import { isAdmin } from '../../../app_services/authentication/network/user'
const Tab = createBottomTabNavigator();

export const CampaignDrawer = () => {
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

                    if (route.name === 'Event') {
                        iconName = 'grid-outline';
                    } else if (route.name === 'Vote') {
                        iconName = 'podium-outline';
                    }
                    else if (route.name === 'Budget') {
                        iconName = 'cash-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} color={focused ? 'green' : 'gray'} size={focused ? 26 : 15} />;
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Event" component={Events} options={{ headerShown: false }} />
            <Tab.Screen name="Vote" component={Votes} options={{ headerShown: false }} />
            {admin && <Tab.Screen name="Budget" component={Budgets} options={{ headerShown: false }} />}

        </Tab.Navigator>
    );
}