import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ProgressBar } from 'react-native-paper';
import { upvoteAnEvent, downvoteAnEvent, approveDeclineEvent } from '../app_services/firebase_database/data.manipulate'
import { userCount } from '../app_services/authentication/network/user'

//import {Colors} from 'react-native-elements'
//Pull to refresh
//Moving event from pending to approved automatically after vote win
//remain to get current number of members and determine if event is accepted with progress bar
export const VoteCard = ({ data }) => {
    const [haveVote, setHaveVote] = useState(true)
    const [voting, setVoting] = useState(false)
    //retrive accurate number of members from database
    //const [members, setMembers] = useState(0)
    const [progress, setProgress] = useState(0);
    let id = data.Id



    useEffect(() => {
        //get number of members
        userCount(checkUpdated)
        loadHaveVoted()

    }, [])
    //Functions
    //locally store vote history
    const saveHaveVoted = (haveVoted) => {
        try {
            AsyncStorage.setItem(id, JSON.stringify(haveVoted))
        } catch (e) {
            console.log(e)
        }
    };

    //load back locally stored data
    const loadHaveVoted = async () => {
        try {
            const item = await AsyncStorage.getItem(id)
            if (item && JSON.parse(item).length) {
                setHaveVote(false)
            }
            else {
                setHaveVote(true)
            }

        } catch (e) {
            setHaveVote(false)
        }
    }
    const deleteHaveVooted = async () => {
        await AsyncStorage.removeItem(id)
    }

    const finished = (item) => {
        if (item) {
            upvoteAnEvent(data)
        }
        else {
            downvoteAnEvent(data)
        }
        saveHaveVoted('yes')
        setHaveVote(false)

    }
    const getProgress = (members) => {
        if (members % 2 == 0) {
            const needed = (members / 2) + 1
            setProgress(data.Vote / needed)
        }
        else {
            const needed = (members / 2) + 0.5
            setProgress(data.Vote / needed)
        }
    }


    const checkUpdated = (num) => {
        //setMembers(num)
        getProgress(num)
        // console.log(members)
        console.log(num + 'in num')
        if (num % 2 == 0) {
            const needed = (num / 2) + 1
            if (data.Vote == needed || data.Vote > needed) {
                approveDeclineEvent('approved', data)
            }
            if (data.Down == needed || data.Down > needed) {
                approveDeclineEvent('declined', data)
            }

        }
        else {
            const needed = (num / 2) + 0.5
            if (data.Vote == needed || data.Vote > needed) {
                approveDeclineEvent('approved', data)
            }
            if (data.Down == needed || data.Down > needed) {
                approveDeclineEvent('declined', data)
            }
        }
    }
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                setVoting(true)
            }}>
            <View style={[styles.mainCardView, { flexDirection: voting ? 'column' : 'row' }]}>
                {voting ? <>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>

                        {haveVote ? <><TouchableOpacity onPress={() => { finished(true) }} style={{ width: '45%', height: '80%', justifyContent: 'center', marginRight: '3%', backgroundColor: 'green', borderRadius: 10 }}>
                            <View ><Text style={{ textAlign: 'center', color: 'white', }}>Yes</Text></View></TouchableOpacity>
                            <TouchableOpacity onPress={() => { finished(false); }} style={{ width: '45%', height: '80%', justifyContent: 'center', backgroundColor: 'red', borderRadius: 10 }}>

                                <View ><Text style={{ textAlign: 'center', color: 'white' }}>No</Text></View></TouchableOpacity>
                        </> : <Text style={{ fontSize: 16, textAlign: 'center', fontFamily: 'Lato_400Regular' }}>You have already voted</Text>
                        }
                    </View>
                    <ProgressBar
                        progress={progress}
                        color="green"
                        style={{ height: 5, width: 180 }}
                    />
                    <TouchableOpacity onPress={() => setVoting(false)}><View style={{ alignSelf: 'center', paddingBottom: 5, }}><Text style={{ fontWeight: 'bold' }}>Go Back</Text></View>
                    </TouchableOpacity>

                </> :

                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.subCardView}>
                                <Image
                                    source={require("../../assets/vote.png")}
                                    resizeMode="contain"
                                    style={{
                                        borderRadius: 25,
                                        height: 50,
                                        width: 70,
                                    }}
                                />
                            </View>
                            <View style={{ marginLeft: 11, alignItems: 'center', }}>
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
                                width: 30,
                                marginLeft: -26,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 50,
                            }}>
                            <Text style={{ color: 'white' }}>{data.Vote}</Text>
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
});