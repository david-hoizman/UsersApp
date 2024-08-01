// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Modal, Pressable, ScrollView } from 'react-native';
// import PressView from './PressAddUser';
// import Image_ from './ImageDel';
// import { API_URL } from '../services/userService';
// import Image__ from './ImageDet';

// export default function User() {
//   const [isShow, setIsShow] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [detailsVisible, setDetailsVisible] = useState(null); // To track which user's details are visible
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     // Fetch users from server when component mounts
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) {
//         throw new Error('Failed to fetch users');
//       }
//       const data = await response.json();
//       setUsers(data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const deleteUser = async (id) => {
//     try {
//       const response = await fetch(`${API_URL}/${id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete user');
//       }
//       // Refresh the user list after deletion
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   const onBtnPress = (index) => {
//     setUserToDelete(index);
//     setIsShow(true);
//   };

//   const addUser = async (user) => {
//     try {
//       // Add user logic here
//       fetchUsers(); // Refresh user list
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };

//   const onBtnDeletePress = () => {
//     if (userToDelete !== null) {
//       deleteUser(users[userToDelete].id);
//       setUserToDelete(null);
//       setIsShow(false);
//     }
//   };

//   const showDetails = (user) => {
//     setDetailsVisible(user);
//   };

//   const hideDetails = () => {
//     setDetailsVisible(null);
//   };

//   const addRow = (user, index) => {
//     return (
//       <View key={index} style={styles.row}>
//         <Pressable style={({ pressed }) => [styles.text, { width: "13%" }, pressed && { opacity: 0.5 }]}>
//           <Text>{user.firstName}</Text>
//         </Pressable>
//         <Pressable style={({ pressed }) => [styles.text, { width: "13%" }, pressed && { opacity: 0.5 }]}>
//           <Text>{user.lastName}</Text>
//         </Pressable>
//         <Pressable style={({ pressed }) => [styles.text, { width: "26%" }, pressed && { opacity: 0.5 }]}>
//           <Text>{user.email}</Text>
//         </Pressable>
//         <Pressable style={({ pressed }) => [styles.text, { width: "22%" }, pressed && { opacity: 0.5 }]}>
//           <Text>{user.phoneNumber}</Text>
//         </Pressable>
//         <Pressable style={({ pressed }) => [styles.text, { width: "13%" }, pressed && { opacity: 0.5 }]}>
//           <Text>{user.role}</Text>
//         </Pressable>
//         <View style={styles.actionButtons}>
//           <Pressable onPress={() => showDetails(user)} style={({ pressed }) => [styles.detailsBtn, pressed && { opacity: 0.5 }]}>
//             {/* <Text style={styles.detailsText}>D</Text> */}
//             <Image__ />
//           </Pressable>
//           <Pressable onPress={() => onBtnPress(index)} style={({ pressed }) => [styles.detailsBtn, pressed && { opacity: 0.5 }]}>
//             <Image_ />
//           </Pressable>
//         </View>
//         {detailsVisible === user && (
//           <Modal visible={true} animationType='fade' transparent={true}>
//             <View style={styles.modalOverlay}>
//               <View style={styles.modalContainer}>
//                 <Text style={styles.deleteWarning}>Details:</Text>
//                 <Text style={styles.detailsText}>First Name: {user.firstName}</Text>
//                 <Text style={styles.detailsText}>Last Name: {user.lastName}</Text>
//                 <Text style={styles.detailsText}>Email: {user.email}</Text>
//                 <Text style={styles.detailsText}>Phone Number: {user.phoneNumber}</Text>
//                 <Text style={styles.detailsText}>Role: {user.role}</Text>
//                 <Pressable onPress={hideDetails} style={styles.modalButtonCancel}>
//                   <Text style={styles.modalButtonText}>Close</Text>
//                 </Pressable>
//               </View>
//             </View>
//           </Modal>
//         )}
//       </View>
//     );
//   };

//   const users_display = users.map(addRow);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={[styles.textheader, { width: "13%" }]}>First Name</Text>
//         <Text style={[styles.textheader, { width: "13%" }]}>Last Name</Text>
//         <Text style={[styles.textheader, { width: "26%" }]}>Email</Text>
//         <Text style={[styles.textheader, { width: "22%" }]}>Phone Number</Text>
//         <Text style={[styles.textheader, { width: "13%" }]}>Role</Text>
//         <Text style={[styles.textheader, { width: "13%" }]}>Action</Text>
//       </View>

//       <ScrollView>
//         {users_display}
//       </ScrollView>
//       <PressView addUser={addUser} />

//       {/* Confirmation Modal */}
//       <Modal visible={isShow} animationType='fade' transparent={true}>
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.deleteWarning}>Are you sure you want to delete this user?</Text>
//             <View style={styles.modalButtonContainer}>
//               <Pressable onPress={onBtnDeletePress} style={styles.modalButton}>
//                 <Text style={[styles.modalButtonText, { color: 'white' }]}>Yes, I'm sure</Text>
//               </Pressable>
//               <Pressable onPress={() => setIsShow(false)} style={styles.modalButtonCancel}>
//                 <Text style={styles.modalButtonText}>Cancel</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   deleteWarning: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)', // Dimmed background
//   },
//   modalContainer: {
//     width: '80%',
//     maxWidth: 400,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     elevation: 10, // Adds shadow effect
//   },
//   modalButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginTop: 20,
//   },
//   modalButton: {
//     backgroundColor: 'blue',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 6,
//     marginRight: 10,
//     width: '48%',
//     alignItems: 'center',
//   },
//   modalButtonCancel: {
//     backgroundColor: 'white',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 6,
//     marginLeft: 10,
//     width: '48%',
//     borderWidth: 1,
//     borderColor: '#1a73e8',
//     alignItems: 'center',
//   },
//   modalButtonText: {
//     color: 'blue',
//     fontSize: 16,
//   },
//   imgBtn: {
//     flex: 1, // Adjusts the button to take up the remaining space in its container
//     height: 40,
//   },
//   detailsBtn: {
//     flex: 1, // Adjusts the button to take up the remaining space in its container
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1, // Adds border to button
//     borderColor: '#6a99f787', // Matches row border color
//     borderRadius: 5,
//     padding: 5,
//   },
//   detailsText: {
//     fontSize: 16,
//     color: 'black',
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     width: '13%',
//     alignItems: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     width: '100%',
//   },
//   textheader: {
//     padding: 8,
//     borderWidth: 1,
//     borderColor: "#6a99f787",
//     fontSize: 10,
//     textAlign: 'center',
//     fontWeight: '900',
//     color: 'black',
//     backgroundColor: '#dae9e7',
//   },
//   row: {
//     flexDirection: 'row',
//     width: '100%',
//   },
//   text: {
//     padding: 8,
//     borderWidth: 1,
//     borderColor: '#6a99f787',
//     fontSize: 10,
//     textAlign: 'center',
//     height: 40,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 33,
//   },
// });





































import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, Pressable, ScrollView } from 'react-native';
import PressView from './PressAddUser';
import Image_ from './ImageDel';
import { API_URL } from '../services/userService';
import Image__ from './ImageDet';

export default function User() {
  const [isShow, setIsShow] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(null); // To track which user's details are visible
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

  const onBtnPress = (index) => {
    setUserToDelete(index);
    setIsShow(true);
  };

  const addUser = async (user) => {
    try {
      // Add user logic here
      fetchUsers(); // Refresh user list
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

  const showDetails = (user) => {
    setDetailsVisible(user);
  };

  const hideDetails = () => {
    setDetailsVisible(null);
  };

  const addRow = (user, index) => {
    return (
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
            <Image__ />
          </Pressable>
          <Pressable onPress={() => onBtnPress(index)} style={({ pressed }) => [styles.detailsBtn, pressed && { opacity: 0.5 }]}>
            <Image_ />
          </Pressable>
        </View>
        {detailsVisible === user && (
          <Modal visible={true} animationType='fade' transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.deleteWarning}>Details:</Text>
                <Text style={styles.detailsText}>First Name: {user.firstName}</Text>
                <Text style={styles.detailsText}>Last Name: {user.lastName}</Text>
                <Text style={styles.detailsText}>Email: {user.email}</Text>
                <Text style={styles.detailsText}>Phone Number: {user.phoneNumber}</Text>
                <Text style={styles.detailsText}>Role: {user.role}</Text>
                <Pressable onPress={hideDetails} style={styles.modalButtonCancel}>
                  <Text style={styles.modalButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        )}
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
        <Text style={[styles.textheader, { width: "13%" }]}>Action</Text>
      </View>

      <ScrollView>
        {users_display}
      </ScrollView>
      <PressView addUser={addUser} />

      {/* Confirmation Modal */}
      <Modal visible={isShow} animationType='fade' transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.deleteWarning}>Are you sure you want to delete this user?</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable onPress={onBtnDeletePress} style={styles.modalButton}>
                <Text style={[styles.modalButtonText, { color: 'white' }]}>Yes, I'm sure</Text>
              </Pressable>
              <Pressable onPress={() => setIsShow(false)} style={styles.modalButtonCancel}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: 'rgba(0,0,0,0.5)', // Dimmed background
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
    flex: 1, // Adjusts the button to take up the remaining space in its container
    height: 40,
  },
  detailsBtn: {
    flex: 1, // Adjusts the button to take up the remaining space in its container
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1, // Adds border to button
    borderColor: '#6a99f787', // Matches row border color
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
    textOverflow: 'ellipsis', // May not work in React Native but good for web
    whiteSpace: 'nowrap', // May not work in React Native but good for web
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 33,
  },
});
