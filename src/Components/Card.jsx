import { StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors';

const Card = ({ children, additionalStyle = [] }) => {
  return (
    <View style={[styles.cardContainer, additionalStyle]}>{children}</View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    height: 250,
    width: 80,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    borderWidth: 2,
    borderColor: colors.accent,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 30,
    padding: 10,
  },
});
