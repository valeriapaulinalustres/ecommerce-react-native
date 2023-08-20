import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../Screens/SignupScreen';
import LoginScreen from '../Screens/LoginScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Signup'
      screenOptions={({ route, navigation }) => ({
        headerShown: false, //Do not show header
      })}
    >
      <Stack.Screen name='Signup' component={SignupScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
