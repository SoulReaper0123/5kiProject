// AppNav.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'; // Add this import
import { createDrawerNavigator } from '@react-navigation/drawer';
import Splashscreen from '../app/Splashscreen';
import AppLoginPage from '../app/AppLoginPage';
import RegisterPage from '../app/RegisterPage';
import AppHome from '../app/AppHome';

const Stack = createNativeStackNavigator();

const AppNav = () => {
  return (
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splashscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={AppLoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={AppHome}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

export default AppNav;
