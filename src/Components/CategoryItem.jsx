import { Image, Pressable, StyleSheet } from 'react-native';
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
      {item === 'Succulent' ? (
        <Image
          resizeMode='cover'
          style={styles.image}
          source={require(`../Assets/Images/Succulent.png`)}
        />
      ) : item === 'Annual' ? (
        <Image
          resizeMode='cover'
          style={styles.image}
          source={require(`../Assets/Images/Annual.png`)}
        />
      ) : item === 'Perennial' ? (
        <Image
          resizeMode='cover'
          style={styles.image}
          source={require(`../Assets/Images/Perennial.png`)}
        />
      ) : (
        <Image
          resizeMode='cover'
          style={styles.image}
          source={require(`../Assets/Images/Indoor.png`)}
        />
      )}
      {/* <View style={styles.container}>
        <Text style={styles.textCategory}>{item}</Text>
      </View> */}
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent,
    height: 40,
    width: 250,
    borderRadius: 16,
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
