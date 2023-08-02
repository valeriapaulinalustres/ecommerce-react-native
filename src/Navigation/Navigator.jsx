import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'react-native';
import ShopStack from './ShopStack';
import CartStack from './CartStack';
import { FontAwesome } from '@expo/vector-icons';
import {
  Fontisto,
  Ionicons,
  Foundation,
  FontAwesome5,
} from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../Global/Colors';
import OrderStack from './OrderStack';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';
import MyProfileStack from './MyProfileStack';

const Tab = createBottomTabNavigator();

const Navigator = () => {
  const { email } = useSelector((state) => state.userReducer.value);
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        {email ? (
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: styles.tabBar,
            }}
          >
            <Tab.Screen
              name='Shop'
              component={ShopStack}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <View>
                      <Fontisto
                        name='shopping-store'
                        size={24}
                        color={focused ? 'black' : 'gray'}
                      />
                    </View>
                  );
                },
              }}
            />
            <Tab.Screen
              name='Cart'
              component={CartStack}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <View>
                      <FontAwesome
                        name='shopping-basket'
                        size={24}
                        color={focused ? 'black' : 'gray'}
                      />
                    </View>
                  );
                },
              }}
            />
            <Tab.Screen
              name='Order'
              component={OrderStack}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <View>
                      <FontAwesome5
                        name='list-alt'
                        size={24}
                        color={focused ? 'black' : 'gray'}
                      />
                    </View>
                  );
                },
              }}
            />
            <Tab.Screen
              name='MyProfile'
              component={MyProfileStack}
              options={{
                tabBarIcon: ({ focused }) => {
                  return (
                    <View style={styles.item}>
                      <Ionicons
                        name='person-circle-outline'
                        size={24}
                        color={focused ? 'black' : 'gray'}
                      />
                    </View>
                  );
                },
              }}
            />
          </Tab.Navigator>
        ) : (
          <AuthStack />
        )}
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
  tabBar: {
    backgroundColor: colors.green,
    shadowColor: 'black',
    elevation: 4, //profundidad de la sombra
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    borderRadius: 15,
    height: 90,
  },
});
