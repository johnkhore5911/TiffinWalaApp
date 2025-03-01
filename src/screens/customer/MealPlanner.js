import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import PlanRenewal from "./PlanRenewal";

const MealPlanner = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

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

      {/* <ScrollView>
        <PlanRenewal/>
      </ScrollView> */}

      <View style={{ flex: 1 }}>
        <PlanRenewal />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 20 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  backText: { fontSize: 16, marginLeft: 5 },
  header: { fontSize: 22, fontWeight: "500", marginBottom: 10,color:"black" },
  subHeader: { fontSize: 16, color: "black", marginBottom: 5 },
  expiryNotice: { fontSize: 14, color: "red", marginBottom: 15 },
  currentPlan: { backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#D9D9D9", alignItems: "center" },
  planText: { fontSize: 16, fontWeight: "500",color:"#2C2C2C"},
  includedText: { fontSize: 12, color: "#666", marginTop: 5 },
  exploreTitle: { fontSize: 18, fontWeight: "bold", marginTop: 25, marginBottom: 10,color:"black" },
  planCard: { backgroundColor: "#f2f2f2", padding: 15, borderRadius: 8, marginBottom: 10 },
  planCardText: { fontSize: 16, fontWeight: "bold" },
});

export default MealPlanner;
