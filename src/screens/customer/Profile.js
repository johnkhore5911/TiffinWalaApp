import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={25} color="#000" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Profile Section */}
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.subHeader}>Basic Details</Text>

      <View style={styles.profileSection}>
        <View style={styles.profileImage} />
        <View>
          <Text style={styles.userName}>Aakarsh Prasad</Text>
          <Text style={styles.userPhone}>+91 7602430642</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit profile picture</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Meal History Section */}
      <TouchableOpacity style={styles.mealHistory} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.mealHistoryText}>Meal History</Text>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF0F1D1", padding: 20 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  backText: { fontSize: 16, marginLeft: 5 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subHeader: { fontSize: 16, color: "#666", marginBottom: 15 },
  profileSection: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  profileImage: { width: 60, height: 60, backgroundColor: "#ddd", borderRadius: 30, marginRight: 15 },
  userName: { fontSize: 18, fontWeight: "bold" },
  userPhone: { fontSize: 14, color: "#666" },
  editButton: { backgroundColor: "#f0f0f0", padding: 5, borderRadius: 5, marginTop: 5 },
  editButtonText: { fontSize: 12, color: "#000" },
  mealHistory: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f2f2f2", padding: 12, borderRadius: 8 },
  mealHistoryText: { fontSize: 16, fontWeight: "bold" },
});

export default Profile;
