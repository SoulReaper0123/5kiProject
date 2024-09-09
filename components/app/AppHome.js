// AppHome.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AppHome = () => {
  const [balance, setBalance] = useState(1234.56); // Example balance
  const navigation = useNavigation();

  // Function to format balance as pesos
  const formatBalance = (amount) => `₱${amount.toFixed(2)}`;

  return (
    <View style={styles.container}>
      {/* Button to open the drawer */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.openDrawer()}
      >
        <MaterialIcons name="account-circle" size={30} color="black" />
      </TouchableOpacity>

      {/* Welcome text */}
      <Text style={styles.text}>Welcome! NOW GOODBYE!</Text>

      {/* Balance display */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Balance:</Text>
        <Text style={styles.balanceAmount}>{formatBalance(balance)}</Text>
      </View>

      {/* Icon grid */}
      <View style={styles.iconGrid}>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconContainer}
           onPress={() => navigation.navigate('ApplyLoan')}>
            <MaterialIcons name="credit-card" size={30} color="black" />
            <Text style={styles.iconText}>Apply Loan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}
          onPress={() => navigation.navigate('PayLoan')}>
            <MaterialIcons name="payment" size={30} color="black" />
            <Text style={styles.iconText}>Pay Loan</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconContainer}
          onPress={() => navigation.navigate('Deposit')}>
            <MaterialIcons name="add-box" size={30} color="black" />
            <Text style={styles.iconText}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}
          onPress={() => navigation.navigate('Withdraw')}>
            <MaterialIcons name="remove-circle" size={30} color="black" />
            <Text style={styles.iconText}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}
          onPress={() => navigation.navigate('Transactions')}>
            <MaterialIcons name="history" size={30} color="black" />
            <Text style={styles.iconText}>Transactions</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('ExistingLoan')}>
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
    borderRadius: 25, // Make it circular
    width: 50,
    height: 50,
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
