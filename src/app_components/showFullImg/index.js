import React, { useLayoutEffect, Fragment } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { globalStyle, color } from "../../app_services/authentication/utility";

export const ShowFullImg = ({ route, navigation }) => {
  const { params } = route;
  const { name, img, imgText } = params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: <Text>{name && name}</Text>,
    });
  }, [navigation]);
  return (
    <Fragment>
      {img ? (
        <Image
          source={{ uri: img }}
          style={[globalStyle.flex1]}
          resizeMode="contain"
        />
      ) : (
        <View
          style={[
            globalStyle.containerCentered,
            { backgroundColor: color.BLACK },
          ]}
        >
          <Text style={styles.text}>{imgText}</Text>
        </View>
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  text: { color: 'black', fontSize: 200, fontWeight: "bold" },
});
