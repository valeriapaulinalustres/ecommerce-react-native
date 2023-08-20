import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { colors } from '../Global/Colors';

const AddressItem = ({ location, navigation }) => {
  const onChangeLocation = () => {
    navigation.navigate('Location Selector');
  };

  return (
    <View style={styles.card} onPress={() => {}}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{location.address}</Text>
      </View>
      <Pressable onPress={onChangeLocation}>
        <Entypo name='location' size={20} color='#51B1A6'>
          <Text style={styles.text2}>Change</Text>
        </Entypo>
      </Pressable>
    </View>
  );
};

export default AddressItem;

const styles = StyleSheet.create({
  card: {
    height: 120,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: colors.accent,
  },
  textContainer: {
    width: '70%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontFamily: 'Josefin',
    fontSize: 16,
    color: colors.text,
  },
  text2: {
    fontFamily: 'Josefin',
    fontSize: 12,
    color: colors.subtleText,
  },
});
