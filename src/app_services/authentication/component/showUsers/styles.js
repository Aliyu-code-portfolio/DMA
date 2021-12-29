import { StyleSheet } from "react-native";
import { color } from "../../utility";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: 'grey',
    borderBottomWidth: 1,
    borderColor: color.SILVER,
    borderRadius: 30
  },
  cardItemStyle: {
    backgroundColor: 'gray',
    borderBottomWidth: 1,
    borderColor: color.SILVER,
    borderRadius: 30
  },

  logoContainer: {
    height: 40,
    width: 40,
    borderColor: color.WHITE,
    borderWidth: 2,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.DARK_GRAY,
  },
  thumbnailName: { fontSize: 20, color: color.WHITE, fontWeight: "bold" },
  profileName: { fontSize: 20, color: color.WHITE, fontWeight: "bold" },
});
