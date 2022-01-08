import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import NetInfo from "@react-native-community/netinfo";

import { Ionicons } from '@expo/vector-icons';
import { getAbout } from '../../../app_services/firebase_database/about.get'

import { SafeArea } from '../../../app_infrastructure/utils/safe-area.component'
import { Title, MediumText, SmallText } from '../botton.styles'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const About = ({ navigation }) => {
    const [para1, setPara1] = useState()
    const [para2, setPara2] = useState()
    const [para3, setPara3] = useState()
    const [isInternetReachable, setIsInternetReachable] = useState(false)

    const networkBack = () => {
        getAbout(pullData)
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


    const pullData = (data1, data2, data3) => {
        console.log(data3)
        setPara1(data1)
        setPara2(data2)
        setPara3(data3)
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
                        <Title>DMA</Title></View>

                </View>
                <View style={styles.greetingContainer}>
                    <View style={styles.developer}>
                        {para1 ? <ScrollView showsVerticalScrollIndicator={false} style={{ height: '45%', width: '100%' }}>
                            <Title>Dr. Musa Adamu (DMA)</Title>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 10, color: 'grey' }}>{para1 && para1.text}</Text>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 10, marginBottom: 5, fontWeight: 'bold', color: 'green' }}>Highlights </Text>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5 }}>{para2 && para2.text1}</Text>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5, marginBottom: 5 }}>{para2 && para2.text2}</Text>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5, color: 'green' }}>{'\u2B24'}  {para3 && para3.text1}</Text>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5, color: 'green' }}>{'\u2B24'}  {para3 && para3.text2}</Text>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5, color: 'green' }}>{'\u2B24'}  {para3 && para3.text3}</Text>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5, color: 'green' }}>{'\u2B24'}  {para3 && para3.text4}</Text>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5, color: 'green' }}>{'\u2B24'}  {para3 && para3.text5}</Text>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5, color: 'green' }}>{'\u2B24'}  {para3 && para3.text6}</Text>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5, color: 'green' }}>{'\u2B24'}  {para3 && para3.text7}</Text>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5, color: 'green' }}>{'\u2B24'}  {para3 && para3.text8}</Text>
                            <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, marginTop: 5, color: 'green' }}>{'\u2B24'}  {para3 && para3.text9}</Text>


                        </ScrollView> :
                            <View style={{ paddingTop: '50%' }}>
                                <ActivityIndicator color='green' size={50} animating={true} />
                            </View>}

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