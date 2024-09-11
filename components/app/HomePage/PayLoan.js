import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ModalSelector from 'react-native-modal-selector';
import { handleLoanPayment } from '../api'; // Import API function

const PayLoan = () => {
  const navigation = useNavigation();

  const [paymentOption, setPaymentOption] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amountToBePaid, setAmountToBePaid] = useState('');

  const balance = "₱10,000.00"; // Static balance

  // Payment options data
  const paymentOptions = [
    { key: 'Bank', label: 'Bank' },
    { key: 'Gcash', label: 'Gcash' },
  ];

  // Update account number based on the selected payment option
  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option.key);
    setAccountNumber(option.key === 'Bank' ? '00123' : '09123');
  };

  const handleSubmit = async () => {
    if (!paymentOption || !amountToBePaid) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    // Confirm payment details
    Alert.alert(
      'Confirm Payment',
      `Balance: ${balance}\nPayment Option: ${paymentOption}\nAccount Name: 5KI\nAccount Number: ${accountNumber}\nAmount to be Paid: ₱${parseFloat(amountToBePaid).toFixed(2)}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: async () => {
          try {
            const paymentData = {
              paymentOption,
              accountNumber,
              amountToBePaid: parseFloat(amountToBePaid),
            };

            // Call API to handle loan payment
            const result = await handleLoanPayment(paymentData);
            console.log('Payment response:', result);
            Alert.alert('Success', 'Payment recorded successfully');
            navigation.goBack();

            // Reset form fields
            setPaymentOption('');
            setAccountNumber('');
            setAmountToBePaid('');
          } catch (error) {
            console.error('Error during payment submission:', error);
            Alert.alert('Error', 'Error recording payment');
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

      {/* Content of the PayLoan screen */}
      <View style={styles.content}>
        <Text style={styles.title}>Pay Loan</Text>

        {/* Payment options */}
        <Text style={styles.label}>Payment Option</Text>
        <ModalSelector
          data={paymentOptions}
          initValue="Select Payment Option"
          onChange={handlePaymentOptionChange}
          style={styles.picker}
        >
          <Text>{paymentOption || 'Select Payment Option'}</Text>
        </ModalSelector>

        {/* Fixed Account Name */}
        <Text style={styles.label}>Account Name</Text>
        <TextInput
          value="5KI" // Fixed value
          style={[styles.input, styles.fixedInput]}
          editable={false}
        />

        {/* Dynamic Account Number based on Payment Option */}
        <Text style={styles.label}>Account Number</Text>
        <TextInput
          value={accountNumber} // Dynamic account number
          style={[styles.input, styles.fixedInput]}
          editable={false}
        />

        {/* Amount to be paid */}
        <Text style={styles.label}>Amount to be Paid</Text>
        <TextInput
          placeholder="Enter Amount"
          value={amountToBePaid}
          onChangeText={setAmountToBePaid}
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
});

export default PayLoan;
