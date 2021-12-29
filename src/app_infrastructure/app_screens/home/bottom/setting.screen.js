import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SafeArea } from '../../../utils/safe-area.component'
import { RoundedButton } from '../../../../app_components/RoundedButton'
import { Title, MediumText, SmallText } from '../../botton.styles'
import { Avatar } from 'react-native-paper';
export const Setting = () => {

    return (
        <>
            <View style={styles.container}>

                <View style={{ flex: 1, width: '100%', paddingLeft: '5%', paddingRight: '5%', paddingTop: '10%' }}>
                    <View style={styles.line1}>
                        <View style={{ position: 'absolute', left: 0, bottom: 0, top: 0 }}>
                            <Image
                                style={{ width: 50, height: 25, backgroundColor: 'transparent' }}
                                source={require('../../../../../assets/logo.png')}
                            /></View>

                        <View style={{ height: '50%', width: '25%', backgroundColor: 'transparent', borderRadius: 4, position: 'absolute', justifyContent: 'center', right: 0, bottom: 0, top: 0 }}>
                            <AntDesign
                                name="logout"
                                style={{ position: 'absolute', right: 0 }}
                                size={30}
                            />
                        </View>

                    </View>
                    <Title>Account</Title>
                    <View style={styles.line3}>
                        <Text style={{ marginLeft: '5%', color: '#828282', fontSize: 16 }}>Photo</Text>
                        <View style={{ justifyContent: 'center', paddingLeft: '30%', paddingTop: '10%', }}>

                            <Avatar.Image
                                source={{
                                    uri: 'https://placeimg.com/140/140/any'
                                }}
                                size={110}

                                style={{ alignContent: 'stretch', borderRadius: 40, backgroundColor: 'transparent' }}
                            />
                            <TouchableOpacity style={{ flexDirection: 'column' }}>
                                <Ionicons
                                    name="create-outline"
                                    color='#0AA49A'
                                    size={22}
                                    style={{ left: '50%', paddingTop: '5%' }}
                                />
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ marginBottom: '10%', color: '#0AA49A', fontSize: 16 }}>Change Image</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.line4567}>
                        <Text style={{ marginLeft: '5%', color: '#828282', fontSize: 16 }}>Name</Text>
                        <View style={{ paddingLeft: '20%', }}>
                            <Text style={{ color: '#000000', fontSize: 16 }}>Mr. Aliyu Abdullahi</Text>
                            <View style={{ elevation: 1, width: '100%', borderWidth: 1, borderColor: '#f4f4f4', marginTop: '5%' }} />
                        </View>
                    </View>
                    <View style={[styles.line4567, { paddingTop: '10%', }]}>
                        <Text style={{ marginLeft: '5%', color: '#828282', fontSize: 16 }}>Gender</Text>
                        <View style={{ paddingLeft: '20%', flexDirection: 'row' }}>
                            <RoundedButton size={35} color='green' title='M' style={{ marginRight: 20 }} />
                            <RoundedButton size={35} color='#F0EFEF' title='F' />

                        </View>
                    </View>
                    <View style={styles.line4567}>
                        <Text style={{ marginLeft: '5%', color: '#828282', fontSize: 16 }}>Age   </Text>
                        <View style={{ paddingLeft: '20%', }}>
                            <Text style={{ color: '#000000', fontSize: 16 }}>26</Text>
                        </View>
                    </View>
                    <View style={[styles.line4567, { paddingBottom: '10%' }]}>
                        <Text style={{ marginLeft: '5%', color: '#828282', fontSize: 16 }}>Mail   </Text>
                        <View style={{ height: '200%', paddingLeft: '20%', paddingRight: '5%' }}>
                            <Text style={{ color: '#000000', fontSize: 16, }}>aliyuabdullahi074@gmail.com</Text>
                        </View>
                    </View>

                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    font: {
        color: 'green'
    },
    line1: {
        flexDirection: 'row',
        flex: 2,
        height: '100%',
        width: '100%',
    },
    line3: {
        flexDirection: 'row',
        paddingTop: '4%',
        paddingBottom: '10%',
        flex: 3,
        height: '100%',
        width: '100%',
    },
    line4567: {
        paddingTop: '10%',
        flexDirection: 'row',
        flex: 1,
        height: '100%',
        width: '100%',
    },
})