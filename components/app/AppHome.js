// AppHome.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AppHome = () => {
  const [balance, setBalance] = useState(1234.56); // Example balance
  const navigation = useNavigation();

  // Function to format balance as pesos
  const formatBalance = (amount) => {
    return `₱${amount.toFixed(2)}`; // Use the pesos symbol and format to 2 decimal places
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.openDrawer()} // Open drawer on press
      >
        <MaterialIcons name="menu" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.text}>Mobile Home Page</Text>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Balance:</Text>
        <Text style={styles.balanceAmount}>{formatBalance(balance)}</Text>
      </View>

      <View style={styles.iconGrid}>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconContainer}>
            <MaterialIcons name="credit-card" size={30} color="black" />
            <Text style={styles.iconText}>Apply Loan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <MaterialIcons name="payment" size={30} color="black" />
            <Text style={styles.iconText}>Pay Loan</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconContainer}>
            <MaterialIcons name="add-box" size={30} color="black" />
            <Text style={styles.iconText}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <MaterialIcons name="remove-circle" size={30} color="black" />
            <Text style={styles.iconText}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <MaterialIcons name="history" size={30} color="black" />
            <Text style={styles.iconText}>Transactions</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.iconContainer}>
          <MaterialIcons name="folder-open" size={30} color="black" />
          <Text style={styles.iconText}>Existing Loans</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  iconButton: {
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
    textAlign: 'center',
    marginVertical: 20,
  },
  balanceContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  iconGrid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AppHome;
