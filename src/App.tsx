/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    MD3LightTheme as DefaultTheme,
   Provider as PaperProvider } from 'react-native-paper';
import Home from './screens/Home';
import DetailMovie from './screens/DetailMovie';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons' 
import { darkGray } from './css/ThemeColor';
import Start from './screens/Start';

import auth from '@react-native-firebase/auth';
import { googleConfiguration, googleLogin } from './services/Auth/google';
import Connexion from './screens/Connexion';
import { setUser } from './services/User/user.service';

googleConfiguration()

const Stack = createNativeStackNavigator();
const theme = {
  ...DefaultTheme,
  // Specify custom property
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    "primary": "#1460A5",
    "onPrimary": "#FFFFFF",
    "primaryContainer": "#D3E4FF",
    "onPrimaryContainer": "#001C38",
    "secondary": "#fff",
    "onSecondary": darkGray,
    "secondaryContainer": darkGray,
    "onSecondaryContainer": "#fff",
    "tertiary": "#006D3C",
    "onTertiary": "#FFFFFF",
    "tertiaryContainer": "#98F7B6",
    "onTertiaryContainer": "#00210E",
    "error": "#BA1A1A",
    "onError": "#FFFFFF",
    "errorContainer": "#FFDAD6",
    "onErrorContainer": "#410002",
    
  }

};

const App = ()  =>  {

  // const [user, setUser] = useState(undefined);

  // Handle user state changes
  function onAuthStateChanged(user:any) {
    setUser(user)
    // setUser(usert);
  }



  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    

    
  }, [true]);



    return (
      <PaperProvider 
      theme={theme}
      settings={{
        icon: props => <MaterialIcons {...props} />,
      }}
      >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Start"
              component={Start}
              options={{headerShown:false}}
            
            />
            <Stack.Screen
              name="Connexion"
              component={Connexion}
              options={{headerShown:false}}
              // initialParams={}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown:false}}

            />
            <Stack.Screen
              name="DetailMovie"
              component={DetailMovie}
              options={{headerShown:false}}

            />
          </Stack.Navigator>
        </NavigationContainer>

      </PaperProvider>

    )
  }





export default App;
