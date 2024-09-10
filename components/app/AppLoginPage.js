import React, { useState, useEffect } from 'react';  // Import useEffect
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Dimensions, BackHandler } from 'react-native';  // Import BackHandler
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';  // Import vector icons

const { width } = Dimensions.get('window');  // Get screen width for responsiveness

export default function AppLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);  // State for toggling password visibility
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      // Use BackHandler to exit the app when the back button is pressed
      BackHandler.exitApp();
      return true; // Return true to prevent the default behavior
    };
  
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  
    return () => backHandler.remove();  // Cleanup the event listener on unmount
  }, []);
  
  const handleLogin = () => {
    console.log('Login button pressed');
    navigation.navigate('DrawerNav'); // Navigate to the DrawerNav
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword'); // Navigate to the Forgot Password page
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile Login Page</Text>

      {/* Email Label and Input */}
      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password Label and Input with Eye Icon */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <Icon name="lock" size={24} color="#666" style={styles.icon} />
        <TextInput
          placeholder="Enter Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Icon name={isPasswordVisible ? 'eye' : 'eye-slash'} size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    width: width * 0.9,  // Adjust width based on screen size
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    width: width * 0.9, 
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10, // Reduced margin to make space for the forgot password link
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  eyeIcon: {
    paddingHorizontal: 15,
  },
  icon: {
    paddingHorizontal: 15,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
    width: width * 0.9, 
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',  // Align to the right
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderColor: '#007AFF',
    borderWidth: 2,
    width: width * 0.9, 
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
