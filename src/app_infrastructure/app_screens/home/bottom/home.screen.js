import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableWithoutFeedback, Image, Dimensions, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import NetInfo from "@react-native-community/netinfo";


import { Ionicons } from '@expo/vector-icons';
import { Article } from '../../../../app_services/news/articles'
import { getNews } from '../../../../app_apis/apis/getNews'
import { myData } from '../../../../app_services/authentication/network/user'


import { SafeArea } from '../../../utils/safe-area.component'
import { MediumText, SmallText } from '../../botton.styles'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
export const Home = ({ navigation }) => {

    const [articles, setArticles] = useState(null)
    const [refreshing, setRefreshing] = useState(false)
    const [local, setLocal] = useState(true)
    const [greet, setGreet] = useState()
    const [isConnected, setConnected] = useState(false)
    const [isInternetReachable, setIsInternetReachable] = useState(false)
    const [user, setUser] = useState(null);



    const networkBack = () => {
        myData(useData)
        fetchNews()
    }

    useEffect(async () => {
        if (isInternetReachable) {
            networkBack()
        }
    }, [isInternetReachable])


    useEffect(() => {
        const subscribe = NetInfo.addEventListener(state => {
            setConnected(state.isConnected);
            setIsInternetReachable(state.isInternetReachable)
        });
        greeting()
    }, [])

    useEffect(() => {
        fetchNews();
    }, [local])

    const useData = (info) => {
        setUser(info)
    }


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => { fetchNews(); setRefreshing(false) });
    }, []);

    const fetchNews = () => {
        getNews(local)
            .then(news => {
                setArticles(news)

            })

    };

    const greeting = () => {
        var hours = new Date().getHours();
        if (hours < 12) {
            setGreet('Good morning')
        }
        else if (hours >= 12 && hours <= 15) {
            setGreet('Good afternoon')
        }
        else if (hours >= 15 && hours <= 24) {
            setGreet('Good evening')
        }
    }

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
                        <Image
                            style={{ width: 35, height: 35 }}
                            source={require('../../../../../assets/logo.png')}
                        /></View>
                    <View style={{ position: 'absolute', justifyContent: 'center', right: '4%', bottom: 0, top: 0, borderRadius: 20, backgroundColor: local ? null : 'black' }}>
                        <Ionicons
                            name="location-outline"
                            color='green'
                            size={30}
                            onPress={() => setLocal(!local)}
                        /></View>
                </View>
                <View style={styles.greetingContainer}>
                    <Text style={{ fontFamily: 'Oswald_400Regular', fontSize: 19 }}>{greet}{user && (', ' + user.title + ' ' + user.name)}</Text>
                    <View style={{ paddingTop: 4 }} />
                    {articles && <MediumText>Headline news</MediumText>}
                </View>

                {articles ? <FlatList
                    data={articles}
                    renderItem={({ item }) => <Article article={item} />}
                    keyExtractor={item => item.url}
                    refreshing={refreshing}
                    onRefresh={onRefresh}

                /> : (<ScrollView refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                } style={{ paddingTop: '35%', alignSelf: 'center' }}>
                    {isConnected ? <><ActivityIndicator color='green' size={50} animating={true} />
                        <Text style={{ textAlign: 'center', color: 'grey', marginTop: '3%' }}>Loading News Feed</Text>
                        <Text style={{ textAlign: 'center', color: 'grey', marginTop: '5%' }}>Make sure you have a stable internet connection</Text></>
                        : <><Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: 'grey' }}>An Error While Loading News Feed...</Text>
                            <Text style={{ textAlign: 'center', color: 'grey' }}>You have no internet connection. Connect and try again</Text></>}
                    <Text style={{ textAlign: 'center', color: 'grey' }}>Pull down to Refresh</Text>
                </ScrollView>)}

                {/* </SafeArea> */}
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greetingContainer: {
        alignSelf: 'flex-start',
        padding: 10,
        paddingBottom: 10
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