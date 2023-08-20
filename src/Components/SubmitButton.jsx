import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors';

const SubmitButton = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: '100%',
  },
  text: {
    color: 'white',
    fontFamily: 'Josefin',
    fontSize: 18,
  },
});
