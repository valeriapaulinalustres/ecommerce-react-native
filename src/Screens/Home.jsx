import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { colors } from '../Global/Colors';
import categories from '../Data/categories.json';
import CategoryItem from '../Components/CategoryItem';
import Counter from '../Components/Counter';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Counter />
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
    backgroundColor: colors.lightGreen,
    alignItems: 'center',
    height: '100%', //si no se le pone altura no anda el flatlist
    paddingBottom: 120,
  },
});
