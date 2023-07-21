import React from 'react';
import Header from '../Components/Header';
import ItemListCategory from '../Screens/ItemListCategory';
import ItemDetail from '../Screens/ItemDetail';
import Home from '../Screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ShopStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={({ navigation, route }) => ({
        header: () => {
          return <Header navigation={navigation} route={route} />;
        },
      })}
    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='ItemListCategory' component={ItemListCategory} />
      <Stack.Screen name='ItemDetail' component={ItemDetail} />
    </Stack.Navigator>
  );
};

export default ShopStack;
