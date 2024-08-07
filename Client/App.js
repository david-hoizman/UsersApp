import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import User from './components/user';

/**
 * Main application component.
 * 
 * This component is the root of the application. It renders the `User` component
 * within a styled container.
 * 
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
export default function App() {
  return (
    <View style={styles.container}>    
      <User/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center', 
    justifyContent: 'center', 
  },
});
