import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors } from '../Global/Colors';
import { setProductSelected } from '../Features/Shop/shopSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../Features/Cart/cartSlice';
import Counter from '../Components/Counter';
import { reset } from '../Features/Counter/counterSlice';
import SubmitButton from '../Components/SubmitButton';

const ItemDetail = ({ navigation, route }) => {
  const { productId: idSelected } = route.params; //alias
  const dispatch = useDispatch();

  const [orientation, setOrientation] = useState('portrait');
  const { width, height } = useWindowDimensions();

  const productSelected = useSelector(
    (state) => state.shopReducer.value.productSelected
  );

  const totalQuantity = useSelector((state) => state.counterReducer.value);

  useEffect(() => {
    if (width > height) setOrientation('landscape');
    else setOrientation('portrait');
  }, [width, height]);

  useEffect(() => {
    dispatch(setProductSelected(idSelected));
  }, [idSelected]);

  //To send to Counter
  const productsInCart = useSelector((state) => state.cartReducer.value.items);

  const existsProduct = productsInCart.find(
    (el) => el.id === productSelected.id
  );

  let initialQuantity;

  if (existsProduct) {
    initialQuantity = existsProduct.quantity;
  } else {
    initialQuantity = 0;
  }

  const onAddCart = () => {
    dispatch(
      addCartItem({
        ...productSelected,
        quantity: totalQuantity - initialQuantity,
      })
    );
    dispatch(reset());
    navigation.goBack();
  };

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
            <Text style={styles.description}>
              {productSelected.description}
            </Text>
            <View style={styles.priceAndCounter}>
              <Text style={styles.price}>{`$ ${productSelected.price}`}</Text>
              <Counter productId={productSelected.id} />
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
    alignItems: 'center',
    backgroundColor: 'white',
  },
  containerLandscape: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },

  imgBackground: {
    width: '100%',
    height: '60%',
    flex: 1,
  },
  textContainer: {
    width: '100%',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    gap: 15,
    paddingHorizontal: 30,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    position: 'absolute',
    bottom: 0,
    bottom: 70,
    paddingTop: 30,
  },
  priceAndCounter: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  description: {
    color: colors.subtleText,
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  price: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: 600,
    width: '30%',
  },
});
