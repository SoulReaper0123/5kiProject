import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Alert, ScrollView, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ModalSelector from 'react-native-modal-selector';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ3zbwPmmHOhXqrDmZdXLxji2YDz6pA70",
  authDomain: "kiproject-473c7.firebaseapp.com",
  databaseURL: "https://kiproject-473c7-default-rtdb.firebaseio.com",
  projectId: "kiproject-473c7",
  storageBucket: "kiproject-473c7.appspot.com",
  messagingSenderId: "1076185240028",
  appId: "1:1076185240028:web:076fe1ff0817e75f9a3f19",
  measurementId: "G-8XKTQDNB76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const RegisterPage2 = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [validId, setValidId] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Member'); // Default to "Member"

  const {
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
    dateOfBirth,
  } = route.params;

  const handleSelectValidId = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setValidId(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting valid ID:', error);
      Alert.alert('Error', 'Failed to select valid ID');
    }
  };

  const handleTakeSelfie = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setSelfie(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking selfie:', error);
      Alert.alert('Error', 'Failed to take selfie');
    }
  };

  const uploadImageToFirebase = async (uri, folder) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileName = uri.split('/').pop();
      const storageRef = ref(storage, `${folder}/${fileName}`);
      await uploadBytes(storageRef, blob);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error('Image upload failed:', error);
      Alert.alert('Error', 'Failed to upload image');
      return null;
    }
  };

  const handleRegister = async () => {
    if (!validId || !selfie) {
      Alert.alert('Error', 'Please provide both a valid ID and a selfie');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Send registration data to the server
      const formData = {
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
        dateOfBirth,
        status,  // Add status (Member or Non-member)
      };

      const response = await axios.post('http://10.0.0.49:3000/register', formData);

      if (response.data.status === 'ok') {
        // Step 2: Upload images to Firebase
        const validIdUrl = await uploadImageToFirebase(validId, 'validIds');
        const selfieUrl = await uploadImageToFirebase(selfie, 'selfies');

        if (!validIdUrl || !selfieUrl) {
          Alert.alert('Error', 'Failed to upload images');
          setLoading(false);
          return;
        }

        // Step 3: Send image URLs to the server
        await axios.post('http://10.0.0.49:3000/updateImages', {
          email,
          validId: validIdUrl,
          selfie: selfieUrl,
        });

        setLoading(false);
        Alert.alert('Success', 'Registration successful');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Failed to register user');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'An error occurred during registration');
      setLoading(false);
    }
  };

  const statusOptions = [
    { key: 'Member', label: 'Member' },
    { key: 'Non-member', label: 'Non-member' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{'< Back'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Complete Registration</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Register as:</Text>
        <ModalSelector
          data={statusOptions}
          initValue={status}
          onChange={(option) => setStatus(option.key)}
          style={styles.picker}
        >
          <Text>{status}</Text>
        </ModalSelector>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Valid ID Photo</Text>
        <View style={styles.imagePreviewContainer}>
          {validId ? (
            <Image source={{ uri: validId }} style={styles.imagePreview} />
          ) : (
            <Icon name="photo" size={100} color="#ccc" />
          )}
        </View>
        <TouchableOpacity onPress={handleSelectValidId} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>{validId ? 'Change Valid ID' : 'Upload Valid ID'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Selfie</Text>
        <View style={styles.imagePreviewContainer}>
          {selfie ? (
            <Image source={{ uri: selfie }} style={styles.imagePreview} />
          ) : (
            <Icon name="photo-camera" size={100} color="#ccc" />
          )}
        </View>
        <TouchableOpacity onPress={handleTakeSelfie} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>{selfie ? 'Change Selfie' : 'Take Selfie'}</Text>
        </TouchableOpacity>
      </View>

      <Button title={loading ? 'Registering...' : 'Register'} onPress={handleRegister} disabled={loading} />
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
  section: {
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
  },
  imagePreviewContainer: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RegisterPage2;
