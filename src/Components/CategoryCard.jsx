import { StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors';

const CategoryCard = ({ children, additionalStyle = [] }) => {
  return (
    <View style={[styles.cardContainer, additionalStyle]}>{children}</View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    height: 50,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    marginVertical: 10,
    borderRadius: 56,
    padding: 10,
  },
});
