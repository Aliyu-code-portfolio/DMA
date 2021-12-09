import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image, Dimensions, ScrollView, Platform } from 'react-native'

import { Ionicons } from '@expo/vector-icons';


import { SafeArea } from '../../../utils/safe-area.component'
import { Title, MediumText, SmallText } from '../../botton.styles'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const Plan = ({ navigation }) => {



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
                            <Title>Strategy</Title></View>

                    </View>
                    <View style={styles.greetingContainer}>
                        <View style={styles.plan}>
                            <View style={{ alignSelf: 'center' }}>
                                <Image
                                    style={{ width: 45, height: 45 }}
                                    source={require('../../../../../assets/logo.png')}
                                /></View>
                            <View style={{ height: '40%', paddingBottom: '5%' }}>
                                <Image
                                    style={{ width: '100%', height: '100%', borderRadius: 5, }}
                                    source={require('../../../../../assets/map.png')}

                                />
                            </View>
                            <ScrollView style={{ height: '55%' }}>
                                <View>
                                    <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, fontWeight: 'bold' }}>Estimated Population Size</Text>
                                    <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5, color: 'grey' }}>Lafia: 445,300</Text>
                                    <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 3, marginBottom: 10, color: 'grey' }}>Obi: 201,100</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, fontWeight: 'bold', }}>Local Government Size</Text>
                                    <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5, color: 'grey' }}>Lafia:  2,827 km²</Text>
                                    <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 3, marginBottom: 10, color: 'grey' }}>Obi: 968.4 km²</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, fontWeight: 'bold' }}>Estimated Eligibility by Age</Text>
                                    <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5, color: 'grey' }}>Lafia:  140,832</Text>
                                    <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 3, marginBottom: 10, color: 'grey' }}>Obi: 60,513</Text>
                                </View>
                                <View>
                                    <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, fontWeight: 'bold' }}>By Stronghold (green=strong, red=weak)</Text>
                                    <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5, color: 'red', color: 'grey' }}>Lafia</Text>
                                    <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 3, marginBottom: 10, color: 'green', color: 'grey' }}>Obi</Text>
                                </View>
                            </ScrollView>
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