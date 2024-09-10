import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ModalSelector from 'react-native-modal-selector';

const ApplyLoan = () => {
  const navigation = useNavigation();

  const [loanAmount, setLoanAmount] = useState('');
  const [term, setTerm] = useState('');
  const [disbursement, setDisbursement] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const termInput = useRef(null);
  const disbursementInput = useRef(null);
  const accountNameInput = useRef(null);
  const accountNumberInput = useRef(null);

  const termsOptions = [
    { key: '3', label: '3 Months' },
    { key: '6', label: '6 Months' },
    { key: '9', label: '9 Months' },
    { key: '12', label: '12 Months' },
  ];

  const disbursementOptions = [
    { key: 'Gcash', label: 'Gcash' },
    { key: 'Bank', label: 'Bank' },
  ];

  const handleSubmit = () => {
    if (!loanAmount || !term || !disbursement || !accountName || !accountNumber) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const processingFee = 100;
    const formattedLoanAmount = parseFloat(loanAmount).toFixed(2);
    const releaseAmount = (parseFloat(loanAmount) - processingFee).toFixed(2);

    Alert.alert(
      'Confirm Loan Application?',
      `Loan Amount: ₱${formattedLoanAmount}\nTerms: ${term} Months\nDisbursement: ${disbursement}\nAccount Name: ${accountName}\nAccount Number: ${accountNumber}\nProcessing Fee: ₱100.00\nRelease Amount: ₱${releaseAmount}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => console.log('Application Submitted') }
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

      {/* Content of the ApplyLoan screen */}
      <View style={styles.content}>
        <Text style={styles.title}>Apply for a Loan</Text>

        <Text style={styles.label}>Loan Amount</Text>
        <TextInput
          placeholder="Enter Loan Amount"
          value={loanAmount}
          onChangeText={setLoanAmount}
          style={styles.input}
          keyboardType="numeric"
          returnKeyType="next"
          onSubmitEditing={() => termInput.current?.focus()}
        />

        <Text style={styles.label}>Terms</Text>
        <ModalSelector
          data={termsOptions}
          initValue="Select Term"
          onChange={(option) => setTerm(option.key)}
          style={styles.picker}
        >
          <Text>{term || 'Select Term'}</Text>
        </ModalSelector>

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
            handleSubmit(); // Trigger the submit function
          }}
        />

        <Text style={styles.label}>Processing Fee</Text>
        <TextInput
          placeholder="Processing Fee"
          value="100.00" // Fixed fee
          style={[styles.input, styles.fixedInput]}
          editable={false}
        />

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
});

export default ApplyLoan;
