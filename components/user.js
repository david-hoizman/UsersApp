import React from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import data from '../.expo/data';


export default function User() {
  
  users_display = []
  const addRow = (user, index) => {
    users_display.push(
      <View  key={index} style={styles.row}>
        <Text style={[styles.text, {width: "13%"}]}>{user.firstName}</Text>
        <Text style={[styles.text, {width: "13%"}]}>{user.lastName}</Text>
        <Text style={[styles.text, {width: "26%"}]}>{user.email}</Text>
        <Text style={[styles.text, {width: "22%"}]}>{user.phonNumber}</Text>
        <Text style={[styles.text, {width: "13%"}]}>{user.role}</Text>
        <Text style={[styles.text, {width: "13%"}]}></Text>
      </View>
    );
}
  data.forEach(addRow);

  return (
    <View style={styles.container } >
      <View style={styles.header}>
        <Text style={[styles.textheader, {width: "13%"}]}>First Name</Text>
        <Text style={[styles.textheader, {width: "13%"}]}>Last Name</Text>
        <Text style={[styles.textheader, {width: "26%"}]}>Email</Text>
        <Text style={[styles.textheader, {width: "22%"}]}>Phon Number</Text>
        <Text style={[styles.textheader, {width: "13%"}]}>Role</Text>
        <Text style={[styles.textheader, {width: "13%"}]}></Text>
      </View>
    
      {users_display}
    </View>
  );
}


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100"
     
  },
  textheader: {
    padding:8,
    backgroundColor: "orange",
    borderWidth:2,
    borderColor:"blue",
    fontSize:10,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: 'MyExtraBoldFont',
    fontWeight: '900',
    color: 'black',
    backgroundColor: 'yellow'
  },
  row: {
    flexDirection: "row",
    width: "100"

  },
  text: {
    padding:8,
    backgroundColor: "orange",
    borderWidth:2,
    borderColor:"blue",
    fontSize:10,
    textAlign: "center",
    textAlignVertical: "center",
    
    
  },
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
