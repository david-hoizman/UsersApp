// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, Pressable, ScrollView, Picker, Image } from 'react-native';
// import { API_URL } from '../services/userService';
// import ImageDel from './ImageDel';
// import ImageEdit from './ImageEdit';
// import SortDropdown from './Sort';
// import AddUser from './AddUser';
// import UpdateUser from './UpdateUser';
// import DeleteUser from './DeleteUser';



// export default function User() {
//   const [users, setUsers] = useState([]);
//   const [isEditShow, setIsEditShow] = useState(false);
//   const [isDeleteShow, setIsDeleteShow] = useState(false);
//   const [userToEdit, setUserToEdit] = useState(null)
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [sortField, setSortField] = useState('firstName'); // Default sort field

//   useEffect(() => {
//     fetchUsers();
//   }, [sortField]);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) {
//         throw new Error('Failed to fetch users');
//       }
//       const data = await response.json();
//       // Sort users based on the selected field
//       const sortedUsers = data.sort((a, b) => {
//         if (a[sortField] < b[sortField]) return -1;
//         if (a[sortField] > b[sortField]) return 1;
//         return 0;
//       });
//       setUsers(sortedUsers);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };


//   const pressOnEdit = (user) => {
//     setUserToEdit(user);
//     setIsEditShow(true);
//   };

//   const pressOnDelete = (id) => {
//     setUserToDelete(id);
//     setIsDeleteShow(true);
//   };

//   // Build a row in the table
//   const addRow = (user, index) => (
//     <View key={index} style={styles.row}>
//       <Pressable style={({ pressed }) => [styles.cell, { width: "13%" }, pressed && { opacity: 0.5 }]}>
//         <Text style={styles.textContent} numberOfLines={1}>{user.firstName}</Text>
//       </Pressable>
//       <Pressable style={({ pressed }) => [styles.cell, { width: "13%" }, pressed && { opacity: 0.5 }]}>
//         <Text style={styles.textContent} numberOfLines={1}>{user.lastName}</Text>
//       </Pressable>
//       <Pressable style={({ pressed }) => [styles.cell, { width: "26%" }, pressed && { opacity: 0.5 }]}>
//         <Text style={styles.textContent} numberOfLines={1}>{user.email}</Text>
//       </Pressable>
//       <Pressable style={({ pressed }) => [styles.cell, { width: "22%" }, pressed && { opacity: 0.5 }]}>
//         <Text style={styles.textContent}>{user.phoneNumber}</Text>
//       </Pressable>
//       <Pressable style={({ pressed }) => [styles.cell, { width: "13%" }, pressed && { opacity: 0.5 }]}>
//         <Text style={styles.textContent} numberOfLines={1}>{user.role}</Text>
//       </Pressable>
//       <View style={styles.actionButtons}>
//         <Pressable onPress={() => pressOnEdit(user)} style={({ pressed }) => [styles.detailsBtn, pressed && { opacity: 0.5 }]}>
//           <ImageEdit />
//         </Pressable>
//         <Pressable onPress={() => pressOnDelete(user.id)} style={({ pressed }) => [styles.detailsBtn, pressed && { opacity: 0.5 }]}>
//           <ImageDel />
//         </Pressable>
//       </View>

//     </View>
//   );

//   const users_display = users.map(addRow);

//   return (
//     <View style={styles.container}>
//       <View style={styles.title}>
//         <Image style={styles.img} source={require('../assets/images/users.png')} />
//         <Text style={styles.textTitle}>Users Management</Text>
//       </View>

//       {/* Sorting dropdown */}
//       <View style={styles.menu}>
//         <SortDropdown sortField={sortField} setSortField={setSortField} />

//         <AddUser fetchUsers={fetchUsers} />
//       </View>
//       {/* View table headers*/}
//       <View style={styles.header}>
//         <Text style={[styles.textheader, { width: "13%" }]}>First Name</Text>
//         <Text style={[styles.textheader, { width: "13%" }]}>Last Name</Text>
//         <Text style={[styles.textheader, { width: "26%" }]}>Email</Text>
//         <Text style={[styles.textheader, { width: "22%" }]}>Phone Number</Text>
//         <Text style={[styles.textheader, { width: "13%" }]}>Role</Text>
//         <Text style={[styles.textheader, { width: "13%" }]}>Action</Text>
//       </View>

//       {/* View table data*/}
//       <ScrollView>
//         {users_display}
//       </ScrollView>

//       <UpdateUser fetchUsers={fetchUsers} user={userToEdit} isEditShow={isEditShow} setIsEditShow={setIsEditShow} />
//       <DeleteUser fetchUsers={fetchUsers} userId={userToDelete} isDeleteShow={isDeleteShow} setIsDeleteShow={setIsDeleteShow} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   deleteWarning: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   editTitle: {
//     fontWeight: '900',

//   },
//   imgBtn: {
//     flex: 1,
//     height: 40,
//   },
//   detailsBtn: {
//     flex: 1,
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#6a99f787',
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
//   menu: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     justifyContent: 'flex-start', // Align items to the left
//   },
//   title: {
//     flexDirection: 'column',
//     // width: '13%',
//     alignItems: 'center',
//     marginBottom: 20
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
//   cell: {
//     padding: 8,
//     borderWidth: 1,
//     borderColor: '#6a99f787',
//     fontSize: 10,
//     textAlign: 'center',
//     height: 40,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textContent: {
//     fontSize: 10,
//     color: 'black',
//     maxWidth: '100%',
//     overflow: 'hidden',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 33,
//   },
//   detailFieldContainer: {
//     marginVertical: 5,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     width: '100%',
//   },
//   detailLabel: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   detailValue: {
//     fontSize: 14,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 5,
//     borderRadius: 5,
//     width: '100%',
//   },
//   // New styles for the edit modal
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   button: {
//     padding: 10,
//     borderRadius: 5,
//     minWidth: 100,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   cancelButton: {
//     backgroundColor: 'red',
//   },
//   ecceptButton: {
//     backgroundColor: 'green',
//   },
//   textTitle: {
//     fontSize: 20
//   }
// });

































































import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Image, Modal, TouchableOpacity } from 'react-native';
import { API_URL } from '../services/userService';
import ImageDel from './ImageDel';
import ImageEdit from './ImageEdit';
import SortDropdown from './Sort';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

export default function User() {
  const [users, setUsers] = useState([]);
  const [isEditShow, setIsEditShow] = useState(false);
  const [isDeleteShow, setIsDeleteShow] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [sortField, setSortField] = useState('firstName'); // Default sort field
  const [isModalVisible, setIsModalVisible] = useState(false); // State for the modal visibility

  useEffect(() => {
    fetchUsers();
  }, [sortField]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      // Sort users based on the selected field
      const sortedUsers = data.sort((a, b) => {
        if (a[sortField] < b[sortField]) return -1;
        if (a[sortField] > b[sortField]) return 1;
        return 0;
      });
      setUsers(sortedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const pressOnEdit = (user) => {
    setUserToEdit(user);
    setIsEditShow(true);
  };

  const pressOnDelete = (id) => {
    setUserToDelete(id);
    setIsDeleteShow(true);
  };

  const handleImagePress = () => {
    setIsModalVisible(true); // Show the modal on image press
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Build a row in the table
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
      <View style={styles.title}>
        <Pressable onPress={handleImagePress} style={styles.imageContainer}>
          <Image style={styles.img} source={require('../assets/images/users.png')} />
        </Pressable>
        <Text style={styles.textTitle}>Users Management</Text>
      </View>

      {/* Header with sorting dropdown and add user button */}
      <View style={styles.headerContainer}>
        <Pressable style={styles.sortWrapper}>
          <SortDropdown sortField={sortField} setSortField={setSortField} />
        </Pressable>
        <View style={styles.addUserWrapper}>
          <AddUser fetchUsers={fetchUsers} />
        </View>
      </View>

      {/* View table headers*/}
      <View style={styles.header}>
        <Text style={[styles.textheader, { width: "13%" }]}>First Name</Text>
        <Text style={[styles.textheader, { width: "13%" }]}>Last Name</Text>
        <Text style={[styles.textheader, { width: "26%" }]}>Email</Text>
        <Text style={[styles.textheader, { width: "22%" }]}>Phone Number</Text>
        <Text style={[styles.textheader, { width: "13%" }]}>Role</Text>
        <Text style={[styles.textheader, { width: "13%" }]}>Action</Text>
      </View>

      {/* View table data*/}
      <ScrollView>
        {users_display}
      </ScrollView>

      <UpdateUser fetchUsers={fetchUsers} user={userToEdit} isEditShow={isEditShow} setIsEditShow={setIsEditShow} />
      <DeleteUser fetchUsers={fetchUsers} userId={userToDelete} isDeleteShow={isDeleteShow} setIsDeleteShow={setIsDeleteShow} />

      {/* Modal for displaying user count */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Total Users</Text>
            <Text style={styles.modalBody}>{users.length}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
  editTitle: {
    fontWeight: '900',
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
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start', // Align items to the left
  },
  title: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 10,
    borderRadius: 20, // Optional: make the image circular
    overflow: 'hidden',
  },
  img: {
    width: 40,
    height: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 3, // Ensure there's space on the sides
    justifyContent: 'space-between',
  },
  sortWrapper: {
    paddingVertical: 4, // Adjust padding as needed
    alignItems: 'center',
    justifyContent: 'center',
    // Remove background color and border
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  addUserWrapper: {
    marginRight: 2, // Margin of 2 pixels from the right edge of the screen
    backgroundColor: '#dae9e7', // Color of the button background
    borderColor: '#1f7690', // Color of the border
    borderWidth: 1, // Border width
    borderRadius: 4, // Rounded corners
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalBody: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1f7690',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#1f7690',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    width: '80%',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
