import React from 'react';
import { View, TouchableHighlight, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';
import moment from 'moment';

export const Article = ({ article }) => {

    const time = moment(article.publishedAt || moment.now()).fromNow();

    return (
        <TouchableHighlight>
            <Card

                featuredTitleStyle={{
                    marginHorizontal: 5,
                    textShadowColor: '#00000f',
                    textShadowOffset: { width: 3, height: 3 },
                    textShadowRadius: 3
                }}

                containerStyle={{ height: 320, borderRadius: 5 }}
            >
                <View>
                    <Image source={{ uri: article.urlToImage }} style={{ height: 160, width: '100%', borderRadius: 10 }} />
                </View>
                <Text style={{ paddingBottom: 5, paddingTop: 5, fontWeight: 'bold', fontSize: 16 }}>{article.title}</Text>
                <Text style={{ marginBottom: 10, fontSize: 12, color: 'grey', height: '14%' }}>
                    {article.description || 'Read more...'}
                </Text>
                <Divider style={{ backgroundColor: '#dfe6e9' }} />
                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                >
                    <Text
                        style={{
                            margin: 5,
                            fontStyle: 'italic',
                            color: '#b2bec3',
                            fontSize: 10
                        }}
                    >
                        {article.source.name.toUpperCase()}
                    </Text>
                    <Text
                        style={{
                            margin: 5,
                            fontStyle: 'italic',
                            color: '#b2bec3',
                            fontSize: 10
                        }}
                    >
                        {time}
                    </Text>
                </View>
            </Card>
        </TouchableHighlight>
    );

}
