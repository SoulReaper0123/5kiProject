import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ModalSelector from 'react-native-modal-selector';
import { handleDeposit } from '../api'; // Import the API function

const Deposit = () => {
  const navigation = useNavigation();

  const [depositOption, setDepositOption] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amountToBeDeposited, setAmountToBeDeposited] = useState('');

  const balance = "₱15,000.00"; // Static balance

  // Deposit options data
  const depositOptions = [
    { key: 'Bank', label: 'Bank' },
    { key: 'Gcash', label: 'Gcash' },
  ];

  // Update account number based on the selected deposit option
  const handleDepositOptionChange = (option) => {
    setDepositOption(option.key);
    setAccountNumber(option.key === 'Bank' ? '00123' : '09123');
  };

  const handleSubmit = async () => {
    if (!depositOption || !amountToBeDeposited) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    Alert.alert(
      'Confirm Deposit',
      `Balance: ${balance}\nDeposit Option: ${depositOption}\nAccount Name: 5KI\nAccount Number: ${accountNumber}\nAmount to be Deposited: ₱${parseFloat(amountToBeDeposited).toFixed(2)}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: async () => {
          try {
            const depositData = {
              depositOption,
              accountNumber,
              amountToBeDeposited: parseFloat(amountToBeDeposited),
            };

            // Call API to handle deposit
            const result = await handleDeposit(depositData);
            console.log('Deposit response:', result);
            Alert.alert('Success', 'Deposit recorded successfully');

            // Reset form fields
            setDepositOption('');
            setAccountNumber('');
            setAmountToBeDeposited('');
          } catch (error) {
            console.error('Error during deposit submission:', error);
            Alert.alert('Error', 'Error recording deposit');
          }
        } },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      {/* Content of the Deposit screen */}
      <View style={styles.content}>
        <Text style={styles.title}>Deposit</Text>

        {/* Display the balance */}
        <Text style={styles.label}>Balance</Text>
        <Text style={styles.balanceText}>{balance}</Text>

        {/* Deposit options */}
        <Text style={styles.label}>Deposit Option</Text>
        <ModalSelector
          data={depositOptions}
          initValue="Select Deposit Option"
          onChange={handleDepositOptionChange}
          style={styles.picker}
        >
          <Text>{depositOption || 'Select Deposit Option'}</Text>
        </ModalSelector>

        {/* Fixed Account Name */}
        <Text style={styles.label}>Account Name</Text>
        <TextInput
          value="5KI" // Fixed value
          style={[styles.input, styles.fixedInput]}
          editable={false}
        />

        {/* Dynamic Account Number based on Deposit Option */}
        <Text style={styles.label}>Account Number</Text>
        <TextInput
          value={accountNumber} // Dynamic account number
          style={[styles.input, styles.fixedInput]}
          editable={false}
        />

        {/* Amount to be deposited */}
        <Text style={styles.label}>Amount to be Deposited</Text>
        <TextInput
          placeholder="Enter Amount"
          value={amountToBeDeposited}
          onChangeText={setAmountToBeDeposited}
          style={styles.input}
          keyboardType="numeric"
        />

        {/* Submit Button */}
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start',
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    width: '100%',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    width: '100%',
  },
  fixedInput: {
    backgroundColor: '#f5f5f5',
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default Deposit;
