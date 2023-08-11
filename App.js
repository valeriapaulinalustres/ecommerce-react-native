
import { useFonts } from 'expo-font';
import { useState, useEffect } from 'react';
import Navigator from './src/Navigation/Navigator';
import { Provider } from 'react-redux';
import store from './src/Store/store';
import { dropTableSessions, init } from './src/SQLite';

export default function App() {

  useEffect(()=> {
    init()
      .then((result)=> {
        console.log('Db initialized/dropped')
        console.log(result);
      })
      .catch(err => {
        console.log("Initialization DB failed:");
        console.log(err.message);
    })
  }, [])
  

  const [fontsLoaded] = useFonts({
    'Josefin': require('./src/Assets/Fonts/Josefin_Sans/JosefinSans-Regular.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }
  //Acá se manejará el estado para seleccionar una category y un producto

  return (
    <Provider store={store}>

<Navigator />
    </Provider>
  );
}


