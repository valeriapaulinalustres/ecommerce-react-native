import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import InputForm from '../Components/InputForm';
import SubmitButton from '../Components/SubmitButton';
import { colors } from '../Global/Colors';
import { useSignUpMutation } from '../Services/authServices';
import { useDispatch } from 'react-redux';
import { setUser } from '../Features/User/userSlice';
import { isAtLeastSixCharacters, isValidEmail } from '../Validations/auth';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

  const [triggerSignUp, result] = useSignUpMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
          profileImage: '',
        })
      );
    } else if (result.isError) {
      setErrorMail('Email already exists');
    }
  }, [result]);

  const onSubmit = () => {
    try {
      //Submit logic with validations
      const isValidVariableEmail = isValidEmail(email);
      const isCorrectPassword = isAtLeastSixCharacters(password);
      const isRepeatedPasswordCorrect = password === confirmPassword;

      if (
        isValidVariableEmail &&
        isCorrectPassword &&
        isRepeatedPasswordCorrect
      ) {
        const request = {
          email,
          password,
          returnSecureToken: true,
        };
        triggerSignUp(request);
      }

      if (!isValidVariableEmail) setErrorMail('Email is not correct');
      else setErrorMail('');
      if (!isCorrectPassword)
        setErrorPassword('Password must be at least 6 characters');
      else setErrorPassword('');
      if (!isRepeatedPasswordCorrect)
        setErrorConfirmPassword('Passwords must match');
      else setErrorConfirmPassword('');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <View style={styles.main}>
      <ImageBackground
        style={styles.imgBackground}
        resizeMode='cover'
        source={require('../Assets/Images/portrait_login.jpg')}
      />
      <View style={styles.container}>
        {!errorMail && !errorPassword && !errorConfirmPassword && (
          <Text style={styles.title}>Los Lupinos Signup</Text>
        )}
        <InputForm label={'email'} onChange={setEmail} error={errorMail} />
        <InputForm
          label={'password'}
          onChange={setPassword}
          error={errorPassword}
          isSecure={true}
        />
        <InputForm
          label={'confirm password'}
          onChange={setconfirmPassword}
          error={errorConfirmPassword}
          isSecure={true}
        />

        <SubmitButton onPress={onSubmit} title='Send' />
        {(errorMail === 'Email already exists' || !errorMail) &&
          !errorPassword &&
          !errorConfirmPassword && (
            <View style={styles.loginContainer}>
              <Text style={styles.sub}>Already have an account?</Text>
              <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={styles.subLink}>Login</Text>
              </Pressable>
            </View>
          )}
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    width: '100%',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    gap: 8,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopRightRadius: 50,
    position: 'absolute',
    bottom: 0,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Josefin',
    color: colors.text,
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sub: {
    fontSize: 10,
    fontFamily: 'Josefin',
    color: 'black',
  },
  subLink: {
    marginStart: 10,
    fontSize: 14,
    fontFamily: 'Josefin',
    color: colors.primary,
  },
  imgBackground: {
    width: '100%',
    height: '67%',
    flex: 1,
  },
});
