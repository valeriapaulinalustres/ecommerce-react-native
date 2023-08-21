import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors';
import { useDispatch, useSelector } from 'react-redux';

const ProductItem = ({ item, navigation }) => {
  const { height, width } = useWindowDimensions();

  const category = useSelector(
    (state) => state.shopReducer.value.categorySelected
  );

  const onSelect = (item) => {
    navigation.navigate('ItemDetail', {
      productId: item.id,
      title: item.title,
    });
  };

  return (
    <Pressable onPress={() => onSelect(item)} style={styles.cardContainer}>
      <Image
        resizeMode='cover'
        style={styles.image}
        source={{ uri: item.images[0] }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.subTitle}>{category}</Text>
        <Text style={styles.textCategory}>{item.title}</Text>

        <Text style={styles.price}>$ {item.price}</Text>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    height: 270,
    width: 200,
    margin: 10,
    borderRadius: 20,
    borderColor: colors.accent,
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'space-between',
  },
  image: {
    height: '60%',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  additionalStylesCard: {
    flexDirection: 'row',
    height: 120,
    justifyContent: 'space-between',
  },
  textContainer: {
    padding: 5,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textCategory: {
    fontSize: 16,
    color: colors.text,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: 'Josefin',
  },
  textCategorySm: {
    fontSize: 12,
    color: colors.text,
    marginTop: 5,
    marginBottom: 5,
    fontFamily: 'Josefin',
  },
  subTitle: {
    color: colors.subtleText,
    fontSize: 10,
    marginTop: 5,
    fontFamily: 'Josefin',
  },
  price: {
    fontSize: 18,
    color: colors.primary,
    marginTop: 5,
    fontFamily: 'Josefin',
  },
});
