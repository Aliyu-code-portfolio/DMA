import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Dimensions, Image } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import { Button, } from 'react-native-paper';

import { VoteCard } from '../../../../app_components/VoteCard'
import { eventVote } from '../../../../app_services/firebase_database/data.manipulate'
import { SafeArea } from '../../../utils/safe-area.component'
import { Title, MediumText, SmallText } from '../../botton.styles'
import { FlatList } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//Add vote custom input selector
//adding vote input to database when initiated
export const Votes = ({ navigation }) => {
    const [vote, setVote] = useState(false)
    const [events, setEvents] = useState([])

    useEffect(() => {
        eventVote(retrieveDatabaseData)
    }, [])
    //Functions
    const retrieveDatabaseData = (data) => {
        setEvents(data)
    }
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
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                            <Button style={{
                                backgroundColor: '#85BB65', borderRadius: 20, alignItems: 'center', width: '100%', shadowColor: 'rgb(74, 75, 77)',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 1,
                                shadowRadius: 8,
                                elevation: 8,
                            }} color='white' onPress={() => console.log(events)} >Voting</Button>

                        </View>
                        <View style={{ paddingTop: '5%' }}>
                            {events ? <FlatList
                                data={events}
                                keyExtractor={item => item.Id}
                                renderItem={({ item }) => {
                                    return (
                                        <VoteCard data={item} />
                                    )
                                }
                                }
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    color: 'green'
                                }}
                                showsVerticalScrollIndicator={false}

                            /> : <View style={{ paddingTop: '45%', alignSelf: 'center' }}><Text>Waiting for data</Text></View>
                            }

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