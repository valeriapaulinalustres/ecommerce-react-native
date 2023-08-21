import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { colors } from '../Global/Colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  increment,
  decrement,
  reset,
  putInitialValue,
} from '../Features/Counter/counterSlice';
import { AntDesign } from '@expo/vector-icons';
import { deleteProduct } from '../Features/Cart/cartSlice';
import { Entypo } from '@expo/vector-icons';

function Counter({ productId }) {
  const count = useSelector((state) => state.counterReducer.value);

  const dispatch = useDispatch();

  //To send to counter
  const productsInCart = useSelector((state) => state.cartReducer.value.items);

  useEffect(() => {
    const existsProduct = productsInCart.find((el) => el.id === productId);

    if (existsProduct) {
      dispatch(putInitialValue(Number(existsProduct.quantity)));
    } else {
      dispatch(putInitialValue(Number(0)));
    }
  }, [productId, productsInCart]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={() => dispatch(decrement())}>
          <Text style={styles.buttonText}>
            <Entypo name='minus' size={20} color='$51B1A6' />
          </Text>
        </Pressable>
        <Text style={styles.span}>{count}</Text>
        <Pressable style={styles.button} onPress={() => dispatch(increment())}>
          <Text style={styles.buttonText}>
            <Entypo name='plus' size={20} color='#51B1A6' />
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => {
          dispatch(reset());
          dispatch(deleteProduct({ id: productId }));
        }}
      >
        <View style={styles.buttonText}>
          <AntDesign name='delete' size={24} color='#ED4B68' />
        </View>
      </Pressable>
    </View>
  );
}

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 50,
    backgroundColor: 'white',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: colors.accent,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  qtyAndTrashContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'white',
    width: '33%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  span: {
    backgroundColor: 'white',
    width: '34%',
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    height: '100%',
    color: colors.text,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spanInput: {
    backgroundColor: 'white',
    width: '34%',
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    height: '100%',
    color: colors.text,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 600,
    fontFamily: 'Josefin',
    backgroundColor: 'white',
    color: colors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
