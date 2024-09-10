import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Alert, View, Button } from 'react-native';
import Splashscreen from '../app/Splashscreen';
import AppLoginPage from '../app/AppLoginPage';
import RegisterPage from '../app/RegisterPage';
import RegisterPage2 from '../app/RegisterPage2';
import AppHome from '../app/AppHome';
import ProfileScreen from '../app/Drawer/Profile';
import Terms from '../app/Drawer/Terms';
import Privacy from '../app/Drawer/Privacy';
import ApplyLoan from '../app/HomePage/ApplyLoan';
import PayLoan from '../app/HomePage/PayLoan';
import Deposit from '../app/HomePage/Deposit';
import Withdraw from '../app/HomePage/Withdraw';
import Transactions from '../app/HomePage/Transactions';
import ExistingLoan from '../app/HomePage/ExistingLoan';

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
    <Drawer.Screen name="Home Page" component={AppHome} />
    <Drawer.Screen name="Account Management" component={ProfileScreen} />
    <Drawer.Screen name="Terms and Conditions" component={Terms} />
    <Drawer.Screen name="Privacy Policy" component={Privacy} />
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
    <Stack.Screen
      name="ApplyLoan"
      component={ApplyLoan}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="PayLoan"
      component={PayLoan}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ExistingLoan"
      component={ExistingLoan}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Deposit"
      component={Deposit}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Withdraw"
      component={Withdraw}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Transactions"
      component={Transactions}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AppNav;
