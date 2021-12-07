import React from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
//import {Colors} from 'react-native-elements'

export const VoteCard = ({ onPressed, data }) => {


    return (
        <TouchableWithoutFeedback
            onPress={() => {
                onPressed(true)
            }}>
            <View style={styles.mainCardView}>
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
                    <Text style={{ color: 'white' }}>{data.Votes}</Text>
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