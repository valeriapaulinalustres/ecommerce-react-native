import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import Card from './Card';
import { colors } from '../Global/Colors';
import { useSelector } from 'react-redux';

const ProductItem = ({ item, navigation }) => {
  const { height, width } = useWindowDimensions();

  console.log(height, width);

  const category = useSelector(
    (state) => state.shopReducer.value.categorySelected
  );

  const onSelect = (id) => {
    navigation.navigate('ItemDetail', {
      productId: item.id,
      title: item.title,
    });
  };

  return (
    <Pressable onPress={() => onSelect(item.id)} style={styles.cardContainer}>
      <Image
        resizeMode='cover'
        style={styles.image}
        source={{ uri: item.images[0] }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.subTitle}>{category}</Text>
        <Text style={width > 350 ? styles.textCategory : styles.textCategorySm}>
          {item.title}
        </Text>
        <Text style={styles.price}>$ {item.price}</Text>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    height: 300,
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
    // minWidth: 150,
    // maxWidth: 250,
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
    width: '100%',
    fontSize: 16,
    color: colors.text,
    height: '40%',
    marginTop: 5,
    marginBottom: 5,
  },
  textCategorySm: {
    width: '100%',
    fontSize: 12,
    color: colors.text,
    height: '40%',
    marginTop: 5,
    marginBottom: 5,
  },
  subTitle: {
    color: colors.subtleText,
    fontSize: 10,
    marginTop: 5,
  },
  price: {
    fontSize: 18,
    color: colors.primary,
    marginTop: 5,
  },
});

//additionalStyle={styles.additionalStylesCard}
