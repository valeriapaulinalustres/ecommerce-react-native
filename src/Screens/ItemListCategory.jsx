import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import productsRaw from '../Data/products.json';
import ProductItem from '../Components/ProductItem';
import { colors } from '../Global/Colors';
import Search from '../Components/Search';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
} from '../Services/shopServices';
import { setAllProducts } from '../Features/Shop/shopSlice';

const ItemListCategory = ({ navigation, route }) => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [keywordError, setKeywordError] = useState('');

  const { category } = route.params;

  const dispatch = useDispatch();

  //const productsSelected = useSelector((state) => state.shopReducer.value.productsSelected);

  const categorySelected = useSelector(
    (state) => state.shopReducer.value.categorySelected
  );
  const {
    data: productsSelected,
    isLoading,
    isError,
  } = useGetProductsByCategoryQuery(categorySelected);

  const {
    data: productsFromDb,
    isLoading: loading,
    isError: error,
  } = useGetProductsQuery();

  useEffect(() => {
    dispatch(setAllProducts(productsFromDb));
  }, [productsFromDb]);

  console.log(productsFromDb);

  useEffect(() => {
    //Lógica de manejo de category
    if (productsSelected) {
      const productsFiltered = productsSelected.filter((product) =>
        product.title.toLocaleLowerCase().includes(keyword.toLowerCase())
      );
      setProducts(productsFiltered);
    }
  }, [productsSelected, category, keyword]);

  const onSearch = (input) => {
    const expression = /^[a-zA-Z0-9\ ]*$/;
    const evaluation = expression.test(input);

    if (evaluation) {
      setKeyword(input);
      setKeywordError('');
    } else {
      console.log('Solo letras y números');
      setKeywordError('Solo letras y números');
    }
  };

  console.log(products);

  return (
    <View style={styles.container}>
      <Search
        onSearch={onSearch}
        error={keywordError}
        goBack={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={products}
        keyExtractor={(product) => product.id}
        renderItem={({ item }) => (
          <ProductItem item={item} navigation={navigation} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ItemListCategory;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    //   paddingTop: 10,
    paddingBottom: 60, //para que no lo tape el tabBar
    backgroundColor: 'white',
    alignItems: 'center',
  },
});
