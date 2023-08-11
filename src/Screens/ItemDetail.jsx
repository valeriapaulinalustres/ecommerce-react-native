import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import allProducts from '../Data/products.json';
import { colors } from '../Global/Colors';
import { setProductSelected } from '../Features/Shop/shopSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../Features/Cart/cartSlice';

const ItemDetail = ({ navigation, route }) => {
  const { productId: idSelected } = route.params; //alias

  console.log('id', idSelected);
  // const [product, setProduct] = useState(null);
  const [orientation, setOrientation] = useState('portrait');
  const { width, height } = useWindowDimensions();

  const dispatch = useDispatch();

  const productSelected = useSelector(
    (state) => state.shopReducer.value.productSelected
  );

  useEffect(() => {
    if (width > height) setOrientation('landscape');
    else setOrientation('portrait');
  }, [width, height]);

  console.log(orientation);
  useEffect(() => {
    dispatch(setProductSelected(idSelected));
  }, []);

  // useEffect(() => {
  //   //Encontrar el producto por su id
  //   // const productSelected = allProducts.find(
  //   //   (product) => product.id === idSelected
  //   // );
  //   setProduct(productSelected);
  // }, [idSelected]);

  // console.log('producto seleccionado', productSelected);

  const onAddCart = () => {
    dispatch(addCartItem({ ...productSelected, quantity: 1 }));
  };

  return (
    <View style={styles.container}>
      {productSelected ? (
        <View
          style={
            orientation === 'portrait'
              ? styles.mainContainer
              : styles.mainContainerLandscape
          }
        >
          <Image
            source={{ uri: productSelected.images[0] }}
            style={styles.image}
            resizeMode='cover'
          />
          <View style={styles.textContainer}>
            <Text>{productSelected.title}</Text>
            <Text>{productSelected.description}</Text>
            <Text>{`$ ${productSelected.price}`}</Text>
            <Pressable style={styles.button} onPress={onAddCart}>
              <Text>Add to Cart</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightGreen,
  },
  mainContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: colors.lightGreen,
  },
  mainContainerLandscape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 350,
  },
  textContainer: {
    flexDirection: 'column',
  },
  button: {
    height: 50,
    width: '100%',
    shadowColor: colors.darkGreen,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    borderWidth: 2,
    borderColor: colors.darkGreen,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mediumGreen,
    borderRadius: 8,
    padding: 10,
  },
});
