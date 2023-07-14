import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors';

const Header = () => {
  return (
    <View style={styles.containerHeader}>
      <Text style={styles.text}>Header</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  text: {
    fontSize: 25,
    fontFamily: 'Varela',
  },
});
