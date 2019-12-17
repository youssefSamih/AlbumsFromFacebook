import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';

const buttonWithBackground = props => {
  const content = (
    <LinearGradient
      colors={props.Backcolors}
      style={[
        styles.button,
        props.disabled ? styles.disabled : null,
        props.buttonStyle
      ]}
      start={props.start}
    >
      <Text style={props.disabled ? styles.disabledText : null}>
        {props.children}
      </Text>
    </LinearGradient>
  );
  if (props.disabled) {
    return content;
  }
  if (Platform.OS === "android") {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        {content}
      </TouchableNativeFeedback>
    );
  }
  return <TouchableOpacity style={styles.shadowIos} onPress={props.onPress}>{content}</TouchableOpacity>;
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  disabled: {
    backgroundColor: "#eee",
    borderColor: "#aaa"
  },
  disabledText: {
    color: "#aaa"
  },
  shadowIos:{
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 2, // IOS
    shadowRadius: 5, //IOS
  }
});

export default buttonWithBackground;