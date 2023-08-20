import { Image, Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategorySelected } from '../Features/Shop/shopSlice';
import { colors } from '../Global/Colors';

const CategoryItem = ({ item, navigation }) => {
  const dispatch = useDispatch();

  const onSelectCategory = () => {
    dispatch(setCategorySelected(item));
    navigation.navigate('ItemListCategory', { category: item });
  };

  return (
    <Pressable onPress={onSelectCategory}>
      <Image
        resizeMode='cover'
        style={styles.image}
        source={require(`../Assets/Images/${item}.png`)}
      />
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  textCategory: {
    fontSize: 18,
    fontFamily: 'Josefin',
    color: colors.text,
  },
  image: {
    height: 200,
    width: 200,
    marginVertical: 20,
  },
});
