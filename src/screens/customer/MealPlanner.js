import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const MealPlanner = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.header}>Meal Plan</Text>
      <Text style={styles.subHeader}>Your Current Meal Plan</Text>

      {/* Expiry Notice */}
      <Text style={styles.expiryNotice}>
        (your current plan for month November will expire in next 7 days)
      </Text>

      {/* Current Plan */}
      <TouchableOpacity style={styles.currentPlan}>
        <Text style={styles.planText}>Gold</Text>
      </TouchableOpacity>

      <Text style={styles.includedText}>(Includes**********************)</Text>

      {/* Explore More Plans */}
      <Text style={styles.exploreTitle}>Explore More Plans</Text>

      <TouchableOpacity style={styles.planCard}>
        <Text style={styles.planCardText}>Platinum Plan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.planCard}>
        <Text style={styles.planCardText}>Silver Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF0F1D1", padding: 20 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  backText: { fontSize: 16, marginLeft: 5 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subHeader: { fontSize: 16, color: "#666", marginBottom: 5 },
  expiryNotice: { fontSize: 14, color: "red", marginBottom: 15 },
  currentPlan: { backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#000", alignItems: "center" },
  planText: { fontSize: 16, fontWeight: "bold" },
  includedText: { fontSize: 12, color: "#666", marginTop: 5 },
  exploreTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  planCard: { backgroundColor: "#f2f2f2", padding: 15, borderRadius: 8, marginBottom: 10 },
  planCardText: { fontSize: 16, fontWeight: "bold" },
});

export default MealPlanner;
