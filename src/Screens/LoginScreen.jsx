import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import InputForm from '../Components/InputForm';
import SubmitButton from '../Components/SubmitButton';
import { colors } from '../Global/Colors';
import { isAtLeastSixCharacters, isValidEmail } from '../Validations/auth';
import { useLoginMutation } from '../Services/authServices';
import { useDispatch } from 'react-redux';
import { setUser } from '../Features/User/userSlice';

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [triggerSignUp, result] = useLoginMutation();
  const dispatch = useDispatch();

  console.log('login result', result);

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
        })
      );
    }
  }, [result]);

  const onSubmit = () => {
    try {
      //Submit logic with validations
      const isValidVariableEmail = isValidEmail(email);
      const isCorrectPassword = isAtLeastSixCharacters(password);

      if (isValidVariableEmail && isCorrectPassword) {
        const request = {
          email,
          password,
          returnSecureToken: true,
        };
        console.log('request', request);
        triggerSignUp(request);
      }

      if (!isValidVariableEmail) setErrorMail('Email is not correct');
      else setErrorMail('');
      if (!isCorrectPassword)
        setErrorPassword('Password must be at least 6 characters');
      else setErrorPassword('');
    } catch (err) {
      console.log('Catch error');
      console.log(err.message);
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Login to start</Text>
        <InputForm
          label={'email'}
          onChange={(email) => setEmail(email)}
          error={''}
        />
        <InputForm
          label={'password'}
          onChange={(pass) => setPassword(pass)}
          error={''}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title='Send' />
        <Text style={styles.sub}>Not have an account?</Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.subLink}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Josefin',
  },
  sub: {
    fontSize: 14,
    color: 'black',
  },
  subLink: {
    fontSize: 14,
    color: 'blue',
  },
});
