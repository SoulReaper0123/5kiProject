import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; // For image picking
import firebase from 'firebase/app';
import 'firebase/storage'; // Import Firebase storage

const Profile = () => {
  const navigation = useNavigation();
  const [profilePic, setProfilePic] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: 'John Doe',
    birthday: '01/01/1990',
    email: 'john.doe@example.com',
    address: '123 Main St, City, Country',
    contactNumber: '+1234567890',
  });

  const pickImage = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need permission to access your media library');
      return;
    }

    // Pick an image from the media library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePic(result.uri);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = firebase.storage().ref();
    const profilePicRef = storageRef.child('profile_pics/' + new Date().toISOString());

    try {
      await profilePicRef.put(blob);
      const downloadURL = await profilePicRef.getDownloadURL();
      console.log('File available at', downloadURL);
      // Save the download URL to the user's profile in the database if needed
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.profileImage} />
          ) : (
            <MaterialIcons name="account-circle" size={100} color="#ccc" />
          )}
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.detail}>{userDetails.name}</Text>
          <Text style={styles.label}>Birthday:</Text>
          <Text style={styles.detail}>{userDetails.birthday}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.detail}>{userDetails.email}</Text>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.detail}>{userDetails.address}</Text>
          <Text style={styles.label}>Contact Number:</Text>
          <Text style={styles.detail}>{userDetails.contactNumber}</Text>
        </View>
      </ScrollView>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Go back to the previous screen
      >
        <MaterialIcons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  detailsContainer: {
    width: '100%',
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  backButton: {
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
});

export default Profile;
