import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from '../Screens/Cart';

const Stack = createNativeStackNavigator();

const CartStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Cart'
      screenOptions={({ navigation, route }) => ({
        header: () => {
          return <Header navigation={navigation} route={route} />;
        },
      })}
    >
      <Stack.Screen name='CartScreen' component={Cart} />
    </Stack.Navigator>
  );
};

export default CartStack;

const styles = StyleSheet.create({});
