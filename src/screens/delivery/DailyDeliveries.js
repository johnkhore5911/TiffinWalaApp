import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity,Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { DeliveryContext } from '../../../App';


// const URL ="http://192.168.18.235:5173/api/";
const URL ="https://tiffin-wala-backend.vercel.app/api/";


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
        // throw new Error('User token not found');
        return;
      }
      console.log("token: ", token);

      const response = await axios.get(
        `${URL}userRoutes/getDeliverUserData`,
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
        // throw new Error('User token not found');
        return;
      }

      const payload = {
        deliveryId: id,
      };

      const response = await axios.post(
        `${URL}deliveryRoutes/notifyCustomerTiffin`,
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
        // onPress={() => openInMaps(item.customer.address)}
        onPress={() => openInMaps(item.customer.address,item.customer.latitude,item.customer.longitude)}
        // onPress={() => openInMaps(30.7474222, 76.7740056)}
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



  // const openInMaps = (address) => {
    // const encodedAddress = encodeURIComponent(address);
    // const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    // Linking.openURL(url).catch((err) =>
    //   Alert.alert('Error', 'Unable to open the address in maps.')
    // );
  // };
  // const openInMaps = (latitude, longitude) => {
  //   const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
  //   Linking.openURL(url).catch((err) =>
  //     Alert.alert('Error', 'Unable to open the location in maps.')
  //   );
  // };

  const openInMaps = (address,latitude, longitude) => {
    console.log("I have these data: ",address,latitude,latitude);
    if(latitude){
      console.log("I am using latitude and longitude block of code");
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      Linking.openURL(url).catch((err) =>
        Alert.alert('Error', 'Unable to open the location in maps.')
      );
    }
    else{
      console.log("I am using text address of the user");
      const encodedAddress = encodeURIComponent(address);
      const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
      Linking.openURL(url).catch((err) =>
        Alert.alert('Error', 'Unable to open the address in maps.')
      );
    }
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
    backgroundColor: '#28a745',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom:5
  },
  mapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: { padding: 20, backgroundColor: '#f8f8f8', flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  emptyMessage: { textAlign: 'center', fontSize: 16, color: '#888', marginTop: 50 },
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  address: { fontSize: 14, marginBottom: 5, color: '#555' },
  date: { fontSize: 14, marginBottom: 10, color: '#555' },
  statusContainer: { marginVertical: 10 },
  Pending: { color: '#ffc107' },
  Delivered: { color: '#28a745' },
  NotCollected: { color: '#007bff' },
  Collected: { color: '#28a745' },
  button: {
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DailyDeliveries;
