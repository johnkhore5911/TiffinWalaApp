import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const TiffinRequestScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Tiffin Request</Text>

      {/* Confirmation Message */}
      <Text style={styles.infoText}>Are you sure you want to request a tiffin for today?</Text>

      {/* Request Button */}
      <TouchableOpacity style={styles.requestButton} onPress={() => alert("Tiffin Requested!")}>
        <Text style={styles.buttonText}>Confirm Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backText: { fontSize: 16, marginLeft: 5 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  infoText: { fontSize: 16, color: "#666", marginBottom: 20 },
  requestButton: { backgroundColor: "#ff4d4d", padding: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default TiffinRequestScreen;
