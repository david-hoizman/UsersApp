
import { Button, TextInput, Modal, Pressable, StyleSheet, Text, View, Alert, response } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests
// import {API_URL} from "../services/userService"
// const API_URL = 'http://192.168.1.22:3000/users'; // Change this to your server's URL

export default function PressView({ addUser, navigation }) {
    const [isShow, setIsShow] = useState(false);
    const [inputVal1, setInputVal1] = useState("");
    const [condition1, setCondition1] = useState("");
    const [inputVal2, setInputVal2] = useState("");
    const [condition2, setCondition2] = useState("");
    const [inputVal3, setInputVal3] = useState("");
    const [condition3, setCondition3] = useState("");
    const [inputVal4, setInputVal4] = useState("");
    const [condition4, setCondition4] = useState("");
    const [inputVal5, setInputVal5] = useState("");
    const [condition5, setCondition5] = useState("");

    const validateFirstName = (value) => {
        if (!value) return "First name is required";
        if (/\d/.test(value)) return "Name should not contain numbers";
        return "";
    };

    const validateLastName = (value) => {
        if (!value) return "Last name is required";
        if (/\d/.test(value)) return "Last name should not contain numbers";
        return "";
    };

    const validateEmail = (value) => {
        if (!value) return "Email is required";
        if (value.indexOf('@') === -1) return "Invalid email address";
        return "";
    };

    const validatePhoneNumber = (value) => {
        if (!value) return "Phone number is required";
        if (value.length < 8) return "Phone number should be at least 8 digits";
        return "";
    };

    const validateRole = (value) => {
        if (!value) return "Role is required";
        if (/\d/.test(value)) return "Role should not contain numbers";
        return "";
    };

    const handleAddUser = async () => {
        const error1 = validateFirstName(inputVal1);
        const error2 = validateLastName(inputVal2);
        const error3 = validateEmail(inputVal3);
        const error4 = validatePhoneNumber(inputVal4);
        const error5 = validateRole(inputVal5);

        setCondition1(error1);
        setCondition2(error2);
        setCondition3(error3);
        setCondition4(error4);
        setCondition5(error5);

        if (error1 || error2 || error3 || error4 || error5) {
            Alert.alert("Validation Error", "Please correct the highlighted fields.");
            return;
        }
        console.log('Sending data:', {
            firstName: inputVal1,
            lastName: inputVal2,
            email: inputVal3,
            phoneNumber: inputVal4,
            role: inputVal5
        }); // הדפסת הנתונים לפני שליחה
    
        try {
            const response = await axios.post(`http://192.168.1.22:3000/users`, {
                firstName: inputVal1,
                lastName: inputVal2,
                email: inputVal3,
                phoneNumber: inputVal4,
                role: inputVal5
            });
            if (response.status == 201) {
                addUser(response.data);
                handleClear();
                setIsShow(false);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to add user. Please try again11.");
        }
    };

    const handleCancel = () => {
        setIsShow(false);
        if (navigation) {
            navigation.goBack();
        }
    };

    const handleClear = () => {
        setInputVal1("");
        setInputVal2("");
        setInputVal3("");
        setInputVal4("");
        setInputVal5("");
        setCondition1("");
        setCondition2("");
        setCondition3("");
        setCondition4("");
        setCondition5("");
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
                            style={styles.inputText}
                            placeholder="First Name"
                            onChangeText={setInputVal1}
                            value={inputVal1}
                        />
                        {condition1 ? <Text style={styles.errorText}>{condition1}</Text> : null}

                        <TextInput
                            style={styles.inputText}
                            placeholder="Last Name"
                            onChangeText={setInputVal2}
                            value={inputVal2}
                        />
                        {condition2 ? <Text style={styles.errorText}>{condition2}</Text> : null}

                        <TextInput
                            style={styles.inputText}
                            placeholder="Email"
                            onChangeText={setInputVal3}
                            value={inputVal3}
                        />
                        {condition3 ? <Text style={styles.errorText}>{condition3}</Text> : null}

                        <TextInput
                            style={styles.inputText}
                            placeholder="Phone Number"
                            keyboardType='number-pad'
                            maxLength={10}
                            onChangeText={setInputVal4}
                            value={inputVal4}
                        />
                        {condition4 ? <Text style={styles.errorText}>{condition4}</Text> : null}

                        <TextInput
                            style={styles.inputText}
                            placeholder="Role"
                            onChangeText={setInputVal5}
                            value={inputVal5}
                        />
                        {condition5 ? <Text style={styles.errorText}>{condition5}</Text> : null}

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
                    style={({ pressed }) => [styles.btn, pressed && { opacity: 0.7 }]}
                >
                    <Text style={styles.btnText}>Add User</Text>
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

