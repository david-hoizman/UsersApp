
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import User from './components/user';
import PressView from './components/PressView';





export default function App() {
  return (
    <View style={styles.container}>    
        
      
      <User/>
      <PressView/>
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

// 
