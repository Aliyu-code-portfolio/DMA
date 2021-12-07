import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, Picker, TouchableWithoutFeedback, TextInput, Dimensions, Platform, Image, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Button, } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

import { EventCard } from '../../../../app_components/EventCard'
import { RoundedButton } from '../../../../app_components/RoundedButton'

import { SafeArea } from '../../../utils/safe-area.component'
import { Title, MediumText, SmallText } from '../../botton.styles'

const data = [{ 'Event': 'Campaign', 'Remain': '5', 'Venue': 'Lafia' }, { 'Event': 'Meeting', 'Remain': '30', 'Venue': 'Obi' }]

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
//Things left to add
// Approved event can't be mnodified, pending can be edited or approved or deleted
//Work on error of rendering unreachable useState
export const Events = ({ navigation }) => {
    //menu selector
    const [show, setShow] = useState(true)
    // Check database for admin status
    const [admin, setAdmin] = useState(true)
    const [adding, setAdding] = useState(false)
    const [pending, setPending] = useState([])
    const [approved, setApproved] = useState([])

    //Event informations
    const [error, setError] = useState(null)
    const [addto, setAddto] = useState(null)
    const [votable, setVotable] = useState(null)
    const [date, setDate] = useState();
    const [todo, setTodo] = useState()
    const [venue, setVenue] = useState()
    const [cost, setcost] = useState()
    //datePicker
    const [fulldate, setfulldate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showPicker, setShowPicker] = useState(false);


    const onChange = (event, selectedDate) => {

        const currentDate = selectedDate || fulldate;
        setShowPicker(Platform.OS === 'ios');
        setfulldate(currentDate);
        //Extact date from time
        let tempDate = new Date(currentDate)
        setDate(tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear());

    };

    const showMode = (currentMode) => {
        setShowPicker(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    //functions
    const onFinish = () => {
        setError(null)
        console.log('inside finish')
        if (addto == 'pend') {
            setPending(...pending, { 'Event': todo, 'Date': date, 'Venue': venue, 'Cost': cost, 'Votable': votable })

        }
        else if (addto == 'approve') {
            setApproved(...approved, { 'Event': todo, 'Date': date, 'Venue': venue, 'Cost': cost, 'Votable': votable })
        }
        setDate(null);
        setAdding(false)
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
                    <View style={styles.events}>
                        {adding ? (<><View style={{ alignSelf: 'center' }}>
                            <Image
                                style={{ width: 45, height: 45 }}
                                source={require('../../../../../assets/logo.png')}
                            /></View>
                            <View style={{ height: '90%', paddingTop: 50, justifyContent: 'center', }}>
                                <View style={{ paddingLeft: '5%' }}>
                                    <Title>Add an Event</Title>
                                    <View style={{ paddingBottom: 20, flexDirection: 'row', }}>
                                        <Ionicons
                                            name="megaphone-outline"
                                            color='green'
                                            size={30}
                                        />
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '70%' }}>
                                            <TextInput
                                                style={styles.input}
                                                onChangeText={(text) => { setTodo(text) }}
                                                placeholder="Description..."
                                            />
                                        </View>
                                    </View>
                                    <View >
                                        <View style={{ flexDirection: 'row', width: '100%' }}>
                                            <Text style={{ fontFamily: 'Lato_400Regular', fontWeight: 'bold', fontSize: 16 }}>Date</Text>
                                            <Button style={{ height: '100%', textAlign: 'center' }} color='black' onPress={showDatepicker}>{date ? date : 'Add'}</Button>
                                            {showPicker &&
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
                                        <View style={{ flexDirection: 'row', width: '100%' }}><Text style={{ fontFamily: 'Lato_400Regular', fontWeight: 'bold', fontSize: 16 }}>Venue</Text>
                                            <TextInput
                                                style={[styles.input, { marginLeft: 10 }]}
                                                onChangeText={(text) => { setVenue(text) }}
                                                placeholder="Take place at..."
                                            /></View>
                                        <View style={{ flexDirection: 'row', paddingTop: '5%', }}><Text style={{ fontFamily: 'Lato_400Regular', fontWeight: 'bold', fontSize: 16 }}>Budget</Text>
                                            <TextInput
                                                style={[styles.input, { marginLeft: 10 }]}
                                                onChangeText={(text) => { setcost(text) }}
                                                keyboardType='numeric'
                                                placeholder="Estimated cost..."
                                            /></View>
                                        <View style={{ flexDirection: 'row', paddingTop: '5%', }}><Text style={{ fontFamily: 'Lato_400Regular', fontWeight: 'bold', fontSize: 16 }}>Add to</Text>
                                            <Picker

                                                style={{ height: 20, width: 200 }}
                                                onValueChange={(itemValue, itemIndex) => setAddto(itemValue)}
                                            >
                                                <Picker.Item label="Pending List" value="pend" />
                                                <Picker.Item label="Approved List" value="approve" />
                                            </Picker></View>
                                        <View style={{ flexDirection: 'row', paddingTop: '5%', }}><Text style={{ fontFamily: 'Lato_400Regular', fontWeight: 'bold', fontSize: 16 }}>Team vote</Text>
                                            <Picker
                                                selectedValue={votable}
                                                style={{ height: 20, width: 100 }}
                                                onValueChange={(itemValue, itemIndex) => setVotable(itemValue)}
                                            >
                                                <Picker.Item label="Yes" value='yes' />
                                                <Picker.Item label="No" value='no' />
                                            </Picker></View>
                                    </View>

                                    <View style={{ paddingTop: 20 }}>
                                        {/* <Button icon="clock" color='black' onPress={showTimepicker} >Time: {time}</Button> */}
                                    </View>

                                </View>
                                <View style={{ paddingTop: 20 }}>
                                    {error && <Text style={{ color: 'red', textAlign: 'center' }}>
                                        {error}
                                    </Text>}
                                    <Button icon="check" mode='outlined' color='green' onPress={() => {
                                        if (todo && date && venue && addto && votable) {
                                            onFinish()
                                        }
                                        else {
                                            setError('Error: Please complete the form above. Including Add to and Team vote options')
                                        }
                                    }} >Finished</Button>

                                </View>
                                <View style={{ paddingTop: 10 }}>
                                    <Button icon="close" mode='outlined' color='red' onPress={() => { setDate(null); setError(null); setAdding(false) }} >Cancel</Button>
                                </View>

                            </View>
                        </>) :
                            (<><View style={{ height: '8%', flexDirection: 'row', alignSelf: 'center', width: '100%' }}>

                                <Button style={{
                                    backgroundColor: show ? '#85BB65' : 'green', borderRadius: 20, width: '50%', shadowColor: 'rgb(74, 75, 77)',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 1,
                                    shadowRadius: 8,
                                    elevation: 8,
                                }} icon="check" color='white' onPress={() => setShow(true)} >Approved</Button>
                                <Button style={{
                                    backgroundColor: show ? 'green' : '#85BB65', borderRadius: 20, width: '50%', shadowColor: 'rgb(74, 75, 77)',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 1,
                                    shadowRadius: 8,
                                    elevation: 8,
                                }} icon="close" color='white' onPress={() => setShow(false)} >Pending</Button>
                            </View>
                                <View style={{ paddingTop: '5%', height: '80%' }}>
                                    <FlatList
                                        data={show ? approved : pending}
                                        //Have to stop it rendering unreactable data from usestate data
                                        renderItem={({ item }) => {
                                            return (
                                                <EventCard data={item} />
                                            )
                                        }
                                        }
                                        contentContainerStyle={{
                                            flexGrow: 1,
                                            color: 'green'
                                        }}
                                        showsVerticalScrollIndicator={false}

                                    />
                                </View>
                                {admin && (<View style={{ alignItems: 'center', paddingTop: 20, height: '2%' }}>
                                    <RoundedButton title={<Ionicons name="add-circle-outline"
                                        color='green'
                                        size={30} />} onPressed={setAdding} size={45} style={{ elevation: 8, backgroundColor: '#85BB65', borderWidth: 0 }} />
                                </View>)}
                            </>)}</View>

                </SafeArea>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    events: {
        padding: 10,
        paddingTop: '5%',
        height: '90%',
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
        textAlign: 'center'

    },
})