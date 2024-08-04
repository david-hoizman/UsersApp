import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Pressable, ScrollView, TextInput } from 'react-native';
import PressView from './AddUser';
import { API_URL, getUsers } from '../services/userService';
import ImageDel from './ImageDel';
import ImageEdit from './ImageEdit';
import DeleteUser from './DeleteUser';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';

export default function User() {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isEditShow,setIsEditShow] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteShow,setIsDeleteShow] = useState(false)

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  const pressOnDelete = (id) => {
    setUserToDelete(id)
    setIsDeleteShow(true)
  }
  const pressOnEdit = (user) => {
    setUserToEdit(user)
    setIsEditShow(true)
  }

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
        <Pressable onPress={() => pressOnEdit(user)} style={({ pressed }) => [styles.detailsBtn, pressed && { opacity: 0.5 }]}>
          <ImageEdit />
        </Pressable>
        <Pressable onPress={() => pressOnDelete(user.id)} style={({ pressed }) => [styles.detailsBtn, pressed && { opacity: 0.5 }]}>
          <ImageDel />
        </Pressable>
      </View>
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
      <UpdateUser fetchUsers={fetchUsers} user={userToEdit} isEditShow={isEditShow} setIsEditShow={setIsEditShow} />
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


























































