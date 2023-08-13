import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors';
import { Entypo } from '@expo/vector-icons';
import Counter from './Counter';

const CartItem = ({ cartItem }) => {
  console.log(cartItem);
  return (
    <View style={styles.card}>
      <Image
        resizeMode='cover'
        style={styles.image}
        source={{ uri: cartItem.thumbnail }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{cartItem.title}</Text>

        <Text style={styles.price}>${cartItem.price}</Text>
      </View>
      <Counter productId={cartItem.id} />
      {/* <Entypo name='trash' size={30} color='black' /> */}
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    height: 170,
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: colors.accent,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontFamily: 'Josefin',
    fontSize: 14,
    color: colors.text,
  },
  price: {
    fontFamily: 'Josefin',
    fontSize: 18,
    color: colors.text,
    fontWeight: 400,
  },
  image: {
    height: 100,
    width: 100,
    // minWidth: 150,
    // maxWidth: 250,
    borderRadius: 10,
  },
});
