import React from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput } from "react-native";

function LoginInput() {
  return (
    <View style={styles.inputblock}>
      <Text style={styles.headerinput}>Login </Text>
      <Text style={styles.inputtext}>Enter your email: </Text>
      <TextInput style={styles.input} placeholder="Email..." />
      <Text style={styles.inputtext}>Enter your password: </Text>
      <TextInput style={styles.input} placeholder="Password..." />
    </View>
  );
}

export default LoginInput;
