/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
    MD3LightTheme as DefaultTheme,
   Provider as PaperProvider } from 'react-native-paper';
import Home from './screens/Home';
import DetailMovie from './screens/DetailMovie';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons' 
import { darkGray } from './css/ThemeColor';


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

class App extends React.Component {
  render(): JSX.Element {

    return (
      <PaperProvider 
      theme={theme}
      settings={{
        icon: props => <MaterialIcons {...props} />,
      }}
      >
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen
              name="test"
              component={test}

            /> */}
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

}



export default App;
