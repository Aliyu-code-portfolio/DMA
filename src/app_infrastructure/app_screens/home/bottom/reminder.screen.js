import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image, FlatList, Platform, Dimensions, Vibration, TextInput, Alert, } from 'react-native'
import { AsyncStorage } from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons';
import LottieView from "lottie-react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, } from 'react-native-paper';

import { SafeArea } from '../../../utils/safe-area.component'
import { AlarmCard } from '../../../../app_components/AlarmCard'
import { Title, MediumText, SmallText } from '../../botton.styles'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
///.................///
//Remaining Text styling, flatlistend color, recent activities, asynstorage and follow card design from figma
export const Reminder = ({ navigation }) => {
    const [adding, setAdding] = useState(false)
    const [error, setError] = useState();
    const [alarm, setAlarm] = useState([]);
    //const [sortedDate, setSortedDate] = useState()
    const [sortedAlarm, setSortedAlarm] = useState()
    const vibrate = () => {
        if (Platform.OS === 'ios') {
            const interval = setInterval(() => Vibration.vibrate(), 40);
            setTimeout(() => clearInterval(interval), 1000);
        } else {
            Vibration.vibrate(40);
        }
    };
    const addAlarm = () => {
        setTodo(null)
        setAdding(true)
        vibrate()

    }
    const sortRemainders = () => {
        //let tempsorted1 = alarm.slice().sort((a,b)=>b.date - a.date)
        let tempsorted1 = alarm.sort((a, b) =>
            new Date(...a.Date.split('/').reverse()) -
            new Date(...b.Date.split('/').reverse()));
        let tempsorted2 = tempsorted1.sort((a, b) =>
            new Date(...a.Time.split(':').reverse()) -
            new Date(...b.Time.split(':').reverse()));
        setSortedAlarm(tempsorted2);
        console.log('Sorted: ' + sortedAlarm)
    }
    const onFinish = () => {
        Alert.alert(

            "You have set a reminder to " + todo,
            "DMA will remind you on " + date + " at exactly " + time,
            [
                {
                    text: "No thanks",

                    onPress: () => {

                    },
                    style: "cancel"
                },
                {
                    text: "Yes Remind me",

                    onPress: () => {
                        setAlarm([...alarm, { 'Todo': todo, 'Date': date, 'Time': time }])
                        sortRemainders()
                        setAdding(false)
                        console.log(alarm)
                    },
                    style: "cancel"
                },

            ]
        );
    }
    //clear history data
    const onClear = () => {
        setAlarm([])
    }

    //locally store remainder history
    const saveAlarmList = async () => {
        try {
            await AsyncStorage.setItem('alarm', JSON.stringify(sortedAlarm))
        } catch (e) {
            console.log(e)
        }
    };

    //load back locally stored data
    const loadAlarmList = async () => {
        try {
            const alarm = await AsyncStorage.getItem('alarm')
            if (alarm && JSON.parse(alarm).lenght) {
                setSortedAlarm(JSON.parse(alarm))
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        loadAlarmList();
    }, [])

    useEffect(() => {
        saveAlarmList()
    }, [sortedAlarm])



    //Adding TODO
    const [fulldate, setfulldate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [todo, setTodo] = useState()

    const onChange = (event, selectedDate) => {

        const currentDate = selectedDate || fulldate;
        setShow(Platform.OS === 'ios');
        setfulldate(currentDate);
        //Extact date from time
        let tempDate = new Date(currentDate)
        setDate(tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear());
        setTime(tempDate.getHours() + ':' + tempDate.getMinutes());

    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };


    return (
        <View style={styles.container}>
            <SafeArea>
                <View style={styles.topSide}>
                    {adding ? <View style={{ flex: 1, paddingTop: 50, justifyContent: 'center', }}>
                        <View style={{ paddingLeft: '5%' }}>
                            <Title>Add a Remainder</Title>
                            <View style={{ paddingBottom: 20, flexDirection: 'row', }}>
                                <Ionicons
                                    name="calendar"
                                    color='green'
                                    size={40}
                                />
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '70%' }}>
                                    <TextInput
                                        style={[styles.input, { borderColor: todo ? 'green' : 'red', }]}
                                        onChangeText={(text) => { setTodo(text) }}
                                        placeholder="   I plan to..."
                                    />
                                </View>
                            </View>
                            <View>
                                <Button icon="apps" color='black' onPress={showDatepicker}>Date: {date}</Button>
                            </View>
                            <View style={{ paddingTop: 20 }}>
                                <Button icon="clock" color='black' onPress={showTimepicker} >Time: {time}</Button>
                            </View>
                            {show &&
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={fulldate}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            }
                        </View>
                        <View style={{ paddingTop: 20 }}>
                            {error && <Text style={{ color: 'red', textAlign: 'center' }}>
                                {error}
                            </Text>}
                            <Button icon="check" mode='outlined' color='green' onPress={() => {
                                if (todo && date && time) { setError(null); onFinish() }
                                else {
                                    setError('Error: Please complete the form above')
                                }
                            }} >Finished</Button>

                        </View>
                        <View style={{ paddingTop: 10 }}>
                            <Button icon="close" mode='outlined' color='red' onPress={() => { setError(null); setAdding(false) }} >Cancel</Button>
                        </View>

                    </View> : <><View style={styles.topBar}>
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
                            <Image
                                style={{ width: 35, height: 35 }}
                                source={require('../../../../../assets/logo.png')}
                            /></View>
                    </View>
                        <View style={{ paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%', height: '80%' }}>
                            <Text style={{ color: 'green', marginBottom: '0.5%', fontSize: 18, fontFamily: 'Oswald_400Regular', }}>My TODO List</Text>
                            {sortedAlarm && <FlatList
                                data={sortedAlarm}

                                renderItem={({ item }) => {
                                    return (
                                        <AlarmCard data={item} />
                                    )
                                }
                                }
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    color: 'green'
                                }}
                                showsVerticalScrollIndicator={false}

                            />}
                        </View>
                        <View style={{
                            alignSelf: 'center', height: '10.5%', width: '6%', paddingTop: '5%'
                        }}>
                            <TouchableWithoutFeedback
                                onPress={() => { addAlarm(); console.log(alarm) }}
                            >
                                <LottieView
                                    key="animation"
                                    autoPlay
                                    loop
                                    resizeMode="cover"
                                    source={require("../../../../../assets/notification.json")}
                                />
                            </TouchableWithoutFeedback>
                        </View></>

                    }
                </View>

                <View style={styles.history}>
                    <Text style={{ color: 'green', marginLeft: '5%' }}>Recent Activities</Text>
                </View>

            </SafeArea>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topSide: {
        flex: 4,
    },
    history: {
        flex: 1,
        alignSelf: 'flex-start',
        padding: 10,
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
    },
    input: {
        width: '70%',
        borderWidth: 1,
        borderRadius: 5,

    },
})