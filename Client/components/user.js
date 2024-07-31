
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Pressable, ScrollView } from 'react-native';
import PressView from './PressAddUser';
import Image_ from './Image';
import {API_URL} from '../services/userService'

export default function User() {
  const [isShow, setIsShow] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from server when component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      // Refresh the user list after deletion
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const onBtnPress = async (index) => {
    setUserToDelete(index);
    setIsShow(true);
  };

  const addUser = async (user) => {
    try {
      // const response = await fetch(`http://192.168.1.22:3000/users`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(user),
      // });
    

      // if (!response.ok) {
      //   throw new Error('Failed to add user');
      // }

      // Refresh the user list after adding
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const onBtnDeletePress = () => {
    if (userToDelete !== null) {
      deleteUser(users[userToDelete].id);
      setUserToDelete(null);
      setIsShow(false);
    }
  };

  const addRow = (user, index) => {
    return (
      <View key={index} style={styles.row}>
        <Text style={[styles.text, { width: "13%" }]}>{user.firstName}</Text>
        <Text style={[styles.text, { width: "13%" }]}>{user.lastName}</Text>
        <Text style={[styles.text, { width: "26%" }]}>{user.email}</Text>
        <Text style={[styles.text, { width: "22%" }]}>{user.phoneNumber}</Text>
        <Text style={[styles.text, { width: "13%" }]}>{user.role}</Text>
        <View style={[styles.text, { width: "13%" }]}>
          <Modal visible={isShow} animationType='fade' transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.deleteWarning}>Are you sure you want to delete?</Text>
                <View style={styles.modalButtonContainer}>
                  <Pressable onPress={onBtnDeletePress} style={styles.modalButton}>
                    <Text style={[styles.modalButtonText, {color: 'white'}]}>Yes, I'm sure</Text>
                  </Pressable>
                  <Pressable onPress={() => setIsShow(false)} style={styles.modalButtonCancel}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Pressable onPress={() => onBtnPress(index)} style={({ pressed }) => [pressed && { opacity: 0.5 }, styles.imgBtn]}>
            {/* <Text>Delet</Text> */}
            <Image_>
//          </Image_>
          </Pressable>
        </View>
      </View>
    );
  };

  const users_display = users.map(addRow);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.textheader, { width: "13%" }]}>First Name</Text>
        <Text style={[styles.textheader, { width: "13%" }]}>Last Name</Text>
        <Text style={[styles.textheader, { width: "26%" }]}>Email</Text>
        <Text style={[styles.textheader, { width: "22%" }]}>Phone Number</Text>
        <Text style={[styles.textheader, { width: "13%" }]}>Role</Text>
        <Text style={[styles.textheader, { width: "13%" }]}></Text>
      </View>

      <ScrollView>
        {users_display}
      </ScrollView>
      <PressView addUser={addUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  deleteWarning: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Keep the background transparent
  },
  modalContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 10, // Adds shadow effect
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginRight: 10,
    width: '48%',
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginLeft: 10,
    width: '48%',
    borderWidth: 1,
    borderColor: '#1a73e8',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'blue',
    fontSize: 16,
  },
  imgBtn: {
    width: "66%",
    height: 40,
    marginLeft: 5,
  },
  header: {
    flexDirection: "row",
    width: "100%",
  },
  textheader: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#6a99f787",
    fontSize: 10,
    textAlign: "center",
    fontWeight: '900',
    color: 'black',
    backgroundColor: '#dae9e7',
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  text: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#6a99f787",
    fontSize: 10,
    textAlign: "center",
    height: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 33,
  },
});
