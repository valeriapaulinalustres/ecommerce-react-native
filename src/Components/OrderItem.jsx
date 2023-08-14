import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { colors } from '../Global/Colors';

const OrderItem = ({ order }) => {
  // const total = order.items.reduce(
  //   (acc, currentItem) => (acc += currentItem.price * currentItem.quantity),
  //   0
  // );

  const orderItems = order.items;

  return (
    <View
      style={styles.card}
      onPress={(order) => {
        handle;
      }}
    >
      <Text style={styles.date}>
        {order.updatedAt}
        {/* {new Date(order.createdAt).toLocaleString()} */}
      </Text>
      <FlatList
        data={orderItems}
        keyExtractor={(orderItems) => orderItems.id}
        renderItem={({ item }) => (
          // <ProductItem item={item} navigation={navigation} />
          <Text style={styles.title}>{item.title}</Text>
        )}
        showsVerticalScrollIndicator={false}
      />
      <Text style={styles.price}>${order.total}</Text>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderColor: colors.accent,
    width: 200,
  },

  date: {
    fontFamily: 'Josefin',
    fontSize: 17,
    color: colors.text,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Josefin',
    fontSize: 14,
    color: colors.subtleText,
    marginBottom: 10,
  },
  price: {
    fontFamily: 'Josefin',
    fontSize: 22,
    fontWeight: 400,
    color: colors.primary,
  },
});
