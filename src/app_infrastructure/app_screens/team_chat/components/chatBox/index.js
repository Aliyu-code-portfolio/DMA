import React from "react";
import { View, Text, Image } from "react-native";
import { Card, CardItem } from "native-base";
import { deviceWidth } from "../../../chat/src/utility/styleHelper/appStyle";
import { uuid } from "../../../../../app_services/authentication/utility/constants";
import styles from "./styles";
import { color } from "../../../chat/src/utility";
import { TouchableOpacity } from "react-native-gesture-handler";

export const ChatBox = ({ userId, msg, username, img, onImgTap }) => {
  let isCurrentUser = userId === uuid ? true : false;
  return (
    <Card
      transparent
      style={{
        maxWidth: deviceWidth / 2 + 10,
        alignSelf: isCurrentUser ? "flex-end" : "flex-start",
      }}
    >
      <View
        style={[
          styles.chatContainer,
          isCurrentUser && {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 4,
            backgroundColor: 'green',
          },
        ]}
      >
        {img ? (<>
          {!isCurrentUser && <Text style={{ fontWeight: 'bold', marginLeft: 5, color: 'green' }}>{username}</Text>}
          <CardItem cardBody>

            <TouchableOpacity onPress={onImgTap}>
              <Image
                source={{ uri: img }}
                resizeMode="cover"
                style={{ height: 200, width: deviceWidth / 2 }}
              />
            </TouchableOpacity>
          </CardItem>
        </>
        ) : <>
          {!isCurrentUser && <Text style={{ fontWeight: 'bold', marginLeft: 5, color: 'green' }}>{username}</Text>}
          <Text
            style={[styles.chatTxt, isCurrentUser && { color: color.WHITE, }]}
          >
            {msg}
          </Text>
        </>
        }
      </View>
    </Card>
  );
};
