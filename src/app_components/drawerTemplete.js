import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
//import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import { themeContext } from '../app_drawer_menu/index.drawer';
import { themeContext } from '../../App';
import { clearAsyncStorage } from "../app_services/authentication/asyncStorage";
import { LogOutUser } from "../app_services/authentication/network";
import { SafeArea } from '../app_infrastructure/utils/safe-area.component';

export function DrawerTemplete(props) {
    //const { isDarkTheme, toggleTheme } = useContext(themeContext)
    const { toggleTheme } = useContext(themeContext)
    const isDarkTheme = false
    const [focused, setFocus] = useState(1);
    const paperTheme = useTheme();

    const logout = () => {
        LogOutUser()
            .then(() => {
                clearAsyncStorage()
                    .then(() => {
                        props.navigation.replace("Login");
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    return (
        <SafeArea>
            <View style={{ flex: 1, backgroundColor: isDarkTheme ? '#000003' : '#FFFFFF', color: isDarkTheme ? 'white' : '#000003' }}>
                <DrawerContentScrollView {...props} >
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Avatar.Image
                                    source={{
                                        uri: 'https://placeimg.com/140/140/any'
                                    }}
                                    size={60}
                                />
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.title}>John Doe</Title>
                                    <Caption style={styles.caption}>Manager</Caption>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={styles.section}>

                                </View>
                            </View>
                        </View>

                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <AntDesign
                                        name="home"
                                        color={focused == 1 ? 'green' : color}
                                        size={size}
                                    />
                                )}
                                label={("Home")}
                                style={{ borderColor: focused == 1 ? 'green' : 'white', borderWidth: 1 }}
                                onPress={() => { setFocus(1); props.navigation.navigate('HomeNav') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Ionicons
                                        name="people-circle-outline"
                                        color={focused == 2 ? 'green' : color}
                                        size={size}
                                    />
                                )}
                                label="Campaign"
                                style={{ borderColor: focused == 2 ? 'green' : 'white', borderWidth: 1 }}
                                onPress={() => { setFocus(2); props.navigation.navigate('Campaign') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Ionicons
                                        name="chatbox-outline"
                                        color={focused == 3 ? 'green' : color}
                                        size={size}
                                    />
                                )}
                                label="Chats"
                                style={{ borderColor: focused == 3 ? 'green' : 'white', borderWidth: 1 }}
                                onPress={() => { setFocus(3); props.navigation.navigate('ChatApp') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Ionicons
                                        name="chatbubbles-outline"
                                        color={focused == 4 ? 'green' : color}
                                        size={size}
                                    />
                                )}
                                label="Team Chat"
                                style={{ borderColor: focused == 4 ? 'green' : 'white', borderWidth: 1 }}
                                onPress={() => { setFocus(4); props.navigation.navigate('SettingsScreen') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Ionicons
                                        name="stats-chart-outline"
                                        color={focused == 5 ? 'green' : color}
                                        size={size}
                                    />
                                )}
                                label="Strategy / Plan"
                                style={{ borderColor: focused == 5 ? 'green' : 'white', borderWidth: 1 }}
                                onPress={() => { setFocus(5); props.navigation.navigate('Planning') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Ionicons
                                        name="code-working-outline"
                                        color={focused == 6 ? 'green' : color}
                                        size={size}
                                    />
                                )}
                                label="Developers"
                                style={{ borderColor: focused == 6 ? 'green' : 'white', borderWidth: 1 }}
                                onPress={() => { setFocus(6); props.navigation.navigate('Developers') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Ionicons
                                        name="newspaper-outline"
                                        color={focused == 7 ? 'green' : color}
                                        size={size}
                                    />
                                )}
                                label="About"
                                style={{ borderColor: focused == 7 ? 'green' : 'white', borderWidth: 1 }}
                                onPress={() => { setFocus(7); props.navigation.navigate('About') }}
                            />
                        </Drawer.Section>
                        <Drawer.Section title="Preferences">
                            <TouchableRipple onPress={() => { toggleTheme(); }} >
                                <View style={styles.preference}>
                                    <Text>Dark Theme</Text>
                                    <View pointerEvents="none">
                                        {/* <Switch value={paperTheme.dark} /> */}
                                    </View>
                                </View>
                            </TouchableRipple>
                        </Drawer.Section>
                    </View>
                </DrawerContentScrollView>
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <AntDesign
                                name="logout"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Sign Out"
                        onPress={() => { logout() }}
                    />
                </Drawer.Section>
            </View>
        </SafeArea>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,

    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});