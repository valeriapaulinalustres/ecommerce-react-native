import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors';

const OrderItem = ({ order }) => {
  const orderItems = order.items;

  return (
    <View
      style={styles.card}
      onPress={(order) => {
        handle;
      }}
    >
      <Text style={styles.date}>{order.updatedAt}</Text>
      <FlatList
        data={orderItems}
        keyExtractor={(orderItems) => orderItems.id}
        renderItem={({ item }) => (
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
