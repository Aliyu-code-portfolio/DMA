import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import NetInfo from "@react-native-community/netinfo";

import { Ionicons } from '@expo/vector-icons';
import { SafeArea } from '../../../utils/safe-area.component'
import { RequestCard } from '../../../../app_components/RequestCard'
import { AllRequests } from '../../../../app_services/authentication/network/user'
import { Title, MediumText, SmallText } from '../../botton.styles'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export const Admin = ({ navigation }) => {
    const [userData, setUserData] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const [isInternetReachable, setIsInternetReachable] = useState(false)

    const networkBack = () => {
        AllRequests(loadData)
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
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => { AllRequests(loadData); setRefreshing(false) });
    }, []);

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
                    <View style={styles.admin}>
                        <Title> Signup Requests </Title>
                        <View >
                            <FlatList
                                data={userData}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => {
                                    return (
                                        <RequestCard data={item} navigation={navigation} internet={isInternetReachable} />
                                    )
                                }
                                }
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    color: 'green',
                                }}
                                showsVerticalScrollIndicator={false}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />

                        </View>
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
    admin: {
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