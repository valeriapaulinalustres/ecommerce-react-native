import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import OrderData from '../Data/orders.json';
import OrderItem from '../Components/OrderItem';
import { useGetOrdersQuery } from '../Services/shopServices';
import { useSelector } from 'react-redux';
import { colors } from '../Global/Colors';

const OrderScreen = () => {
  const { location, localId } = useSelector((state) => state.userReducer.value);

  const { data: orderData, isLoading, isError } = useGetOrdersQuery();

  console.log(localId, orderData, isError);

  const orders = [];
  for (const key in orderData) {
    const element = orderData[key];
    orders.push(element);
  }
  console.log(orders);

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={() => Math.random()}
        renderItem={({ item }) => {
          return <OrderItem order={item} />;
        }}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingBottom: 60, //para que no lo tape el tabBar
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
  },
});
