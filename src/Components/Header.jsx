import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../Features/User/userSlice';
import { deleteSession } from '../SQLite';
import { Ionicons } from '@expo/vector-icons';

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

  const dispatch = useDispatch();
  const { email, localId } = useSelector((state) => state.userReducer.value);

  const handleSignout = async () => {
    try {
      const response = await deleteSession(localId);
      dispatch(signOut());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.containerHeader}>
      {route.name !== 'Home' && (
        <>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.pressable}
          >
            <Ionicons name='chevron-back' size={22} color='#51B1A6' />
          </Pressable>
        </>
      )}
      <Text style={styles.text}>{title}</Text>

      {email ? (
        <Pressable style={styles.signOut} onPress={handleSignout}>
          <AntDesign name='logout' size={22} color='#51B1A6' />
        </Pressable>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  containerHeader: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    position: 'relative',
  },
  text: {
    fontSize: 25,
    fontFamily: 'Josefin',
    color: colors.text,
  },
  pressable: {
    position: 'absolute',
    left: 30,
    top: '30%',
  },
  signOut: {
    position: 'absolute',
    right: 30,
    top: '30%',
  },
});
