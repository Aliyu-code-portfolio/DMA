import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { updateRequest, removeRequest } from '../app_services/authentication/network/user'


export const RequestCard = ({ data, internet }) => {
    const [change, setChange] = useState(false)

    const finishReg = () => {
        if (internet) {
            updateRequest(data.id)
                .then(() => { alert('Successfully added ' + data.title + ' ' + data.name + '.'); }).catch((err) => { alert('Failed to Register ' + data.title + ' ' + data.name); })
        }
        else {
            alert('Error: Unstable internet connection')
        }
    }
    const cancelReg = () => {
        if (internet) {
            removeRequest(data.id)
        }
        else {
            alert('Error: Unstable internet connection')
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                setChange(true)
            }}>
            <View style={[styles.mainCardView, { flexDirection: change ? 'column' : 'row' }]}>
                {change ?
                    // To add Make user admin button, remove height='100%' below then add button
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                            <TouchableOpacity onPress={() => { finishReg(); }} style={{ width: '45%', height: '80%', justifyContent: 'center', marginRight: '3%', backgroundColor: 'green', borderRadius: 10 }}>
                                <Ionicons
                                    name="checkmark-outline"
                                    color='white'
                                    size={15}
                                    style={{ alignSelf: 'center' }}
                                /><View ><Text style={{ textAlign: 'center', color: 'white', }}>Accept Request</Text></View></TouchableOpacity>
                            <TouchableOpacity onPress={() => { cancelReg(); }} style={{ width: '45%', height: '80%', justifyContent: 'center', backgroundColor: 'red', borderRadius: 10 }}>
                                <Ionicons
                                    name="close-outline"
                                    color='white'
                                    size={15}
                                    style={{ alignSelf: 'center' }}
                                />
                                <View ><Text style={{ textAlign: 'center', color: 'white' }}>Reject Request</Text></View></TouchableOpacity>

                        </View>
                        <TouchableOpacity onPress={() => setChange(false)}><View style={{ alignSelf: 'center', paddingBottom: 5, }}><Text style={{ fontWeight: 'bold' }}>Go Back</Text></View></TouchableOpacity>


                    </View>

                    :

                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                            <View style={{ justifyContent: 'center', width: 200 }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: 'black',
                                        fontWeight: 'bold',
                                        fontFamily: 'Lato_400Regular',
                                        paddingLeft: 5
                                    }}>
                                    {data.title} {data.name}
                                </Text>
                                <View
                                    style={{
                                        height: 30,
                                        backgroundColor: '#85BB65',
                                        borderWidth: 0,
                                        width: '80%',
                                        marginTop: 5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 30,
                                    }}>
                                    <Text style={{ fontSize: 14, fontFamily: 'Lato_400Regular', }}>{'Pending Approval'}</Text>
                                </View>
                                <View
                                    style={{
                                        marginTop: 4,
                                        borderWidth: 0,
                                        width: '85%',
                                        paddingLeft: 20
                                    }}>
                                    <Text
                                        style={{
                                            color: 'grey',
                                            fontSize: 12,
                                        }}>
                                        {data.email}
                                    </Text>
                                    <Text
                                        style={{
                                            color: 'gray',
                                            fontSize: 11,
                                        }}>
                                        {data.ethnic}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    height: 150,
                                    width: 130,
                                    backgroundColor: 'green',
                                    borderRadius: 15,
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    marginLeft: -26,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                            </View>
                        </View>

                    </View>

                }</View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainCardView: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'rgb(74, 75, 77)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
    },
    subCardView: {
        height: 60,
        width: 160,
        borderRadius: 15,
        backgroundColor: '#F6F3F2',
        borderColor: '#F7F6F5',
        borderWidth: 1,
        borderStyle: 'solid',
        justifyContent: 'center',
    },
});