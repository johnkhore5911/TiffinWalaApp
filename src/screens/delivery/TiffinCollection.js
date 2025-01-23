import React, { useState, useEffect,useCallback } from "react";
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";

const TiffinCollection = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('https://tiffin-wala-backend.vercel.app/api/deliveryRoutes/notCollected', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setCollections(response.data.deliveries);
      }
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false);
    }
  };


   useFocusEffect(
      useCallback(() => {
        fetchData();
      }, []) // Re-run when screen is focused
    );

  const markCollected = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        `https://tiffin-wala-backend.vercel.app/api/deliveryRoutes/collectionStatus`,
        {
          deliveryId: id,
          status: "Collected",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI optimistically
      setCollections((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, collectionStatus: "Collected" } : item
        )
      );
    } catch (error) {
      console.error('Error updating collection status', error);
    }
  };

  const markNotFound = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.post(
        `https://tiffin-wala-backend.vercel.app/api/deliveryRoutes/collectionStatus`,
        {
          deliveryId: id,
          status: "Not Found",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI optimistically
      setCollections((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, collectionStatus: "Not Found" } : item
        )
      );
    } catch (error) {
      console.error('Error updating collection status', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tiffin Collection</Text>
      <FlatList
        data={collections}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item?.customer.name}</Text>
            <Text style={styles.address}>{item?.customer.address}</Text>
            <Text style={styles.status}>
              Delivered at: <Text style={styles.address}>{item?.date}</Text>
            </Text>
            <Text style={styles.status}>
              Status: <Text style={item?.collectionStatus === "Collected" ? styles.collected : styles.notCollected}>{item?.collectionStatus}</Text>
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, item?.collectionStatus === "Collected" && styles.buttonDisabled]}
                onPress={() => markCollected(item?._id)}
                disabled={item?.collectionStatus === "Collected"}
              >
                <Text style={styles.buttonText}>
                  {item?.collectionStatus === "Collected" ? 'Collected' : 'Mark Collected'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, item?.collectionStatus === "Not Found" && styles.buttonDisabled]}
                onPress={() => markNotFound(item?._id)}
                disabled={item?.collectionStatus === "Not Found"}
              >
                <Text style={styles.buttonText}>
                  {item?.collectionStatus === "Not Found" ? 'Not Found' : 'Mark Not Found'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item?._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f9fc',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  address: {
    fontSize: 16,
    color: '#777',
    marginVertical: 5,
  },
  status: {
    fontSize: 16,
    marginVertical: 10,
  },
  collected: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  notCollected: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TiffinCollection;
