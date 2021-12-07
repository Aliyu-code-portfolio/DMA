import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image, Dimensions, TextInput, Linking, Platform } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Button, } from 'react-native-paper';

import { BudgetCard } from '../../../../app_components/BudgetCard'

import { SafeArea } from '../../../utils/safe-area.component'
import { Title, MediumText, SmallText } from '../../botton.styles'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const Budgets = ({ navigation }) => {
    const [change, setChange] = useState(true)
    const [newcost, setNewCost] = useState()
    const data = [{ 'Event': 'Campaign', 'Date': '23/09/2022', 'Venue': 'Lafia', 'Cost': '95,000' }, { 'Event': 'Campaign', 'Date': '5/03/2022', 'Venue': 'Awe', 'Cost': '1,250,000' }]


    return (
        <>
            <View style={styles.container}>
                <SafeArea>
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
                            <Title>Campaign</Title></View>

                    </View>
                    <View style={styles.greetingContainer}>
                        <View style={styles.vote}>
                            {change ? (<>
                                <View style={{ alignSelf: 'center' }}>
                                    <Image
                                        style={{ width: 45, height: 45 }}
                                        source={require('../../../../../assets/logo.png')}
                                    /></View>
                                <View style={{ height: '90%', paddingTop: '10%', }}>
                                    <View style={{ alignItems: 'center', }}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Image
                                                source={require("../../../../../assets/budget.jpg")}
                                                resizeMode="contain"
                                                style={{
                                                    borderRadius: 25,
                                                    height: 50,
                                                    width: 70,
                                                }}
                                            />

                                        </View>
                                        <Title>Change event budget</Title>

                                        <View >
                                            <View style={{ flexDirection: 'row', width: '100%', paddingTop: '5%', alignSelf: 'center', }}>
                                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, textAlign: 'center' }}>Campaign</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', paddingTop: '5%', alignSelf: 'center', }}>
                                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, textAlign: 'center' }}>Lafia</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', paddingTop: '5%', alignSelf: 'center', }}>
                                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, textAlign: 'center' }}>₦200000</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', paddingTop: '5%', alignSelf: 'center', }}>
                                                <TextInput
                                                    style={[styles.input, { marginLeft: 10 }]}
                                                    onChangeText={(text) => { setNewCost(text) }}
                                                    keyboardType='numeric'
                                                    placeholder="New Estimated Cost..."
                                                />
                                            </View>
                                        </View>

                                    </View>
                                    <View style={{ paddingTop: 20 }}>
                                        <Button icon="check" mode='outlined' color='green' onPress={() => {

                                        }} >Finished</Button>

                                    </View>

                                </View></>) :
                                (<><View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                    <Button style={{
                                        backgroundColor: '#85BB65', borderRadius: 20, alignItems: 'center', width: '100%', shadowColor: 'rgb(74, 75, 77)',
                                        shadowOffset: { width: 0, height: 0 },
                                        shadowOpacity: 1,
                                        shadowRadius: 8,
                                        elevation: 8,
                                    }} color='white'  >Budgetting</Button>

                                </View>
                                    <View style={{ paddingTop: '5%' }}>
                                        <BudgetCard data={data[0]} />
                                        <BudgetCard data={data[1]} />
                                    </View></>)}
                        </View>
                    </View>

                </SafeArea>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greetingContainer: {
        height: '90%',
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