import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import CategoryItem from '../Components/CategoryItem';
import { useGetCategoriesQuery } from '../Services/shopServices';

const Home = ({ navigation }) => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(category) => category}
        renderItem={({ item }) => (
          <CategoryItem item={item} navigation={navigation} />
        )}
        showsVerticalScrollIndicator={false} //para eliminar la barra de scroll
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    height: '100%', //Neccessary if not flatsList doesn´t work
    paddingBottom: 60,
    width: '100%',
  },
});
