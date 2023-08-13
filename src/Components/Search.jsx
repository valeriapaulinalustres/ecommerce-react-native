import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../Global/Colors';

const Search = ({ onSearch, error = '', goBack }) => {
  const [keyword, setKeyword] = useState('');
  const { height, width } = useWindowDimensions();

  const onErase = () => {
    setKeyword('');
    onSearch('');
  };

  return (
    <View style={width > 350 ? styles.container : styles.containerSm}>
      <TextInput
        style={styles.input}
        placeholder='Search...'
        value={keyword}
        onChangeText={setKeyword}
      />
      <Pressable onPress={() => onSearch(keyword)}>
        <FontAwesome name='search' size={24} color='black' />
      </Pressable>
      <Pressable onPress={onErase}>
        <FontAwesome5 name='eraser' size={24} color='black' />
      </Pressable>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
    gap: 18,
    margin: 20,
  },
  containerSm: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '10%',
  },
  input: {
    width: 250,
    padding: 8,
    fontSize: 18,
    backgroundColor: colors.accent,
    borderRadius: 56,
  },
  errorText: {
    color: 'red',
  },
});
