import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import AddButton from '../Components/AddButton';
import AddressItem from '../Components/AddressItem';
import { useGetUserLocationQuery } from '../Services/shopServices';
import { colors } from '../Global/Colors';

const ListAddress = ({ navigation }) => {
  const { location, localId } = useSelector((state) => state.userReducer.value);
  const {
    data: userLocationQuery,
    isError,
    isLoading,
  } = useGetUserLocationQuery(localId);

  return location?.latitude || userLocationQuery ? (
    <View style={styles.container}>
      <AddressItem
        location={location?.latitude ? location : userLocationQuery}
        navigation={navigation}
      />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>No location set</Text>
      <AddButton
        title='Set location'
        onPress={() => navigation.navigate('Location Selector')}
      />
    </View>
  );
};

export default ListAddress;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  text: {
    paddingVertical: 20,
    fontFamily: 'Josefin',
    fontSize: 18,
    color: colors.text,
  },
});
