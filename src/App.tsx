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
  Provider as PaperProvider
} from 'react-native-paper';
import Home from './screens/Home';
import DetailMovie from './screens/DetailMovie';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { darkGray } from './css/ThemeColor';

import auth from '@react-native-firebase/auth'
import {  GoogleService } from './services/Auth/google';
import Connexion from './screens/Connexion';
import { UserService } from './services/User/user.service';
import SplashScreen from 'react-native-lottie-splash-screen';

GoogleService.googleConfiguration()

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

const App = () => {
  const [userConnected, setUserConndected]: [any, any] = useState(false)
  useEffect(() => {
    SplashScreen.hide(); // here
  }, []);


  // Handle user state changes
  async function onAuthStateChanged(user: any) {    
    user ?  setUserConndected(true) : setUserConndected(false)          
    await UserService.setUser(user)
  }



  useEffect(() => {
  // const t =  auth().onAuthStateChanged(onAuthStateChanged);
  auth().onUserChanged(onAuthStateChanged)
  
  }, [true]);

  return (
    <PaperProvider
      theme={theme}
      settings={{
        icon: props => <MaterialIcons {...props} />,
      }}
    >
      <NavigationContainer>
        {userConnected ?
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}


            />
            <Stack.Screen
              name="DetailMovie"
              component={DetailMovie}
              options={{ headerShown: false }}

            />
            <Stack.Screen
              name="Connexion"
              component={Connexion}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          :
          <Stack.Navigator>
            <Stack.Screen
              name="Connexion"
              component={Connexion}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        }
      </NavigationContainer>

    </PaperProvider>

  )
}





export default App;
