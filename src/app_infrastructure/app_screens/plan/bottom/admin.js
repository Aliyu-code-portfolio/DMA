import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Dimensions, FlatList, TextInput, } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import { Button, } from 'react-native-paper';

import { Ionicons } from '@expo/vector-icons';
import { SafeArea } from '../../../utils/safe-area.component'
import { RequestCard } from '../../../../app_components/RequestCard'
import { AllRequests } from '../../../../app_services/authentication/network/user'
import { postEvent } from '../../../../app_services/firebase_database/data.manipulate'
import { Title, MediumText, SmallText } from '../../botton.styles'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export const Admin = ({ navigation }) => {
    const [adding, setAdding] = useState(false)
    const [userData, setUserData] = useState()
    const [refreshing, setRefreshing] = useState(false)
    const [isInternetReachable, setIsInternetReachable] = useState(false)

    const [error, setError] = useState(null)
    const [name, setName] = useState()
    const [lga, setLGA] = useState()
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [venue, setVenue] = useState()

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

    const onFinish = () => {
        if (isInternetReachable) {
            postEvent(name, venue, lga, date, time)
            setAdding(false)
        }
        else {
            alert('Unstable internet connection')
        }
    }


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => { AllRequests(loadData); setRefreshing(false) });
    }, []);

    return (
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
                {adding ?
                    <View style={{ paddingTop: '10%', alignSelf: 'center' }}>
                        <Title style={{ textAlign: 'center', paddingBottom: '5%' }}>Input event details</Title>
                        <View style={{ flexDirection: 'row', width: '100%' }}><Text style={{ fontFamily: 'Lato_400Regular', fontWeight: 'bold', fontSize: 16 }}>Name</Text>
                            <TextInput
                                style={[styles.input, { marginLeft: 10 }]}
                                onChangeText={(text) => { setName(text) }}
                                placeholder="Event description..."
                            />
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: '5%', width: '100%', }}><Text style={{ fontFamily: 'Lato_400Regular', fontWeight: 'bold', fontSize: 16 }}>L.G.A</Text>
                            <TextInput
                                style={[styles.input, { marginLeft: 10 }]}
                                onChangeText={(text) => { setLGA(text) }}
                                placeholder="Local gov't area..."
                            />
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', paddingTop: '5%', }}><Text style={{ fontFamily: 'Lato_400Regular', fontWeight: 'bold', fontSize: 16 }}>Venue</Text>
                            <TextInput
                                style={[styles.input, { marginLeft: 10 }]}
                                onChangeText={(text) => { setVenue(text) }}
                                placeholder="Take place at..."
                            />
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: '10%', width: '100%', }}><Text style={{ fontFamily: 'Lato_400Regular', fontWeight: 'bold', fontSize: 16 }}>Date</Text>
                            <TextInput
                                style={[styles.input, { marginLeft: 10 }]}
                                onChangeText={(text) => { setDate(text) }}
                                placeholder="In the format 23rd Jan 2022..."
                            />
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', paddingTop: '5%', }}><Text style={{ fontFamily: 'Lato_400Regular', fontWeight: 'bold', fontSize: 16 }}>Time</Text>
                            <TextInput
                                style={[styles.input, { marginLeft: 10 }]}
                                onChangeText={(text) => { setTime(text) }}
                                placeholder="In the format 00:00pm..."
                            />
                        </View>
                        <View style={{ paddingTop: 20 }}>
                            {error && <Text style={{ color: 'red', textAlign: 'center' }}>
                                {error}
                            </Text>}
                            <Button icon="check" mode='outlined' color='green' onPress={() => {
                                if (name && date && lga && time && venue) {
                                    onFinish()
                                }
                                else {
                                    setError('Error: Please complete the form above.')
                                }
                            }} >Finished</Button>

                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <Button icon="close" mode='outlined' color='red' onPress={() => { setDate(null); setError(null); setAdding(false) }} >Cancel</Button>
                        </View>
                    </View>
                    : <>
                        <View style={styles.admin}>
                            <Title> Signup Requests </Title>
                            <View style={{}}>
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
                        <View style={{ height: '10%', alignSelf: 'center' }}>
                            <Button style={{
                                backgroundColor: 'green', borderRadius: 20, width: '80%', shadowColor: 'rgb(74, 75, 77)',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 1,
                                shadowRadius: 8,
                                elevation: 8,
                            }} icon="plus" color='white' onPress={() => setAdding(true)}>Add new website event</Button>
                        </View>
                    </>}
            </View>

            {/* </SafeArea> */}
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    admin: {
        height: '85%',
        paddingTop: '5%',
        padding: 10
    },
    font: {
        color: 'green'
    },
    input: {
        width: '70%',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center'

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