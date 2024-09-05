import WebNav from '@/components/navigation/WebNav';
import AppNav from '@/components/navigation/AppNav';
import React from 'react';
import { Platform } from 'react-native';  // Import Platform

const App = () => {
  return (
    Platform.OS === 'web' ? <WebNav /> : <AppNav />
  );
};

export default App;

