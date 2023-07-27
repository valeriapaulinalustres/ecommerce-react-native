import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
//import CartData from '../Data/cart.json';
import CartItem from '../Components/CartItem';
import { useSelector } from 'react-redux';
import { usePostCartMutation } from '../Services/shopServices';

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
      <FlatList
        data={cartData}
        keyExtractor={(cartItem) => cartItem.id}
        renderItem={({ item }) => {
          return <CartItem cartItem={item} />;
        }}
      />
      <View style={styles.totalContainer}>
        <Pressable onPress={onConfirm}>
          <Text>Confirm</Text>
        </Pressable>
        <Text>Total: ${total}</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 120,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 20,
  },
});
