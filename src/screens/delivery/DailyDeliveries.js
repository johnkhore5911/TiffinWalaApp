import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity,Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { DeliveryContext } from '../../../App';

const DailyDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { refreshData } = useContext(DeliveryContext);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Fetch data whenever refreshData changes
    getData();
  }, [refreshData]);

  const getData = async () => {
    console.log("Getting data for the DeliveryUser!");

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('User token not found');
      }
      console.log("token: ", token);

      const response = await axios.get(
        'https://tiffin-wala-backend.vercel.app/api/userRoutes/getDeliverUserData',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('User Data: ', response.data);

      if (response.data.success) {
        setDeliveries(response.data.deliveries || []); // Handle cases where `deliveries` might be undefined
      } else {
        throw new Error(response.data.message || 'Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Unable to fetch user data. Please try again.');
    }
  };

  const markDelivered = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('User token not found');
      }

      const payload = {
        deliveryId: id,
      };

      const response = await axios.post(
        'https://tiffin-wala-backend.vercel.app/api/deliveryRoutes/notifyCustomerTiffin',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Update the status locally without changing collectionStatus
        setDeliveries((prev) =>
          prev.map((item) =>
            item._id === id
              ? { ...item, status: 'Delivered' } // Only update the status
              : item
          )
        );
        Alert.alert('Success', 'Customer notified successfully.');
      } else {
        Alert.alert('Error', response.data.message || 'Failed to notify customer.');
      }
    } catch (error) {
      console.error('Error notifying customer:', error);
      Alert.alert('Error', 'Unable to mark as delivered. Please try again.');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getData(); // Fetch new data
    setRefreshing(false); // End refresh
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>Customer: {item.customer.name}</Text>
      <Text style={styles.address}>Address: {item.customer.address}</Text>
      <Text style={styles.date}>Scheduled Time: {item.date}</Text>

      <View style={styles.statusContainer}>
        <Text>
          Status: <Text style={styles[item.status]}>{item.status}</Text>
        </Text>
        <Text>
          Collection Status:{' '}
          <Text style={styles[item.collectionStatus]}>{item.collectionStatus}</Text>
        </Text>
      </View>


      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => openInMaps(item.customer.address)}
      >
        <Text style={styles.mapButtonText}>Open in Maps</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, item.status === 'Delivered' && styles.disabledButton]}
        onPress={() => markDelivered(item._id)}
        disabled={item.status === 'Delivered'}
      >
        <Text style={styles.buttonText}>
          {item.status === 'Delivered' ? 'Delivered' : 'Mark Delivered'}
        </Text>
      </TouchableOpacity>
    </View>
  );



  const openInMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    Linking.openURL(url).catch((err) =>
      Alert.alert('Error', 'Unable to open the address in maps.')
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Deliveries</Text>
      {deliveries.length === 0 ? (
        <Text style={styles.emptyMessage}>No deliveries scheduled for today.</Text>
      ) : (
        <FlatList
          data={deliveries}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          refreshing={refreshing}
          onRefresh={handleRefresh} // Trigger the refresh handler on pull-to-refresh
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapButton: {
    paddingVertical: 10,
    backgroundColor: '#FD3245',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: { padding: 20, backgroundColor: '#FFF0F1D1', flex: 1 },
  header: { fontSize: 25, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#333' },
  emptyMessage: { textAlign: 'center', fontSize: 16, color: '#FF0000', marginTop: 50 },
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  address: { fontSize: 14, marginBottom: 5, color: '#555' },
  date: { fontSize: 14, marginBottom: 10, color: '#555' },
  button: {
    paddingVertical: 10,
    backgroundColor: '#FD3245',
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DailyDeliveries;