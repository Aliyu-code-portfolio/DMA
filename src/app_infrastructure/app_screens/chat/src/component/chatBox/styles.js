import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";

export default StyleSheet.create({
  chatContainer: { backgroundColor: color.DARK_GRAY, borderRadius: 10 },
  chatTxt: {
    color: color.BLACK,
    fontSize: 18,
    marginVertical: 2,
    fontWeight: "500",
    padding: 8,
  },
});
