import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Image, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import { Searchbar } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

import { Article } from '../../../../app_services/news/articles'
import { searchNews } from '../../../../app_apis/apis/getNews'

import { SafeArea } from '../../../utils/safe-area.component'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const Search = ({ navigation }) => {
    const [searchKeyword, setSearchKeyword] = useState();
    const [articles, setArticles] = useState(null)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(false)
    }, [articles])

    const search = (key) => {
        //Do search here
        setLoading(true)
        var date = moment().format('YYYY-MM-DD');
        searchNews(key, date)
            .then(news => {
                setArticles(news)

            })
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
                            <Image
                                style={{ width: 35, height: 35 }}
                                source={require('../../../../../assets/logo.png')}
                            /></View>

                    </View>
                    <View style={styles.searchContainer}>
                        {/* follows home screen and displays news by search word */}
                        <View style={{ alignItems: 'center', width: '100%', alignSelf: 'center', paddingBottom: 15 }}>
                            <Searchbar
                                placeholder="Search for news topic"
                                value={searchKeyword}
                                onSubmitEditing={() => {
                                    search(searchKeyword);
                                }}
                                onChangeText={(text) => {
                                    setSearchKeyword(text);
                                }}
                                style={{ elevation: 19, borderRadius: 20 }}
                            /></View>

                        {loading ? <View style={{ alignSelf: 'center', paddingTop: '50%' }}><ActivityIndicator color='green' size={40} animating={true} /></View>
                            : <FlatList
                                data={articles}
                                renderItem={({ item }) => <Article article={item} />}
                                keyExtractor={item => item.url}

                            />}
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
    searchContainer: {
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