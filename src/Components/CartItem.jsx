import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors';
import { Entypo } from '@expo/vector-icons';
import {
  addCartItem,
  deleteProduct,
  removeCartItem,
} from '../Features/Cart/cartSlice';
import { useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { reset } from '../Features/Counter/counterSlice';

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

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
      <View style={styles.counterContainer}>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={styles.button}
            onPress={() =>
              dispatch(removeCartItem({ id: cartItem.id, quantity: 1 }))
            }
          >
            <Text style={styles.buttonText}>
              <Entypo name='minus' size={20} color='$51B1A6' />
            </Text>
          </Pressable>
          <Text style={styles.qty}>{cartItem.quantity}</Text>
          <Pressable
            style={styles.button}
            onPress={() =>
              dispatch(addCartItem({ id: cartItem.id, quantity: 1 }))
            }
          >
            <Text style={styles.buttonText}>
              <Entypo name='plus' size={20} color='#51B1A6' />
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => {
            dispatch(reset());
            dispatch(deleteProduct({ id: cartItem.id }));
          }}
        >
          <View style={styles.buttonText}>
            <AntDesign name='delete' size={20} color='#ED4B68' />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    height: 80,
    width: 280,
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
    alignItems: 'space-between',
  },
  text: {
    fontFamily: 'Josefin',
    fontSize: 14,
    color: colors.text,
    paddingHorizontal: 5,
    maxWidth: 90,
  },
  price: {
    fontFamily: 'Josefin',
    fontSize: 18,
    color: colors.text,
    fontWeight: 400,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 15,
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    width: 90,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.accent,
    width: 30,
    height: 30,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonText: {
    color: colors.primary,
    width: 30,
    height: 30,
    fontSize: 30,
    fontWeight: 600,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  qty: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 600,
    width: 30,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
