import React from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
//import {Colors} from 'react-native-elements'

export const TeamCard = ({ navigation, data }) => {


    return (
        <TouchableWithoutFeedback
            onPress={() => {
                navigation.navigate('View', { data })
            }}>
            <View style={styles.mainCardView}>
                <View style={{}}>
                    <View style={styles.subCardView}>
                        <Text style={{ marginLeft: 5, fontFamily: 'Lato_400Regular', fontSize: 14, }}>{data.title} {data.name}</Text>
                    </View>
                    <View style={{ paddingTop: 10, width: 160 }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: 'Lato_400Regular',
                            }}>
                            {data.position}
                        </Text>
                        <View
                            style={{
                                marginTop: 4,
                                borderWidth: 0,
                                width: '85%',
                            }}>
                            <Text
                                style={{
                                    color: 'grey',
                                    fontSize: 12,
                                }}>
                                {data.ethnic}
                            </Text>
                            <Text
                                style={{
                                    color: 'gray',
                                    fontSize: 11,
                                }}>
                                {data.state}
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        height: 60,
                        backgroundColor: 'green',
                        borderWidth: 0,
                        width: 10,
                        marginLeft: -26,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 50,
                    }}>
                </View>
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
        height: 150,
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
        height: 60,
        width: 160,
        borderRadius: 15,
        backgroundColor: '#F6F3F2',
        borderColor: '#F7F6F5',
        borderWidth: 1,
        borderStyle: 'solid',
        justifyContent: 'center',
    },
});