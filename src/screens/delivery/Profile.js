// // import { StyleSheet, Text, View, Button } from 'react-native';
// // import React from 'react';

// // const Profile = () => {
// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Delivery Profile</Text>
// //       <Text>Name: Delivery Boy</Text>
// //       <Text>Email: deliveryboy@example.com</Text>
// //       <Button 
// //         title="Log Out" 
// //         color="#dc3545" 
// //         onPress={() => console.log('Logged Out')} 
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 20,
// //     backgroundColor: '#f7f9fc',
// //   },
// //   header: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //     textAlign: 'center',
// //   },
// // });

// // export default Profile;

// import React from 'react';
// import { Alert, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';

// const ProfileScreen = () => {
//   const navigation = useNavigation();
//   const userDetails = {
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     image: 'https://cdn.pixabay.com/photo/2024/03/15/19/51/ai-generated-8635685_1280.png'
//   };

//   const accountOptions = [
//     { title: 'Edit Profile', icon: 'user', routeName: 'ProfileModal', bgColor: '#6366f1' },
//     { title: 'Settings', icon: 'cog', bgColor: '#059669' },
//     { title: 'Privacy Policy', icon: 'lock', bgColor: '#6b7280' },
//     { title: 'Logout', icon: 'power-off', bgColor: '#e11d48' }
//   ];

//   const handleLogout = () => {
//     navigation.navigate('Welcome');
//   };

//   const showLogoutAlert = () => {
//     Alert.alert('Confirm', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Logout', onPress: handleLogout, style: 'destructive' }
//     ]);
//   };

//   const handlePress = (item) => {
//     if (item.title === 'Logout') {
//       showLogoutAlert();
//     } else if (item.routeName) {
//       navigation.navigate(item.routeName);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Profile</Text>
//       <View style={styles.userInfo}>
//         <Image source={{ uri: userDetails.image }} style={styles.avatar} />
//         <Text style={styles.name}>{userDetails.name}</Text>
//         <Text style={styles.email}>{userDetails.email}</Text>
//       </View>
//       <View style={styles.accountOptions}>
//         {accountOptions.map((item, index) => (
//           <TouchableOpacity key={index} style={[styles.listItem, { backgroundColor: item.bgColor }]} onPress={() => handlePress(item)}>
//             <Icon name={item.icon} size={24} color="white" style={styles.icon} />
//             <Text style={styles.listText}>{item.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: 'white' },
//   header: { fontSize: 24, fontWeight: 'bold', color: 'black', textAlign: 'center', marginBottom: 20 },
//   userInfo: { alignItems: 'center', marginBottom: 30 },
//   avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
//   name: { fontSize: 20, fontWeight: '600', color: 'black' },
//   email: { fontSize: 14, color: '#a0a0a0' },
//   accountOptions: { marginTop: 20 },
//   listItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderRadius: 10, marginBottom: 10 },
//   icon: { marginRight: 15 },
//   listText: { fontSize: 16, color: 'white', fontWeight: '500' }
// });


// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native";

// const Profile = () => {
//   const navigation = useNavigation();
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <View style={styles.container}>
//       {/* Back Button */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={25} color="#000" />
//         <Text style={styles.backText}>Back</Text>
//       </TouchableOpacity>

//       {/* Profile Section */}
//       <Text style={styles.header}>Profile</Text>
//       <Text style={styles.subHeader}>Basic Details</Text>

//       <View style={styles.profileSection}>
//         <View style={styles.profileImage} />
//         <View>
//           <Text style={styles.userName}>Aakarsh Prasad</Text>
//           <Text style={styles.userPhone}>+91 7602430642</Text>
//           <TouchableOpacity style={styles.editButton}>
//             <Text style={styles.editButtonText}>Edit profile picture</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Meal History Section */}
//       <TouchableOpacity style={styles.mealHistory} onPress={() => setExpanded(!expanded)}>
//         <Text style={styles.mealHistoryText}>Meal History</Text>
//         <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={20} color="#000" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFF0F1D1", padding: 20 },
//   backButton: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
//   backText: { fontSize: 16, marginLeft: 5 },
//   header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
//   subHeader: { fontSize: 16, color: "#666", marginBottom: 15 },
//   profileSection: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
//   profileImage: { width: 60, height: 60, backgroundColor: "#ddd", borderRadius: 30, marginRight: 15 },
//   userName: { fontSize: 18, fontWeight: "bold" },
//   userPhone: { fontSize: 14, color: "#666" },
//   editButton: { backgroundColor: "#f0f0f0", padding: 5, borderRadius: 5, marginTop: 5 },
//   editButtonText: { fontSize: 12, color: "#000" },
//   mealHistory: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f2f2f2", padding: 12, borderRadius: 8 },
//   mealHistoryText: { fontSize: 16, fontWeight: "bold" },
// });

// export default Profile;


// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { useNavigation } from "@react-navigation/native";

// const ProfileScreen = () => {
//   const navigation = useNavigation();
//   const [expanded, setExpanded] = useState(false);

//   const userDetails = {
//     name: "Aakarsh Prasad",
//     phone: "+91 7602430642",
//     email: "john.doe@example.com",
//     image: "https://cdn.pixabay.com/photo/2024/03/15/19/51/ai-generated-8635685_1280.png",
//   };

//   const accountOptions = [
//     { title: "Edit Profile", icon: "user", routeName: "ProfileModal", bgColor: "#6366f1" },
//     { title: "Settings", icon: "cog", bgColor: "#059669" },
//     { title: "Privacy Policy", icon: "lock", bgColor: "#6b7280" },
//     { title: "Logout", icon: "power-off", bgColor: "#e11d48" },
//   ];

//   const handleLogout = () => {
//     navigation.navigate("Welcome");
//   };

//   const showLogoutAlert = () => {
//     Alert.alert("Confirm", "Are you sure you want to logout?", [
//       { text: "Cancel", style: "cancel" },
//       { text: "Logout", onPress: handleLogout, style: "destructive" },
//     ]);
//   };

//   const handlePress = (item) => {
//     if (item.title === "Logout") {
//       showLogoutAlert();
//     } else if (item.routeName) {
//       navigation.navigate(item.routeName);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back Button */}
//       {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}> */}
//         {/* <Ionicons name="arrow-back" size={25} color="#000" /> */}
//         {/* <Text style={styles.backText}>Back</Text> */}
//       {/* </TouchableOpacity> */}

//       {/* Profile Section */}
//       <View style={{justifyContent:`center`,alignItems:`center`,width:"100%",marginBottom:15}}><Text style={styles.header}>Profile</Text></View>

//       <View style={styles.profileSection}>
//         <Image source={{ uri: userDetails.image }} style={styles.profileImage} />
//         <View>
//           <Text style={styles.userName}>{userDetails.name}</Text>
//           <Text style={styles.userPhone}>{userDetails.phone}</Text>
//           <TouchableOpacity style={styles.editButton}>
//             <Text style={styles.editButtonText}>Edit profile picture</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Account Options */}
//       <View style={styles.accountOptions}>
//         {accountOptions.map((item, index) => (
//           <TouchableOpacity key={index} style={[styles.listItem, { backgroundColor: item.bgColor }]} onPress={() => handlePress(item)}>
//             <Icon name={item.icon} size={24} color="white" style={styles.icon} />
//             <Text style={styles.listText}>{item.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFF0F1D1", padding: 20 },
//   backButton: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
//   backText: { fontSize: 16, marginLeft: 5 },
//   header: { fontSize: 22, fontWeight: "bold", marginBottom: 10,color:'black' },
//   subHeader: { fontSize: 16, color: "#666", marginBottom: 15 },
//   profileSection: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
//   profileImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
//   userName: { fontSize: 18, fontWeight: "bold",color:"black" },
//   userPhone: { fontSize: 14, color: "#666" },
//   editButton: { backgroundColor: "#f0f0f0", padding: 5, borderRadius: 5, marginTop: 5 },
//   editButtonText: { fontSize: 12, color: "#000" },
//   accountOptions: { marginTop: 20 },
//   listItem: { flexDirection: "row", alignItems: "center", padding: 15, borderRadius: 10, marginBottom: 10 },
//   icon: { marginRight: 15 },
//   listText: { fontSize: 16, color: "white", fontWeight: "500" },
// });

// export default ProfileScreen;


import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  
  const userDetails = {
    name: "Aakarsh Prasad",
    phone: "+91 7602430642",
    email: "john.doe@example.com",
    image: "https://cdn.pixabay.com/photo/2024/03/15/19/51/ai-generated-8635685_1280.png",
  };

  const accountOptions = [
    { title: "Edit Profile", icon: "user", routeName: "ProfileModal", bgColor: "#007bff" },
    // { title: "Settings", icon: "cog", bgColor: "#28a745" },
    // { title: "Privacy Policy", icon: "lock", bgColor: "#ffc107" },
    { title: "Logout", icon: "power-off", bgColor: "#e11d48" },
  ];

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: handleLogout, style: "destructive" },
    ]);
  };

  const handlePress = (item) => {
    if (item.title === "Logout") {
      showLogoutAlert();
    } else if (item.routeName) {
      navigation.navigate(item.routeName);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.profileSection}>
        <Image source={{ uri: userDetails.image }} style={styles.profileImage} />
        <View>
          <Text style={styles.userName}>{userDetails.name}</Text>
          <Text style={styles.userPhone}>{userDetails.phone}</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        {accountOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, { backgroundColor: item.bgColor }]}
            onPress={() => handlePress(item)}
          >
            <Icon name={item.icon} size={20} color="#fff" style={styles.optionIcon} />
            <Text style={styles.optionText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center",color:"black" },
  profileSection: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40, marginRight: 15 },
  userName: { fontSize: 18, fontWeight: "bold", color: "#333" },
  userPhone: { fontSize: 14, color: "#555" },
  optionsContainer: { marginTop: 10 },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionIcon: { marginRight: 10 },
  optionText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default ProfileScreen;
