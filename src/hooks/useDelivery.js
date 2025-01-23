import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useDeliveries = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("123456")

  useEffect(() => {
    getDeliveriesData();
  }, []);

  const getDeliveriesData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('User token not found');
      }

      // API Request
      const response = await axios.get('http://192.168.18.235:4000/api/userRoutes/getDeliverUserData', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setDeliveries(response.data.deliveries);
      } else {
        throw new Error(response.data.message || 'Failed to fetch user data');
      }
    } catch (err) {
      console.error('Error fetching deliveries:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const markDelivered = (id) => {
    setDeliveries((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status: 'Delivered', collectionStatus: 'Collected' } : item
      )
    );
  };

  return { deliveries, loading, error, markDelivered };
};

export default useDeliveries;
