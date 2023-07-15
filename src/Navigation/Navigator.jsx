import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import ItemListCategory from '../Screens/ItemListCategory';
import ItemDetail from '../Screens/ItemDetail';
import Home from '../Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

const Navigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
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
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
