import React, { useEffect, useState, useCallback,useContext,useRef  } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import { DeliveryContext } from '../../../App';


const HomeScreen = () => {
  const [credits, setCredits] = useState(null); // State to store meal credits
  const [remainingCredits, setRemainingCredits] = useState(0); // State to track remaining credits
  const [userName, setUserName] = useState('Customer'); // State to store the user's name
  const [loading, setLoading] = useState(true); // State to manage loading
  const [hasSentNotification, setHasSentNotification] = useState(false); // State to track notification sending
  const navigation = useNavigation();
  const [showTiffinBanner, setShowTiffinBanner] = useState(false); // State to control banner visibility

  const [refreshing, setRefreshing] = useState(false);
  const { refreshData } = useContext(DeliveryContext);
  const { redundedRefresh } = useContext(DeliveryContext);
  const { deliveryUserId } = useContext(DeliveryContext);
  const isInitialRender = useRef(true);


    useEffect(() => {
      // Fetch data whenever refreshData changes

      if (isInitialRender.current) {
        isInitialRender.current = false; // Mark the initial render as completed
        return; // Skip the first mount
      }
      setShowTiffinBanner(true);
      fetchUserData();
    }, [refreshData]);
    
    
    useEffect(() => {
      // console.log('deliveryUserId:', deliveryUserId);
      console.log("data aya hai aur delivery id yeh hai: ",deliveryUserId);
      // Other logic using deliveryUserId
    }, [deliveryUserId]);



    useEffect(() => {
      fetchUserData();
    }, [redundedRefresh]);


  const handleTiffinResponse = async(response) => {
    console.log(response);
    setShowTiffinBanner(false); // Hide banner after response
    Alert.alert(
      'Thank You!',
      response === 'yes' ? 'We are glad you received your tiffin!' : 'We will look into the issue.'
    );
    

    // Optionally send the response to the server
    // axios.post('http://192.168.18.235:4000/api/userRoutes/updateDeliveryStatus', { received: response === 'yes' });
    try{
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('User token not found');
        }
        // console.log("response : ",r)
        const responseApi = await axios.post('https://tiffin-wala-backend.vercel.app/api/userRoutes/updateDeliveryStatus',{deliveryId:deliveryUserId , status : response === 'yes' ? 'Delivered' : 'Missed' }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        });
    }
    catch(error){
      console.error(error);
      console.log("error hai",error)
    }
  };


  const fetchUserData = async () => {
    try {
      setLoading(true);

      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('User token not found');
      }

      // API Request
      const response = await axios.get('https://tiffin-wala-backend.vercel.app/api/userRoutes/userData', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });

      console.log('User Data: ', response.data);

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch user data');
      }
      // Set credits and user name
      const availableCredits = response.data.data.credits.available;

      setCredits(response.data);
      setUserName(response.data.data.user.name);


      setRemainingCredits(availableCredits); // Set remaining credits

      // If remaining credits are 5 or less, and no notification has been sent, send notification
      if (availableCredits <= 5 && response.data.data.mealPlan ) {
        sendNotification();
        setHasSentNotification(true); // Mark that the notification has been sent
      } 
      console.log("5")

      
      // // If remaining credits are more than 5, reset the notification flag to allow future notifications
      // if (availableCredits > 5) {
      //   setHasSentNotification(false); // Reset the flag if credits are above 5
      // }

    } catch (error) {
      console.error('Error fetching user data:', error);
      // Alert.alert('Error', 'Unable to fetch user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Run once on mount

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, []) // Re-run when screen is focused
  );

  PushNotification.configure({
    onNotification: function (notification) {
      console.log('Notification received:', notification);
    },
    requestPermissions: Platform.OS === 'ios',
  });

  // Ensure notification permissions for Android 13+
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    PushNotification.requestPermissions()
      .then((response) => {
        console.log('Notification permission status:', response);
      })
      .catch((err) => {
        console.log('Permission request failed:', err);
      });
  }

  // Create a notification channel (required for Android 8+)
  PushNotification.createChannel(
    {
      channelId: 'student-channel', // Unique ID
      channelName: 'Student Notifications', // Displayed Name
      channelDescription: 'Notifications for student updates', // Description
      soundName: 'default', // Optional
      importance: 4, // Importance level
      vibrate: true, // Default vibration for notifications
    },
    (created) => console.log(`Channel created: ${created}`) // Callback for channel creation
  );

  // Function to trigger a local notification
  const sendNotification = () => {
    PushNotification.localNotification({
      channelId: 'student-channel',
      title: 'Meal Credits Low',
      message: 'Your meal credits are running low. Please renew your plan soon to avoid any interruptions!',
      color: 'red',
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {showTiffinBanner && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Did you receive your tiffin?</Text>
          <View style={styles.bannerButtons}>
            <TouchableOpacity
              style={styles.yesButton}
              onPress={() => handleTiffinResponse('yes')}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.noButton}
              onPress={() => handleTiffinResponse('no')}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Welcome Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome, {userName}!</Text>
        {/* <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('Profile')}>
          <Icon name="user-circle" size={30} color="#007bff" />
        </TouchableOpacity> */}
      </View>

      {/* Meal Credits System */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Meal Credits</Text>
        <View style={styles.credits}>
          <Text style={styles.creditsText}>
            Remaining Credits: {remainingCredits || 0}
          </Text>
          <TouchableOpacity style={styles.renewButton} onPress={() => navigation.navigate('PlanRenewal')}>
            <Text style={styles.renewButtonText}>Renew Plan</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Daily Meal Notifications */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Meal</Text>
        <Text style={styles.menuText}>
          Today's Menu: {credits?.mealPlan?.menu || 'N/A'}
        </Text>
        <TouchableOpacity
          style={styles.optOutButton}
          onPress={() => Alert.alert('Opted out', 'You have opted out of today\'s meal.')}
        >
          <Text style={styles.optOutText}>Opt-Out of Today's Meal</Text>
        </TouchableOpacity>
      </View>

      {/* QR Code Scanning for Dining */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dining Access</Text>
        <TouchableOpacity style={styles.qrButton} onPress={() => navigation.navigate('QRCodeScanner')}>
          <Icon name="qrcode" size={30} color="#fff" />
          <Text style={styles.qrText}>Scan QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ScanHistory')}>
          <Text style={styles.historyText}>View Scan History</Text>
        </TouchableOpacity>
      </View>

      {/* Notification Center */}
      <View style={styles.notification}>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon name="bell" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f7f9fc',
  },
  banner: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bannerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  yesButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  noButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileIcon: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  credits: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditsText: {
    fontSize: 16,
  },
  renewButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  renewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuText: {
    fontSize: 16,
    marginBottom: 10,
  },
  optOutButton: {
    backgroundColor: '#f44336',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optOutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  qrText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  historyText: {
    color: '#007bff',
    marginTop: 10,
    fontSize: 14,
  },
  notification: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 5,
  },
});

export default HomeScreen;
