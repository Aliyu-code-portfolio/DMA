import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import { Ionicons } from '@expo/vector-icons';

import { AllUsers } from '../../../../app_services/authentication/network/user'
import { SafeArea } from '../../../utils/safe-area.component'
import { Title, MediumText, SmallText } from '../../botton.styles'
import { TeamCard } from '../../../../app_components/TeamCard'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const Team = ({ navigation }) => {
    const [userData, setUserData] = useState()
    const [isInternetReachable, setIsInternetReachable] = useState(false)

    const networkBack = () => {
        AllUsers(loadData)
    }
    useEffect(async () => {
        if (isInternetReachable) {
            networkBack()
        }
    }, [isInternetReachable])

    useEffect(() => {
        const subscribe = NetInfo.addEventListener(state => {
            setIsInternetReachable(state.isInternetReachable)
        });
    }, [])


    const loadData = (info) => {
        setUserData(info)
    }

    return (
        <>
            <View style={styles.container}>
                {/* <SafeArea> */}
                <View style={styles.topBar}>
                    <View style={{ position: 'absolute', left: '4%', justifyContent: 'center', bottom: 0, top: 0 }}>
                        <TouchableWithoutFeedback onPress={() => { navigation.openDrawer(); }} >
                            <Ionicons
                                name="menu-outline"
                                color='green'
                                size={30}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ position: 'absolute', justifyContent: 'center', bottom: 0, top: 0 }}>
                        <Title>Strategy</Title></View>

                </View>
                <View style={styles.greetingContainer}>
                    <View style={styles.plan}>
                        <View style={{ paddingBottom: 10 }}>
                            <Title>Team members</Title></View>
                        {userData ? <FlatList style={{ height: '65%' }}
                            data={userData}
                            renderItem={({ item }) => {
                                return (
                                    <TeamCard navigation={navigation} data={item} />
                                )
                            }} /> :
                            <View style={{ paddingTop: '40%' }}>
                                <ActivityIndicator color='green' size={50} animating={true} />
                            </View>
                        }
                    </View>
                </View>

                {/* </SafeArea> */}
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    plan: {
        height: '95%',
        paddingTop: '5%',
        padding: 10
    },
    font: {
        color: 'green'
    },
    topBar: {
        justifyContent: 'center',
        flexDirection: 'row',
        height: windowHeight * 0.085,
        width: '100%',
        paddingLeft: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f4f4f4',
        elevation: 3,

        color: 'green'
    }
})