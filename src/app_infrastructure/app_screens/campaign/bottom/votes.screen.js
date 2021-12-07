import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Image } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Button, } from 'react-native-paper';
import { VoteCard } from '../../../../app_components/VoteCard'

import { SafeArea } from '../../../utils/safe-area.component'
import { Title, MediumText, SmallText } from '../../botton.styles'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Add vote custom input selector
//adding vote input to database when initiated
export const Votes = ({ navigation }) => {
    const [vote, setVote] = useState(false)
    const data = [{ 'Event': 'Campaign', 'Date': '23/09/2022', 'Venue': 'Lafia', 'Votes': '5' }, { 'Event': 'Campaign', 'Date': '5/03/2022', 'Venue': 'Awe', 'Votes': '3' }]

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
                    <View style={styles.vote}>
                        {vote ?
                            (<><View style={{ alignSelf: 'center' }}>
                                <Image
                                    style={{ width: 45, height: 45 }}
                                    source={require('../../../../../assets/logo.png')}
                                /></View>
                                <View style={{ height: '90%', paddingTop: '10%', }}>
                                    <View style={{ alignItems: 'center', }}>
                                        <View style={{ flexDirection: 'row', }}>
                                            <Image
                                                source={require("../../../../../assets/vote.png")}
                                                resizeMode="contain"
                                                style={{
                                                    borderRadius: 25,
                                                    height: 50,
                                                    width: 70,
                                                }}
                                            />

                                        </View>
                                        <Title>Place your vote</Title>

                                        <View >
                                            <View style={{ flexDirection: 'row', width: '100%', paddingTop: '5%', alignSelf: 'center', }}>
                                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, textAlign: 'center' }}>Campaign</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', paddingTop: '5%', alignSelf: 'center', }}>
                                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, textAlign: 'center' }}>Lafia</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', paddingTop: '5%', alignSelf: 'center', }}>
                                                <Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, textAlign: 'center' }}>25/03/2021</Text>
                                            </View>
                                        </View>

                                    </View>
                                    <View style={{ paddingTop: 20 }}>
                                        <Button icon="check" mode='outlined' color='green' onPress={() => {

                                        }} >Finished</Button>

                                    </View>

                                </View></>) : (<>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                                        <Button style={{
                                            backgroundColor: '#85BB65', borderRadius: 20, alignItems: 'center', width: '100%', shadowColor: 'rgb(74, 75, 77)',
                                            shadowOffset: { width: 0, height: 0 },
                                            shadowOpacity: 1,
                                            shadowRadius: 8,
                                            elevation: 8,
                                        }} color='white'  >Voting</Button>

                                    </View>
                                    <View style={{ paddingTop: '5%' }}>
                                        <VoteCard onPressed={setVote} data={data[0]} />
                                        <TouchableOpacity>
                                            <VoteCard data={data[1]} />
                                        </TouchableOpacity>
                                    </View>
                                </>)
                        }
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
    vote: {
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