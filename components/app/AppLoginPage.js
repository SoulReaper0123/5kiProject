// AppLoginPage.js
import React, { useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AppLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation(); // Get navigation object from hook

  const handleLogin = () => {
    console.log('Login button pressed');
    navigation.navigate('Home');
  };
  

  const handleRegister = () => {
    navigation.navigate('Register'); // Navigate to Register page
  };

  return (
    <View style={styles.container}>
      <Text>Mobile Login Page</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1, 
    margin: 10,
    width: 200,
    padding: 8,
  },
});
