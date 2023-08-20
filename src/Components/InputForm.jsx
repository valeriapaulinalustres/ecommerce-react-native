import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../Global/Colors';

const InputForm = ({ label, onChange, error = '', isSecure = false }) => {
  //Is secure shows asteriscs
  const [input, setInput] = useState('');
  const onChangeText = (text) => {
    setInput(text);
    onChange(text);
  };
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.subtitle}>{label}</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  subtitle: {
    width: '100%',
    fontSize: 14,
    fontFamily: 'Josefin',
    color: colors.subtleText,
  },
  error: {
    fontSize: 12,
    color: colors.error,
    fontFamily: 'Josefin',
    fontStyle: 'italic',
  },
  input: {
    width: '100%',
    borderWidth: 0,
    borderBottomWidth: 3,
    borderBottomColor: colors.accent,
    paddingVertical: 2,
    fontFamily: 'Josefin',
    fontSize: 12,
  },
});
