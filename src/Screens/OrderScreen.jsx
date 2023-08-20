import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import OrderItem from '../Components/OrderItem';
import { useGetOrdersQuery } from '../Services/shopServices';
import { useSelector } from 'react-redux';

const OrderScreen = () => {
  const { location, localId } = useSelector((state) => state.userReducer.value);

  const { data: orderData, isLoading, isError } = useGetOrdersQuery();

  console.log(localId, orderData, isError);

  const orders = [];
  for (const key in orderData) {
    const element = orderData[key];
    orders.push(element);
  }

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
    paddingBottom: 60, //To avoid hiding parts behind the tabBar
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
  },
});
