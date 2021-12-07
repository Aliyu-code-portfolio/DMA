import React, { useEffect } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
// import { NewsCard } from '../../../app_components/NewsCard'
// import { useDispatch, useSelector } from 'react-redux'
// import HeadlineTypes from '../../../app_services/redux/actions/HeadlineTypes'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { SafeArea } from '../../../utils/safe-area.component'
import { Title, MediumText, SmallText } from '../../botton.styles'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const Home = ({ navigation }) => {
    // useEffect(() => {
    //     getHeadlineData()
    // }, [])

    // const dispatch = useDispatch()
    // const headlineData = useSelector(state => state.headline.data)
    // const getHeadlineData = () => {
    //     dispatch({ type: HeadlineTypes.HEADLINE_REQUEST })
    // }
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
                        <View style={{ position: 'absolute', justifyContent: 'center', right: '4%', bottom: 0, top: 0 }}>
                            <Ionicons
                                name="share-social-outline"
                                color='green'
                                size={30}
                            /></View>
                    </View>
                    <View style={styles.greetingContainer}>
                        <Title>Hi, Diko!</Title>
                        <MediumText>These are the headline news today.</MediumText>
                    </View>


                    {/* <FlatList
                    data={headlineData}
                    keyExtractor={(news, index) => 'key' + index}
                    renderItem={(news) => {
                        return (
                            <NewsCard
                                key={news.item.publishedAt}
                                title={news.item.title}
                                url={news.item.url}
                                author={news.item.author}
                                urlToImage={news.item.urlToImage}
                                description={news.item.description}
                            />
                        )
                    }}
                /> */}
                </SafeArea>
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