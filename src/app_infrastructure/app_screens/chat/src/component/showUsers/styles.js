import { StyleSheet } from "react-native";
import { color } from "../../utility";

export default StyleSheet.create({
  cardStyle: {
    backgroundColor: '#4CC417',
    borderBottomWidth: 1,
    borderColor: color.SILVER,
    borderRadius: 30,
    width: "95%",
    alignSelf: 'center',

  },
  cardItemStyle: {
    backgroundColor: '#77DD77',
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
