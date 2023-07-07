import { StyleSheet, Text, View } from 'react-native';
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
    height: 50,
    width: 250,
    shadowColor: colors.darkGreen,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    borderWidth: 2,
    borderColor: colors.darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mediumGreen,
    marginVertical: 10,
    borderRadius: 8,
    padding: 10,
  },
});

//https://tools-network.com/react-native-shadow/react-native-box-shadow
