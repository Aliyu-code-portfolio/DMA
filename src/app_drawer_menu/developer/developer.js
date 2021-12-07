import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image, Dimensions, ScrollView, Platform } from 'react-native'

import { Ionicons } from '@expo/vector-icons';


import { SafeArea } from '../../app_infrastructure/utils/safe-area.component'
import { Title, MediumText, SmallText } from '../../app_infrastructure/app_screens/botton.styles'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const Developer = ({ navigation }) => {



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
                            <Title>Developers</Title></View>

                    </View>
                    <View style={styles.greetingContainer}>
                        <View style={styles.developer}>

                            <ScrollView showsVerticalScrollIndicator={false} style={{ height: '45%', width: '100%' }}>
                                <Title>TecXact Inc Nig. Ltd</Title>
                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 10 }}>TecXact fully known as Technology Exact is a mobile application and software development company whoose goal is to improve how Nigeria carry out daily business by providing affordable softwares for small business in Nigeria.</Text>
                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 10, fontWeight: 'bold' }}>TecXact offer services such as: </Text>
                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5 }}>{'\u2B24'} Creating a static business websites</Text>
                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5 }}>{'\u2B24'} Creating a dynamic business website</Text>
                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5 }}>{'\u2B24'} Implementing card payment feature on business website for online purchases</Text>
                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5 }}>{'\u2B24'} Managing of client website, Developing a business or company cross platform mobile application for staffs only</Text>
                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5 }}>{'\u2B24'} Developing a business or company cross platform mobile application for customer</Text>
                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5 }}>{'\u2B24'} setting up business custom mail address e.g support@dma.org (More professional) instead of dma@gmail.com,</Text>
                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5 }}>{'\u2B24'} Periodical client system maintenance</Text>

                            </ScrollView>
                            <View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Image
                                        style={{ width: 45, height: 45 }}
                                        source={require('../../../assets/logo.png')}
                                    /></View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Title>By</Title></View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Image
                                        style={{ width: 45, height: 45 }}
                                        source={require('../../../assets/logo.png')}
                                    /></View>
                            </View>
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
    developer: {
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