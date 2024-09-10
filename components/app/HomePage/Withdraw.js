import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ModalSelector from 'react-native-modal-selector';

const Withdraw = () => {
  const navigation = useNavigation();

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [disbursement, setDisbursement] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState(5000.00); // Example balance

  const accountNameInput = useRef(null);
  const accountNumberInput = useRef(null);

  const disbursementOptions = [
    { key: 'Gcash', label: 'Gcash' },
    { key: 'Bank', label: 'Bank' },
  ];

  const handleWithdraw = () => {
    if (!withdrawAmount || !disbursement || !accountName || !accountNumber) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (parseFloat(withdrawAmount) > balance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }

    const formattedWithdrawAmount = parseFloat(withdrawAmount).toFixed(2);

    Alert.alert(
      'Confirm Withdrawal?',
      `Withdraw Amount: ₱${formattedWithdrawAmount}\nDisbursement: ${disbursement}\nAccount Name: ${accountName}\nAccount Number: ${accountNumber}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => console.log('Withdrawal Submitted') }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Go back to the previous screen
      >
        <MaterialIcons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      {/* Balance Display */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Available Balance: ₱{balance.toFixed(2)}</Text>
      </View>

      {/* Content of the Withdraw screen */}
      <View style={styles.content}>
        <Text style={styles.title}>Withdraw Funds</Text>

        <Text style={styles.label}>Withdraw Amount</Text>
        <TextInput
          placeholder="Enter Withdraw Amount"
          value={withdrawAmount}
          onChangeText={setWithdrawAmount}
          style={styles.input}
          keyboardType="numeric"
          returnKeyType="next"
          onSubmitEditing={() => accountNameInput.current?.focus()}
        />

        <Text style={styles.label}>Disbursement</Text>
        <ModalSelector
          data={disbursementOptions}
          initValue="Select Disbursement"
          onChange={(option) => setDisbursement(option.key)}
          style={styles.picker}
        >
          <Text>{disbursement || 'Select Disbursement'}</Text>
        </ModalSelector>

        <Text style={styles.label}>Account Name</Text>
        <TextInput
          placeholder="Enter Account Name"
          value={accountName}
          onChangeText={setAccountName}
          style={styles.input}
          returnKeyType="next"
          ref={accountNameInput}
          onSubmitEditing={() => accountNumberInput.current?.focus()}
        />

        <Text style={styles.label}>Account Number</Text>
        <TextInput
          placeholder="Enter Account Number"
          value={accountNumber}
          onChangeText={setAccountNumber}
          style={styles.input}
          keyboardType="numeric"
          returnKeyType="done"
          ref={accountNumberInput}
          onSubmitEditing={() => {
            Keyboard.dismiss(); // Dismiss the keyboard on submit
            handleWithdraw(); // Trigger the submit function
          }}
        />

        <Button title="Submit" onPress={handleWithdraw} />
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
    marginVertical: 20,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
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
});

export default Withdraw;
