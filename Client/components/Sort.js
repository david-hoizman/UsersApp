import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Pressable } from 'react-native';

/**
 * SortDropdown component allows the user to select a field for sorting.
 * 
 * @component
 * @param {string} sortField - The currently selected field to sort by.
 * @param {Function} setSortField - A function to update the sortField state.
 * @example
 * return (
 *   <SortDropdown
 *     sortField={currentSortField}
 *     setSortField={setCurrentSortField}
 *   />
 * )
 */
const SortDropdown = ({ sortField, setSortField }) => {
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Handles the selection of a sort field.
   * 
   * @param {string} field - The field to sort by.
   */
  const handleSelect = (field) => {
    setSortField(field);
    setModalVisible(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdownButton}>
        <Text style={styles.dropdownText}>Sort by: {sortField}</Text>
      </TouchableOpacity>
      
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => handleSelect('firstName')} style={styles.modalOption}>
              <Text style={styles.modalText}>First Name</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelect('lastName')} style={styles.modalOption}>
              <Text style={styles.modalText}>Last Name</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelect('email')} style={styles.modalOption}>
              <Text style={styles.modalText}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelect('phoneNumber')} style={styles.modalOption}>
              <Text style={styles.modalText}>Phone Number</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSelect('role')} style={styles.modalOption}>
              <Text style={styles.modalText}>Role</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginBottom: 10,
    alignItems: 'flex-start',
    margin: 10
  },
  dropdownButton: {
    backgroundColor: '#dae9e7',
    padding: 5,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 12,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '80%',
    padding: 20,
  },
  modalOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalText: {
    fontSize: 16,
    color: '#000',
  },
});

export default SortDropdown;
