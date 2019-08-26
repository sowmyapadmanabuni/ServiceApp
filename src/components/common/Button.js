import React from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

const Button = props => {
  console.log(props.onPress);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.onPress ? props.onPress() : null;
      }}
    >
      <View style={[styles.buttonStyle, {...props.style}]}>
        <Text style={{ color: "#fff" }}>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "orange",
    borderRadius: 50,
    padding: 10,
    height: 45,
    display: "flex",
    justifyContent: "center",
    width: "30%",
    alignItems: "center"
  }
});

export default Button;
