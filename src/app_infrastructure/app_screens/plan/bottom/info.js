import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, Linking, TouchableWithoutFeedback } from 'react-native'

import { Ionicons } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';

import { Title, MediumText, SmallText } from '../../botton.styles'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const Info = ({ route, navigation }) => {
    const { data } = route.params;

    const facebook = (fb) => {
        Linking.canOpenURL("fb://" + fb).then(supported => {
            if (supported) {
                return Linking.openURL("fb://" + fb);
            } else {
                return Linking.openURL("https://www.facebook.com/" + fb);
            }
        })
    }
    const call = (phone) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${phone}`;
        } else {
            phoneNumber = `telprompt:${phone}`;
        }
        Linking.openURL(phoneNumber);
    }
    const email = (mail) => {
        Linking.openURL('mailto:' + mail)
    }
    const webvisit = (link) => {
        if (link) {
            Linking.openURL('http://' + link);
        }
    }
    return (
        <>
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={{ alignSelf: 'center', paddingTop: 12, }}>
                        <TouchableWithoutFeedback onPress={() => { (data.profileImg ? navigation.navigate('ViewImg', { name: data.name, img: data.profileImg }) : null) }}>
                            <Avatar.Image
                                source={{
                                    uri: data.profileImg ? data.profileImg : ''
                                }}
                                size={110}

                                style={{ alignContent: 'stretch', borderRadius: 40, backgroundColor: (data.profileImg ? 'transparent' : 'green') }}
                            />
                        </TouchableWithoutFeedback></View>
                    <View style={{ alignSelf: 'center', paddingTop: '3%' }}><Title>{data.title} {data.name}</Title><Text style={{ fontSize: 16, textAlign: 'center' }}>{data.admin ? 'Management' : 'Member'}</Text></View>
                </View>
                <View style={{ paddingTop: '20%', paddingLeft: '4%', flex: 3 }}>
                    <View style={{ flexDirection: 'row', paddingTop: '6%', alignContent: 'stretch' }}><Text style={{ color: 'grey', fontSize: 16, alignItems: 'stretch' }}>Gender: </Text ><Text style={{ fontSize: 16, }}>{data.gender ? 'Male' : 'Female'}</Text></View>
                    <View style={{ flexDirection: 'row', paddingTop: '6%' }}><Text style={{ color: 'grey', fontSize: 16 }}>Ethnic group: </Text><Text style={{ fontSize: 16, }}>{data.ethnic}</Text></View>
                    <View style={{ flexDirection: 'row', paddingTop: '6%' }}><Text style={{ color: 'grey', fontSize: 16 }}>State: </Text><Text style={{ fontSize: 16, }}>{data.state}</Text></View>
                    <View style={{ flexDirection: 'row', paddingTop: '6%', alignSelf: 'center' }}><Text style={{ fontFamily: 'Lato_400Regular', fontSize: 16, fontWeight: 'bold' }}>Contact Information</Text></View>
                    <View style={{ flexDirection: 'row', paddingTop: '6%' }}><Text style={{ color: 'grey', fontSize: 16 }}>Facebook: </Text>{data.fb ? <TouchableOpacity onPress={() => { facebook(data.fb) }}><Text style={{ fontSize: 16, color: 'green', }}>facebook.com/{data.fb}</Text></TouchableOpacity> : null}</View>
                    <View style={{ flexDirection: 'row', paddingTop: '6%' }}><Text style={{ color: 'grey', fontSize: 16 }}>Email: </Text><TouchableOpacity onPress={() => { email(data.email) }}><Text style={{ fontSize: 16, color: 'green' }}>{data.email}</Text></TouchableOpacity></View>
                    <View style={{ flexDirection: 'row', paddingTop: '6%' }}><Text style={{ color: 'grey', fontSize: 16 }}>Phone: </Text><TouchableOpacity onPress={() => { call(data.phone) }}><Text style={{ fontSize: 16, color: 'green' }}>{data.phone}</Text></TouchableOpacity></View>
                    <View style={{ flexDirection: 'row', paddingTop: '6%' }}><Text style={{ color: 'grey', fontSize: 16 }}>Website: </Text>{data.website ? <TouchableOpacity onPress={() => { webvisit(data.website) }}><Text style={{ fontSize: 16, color: 'green' }}>{data.website ? data.website : 'None'}</Text></TouchableOpacity> : null}</View>
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        height: '100%'
    },
    developer: {
        height: '95%',
        paddingTop: '5%',
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
    }
})