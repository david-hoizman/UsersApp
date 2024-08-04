
import { TextInput, Modal, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { updateUser } from "../services/userService"

export default function UpdateUser({ fetchUsers, user, isEditShow, setIsEditShow }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('');


    const handleClear = () => {
        setFirstName("")
        setLastName("")
        setEmail("")
        setPhoneNumber("")
        setRole("")
    }

    const handleUpdateUser = async () => {
        try {
            await updateUser(user.id, { firstName, lastName, email, phoneNumber, role });
            fetchUsers();
            handleClear();
            setIsEditShow(false);
        } catch (error) {
            Alert.alert("Error", "Failed to add user. Please try again.");
        }
    }

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setEmail(user.email || '');
            setPhoneNumber(user.phoneNumber || '');
            setRole(user.role || '');
        }
    }, [isEditShow]);

    return (
        <>
            <Modal visible={isEditShow} animationType='fade' transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Personal update Details Form</Text>

                        <TextInput
                            style={styles.inputText}
                            placeholder="First Name"
                            onChangeText={setFirstName}
                            value={firstName}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder="Last Name"
                            onChangeText={setLastName}
                            value={lastName}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder="Email"
                            onChangeText={setEmail}
                            value={email}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder="Phone Number"
                            keyboardType='number-pad'
                            maxLength={10}
                            onChangeText={setPhoneNumber}
                            value={phoneNumber}
                        />

                        <TextInput
                            style={styles.inputText}
                            placeholder="Role"
                            onChangeText={setRole}
                            value={role}
                        />

                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonRow}>
                                <Pressable style={styles.cancelButton} onPress={() => setIsEditShow(false)}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </Pressable>
                                <Pressable style={styles.clearButton} onPress={handleClear}>
                                    <Text style={styles.buttonText}>Clear</Text>
                                </Pressable>
                            </View>
                            <Pressable style={styles.saveButton} onPress={handleUpdateUser}>
                                <Text style={styles.buttonText}>Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>


        </>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Semi-transparent background
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#1f7690'
    },
    title: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputText: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: 'white',
        paddingHorizontal: 8,
        marginVertical: 8,
        borderRadius: 6,
        fontSize: 14,
        width: '100%'
    },
    errorText: {
        fontSize: 14,
        color: 'red',
        marginBottom: 8
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10
    },
    cancelButton: {
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: 'darkred',
        padding: 10,
        borderRadius: 6,
        width: '48%' // Adjust width to make space for both buttons
    },
    clearButton: {
        backgroundColor: 'orange',
        borderWidth: 1,
        borderColor: 'darkorange',
        padding: 10,
        borderRadius: 6,
        width: '48%' // Adjust width to make space for both buttons
    },
    saveButton: {
        backgroundColor: 'blue',
        borderWidth: 1,
        borderColor: 'darkblue',
        padding: 10,
        borderRadius: 6,
        width: '100%', // Full width for the save button
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16
    },
    btn: {
        backgroundColor: '#1f7690', // Custom blue color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 2
    },
    btnText: {
        color: 'white',
        fontSize: 16
    }
});

