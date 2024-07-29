import React from 'react';
import { StyleSheet, Text, View,FlatList } from 'react-native';
import data from '../.expo/data';


// user.+" "+user.lastName+" "+user.email+" "+user.phonNumber+" "+user.role}</Text>


export default function User() {
  const header = ["firstName", "lastName", "email", "phonNumber", "role"]
  const ListHeader = () => {
    return (
      <View style={styles.header}>
        {header.map((item) => <Text style={styles.textheader}>{item}</Text>)}
      </View>
    );
  };
  users_display = []
  const addRow = (user, index) => {
    users_display.push(
      <View  key={index} style={styles.row}>
        <Text style={styles.text1}>{user.firstName}</Text>
        <Text style={styles.text2}>{user.lastName}</Text>
        <Text style={styles.text3}>{user.email}</Text>
        <Text style={styles.text4}>{user.phonNumber}</Text>
        <Text style={styles.text5}>{user.role}</Text>
{/* <bu
tton></button> */}
      </View>
    );
}
  data.forEach(addRow);

  return (
    <View style={styles.container}>
      <ListHeader/>
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
    width:"20%",
    fontFamily: 'MyExtraBoldFont',
    fontWeight: '900',
    color: 'black',
    backgroundColor: 'yellow'
    // fontWeight: 'bold'
  },
  row: {
    flexDirection: "row",
    width: "100"

  },
  text1: {
    padding:8,
    backgroundColor: "orange",
    borderWidth:2,
    borderColor:"blue",
    fontSize:10,
    textAlign: "center",
    textAlignVertical: "center",
    width:"20%"
    
  },
  text2: {
    padding:8,
    backgroundColor: "orange",
    borderWidth:2,
    borderColor:"blue",
    fontSize:10,
    textAlign: "center",
    textAlignVertical: "center",
    width:"20%"
  },
  text3: {
    padding:8,
    backgroundColor: "orange",
    borderWidth:2,
    borderColor:"blue",
    fontSize:10,
    textAlign: "center",
    textAlignVertical: "center",
    width:"20%"
  },
  text4: {
    padding:8,
    backgroundColor: "orange",
    borderWidth:2,
    borderColor:"blue",
    fontSize:10,
    textAlign: "center",
    textAlignVertical: "center",
    width:"20%"
  },
  text5: {
    padding:8,
    backgroundColor: "orange",
    borderWidth:2,
    borderColor:"blue",
    fontSize:10,
    textAlign: "center",
    textAlignVertical: "center",
    width:"20%"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
