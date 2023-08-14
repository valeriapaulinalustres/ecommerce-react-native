import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useEffect } from 'react';
import { colors } from '../Global/Colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
  putInitialValue,
} from '../Features/Counter/counterSlice';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { deleteProduct } from '../Features/Cart/cartSlice';

function Counter({ productId }) {
  // const [inputToAdd, setInputToAdd] = useState(0);

  const count = useSelector((state) => state.counterReducer.value);

  const dispatch = useDispatch();

  let prueba;

  //Para pasarle a counter
  const productsInCart = useSelector((state) => state.cartReducer.value.items);

  useEffect(() => {
    const existsProduct = productsInCart.find((el) => el.id === productId);
    console.log(existsProduct);

    if (existsProduct) {
      dispatch(putInitialValue(Number(existsProduct.quantity)));
    } else {
      dispatch(putInitialValue(Number(0)));
    }
    console.log('del useEffect', existsProduct);
  }, [productId, productsInCart]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={() => dispatch(decrement())}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Text style={styles.span}>{count}</Text>
        <Pressable style={styles.button} onPress={() => dispatch(increment())}>
          <Text style={styles.buttonText}>+</Text>
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

      {/* <View style={styles.buttonsContainer}>
      
        <TextInput
          placeholder='Cantidad a aumentar'
          style={styles.spanInput}
          onChangeText={(val) => (prueba = val)}
          // value={inputToAdd}
        />
        <Pressable
          style={styles.button}
          onPress={() => dispatch(incrementByAmount(Number(prueba)))}
        >
          <Text style={styles.span}>
            <Ionicons name='ios-add-circle-outline' size={24} color='#51B1A6' />
          </Text>
        </Pressable>

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
        
      </View> */}
    </View>
  );
}

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
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
  },
});
