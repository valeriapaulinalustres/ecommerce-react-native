import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors';
import { Entypo } from '@expo/vector-icons';
import Counter from './Counter';
import { addCartItem, removeCartItem } from '../Features/Cart/cartSlice';
import { useDispatch } from 'react-redux';

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

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
      {/* <Counter productId={cartItem.id} /> */}
      {/* <Entypo name='trash' size={30} color='black' /> */}
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.button}
          onPress={() =>
            dispatch(removeCartItem({ id: cartItem.id, quantity: 1 }))
          }
        >
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Text style={styles.qty}>{cartItem.quantity}</Text>
        <Pressable
          style={styles.button}
          onPress={() =>
            dispatch(addCartItem({ id: cartItem.id, quantity: 1 }))
          }
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    height: 130,
    width: 350,
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 25,
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
    borderRadius: 15,
  },
  buttonsContainer: {
    width: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.accent,
    width: 40,
    height: 40,
    borderRadius: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonText: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: 600,
  },
  qty: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 600,
    width: 60,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
