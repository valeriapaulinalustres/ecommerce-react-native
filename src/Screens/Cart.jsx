import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
//import CartData from '../Data/cart.json';
import CartItem from '../Components/CartItem';
import { useSelector } from 'react-redux';
import { usePostCartMutation } from '../Services/shopServices';
import { colors } from '../Global/Colors';
import SubmitButton from '../Components/SubmitButton';

const Cart = () => {
  // console.log(CartData);
  // const total = CartData.reduce(
  //   (acumulador, currentItem) =>
  //     (acumulador += currentItem.price * currentItem.quantity),
  //   0
  // );

  const {
    items: cartData,
    total,
    updatedAt,
    user,
  } = useSelector((state) => state.cartReducer.value);

  const [triggerPostCart, result] = usePostCartMutation(); //recibe estos dos de Firebase, la fx post y el resultado del post

  const onConfirm = () => {
    triggerPostCart({ items: cartData, total, user, updatedAt }); //Se envía al back. Necesita la palabra items, por lo cual le envío el alias que le puse
  };

  console.log(result);

  return (
    <View style={styles.container}>
      {cartData.length != 0 ? (
        <>
          <FlatList
            data={cartData}
            keyExtractor={(cartItem) => cartItem.id}
            renderItem={({ item }) => {
              return <CartItem cartItem={item} />;
            }}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>${total}</Text>
          </View>
          <SubmitButton onPress={onConfirm} title='Check Out' />
        </>
      ) : (
        <Text style={styles.cartEmpty}>Cart is empty</Text>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 120, //para que no lo tape el tabBar
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    width: '100%',
  },
  total: {
    fontSize: 24,
    fontWeight: 600,
    color: colors.text,
  },
  cartEmpty: {
    fontSize: 24,
    fontWeight: 600,
    color: colors.warning,
  },
});
