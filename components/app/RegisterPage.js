import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ModalSelector from 'react-native-modal-selector'; // Use this for alternative picker

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

  useEffect(() => {
    if (dateOfBirth) {
      const currentYear = new Date().getFullYear();
      const birthYear = dateOfBirth.getFullYear();
      setAge(currentYear - birthYear);
    }
  }, [dateOfBirth]);

  const handleNext = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Invalid email address');
      return;
    }

    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Phone number should be at least 10 digits');
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
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
      />

      <Text style={styles.label}>Middle Name</Text>
      <TextInput
        placeholder="Middle Name"
        value={middleName}
        onChangeText={setMiddleName}
        style={styles.input}
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        placeholder="Enter Age"
        value={age.toString()}
        onChangeText={text => setAge(text)}
        style={styles.input}
        keyboardType="numeric"
        editable={false} // Prevent manual editing of age
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
        placeholder="Place of Birth"
        value={placeOfBirth}
        onChangeText={setPlaceOfBirth}
        style={styles.input}
      />

      <Text style={styles.label}>Current Address</Text>
      <TextInput
        placeholder="Enter Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
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
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={true}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry={true}
      />

      <Button title="Next" onPress={handleNext} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
    padding: 10,
  },
});

export default RegisterPage;
