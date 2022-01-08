import React, { useState, } from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { changeBudget } from '../app_services/firebase_database/data.manipulate';
//import {Colors} from 'react-native-elements'

export const BudgetCard = ({ data, refresh, internet }) => {
    const [change, setChange] = useState(false)
    const [newCost, setNewCost] = useState(null)

    //Functions

    const finished = () => {
        if (internet) {
            changeBudget(data, newCost)
            setChange(false)
            refresh()
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
                {change ? <>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>

                        <>
                            <View style={{ width: '45%', height: '80%', justifyContent: 'center', marginRight: 5 }}><TextInput
                                style={[styles.input, { marginLeft: 10 }]}
                                keyboardType='numeric'
                                onChangeText={(text) => { setNewCost(parseInt(text)) }}
                                placeholder="New Cost"
                            /></View>
                            <TouchableOpacity onPress={() => { if (newCost) { finished(); } }} style={{ width: '10%', height: '60%', justifyContent: 'center', backgroundColor: 'green', borderRadius: 10 }}>

                                <View ><Ionicons
                                    name="refresh-outline"
                                    color='white'
                                    size={15}
                                    style={{ alignSelf: 'center' }}
                                /></View></TouchableOpacity>
                        </>

                    </View>
                    <TouchableOpacity onPress={() => setChange(false)}><View style={{ alignSelf: 'center', paddingBottom: 5, }}><Text>Go Back</Text></View>
                    </TouchableOpacity>
                </> :
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.subCardView}>
                                <Image
                                    source={require("../../assets/budget.jpg")}
                                    resizeMode="contain"
                                    style={{
                                        borderRadius: 25,
                                        height: 50,
                                        width: 70,
                                    }}
                                />
                            </View>
                            <View style={{ marginLeft: 30, alignItems: 'center', }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: 'black',
                                        fontWeight: 'bold',
                                        fontFamily: 'Lato_400Regular',
                                    }}>
                                    {data.Event}
                                </Text>
                                <View
                                    style={{
                                        marginTop: 4,
                                        borderWidth: 0,
                                        width: '85%',
                                    }}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontSize: 12,
                                        }}>
                                        {data.Venue}
                                    </Text>
                                    <Text
                                        style={{
                                            color: 'gray',
                                            fontSize: 11,
                                        }}>
                                        {data.Date}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                height: 30,
                                backgroundColor: 'black',
                                borderWidth: 0,
                                width: '32%',
                                marginLeft: -26,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 50,
                            }}>
                            <Text style={{ color: 'white' }}>₦{data.Cost}</Text>
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
        height: 90,
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
    input: {
        width: '90%',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center'

    },
});