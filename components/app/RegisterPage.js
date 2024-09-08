import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalSelector from 'react-native-modal-selector';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [civilStatus, setCivilStatus] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();

  const middleNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const emailInput = useRef(null);
  const phoneNumberInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const addressInput = useRef(null);
  const placeOfBirthInput = useRef(null);

  useEffect(() => {
    if (dateOfBirth) {
      const currentYear = new Date().getFullYear();
      const birthYear = dateOfBirth.getFullYear();
      setAge(currentYear - birthYear);
    }
  }, [dateOfBirth]);

  const handleNext = () => {
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword || !gender || !civilStatus || !placeOfBirth || !address) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password should be at least 8 characters long');
      return;
    }

    if (!email.includes('@') || !email.endsWith('.com')) {
      Alert.alert('Error', 'Email should be in the format example@domain.com');
      return;
    }

    if (phoneNumber.length < 11) {
      Alert.alert('Error', 'Phone number should be at least 11 digits');
      return;
    }

    const dateOfBirthISO = dateOfBirth.toISOString();

    navigation.navigate('Register2', {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      password,
      gender,
      civilStatus,
      placeOfBirth,
      address,
      age,
      dateOfBirth: dateOfBirthISO
    });
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  const handlePhoneNumberChange = (text) => {
    if (text.length <= 11) {
      setPhoneNumber(text);
    }
  };

  const handleSubmitEditing = (nextInputRef) => {
    nextInputRef.current?.focus();
  };

  const handleLastInputSubmit = () => {
    Keyboard.dismiss();
    handleNext();
  };

  const genderOptions = [
    { key: 'Male', label: 'Male' },
    { key: 'Female', label: 'Female' },
    { key: 'Prefer Not To Say', label: 'Prefer not to say' },
  ];

  const civilStatusOptions = [
    { key: 'Single', label: 'Single' },
    { key: 'Married', label: 'Married' },
    { key: 'Widowed', label: 'Widowed' },
    { key: 'Separated', label: 'Separated' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Register</Text>

      <Text style={styles.label}>First Name</Text>
      <TextInput
        placeholder="Enter First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        returnKeyType="next"
        onSubmitEditing={() => middleNameInput.current?.focus()}
      />

      <Text style={styles.label}>Middle Name</Text>
      <TextInput
        placeholder="Enter Middle Name"
        value={middleName}
        onChangeText={setMiddleName}
        style={styles.input}
        returnKeyType="next"
        ref={middleNameInput}
        onSubmitEditing={() => lastNameInput.current?.focus()}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        placeholder="Enter Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
        returnKeyType="next"
        ref={lastNameInput}
        onSubmitEditing={() => placeOfBirthInput.current?.focus()}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        placeholder="Enter Age"
        value={age.toString()}
        onChangeText={text => setAge(text)}
        style={styles.input}
        keyboardType="numeric"
        editable={false}
      />

      <Text style={styles.label}>Gender</Text>
      <ModalSelector
        data={genderOptions}
        initValue="Select Gender"
        onChange={(option) => setGender(option.key)}
        style={styles.picker}
      >
        <Text>{gender || 'Select Gender'}</Text>
      </ModalSelector>

      <Text style={styles.label}>Date of Birth</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text>{dateOfBirth.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dateOfBirth}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Place of Birth</Text>
      <TextInput
        placeholder="Enter Place of Birth"
        value={placeOfBirth}
        onChangeText={setPlaceOfBirth}
        style={styles.input}
        returnKeyType="next"
        ref={placeOfBirthInput}
        onSubmitEditing={() => addressInput.current?.focus()}
      />

      <Text style={styles.label}>Current Address</Text>
      <TextInput
        placeholder="Enter Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
        returnKeyType="next"
        ref={addressInput}
        onSubmitEditing={() => emailInput.current?.focus()}
      />

      <Text style={styles.label}>Civil Status</Text>
      <ModalSelector
        data={civilStatusOptions}
        initValue="Select Civil Status"
        onChange={(option) => setCivilStatus(option.key)}
        style={styles.picker}
      >
        <Text>{civilStatus || 'Select Civil Status'}</Text>
      </ModalSelector>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        returnKeyType="next"
        ref={emailInput}
        onSubmitEditing={() => phoneNumberInput.current?.focus()}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        placeholder="Enter Phone Number"
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        style={styles.input}
        keyboardType="numeric"
        returnKeyType="next"
        ref={phoneNumberInput}
        onSubmitEditing={() => passwordInput.current?.focus()}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={true}
        returnKeyType="next"
        ref={passwordInput}
        onSubmitEditing={() => confirmPasswordInput.current?.focus()}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry={true}
        returnKeyType="done"
        ref={confirmPasswordInput}
        onSubmitEditing={handleLastInputSubmit}
      />

      <Button title="Next" onPress={handleNext} />
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
  backButtonText: {
    color: 'blue',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
  },
});

export default RegisterPage;
