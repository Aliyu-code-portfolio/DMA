import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

import { finished } from '../app_services/firebase_database/data.manipulate';
//import {Colors} from 'react-native-elements'


export const EventCard = ({ data, from, refresh, admin, internet }) => {
    const [red, setRed] = useState(false);
    const [togo, setTogo] = useState(true)
    var given = moment(data.Date, "DD/MM/YYYY");
    var current = moment().startOf('day');
    const time = moment.duration(given.diff(current)).asDays();
    const [option, setOption] = useState(false)

    useEffect(() => {
        if (time < 8) {
            setRed(true)
        }
        if (time < 0) {
            setTogo(false)
            finished(data, 'finish')
        }
    }, [])

    const doFinished = (type) => {
        if (internet) {
            finished(data, type)
            refresh()
        }
        else {
            alert('Error: Unstable internet connection')
        }
    }
    return (
        <TouchableWithoutFeedback
            onPress={() => { admin ? setOption(true) : console.log("Not an Admin") }} >
            <View style={[styles.mainCardView, { flexDirection: option ? 'column' : 'row' }]}>
                {option ? <><View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                    {from && <TouchableOpacity onPress={() => { doFinished('finish') }} style={{ width: '45%', height: '80%', justifyContent: 'center', marginRight: '3%', backgroundColor: 'green', borderRadius: 10 }}>
                        <Ionicons
                            name="checkmark-outline"
                            color='white'
                            size={15}
                            style={{ alignSelf: 'center' }}
                        /><View ><Text style={{ textAlign: 'center', color: 'white', }}>Event Finished</Text></View></TouchableOpacity>}
                    <TouchableOpacity onPress={() => { doFinished('delete') }} style={{ width: '45%', height: '80%', justifyContent: 'center', backgroundColor: 'red', borderRadius: 10 }}>
                        <Ionicons
                            name="close-outline"
                            color='white'
                            size={15}
                            style={{ alignSelf: 'center' }}
                        />
                        <View ><Text style={{ textAlign: 'center', color: 'white' }}>Event Cancelled</Text></View></TouchableOpacity>

                </View>
                    <TouchableOpacity onPress={() => setOption(false)}><View style={{ alignSelf: 'center', paddingBottom: 5, }}><Text style={{ fontWeight: 'bold' }}>Go Back</Text></View></TouchableOpacity>

                </>
                    : <><View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <View style={{ justifyContent: 'center', width: 200 }}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: 'black',
                                    fontWeight: 'bold',
                                    fontFamily: 'Lato_400Regular',
                                    paddingLeft: 5
                                }}>
                                {data.Event}
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
                                <Text style={{ color: 'white' }}>{data.Venue}</Text>
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
                                        color: red ? 'red' : 'green',
                                        fontSize: 10,
                                        paddingLeft: '0%'
                                    }}>
                                    {togo && (time + ' DAY(S) TO GO')}
                                </Text>
                            </View>
                        </View>
                    </View>
                        <View
                            style={{
                                height: 35,
                                borderWidth: 0,
                                width: '25%',
                                marginLeft: -26,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 30,
                            }}>
                            {/* do something here */}
                            <Ionicons
                                name={from ? "checkmark-circle-outline" : "ellipsis-horizontal-circle-outline"}
                                color={from ? 'green' : '#FBB117'}
                                size={35}
                            />
                        </View></>}
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainCardView: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: 'rgb(74, 75, 77)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 8,
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 16,
        marginRight: 16,
    },
    subCardView: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#F6F3F2',
        borderColor: '#F7F6F5',
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
    },
});