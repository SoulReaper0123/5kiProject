import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ApplyLoan = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
        <Text style={styles.description}>
          Fill out the form below to apply for a loan.
        </Text>
        {/* Add your loan application form or content here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginVertical: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ApplyLoan;
