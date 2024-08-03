import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { deleteUser } from "../services/userService"

export default function DeleteUser({ fetchUsers, userId, isDeleteShow, setIsDeleteShow }) {

  const deleteUserFromTable = async () => {
    if (userId !== null) {
      await deleteUser(userId);
      fetchUsers()
      setIsDeleteShow(false);
    }
  };

  return (
    <>
      <Modal visible={isDeleteShow} animationType='fade' transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.deleteWarning}>Are you sure you want to delete this user?</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable onPress={deleteUserFromTable} style={styles.modalButton}>
                <Text style={[styles.modalButtonText, { color: 'white' }]}>Yes, I'm sure</Text>
              </Pressable>
              <Pressable onPress={() => setIsDeleteShow(false)} style={styles.modalButtonCancel}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

    </>
  );
}

const styles = StyleSheet.create({
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
});
