import { FlatList, StyleSheet, Text, View } from 'react-native';
import CartItem from '../Components/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { usePostCartMutation } from '../Services/shopServices';
import { colors } from '../Global/Colors';
import SubmitButton from '../Components/SubmitButton';
import { reset } from '../Features/Counter/counterSlice';
import { deleteCart } from '../Features/Cart/cartSlice';

const Cart = ({ navigation }) => {
  const {
    items: cartData,
    total,
    updatedAt,
    user,
  } = useSelector((state) => state.cartReducer.value);

  const dispatch = useDispatch();

  const [triggerPostCart, result] = usePostCartMutation(); //recibe estos dos de Firebase, la fx post y el resultado del post

  const onConfirm = () => {
    triggerPostCart({ items: cartData, total, user, updatedAt }); //Sends to backend. Needs the word 'item'.
    dispatch(reset());
    dispatch(deleteCart());
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {cartData.length != 0 ? (
        <>
          <FlatList
            data={cartData}
            keyExtractor={(cartItem) => cartItem.id}
            renderItem={({ item }) => {
              return <CartItem cartItem={item} />;
            }}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>${total}</Text>
          </View>
          <SubmitButton onPress={onConfirm} title='Check Out' />
        </>
      ) : (
        <Text style={styles.cartEmpty}>Cart is empty</Text>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 70, //To avoid hiding parts behind the tabBar
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    width: '100%',
  },
  total: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.text,
  },
  cartEmpty: {
    fontSize: 20,
    fontWeight: 600,
    color: colors.warning,
  },
});
