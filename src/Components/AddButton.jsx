import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors';

const AddButton = ({ title = '', onPress = () => {} }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 56,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: '90%',
  },
  text: {
    color: 'white',
    fontFamily: 'Josefin',
    fontSize: 18,
  },
});
