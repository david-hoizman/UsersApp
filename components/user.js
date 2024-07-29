import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import data from '../.expo/data';





export default function User() {
  users_display = []
  data.forEach((user, index) => {
    users_display.push(
      <View  key={index}>
        <Text>{user.firstName+" "+user.lastName+" "+user.email+" "+user.phonNumber+" "+user.role}</Text>
{/* <bu
tton></button> */}
      </View>
    );
});
  return (
    <View style={styles.container}>
      {/* headrs */}
      {users_display}
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
