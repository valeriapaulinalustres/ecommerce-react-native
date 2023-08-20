import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import { useEffect, useState } from 'react';
import InputForm from '../Components/InputForm';
import SubmitButton from '../Components/SubmitButton';
import { colors } from '../Global/Colors';
import { isAtLeastSixCharacters, isValidEmail } from '../Validations/auth';
import { useLoginMutation } from '../Services/authServices';
import { useDispatch } from 'react-redux';
import { setUser } from '../Features/User/userSlice';
import { deleteSession, insertSession } from '../SQLite';

const LoginScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const [triggerSignUp, result] = useLoginMutation();
  const dispatch = useDispatch();

  console.log('login result', result);

  useEffect(() => {
    (async () => {
      try {
        if (result.isSuccess) {
          await deleteSession('FJ4Umy3hwlScZdwaZq6QSoZhmQV2'); //Ejecutar este si da error "could not execute statement due to a constraint failure (19 UNIQUE constraint failed: sessions.localId)
          //Insert session in SQLite database
          console.log('inserting Session');
          const response = await insertSession({
            idToken: result.data.idToken,
            localId: result.data.localId,
            email: result.data.email,
          });
          console.log('Session inserted: ');
          console.log(response);

          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId,
              profileImage: '',
              location: {
                latitude: '',
                longitude: '',
              },
            })
          );
        } else if (result.isError) {
          setErrorMail('Login error');
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
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
      <ImageBackground
        style={styles.imgBackground}
        resizeMode='cover'
        source={require('../Assets/Images/portrait.png')}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <InputForm
          label={'email'}
          onChange={(email) => setEmail(email)}
          error={errorMail}
        />
        <InputForm
          label={'password'}
          onChange={(pass) => setPassword(pass)}
          error={''}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title='Send' />

        <View style={styles.signUpContainer}>
          <Text style={styles.sub}>Don´t have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.subLink}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

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
  signUpContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sub: {
    fontSize: 10,
    color: colors.subtleText,
    fontFamily: 'Josefin',
  },
  subLink: {
    fontSize: 10,
    color: colors.primary,
    fontFamily: 'Josefin',
    marginStart: 10,
  },
  imgBackground: {
    width: '100%',
    height: '67%',
    flex: 1,
  },
});
