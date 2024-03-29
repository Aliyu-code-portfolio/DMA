import { StyleSheet } from "react-native";
import { color, appStyle } from "../../chat/src/utility";

export default StyleSheet.create({
  sendMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    width: "95%",
    alignSelf: 'center'
  },
  input: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: "70%",
  },

  sendBtnContainer: {
    height: appStyle.fieldHeight,
    backgroundColor: color.DARK_GRAY,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "29%",
  },
});
