import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image, Dimensions, TextInput, FlatList, Platform } from 'react-native'
import NetInfo from "@react-native-community/netinfo";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Button, } from 'react-native-paper';

import { BudgetCard } from '../../../../app_components/BudgetCard'

import { SafeArea } from '../../../utils/safe-area.component'
import { Title, MediumText, SmallText } from '../../botton.styles'
import { budget, budgetTotal, changeBudget } from '../../../../app_services/firebase_database/data.manipulate';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export const Budgets = ({ navigation }) => {
    const [change, setChange] = useState(false)
    const [events, setevents] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [total, setTotal] = useState(0)
    const [isInternetReachable, setIsInternetReachable] = useState(false)

    // Functions

    function formatToCurrency(amount) {
        return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    const networkBack = () => {
        budget(retrieveDatabaseData)
        budgetTotal(sumTotal)
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


    const sumTotal = (data) => {
        setTotal(data)
        console.log(total)
    }



    //Functions
    const retrieveDatabaseData = (data) => {
        setevents(data)
    }
    const reload = () => {
        budget(retrieveDatabaseData)
        budgetTotal(sumTotal)
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => { reload(); setRefreshing(false) });
    }, []);
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
                        <Title>Campaign</Title></View>

                </View>
                <View style={styles.greetingContainer}>
                    <View style={styles.budget}>
                        <><View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>

                            <Button style={{
                                backgroundColor: '#85BB65', borderRadius: 20, alignItems: 'center', width: '100%', shadowColor: 'rgb(74, 75, 77)',
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 1,
                                shadowRadius: 8,
                                elevation: 8,
                            }} color='white'  >Budgetting</Button>

                        </View>
                            <View style={{ paddingTop: '5%', height: '98%' }}>
                                <FlatList
                                    data={events}
                                    renderItem={({ item }) => {
                                        return (
                                            <BudgetCard data={item} refresh={reload} internet={isInternetReachable} />
                                        )
                                    }
                                    }
                                    keyExtractor={item => item.Id}
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}

                                />
                            </View></>

                        <View style={{ height: '5%', position: 'absolute', right: 0, bottom: 0, paddingRight: '5%' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Oswald_400Regular', }}>Total: ₦{formatToCurrency(total)}</Text>
                        </View>
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
    budget: {
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