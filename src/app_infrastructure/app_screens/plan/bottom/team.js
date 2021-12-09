import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image, Dimensions, FlatList, Platform } from 'react-native'

import { Ionicons } from '@expo/vector-icons';


import { SafeArea } from '../../../utils/safe-area.component'
import { Title, MediumText, SmallText } from '../../botton.styles'
import { TeamCard } from '../../../../app_components/TeamCard'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const Team = ({ navigation }) => {
    const data = [{ 'title': 'Alhaji', 'name': 'Saleh Yusuf', 'position': 'Director events', 'ethnic': 'Alago', 'state': 'Nasarawa', 'tel': '0905642233', 'fb': 'yusf3455664', 'email': 'yusuf123@gmail.com', 'website': 'www.yusuf.com', 'gender': 'Male' }, { 'title': 'Mallam', 'name': 'Abba Sani', 'position': 'Secretary', 'ethnic': 'Alago', 'state': 'Nasarawa', 'tel': '08123546767', 'fb': '/abba994335664', 'email': 'saniabba6123@gmail.com', 'website': 'www.saniab.com', 'gender': 'Male' }, { 'title': 'Alhaji', 'name': 'Yusuf Hassan', 'position': 'Manager', 'ethnic': 'Kambari', 'state': 'Nasarawa', 'tel': '09056467789', 'fb': 'hassan5455664', 'email': 'hassyuss45@gmail.com', 'website': 'www.hassyuss.com', 'gender': 'Male' }, { 'title': 'Mrs.', 'name': 'Kate John', 'position': 'Finance', 'ethnic': 'Eggon', 'state': 'Nasarawa', 'tel': '0905647635', 'fb': 'asate6455664', 'email': 'katie453@gmail.com', 'website': null, 'gender': 'Female' },]



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
                            <View style={{ paddingBottom: 10 }}>
                                <Title>Team members</Title></View>
                            <FlatList style={{ height: '65%' }}
                                data={data}
                                renderItem={({ item }) => {
                                    return (
                                        <TeamCard navigation={navigation} data={item} />
                                    )
                                }} />
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