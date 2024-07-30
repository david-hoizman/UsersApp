import React from 'react';
import { StyleSheet, Text, View, Modal, Pressable, ScrollView } from 'react-native';
import data from '../.expo/data';
import Image_ from './Image';
import { useState } from 'react'
import PressView from './PressAddUser';



export default function User() {
  const [isShow, setIsShow] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [users, setUsers] = useState(data)

    const onBtnPress = async (index) => {
        setUserToDelete(index)
        setIsShow(true)

    }

    const addUser = (user)=>{
      const temp = [...users]
      temp.push(user)
      setUsers(temp)
    }
    const onBtnDeletePress=()=>{
      if (userToDelete !== null){
        let d = users.filter((_, index) => index !== userToDelete)
        setUsers(d)
        setUserToDelete(null) 
        setIsShow(false)

      }


    }
  
  
  
  
  const addRow = (user, index) => {
    return(
      
      <View  key={index} style={styles.row}>
        
        <Text style={[styles.text, {width: "13%"}]}>{user.firstName}</Text>
        <Text style={[styles.text, {width: "13%"}]}>{user.lastName}</Text>
        <Text style={[styles.text, {width: "26%"}]}>{user.email}</Text>
        <Text style={[styles.text, {width: "22%"}]}>{user.phonNumber}</Text>
        <Text style={[styles.text, {width: "13%"}]}>{user.role}</Text>
        <View style={[styles.text, {width: "13%"}]}>
          <Modal visible={isShow} animationType='fade' transparent={true}>
          <ScrollView>
            <View style={styles.container}>
                <Text style={styles.delete_warning}>Are you sure you want to delete?</Text>
                <Pressable onPress={() => {
                  setIsShow(false)
                }} style={(data) => [styles.btn, {backgroundColor:"orange"}]}>
                  <View style={[styles.delete_window_btns]}>
                    <Text onPress={onBtnDeletePress} style={[styles.delete_btn_accept, styles.delete_btns]}>Yes I'm sure</Text>
                    <Text style={[styles.delete_btn_cancel,styles.delete_btns]}>cancel</Text>
                  </View>
                </Pressable>
            </View>
            </ScrollView>
          </Modal>
            <Pressable onPress={()=>onBtnPress(index)} style={(data) => [data.pressed && {opacity:0.5}, styles.imgBtn]}>
              <Image_  >

            </Image_ >
            </Pressable>
        </View>
      </View>
      
    );
  }
  users_display = users.map(addRow);

  return (
    
    <View style={styles.container} >
      <View style={styles.header}>
        <Text style={[styles.textheader, {width: "13%"}]}>First Name</Text>
        <Text style={[styles.textheader, {width: "13%"}]}>Last Name</Text>
        <Text style={[styles.textheader, {width: "26%"}]}>Email</Text>
        <Text style={[styles.textheader, {width: "22%"}]}>Phon Number</Text>
        <Text style={[styles.textheader, {width: "13%"}]}>Role</Text>
        <Text style={[styles.textheader, {width: "13%"}]}></Text>
      </View>
      
      <ScrollView>
      {users_display}
      </ScrollView>
      <PressView addUser={addUser}/>

    </View>
    
  );
}


const styles = StyleSheet.create({
  delete_btns:{
    padding:8,
    textAlign:"center",
    width:100,
    borderRadius: 14,
    marginTop:25,
  },
  delete_warning:{
    fontSize: 16

  },
  delete_btn_accept:{
    backgroundColor:"#1a73e8",
    color:"white",
    marginRight:18
  },
  delete_btn_cancel:{
    borderWidth:1,
    borderColor:"#1a73e8",
    marginLeft:18

  },
  imgBtn: {
    width:"66%", 
    height:4, 
    marginLeft:5
  },
  header: {
    flexDirection: "row",
    width: "100"
     
  },
  textheader: {
    padding:8,
    borderWidth:1,
    borderColor:"#6a99f787",
    fontSize:10,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: '900',
    color: 'black',
    backgroundColor: '#dae9e7',
  },
  row: {
    flexDirection: "row",
    width: "100"

  },
  text: {
    padding:8,
    borderWidth:1,
    borderColor:"#6a99f787",
    fontSize:10,
    textAlign: "center",
    textAlignVertical: "center",
    height: 40
    
    
  },
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:33
  },
  delete_window_btns:{
    flexDirection: "row",
    backgroundColor:'white'
  }
});
