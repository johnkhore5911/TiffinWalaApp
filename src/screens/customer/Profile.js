
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  
  const userDetails = {
    name: "John Khore",
    phone: "+91 9056653906",
    email: "Johnkhore26@example.com",
    image: "https://cdn.pixabay.com/photo/2024/03/15/19/51/ai-generated-8635685_1280.png",
  };

  const accountOptions = [
    // { title: "Edit Profile", icon: "user", routeName: "ProfileModal", bgColor: "#007bff" },
    // { title: "Settings", icon: "cog", bgColor: "#28a745" },
    // { title: "Privacy Policy", icon: "lock", bgColor: "#ffc107" },
    { title: "Logout", icon: "power-off", bgColor: "#ff4d4d" },
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
      <Text style={styles.subheader}>Basic Details</Text>
      <View style={styles.profileSection}>
        <Image source={{ uri: userDetails.image }} style={styles.profileImage} />
        <View>
          <Text style={styles.userName}>{userDetails.name}</Text>
          <Text style={styles.userPhone}>{userDetails.phone}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>

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
  subheader:{
    marginTop:5,
    marginBottom:5,
    fontSize:14,
    fontWeight:'400',
    color:"#202020"
  },
  container: { flex: 1, backgroundColor: "#f8f8f8", padding: 20 },
  header: { fontSize: 22, fontWeight: "500", marginBottom: 15, textAlign: "left",color:"#000000" },
  profileSection: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 100, marginRight: 15 },
  userName: { fontSize: 18, fontWeight: "400", color: "#000000" },
  userPhone: { fontSize: 14, fontWeight: "400",color: "#000000" },
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
  editProfileButton: {
    marginTop:4,
    width: 121,
    height: 27,
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editProfileText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 0,
    color: '#000', // Adjust color as needed
  },
});

export default ProfileScreen;
