import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleLineIcons } from '@expo/vector-icons';
import { signOut } from '../Features/User/userSlice';

const Header = ({ navigation, route }) => {
  let title;

  if (route.name === 'Home') {
    title = 'Los Lupinos';
  } else if (route.name === 'ItemListCategory') {
    title = route.params.category;
  } else if (route.name === 'ItemDetail') {
    title = route.params.title;
  } else if (route.name === 'CartScreen') {
    title = 'Cart';
  } else if (route.name === 'OrderScreen') {
    title = 'Order';
  }

  console.log(route.params);

  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.userReducer.value);

  return (
    <View style={styles.containerHeader}>
      <Text style={styles.text}>{title}</Text>
      {route.name !== 'Home' && (
        <>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.pressable}
          >
            <AntDesign name='back' size={24} color='black' />
          </Pressable>
        </>
      )}
      {email ? (
        <Pressable style={styles.signOut} onPress={() => dispatch(signOut())}>
          <SimpleLineIcons name='logout' size={24} color='black' />
        </Pressable>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: colors.green,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  text: {
    fontSize: 25,
    fontFamily: 'Josefin',
  },
  pressable: {
    position: 'absolute',
    right: 30,
    top: '25%',
  },
  signOut: {
    position: 'absolute',
    left: 30,
    top: '50%',
  },
});
