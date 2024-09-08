import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Splashscreen = () => {
  const navigation = useNavigation(); // Get navigation object from hook

  useEffect(() => {
    // Simulate loading for 3 seconds and then navigate to Login page
    const timer = setTimeout(() => {
      navigation.navigate('Login'); // Navigate to Login screen
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer when component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to 5KI</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default Splashscreen;
