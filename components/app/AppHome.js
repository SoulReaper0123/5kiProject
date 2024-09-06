import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AppHome = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer}>
        <MaterialIcons name="account-circle" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.text}>Mobile Home Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#f0f0f0', // Light grey background for the circle
    borderRadius: 25, // Half of the width/height to make it circular
    width: 50, // Width of the circle
    height: 50, // Height of the circle
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AppHome;
