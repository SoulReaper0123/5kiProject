import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Alert, View, Button } from 'react-native';
import Splashscreen from '../app/Splashscreen';
import AppLoginPage from '../app/AppLoginPage';
import RegisterPage from '../app/RegisterPage';
import RegisterPage2 from '../app/RegisterPage2';
import AppHome from '../app/AppHome';
import ProfileScreen from '../app/Profile';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { navigation } = props;

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // Perform any logout logic here (e.g., clearing tokens, etc.)
            
            // Navigate to the Login Page
            navigation.navigate('Login');
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={{ padding: 16 }}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerShown: false, // Optional: Hide header for all drawer screens
    }}
  >
    <Drawer.Screen name="Home" component={AppHome} />
    <Drawer.Screen name="Profile" component={ProfileScreen} />
  </Drawer.Navigator>
);

const AppNav = () => (
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
      name="Register2"
      component={RegisterPage2}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="DrawerNav"
      component={DrawerNavigator}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AppNav;
