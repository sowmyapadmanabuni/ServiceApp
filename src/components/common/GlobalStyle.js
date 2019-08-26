import { StyleSheet } from "react-native";

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  cardContainerStyle: {
    marginVertical: 10,
    borderBottomWidth: 0.2
    
  },

  buttonTextSyle: {
    marginVertical: "2%",
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-around"
  },

  noMargins: {
    margin: 0,
    padding: 0
  },
  Title:{
   justifyContent: "center", alignItems: "center"
  },
  rightContainer: {
    justifyContent: "flex-end", flexDirection: "row", marginRight: 10
  }
});
