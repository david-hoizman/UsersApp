import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Pressable, ScrollView, TextInput } from 'react-native';
import PressView from './AddUser';
import { API_URL } from '../services/userService';
import ImageDel from './ImageDel';
import ImageEdit from './ImageEdit';
import DeleteUser from './DeleteUser';
import AddUser from './AddUser';

export default function User() {
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteShow,setIsDeleteShow] = useState(false)
  const [detailsVisible, setDetailsVisible] = useState(null);
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  useEffect(() => {
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


  const pressOnDelete = (id) => {
    setUserToDelete(id)
    setIsDeleteShow(true)
  }

  const addUser = async (user) => {
    try {
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };


  const showDetails = (user) => {
    setDetailsVisible(user);
    setEditMode(null);
    setEditedUser({});
  };


  const saveChanges = () => {
    const updatedUser = { ...detailsVisible, ...editedUser };
    // TODO: Add logic to update the user on the server
    setDetailsVisible(updatedUser);
    setEditMode(null);
  };



  const addRow = (user, index) => (
    <View key={index} style={styles.row}>
      <Pressable style={({ pressed }) => [styles.cell, { width: "13%" }, pressed && { opacity: 0.5 }]}>
        <Text style={styles.textContent} numberOfLines={1}>{user.firstName}</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [styles.cell, { width: "13%" }, pressed && { opacity: 0.5 }]}>
        <Text style={styles.textContent} numberOfLines={1}>{user.lastName}</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [styles.cell, { width: "26%" }, pressed && { opacity: 0.5 }]}>
        <Text style={styles.textContent} numberOfLines={1}>{user.email}</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [styles.cell, { width: "22%" }, pressed && { opacity: 0.5 }]}>
        <Text style={styles.textContent}>{user.phoneNumber}</Text>
      </Pressable>
      <Pressable style={({ pressed }) => [styles.cell, { width: "13%" }, pressed && { opacity: 0.5 }]}>
        <Text style={styles.textContent} numberOfLines={1}>{user.role}</Text>
      </Pressable>
      <View style={styles.actionButtons}>
        <Pressable onPress={() => showDetails(user)} style={({ pressed }) => [styles.detailsBtn, pressed && { opacity: 0.5 }]}>
          <ImageEdit />
        </Pressable>
        <Pressable onPress={() => pressOnDelete(user.id)} style={({ pressed }) => [styles.detailsBtn, pressed && { opacity: 0.5 }]}>
          <ImageDel />
        </Pressable>
      </View>
      {detailsVisible === user && (
        <Modal visible={!!detailsVisible} animationType='slide' transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit User Details</Text>
            <Text style={styles.editTitle}>first name</Text>
            <TextInput
              style={styles.input}
              value={editedUser.firstName}
              onChangeText={(text) => setEditedUser({...editedUser, firstName: text})}
              placeholder= {user.firstName}
            />
            <Text style={styles.editTitle}>last name</Text>
            <TextInput
              style={styles.input}
              value={editedUser.lastName}
              onChangeText={(text) => setEditedUser({...editedUser, lastName: text})}
              placeholder= {user.lastName}
            />
            <Text style={styles.editTitle}>email</Text>
            <TextInput
              style={styles.input}
              value={editedUser.email}
              onChangeText={(text) => setEditedUser({...editedUser, email: text})}
              placeholder= {user.email}
            />
            <Text style={styles.editTitle}>phon number</Text>
            <TextInput
              style={styles.input}
              value={editedUser.phoneNumber}
              onChangeText={(text) => setEditedUser({...editedUser, phoneNumber: text})}
              placeholder= {user.phoneNumber}
            />
            <Text style={styles.editTitle}>role</Text>
            <TextInput
              style={styles.input}
              value={editedUser.role}
              onChangeText={(text) => setEditedUser({...editedUser, role: text})}
              placeholder= {user.role}
              
            />
            <View style={styles.buttonContainer}>
              <Pressable style={[styles.button, styles.ecceptButton]} onPress={saveChanges}>
                <Text style={styles.buttonText}>Save</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.cancelButton]} onPress={() => setDetailsVisible(null)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      )}
    </View>
  );

  const users_display = users.map(addRow);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.textheader, { width: "13%" }]}>First Name</Text>
        <Text style={[styles.textheader, { width: "13%" }]}>Last Name</Text>
        <Text style={[styles.textheader, { width: "26%" }]}>Email</Text>
        <Text style={[styles.textheader, { width: "22%" }]}>Phone Number</Text>
        <Text style={[styles.textheader, { width: "13%" }]}>Role</Text>
        <Text style={[styles.textheader, { width: "13%" }]}>Action</Text>
      </View>

      <ScrollView>
        {users_display}
      </ScrollView>
      <AddUser fetchUsers={fetchUsers} />
      <DeleteUser fetchUsers={fetchUsers} userId={userToDelete} isDeleteShow={isDeleteShow} setIsDeleteShow={setIsDeleteShow} />
    </View>
  );
}

const styles = StyleSheet.create({
  deleteWarning: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  editTitle: {
    fontWeight: '900',
    
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 10,
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
  modalButtonSave: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginRight: 10,
    width: '48%',
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: 'red',
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
    color: 'white',
    fontSize: 16,
  },
  imgBtn: {
    flex: 1,
    height: 40,
  },
  detailsBtn: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6a99f787',
    borderRadius: 5,
    padding: 5,
  },
  detailsText: {
    fontSize: 16,
    color: 'black',
  },
  actionButtons: {
    flexDirection: 'row',
    width: '13%',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    width: '100%',
  },
  textheader: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#6a99f787",
    fontSize: 10,
    textAlign: 'center',
    fontWeight: '900',
    color: 'black',
    backgroundColor: '#dae9e7',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  cell: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#6a99f787',
    fontSize: 10,
    textAlign: 'center',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContent: {
    fontSize: 10,
    color: 'black',
    maxWidth: '100%',
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 33,
  },
  detailFieldContainer: {
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: '100%',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
    borderRadius: 5,
    width: '100%',
  },
  // New styles for the edit modal
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  ecceptButton: {
    backgroundColor: 'green',
  }
});


























































