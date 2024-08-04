import React, { useState, useEffect } from 'react';
import { TextInput, Modal, Pressable, StyleSheet, Text, View, Alert, Image } from 'react-native';
import { addUser } from "../services/userService";

export default function AddUser({ fetchUsers, navigation }) {
    const [isShow, setIsShow] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({}); // Track which fields have been touched

    const validate = () => {
        const newErrors = {};
        const nameRegex = /^[A-Za-z]+$/; // Regex for validating only letters
        const phoneRegex = /^0[0-9]{9}$/; // Regex for phone numbers starting with 0 and having 10 digits

        if (!firstName) newErrors.firstName = 'First Name is required';
        else if (!nameRegex.test(firstName)) newErrors.firstName = 'First Name must contain only letters';

        if (!lastName) newErrors.lastName = 'Last Name is required';
        else if (!nameRegex.test(lastName)) newErrors.lastName = 'Last Name must contain only letters';

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!phoneNumber) {
            newErrors.phoneNumber = 'Phone Number is required';
        } else if (!phoneRegex.test(phoneNumber)) {
            newErrors.phoneNumber = 'Phone Number must start with 0 and be 10 digits long';
        }

        if (!role) newErrors.role = 'Role is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddUser = async () => {
        setTouched({ firstName: true, lastName: true, email: true, phoneNumber: true, role: true }); // Mark all fields as touched
        if (validate()) {
            try {
                await addUser({ firstName, lastName, email, phoneNumber, role });
                fetchUsers();
                handleClear();
                setIsShow(false);
            } catch (error) {
                Alert.alert("Error", "Failed to add user. Please try again.");
            }
        }
    };

    const handleCancel = () => {
        setIsShow(false);
        if (navigation) {
            navigation.goBack();
        }
    };

    const handleClear = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setRole("");
        setErrors({});
        setTouched({});
    };

    useEffect(() => {
        if (!isShow) {
            handleClear();
        }
    }, [isShow]);

    const onBtnPress = () => {
        setIsShow(true);
    };

    return (
        <>
            <Modal visible={isShow} animationType='fade' transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Personal Details Form</Text>

                        <TextInput
                            style={[styles.inputText, errors.firstName && touched.firstName && styles.errorInput]}
                            placeholder="First Name"
                            onChangeText={setFirstName}
                            value={firstName}
                            onBlur={() => setTouched({ ...touched, firstName: true })} // Mark field as touched
                        />
                        {errors.firstName && touched.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

                        <TextInput
                            style={[styles.inputText, errors.lastName && touched.lastName && styles.errorInput]}
                            placeholder="Last Name"
                            onChangeText={setLastName}
                            value={lastName}
                            onBlur={() => setTouched({ ...touched, lastName: true })} // Mark field as touched
                        />
                        {errors.lastName && touched.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

                        <TextInput
                            style={[styles.inputText, errors.email && touched.email && styles.errorInput]}
                            placeholder="Email"
                            keyboardType='email-address'
                            onChangeText={setEmail}
                            value={email}
                            onBlur={() => setTouched({ ...touched, email: true })} // Mark field as touched
                        />
                        {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        <TextInput
                            style={[styles.inputText, errors.phoneNumber && touched.phoneNumber && styles.errorInput]}
                            placeholder="Phone Number"
                            keyboardType='number-pad'
                            maxLength={10}
                            onChangeText={setPhoneNumber}
                            value={phoneNumber}
                            onBlur={() => setTouched({ ...touched, phoneNumber: true })} // Mark field as touched
                        />
                        {errors.phoneNumber && touched.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

                        <TextInput
                            style={[styles.inputText, errors.role && touched.role && styles.errorInput]}
                            placeholder="Role"
                            onChangeText={setRole}
                            value={role}
                            onBlur={() => setTouched({ ...touched, role: true })} // Mark field as touched
                        />
                        {errors.role && touched.role && <Text style={styles.errorText}>{errors.role}</Text>}

                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonRow}>
                                <Pressable style={styles.cancelButton} onPress={handleCancel}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </Pressable>
                                <Pressable style={styles.clearButton} onPress={handleClear}>
                                    <Text style={styles.buttonText}>Clear</Text>
                                </Pressable>
                            </View>
                            <Pressable style={styles.saveButton} onPress={handleAddUser}>
                                <Text style={styles.buttonText}>Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            {!isShow && (
                <Pressable
                    onPress={onBtnPress}
                    style={({ pressed }) => [styles.addBtn, pressed && { opacity: 0.7 }]}
                >
                    <Image style={styles.addImg} source={require('../assets/images/add.png')} />
                </Pressable>
            )}
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
    errorInput: {
        borderColor: 'red'
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
    addImg: {
        width: 25,
        height: 25
    }
});
















