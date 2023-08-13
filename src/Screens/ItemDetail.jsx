import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  View,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import allProducts from '../Data/products.json';
import { colors } from '../Global/Colors';
import { setProductSelected } from '../Features/Shop/shopSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../Features/Cart/cartSlice';
import Counter from '../Components/Counter';
import { putInitialValue, reset } from '../Features/Counter/counterSlice';
import SubmitButton from '../Components/SubmitButton';

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

  const totalQuantity = useSelector((state) => state.counterReducer.value);

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
    dispatch(addCartItem({ ...productSelected, quantity: totalQuantity }));
    dispatch(reset());
    navigation.goBack();
  };

  console.log(productSelected);

  return (
    <View
      style={
        orientation === 'portrait'
          ? styles.container
          : styles.containerLandscape
      }
    >
      {productSelected ? (
        <>
          <ImageBackground
            source={{ uri: productSelected.images[0] }}
            resizeMode='cover'
            style={styles.imgBackground}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{productSelected.title}</Text>
            {/* <Text>{productSelected.description}</Text> */}
            <View style={styles.priceAndCounter}>
              <Text style={styles.price}>{`$ ${productSelected.price}`}</Text>
              <Counter productId={productSelected.id} />
              {/* <Pressable style={styles.button} onPress={onAddCart}>
                <Text>Add to Cart</Text>
              </Pressable> */}
            </View>
            <SubmitButton onPress={onAddCart} title='Add to Cart' />
          </View>
        </>
      ) : null}
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerLandscape: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },

  imgBackground: {
    width: '100%',
    height: '57%',
    flex: 1,
  },
  textContainer: {
    width: '100%',
    height: '50%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 15,
    paddingHorizontal: 40,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    position: 'absolute',
    bottom: 0,
    padding: 10,
  },
  priceAndCounter: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: ' space-between',
    alignItems: 'flex-end',
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  price: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: 600,
    width: '30%',
  },
  button: {
    height: 50,
    width: '100%',
    shadowColor: colors.accent,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 8,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 10,
  },
});
