
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// const HomeScreen = ({ userName = "Guest", mealCredits = 10, remainingCredits = 4, lunchMenu = [] }) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header with Notification Icon */}
//       <View style={styles.header}>
//         <Text style={styles.welcomeText}>Welcome,</Text>
//         <Ionicons name="notifications-outline" size={26} color="#333" style={styles.bellIcon} />
//       </View>
//       <Text style={styles.userName}>{userName}</Text>

//       {/* Meal Selection Toggle */}
//       <View style={styles.toggleContainer}>
//         <TouchableOpacity style={styles.activeButton}>
//           <Text style={styles.activeButtonText}>Dine In</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.inactiveButton}>
//           <Text style={styles.inactiveButtonText}>Ask for Tiffin</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Meal Credit Section */}
//       <View style={styles.creditContainer}>
//         <Text style={styles.creditTitle}>Total Meal Credit</Text>
//         <Text style={styles.creditSubText}>Credit Remaining: {remainingCredits}</Text>
//         <Text style={styles.creditValue}>{mealCredits}</Text>
//       </View>

//       {/* Lunch Menu Section */}
//       <Text style={styles.sectionTitle}>Today's Lunch Menu</Text>
//       <FlatList
//         data={lunchMenu}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={2}
//         columnWrapperStyle={styles.menuRow}
//         renderItem={({ item }) => <Text style={styles.menuItem}>{item}</Text>}
//       />

//       {/* Note for Meal Timing */}
//       <Text style={styles.noteText}>Note: Lunch will be available at 12:30 PM</Text>

//       {/* QR Code Scan Option */}
//       <Text style={styles.orText}>Or</Text>
//       <TouchableOpacity style={styles.scanButton}>
//         <Text style={styles.scanButtonText}>Scan QR for Meal</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 20, backgroundColor: 'white', flex: 1 },
//   header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   welcomeText: { fontSize: 18, fontWeight:'400',color:"#1F1F1F" },
//   bellIcon: { paddingRight: 10,color:"black" },
//   userName: { fontSize: 22, fontWeight: '400', marginBottom: 10,color:"#1F1F1F" },
//   toggleContainer: { flexDirection: 'row', borderRadius: 8, overflow: 'hidden', backgroundColor: '#f2f2f2', marginVertical: 10 },
//   activeButton: { flex: 1, backgroundColor: '#ff4d4d', padding: 10, alignItems: 'center', borderRadius: 8 },
//   inactiveButton: { flex: 1, padding: 10, alignItems: 'center' },
//   activeButtonText: { color: '#fff', fontWeight: 'bold' },
//   inactiveButtonText: { color: '#333' },
//   creditContainer: { backgroundColor: '#ffe6e6', padding: 15, borderRadius: 8, marginVertical: 10 },
//   creditTitle: { fontSize: 16, fontWeight: 'bold' },
//   creditSubText: { fontSize: 14, color: '#666' },
//   creditValue: { fontSize: 24, fontWeight: 'bold', color: '#ff4d4d', textAlign: 'right' },
//   sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
//   menuRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
//   menuItem: { backgroundColor: '#f2f2f2', padding: 8, borderRadius: 8, flex: 1, textAlign: 'center', marginHorizontal: 5 },
//   noteText: { fontSize: 14, color: '#666', marginTop: 5 },
//   orText: { textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
//   scanButton: { backgroundColor: '#ff4d4d', padding: 12, borderRadius: 8, alignItems: 'center' },
//   scanButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
// });

// export default HomeScreen;


import { FlatList, SafeAreaView,Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState, useCallback,useContext,useRef  } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator, Platform,Modal,TextInput,PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';
import { DeliveryContext } from '../../../App';
import { format } from 'date-fns';
import Geolocation from 'react-native-geolocation-service';

const URL ="https://tiffin-wala-backend.vercel.app/api/";

const HomeScreen = ({ mealCredits = 10, lunchMenu = ["Roti/Chapati","Dal tadka/Dal fry","Sabji","Plain rice/Masala rice"] }) => {
  const [dineInSelected, setDineInSelected] = useState(true); // State to track selection
  const [address, setAddress] = useState("");
  const [planCredits, setPlanCredits] = useState();

  const [credits, setCredits] = useState(null); // State to store meal credits
  const [remainingCredits, setRemainingCredits] = useState(0); // State to track remaining credits
  const [userName, setUserName] = useState('Customer'); // State to store the user's name
  const [loading, setLoading] = useState(true); // State to manage loading
  const [hasSentNotification, setHasSentNotification] = useState(false); // State to track notification sending
  const navigation = useNavigation();
  const [showTiffinBanner, setShowTiffinBanner] = useState(false); // State to control banner visibility
  const [deliveryDetails, setDeliveryDetails] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [dateString, setDateString] = useState('');

  const [refreshing, setRefreshing] = useState(false);
  const { refreshData } = useContext(DeliveryContext);
  const { redundedRefresh } = useContext(DeliveryContext);
  const { deliveryUserId } = useContext(DeliveryContext);
  const isInitialRender = useRef(true);

  const [deliveryData,setDeliveryData]= useState();


  const [modalVisibleDate, setModalVisibleDate] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);


  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    setDatePickerVisible(false); // Close the date picker
  };

  const handleDateCancel = () => {
    setDatePickerVisible(false); // Close the date picker
  };

  const handleModalOpen = () => {
    console.log("!23")
    setModalVisibleDate(true);
  };

  const handleModalClose = () => {
    setModalVisibleDate(false);
  };


  const handleDateChange = (text) => {
    // Example: "29-01-2025 10:25pm" format
    setDateString(text);
    // const parsedDate = new Date(text);
    // if (!isNaN(parsedDate)) {
    //   setSelectedDate(parsedDate);
    // } else {
    //   Alert.alert('Invalid Date Format');
    // }
  };



  const handleOptOut = async () => {
    if (dateString) {
      try {
        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        
        // Check if token exists
        if (!token) {
          Alert.alert('You are not logged in.');
          return;
        }
  
        // Define the request body
        const requestBody = {
          date: dateString, // the dateString you've set earlier
        };
  
        // Send POST request
        const response = await fetch(`${URL}userRoutes/optOutMeal`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the headers
          },
          body: JSON.stringify(requestBody),
        });
  
        // Handle response
        if (response.ok) {
          const responseData = await response.json();
          console.log('Response Data:', responseData);
          Alert.alert(
            'Opt-Out Successful',
            'You have successfully opted out of the meal.'
          );
          setDateString("");
          handleModalClose();
        } else {
          const errorData = await response.json();
          console.error('Error:', errorData);
          Alert.alert('Failed to opt out. Please try again.',"Either you have already opt out");
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Something went wrong.');
      }
    } else {
      Alert.alert('Please select a valid date.');
    }
  };



  const updateAddress = async () => {
      try {
        // Retrieve token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        
        // Check if token exists
        if (!token) {
          Alert.alert('You are not logged in.');
          return;
        }
  
        // Send POST request
        const response = await axios.post(`${URL}userRoutes/updateAddress`, 
          {newAddress:address},
          {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token in the headers
          },
          
        });
  
        // Handle response
        if (response.data.success) {
          Alert.alert(
            'Address updated Successful',
            'You have successfully Updated your Address.'
          );
          setDateString("");
          handleModalClose();
        } else {
          Alert.alert('Failed to Update Address . Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Something went wrong.');
      }
    
  };




    useEffect(() => {
      fetchUserData();
    }, [deliveryUserId]);

    useEffect(() => {
      fetchUserData();
    }, [redundedRefresh]);

  const handleTiffinResponse = async (deliveryId, response) => {
    console.log("deliveryIdx: ",deliveryId);
    console.log("responsex: ",response);
    // setShowTiffinBanner(false); // Hide banner after response
    Alert.alert(
      'Thank You!',
      response === 'yes' ? 'We are glad you received your tiffin!' : 'We will look into the issue.'
    );

    try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('User token not found');
        }
        // Send the response to update the delivery status
        const updateDeliveryResponse = await axios.post(
            `${URL}userRoutes/updateDeliveryStatus`, 
            {
                deliveryId,
                status: response === 'yes' ? 'Delivered' : 'Missed' 
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,  // Pass token in Authorization header
                },
            });

        // Call closeTiffinModal API after updating the delivery status
        const closeModalResponse = await axios.post(
            `${URL}userRoutes/closeTiffinModal`,
            {deliveryId},  // No data to send, just token in headers
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,  // Pass token in Authorization header
                },
            });

        console.log('Update delivery response:', updateDeliveryResponse);
        console.log('Close modal response:', closeModalResponse);
        fetchUserData();

    } catch (error) {
        console.error("Error in handling tiffin response:", error);
        console.log("Error details:", error);
    }
  };

  const fetchDeliveryDetails = async (deliveryId) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
        if (!token) {
            throw new Error('User token not found');
        }
      const response = await axios.post(`${URL}userRoutes/getDeliveryDetails`, 
      {deliveryId},
      {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,  // Pass token in Authorization header
        },
      }
      );
      // const data = await response.json();
      console.log("response:data: ",response.data);
      setDeliveryDetails(response.data); // Set the fetched details
    } catch (error) {
      console.error('Error fetching delivery details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Show details modal
  const showDetails = (deliveryId) => {
    fetchDeliveryDetails(deliveryId); // Fetch delivery details for the clicked ID
    setModalVisible(true); // Show the modal
  };


  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      console.log("token: ",token);
      if (!token) {
        throw new Error('User token not found');
      }
      const response = await axios.get(`${URL}userRoutes/userData`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });
      console.log("This is the user data: ");
      console.log('User Data: ', response.data.data.user);
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch user data');
      }
      const availableCredits = response.data.data.credits.available;
      setCredits(response.data);
      setPlanCredits(response.data.data.mealPlan.planCredits)
      setUserName(response.data.data.user.name);
      setDeliveryData(response.data.data.user.showTiffinModal)
      if(response.data.data.user?.showTiffinModal.length !=0){
        setShowTiffinBanner(true);
      }
      else{
        setShowTiffinBanner(false);
      }
      setRemainingCredits(availableCredits); // Set remaining credits

      // If remaining credits are 5 or less, and no notification has been sent, send notification
      if (availableCredits <= 5 && response.data.data.mealPlan ) {
        sendNotification();
        setHasSentNotification(true); // Mark that the notification has been sent
      } 
      console.log("5")

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
  // if (Platform.OS === 'android' && Platform.Version >= 33) {
  //   PushNotification.requestPermissions()
  //     .then((response) => {
  //       console.log('Notification permission status:', response);
  //     })
  //     .catch((err) => {
  //       console.log('Permission request failed:', err);
  //     });
  // }

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


  // Latitude and longitude
  const [location, setLocation] = useState(null);
  const [placeholder, setPlaceholder] = useState("Update with your exact location");

  // Function to request location permission (Android only)
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS auto-grants location permission when set in `Info.plist`
  };

  // // Function to get user location when the button is pressed
  // const getLocation = async () => {
  //   console.log("Fetching location!")
  //   const hasPermission = await requestLocationPermission();
  //   if (!hasPermission) {
  //     Alert.alert('Permission Denied', 'Enable location permissions to fetch location.');
  //     return;
  //   }

  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setLocation({ latitude, longitude });
  //       console.log("Response latitude: ", latitude);
  //       console.log("Response longitude: ", longitude);
  //       setPlaceholder(`Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(3)}`);
  //     },
  //     (error) => {
  //       Alert.alert('Error', error.message);
  //     },
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //   );
  // };


   // Function to get user location when the button is pressed
   const getLocation = async () => {
    console.log("Fetching location!")
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Enable location permissions to fetch location.');
      return;
    }

    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        console.log("Response latitude: ", latitude);
        console.log("Response longitude: ", longitude);
        setPlaceholder(`Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(3)}`);
        const token = await AsyncStorage.getItem('token');
        if (!token) {
            Alert.alert('Authentication Error', 'User not logged in.');
            return;
        }

        const API_URL = "https://tiffin-wala-backend.vercel.app/api/userRoutes/updateUserLocation";
        // Send location update request
        const response = await axios.post(
            API_URL,
            { latitude, longitude },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Location update response:", response.data);
        Alert.alert('Success', 'Location updated successfully!');

      },
      (error) => {
        Alert.alert('Error', error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {showTiffinBanner &&
              deliveryData.map(deliveryId => (
                <View key={deliveryId} style={styles.banner}>
                  <Text style={styles.bannerText}>
                    Did you receive you tiffin
                  </Text>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => showDetails(deliveryId)}
                  >
                    <Text style={styles.detailsButtonText}>Show Details</Text>
                  </TouchableOpacity>
                  <View style={styles.bannerButtons}>
                    <TouchableOpacity
                      style={styles.yesButton}
                      onPress={() => handleTiffinResponse(deliveryId, 'yes')}
                    >
                      <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.noButton}
                      onPress={() => handleTiffinResponse(deliveryId, 'no')}
                    >
                      <Text style={styles.buttonText}>No</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}


       <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                  ) : (
                    <>
                      {deliveryDetails ? (
                        <>
                          <Text style={styles.modalTitle}>Delivery Details</Text>
                          <Text>Delivery Person name: <Text style={{fontSize:16,fontWeight:"800"}}>{deliveryDetails?.deliveryPersonName}</Text></Text>
                          <Text>Time of delivery: <Text style={{fontSize:16,fontWeight:"800"}}>{deliveryDetails?.timeOfDelivery}</Text></Text>
                        </>
                      ) : (
                        <Text>No details available.</Text>
                      )}
                    </>
                  )}
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

      
      {/* Header with Notification Icon */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Ionicons name="notifications-outline" size={26} color="#333" style={styles.bellIcon} />
      </View>
      <Text style={styles.userName}>{userName}</Text>

      {/* Meal Selection Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, dineInSelected ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setDineInSelected(true)}
        >
          <Text style={dineInSelected ? styles.activeButtonText : styles.inactiveButtonText}>Dine In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !dineInSelected ? styles.activeButton : styles.inactiveButton]}
          onPress={() => setDineInSelected(false)}
        >
          <Text style={!dineInSelected ? styles.activeButtonText : styles.inactiveButtonText}>Ask for Tiffin</Text>
        </TouchableOpacity>
      </View>

      {/* Meal Credit Section */}
          <View style={styles.creditContainer}>
            <View style={{gap:3}}>
              <Text style={styles.creditTitle}>Total Meal Credit</Text>
              <Text style={styles.creditSubText}>Credit remaining  {remainingCredits}</Text>
            </View>
            <View>
              <Text style={styles.creditValue}>{planCredits}</Text>
            </View>
          </View>
      {/* Conditional Rendering Based on Selection */}
      {dineInSelected ? (
        <>

          {/* Lunch Menu Section */}
          <Text style={styles.sectionTitle}>Today's Lunch Menu</Text>
          <View style={[
    { marginBottom: 15 }, 
    lunchMenu.length > 4 ? { maxHeight: 150 } : {}
  ]}>
          <FlatList
            data={lunchMenu}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={styles.menuRow}
            renderItem={({ item }) => <Text style={styles.menuItem}>{item}</Text>}
          />
          </View>

          {/* Note for Meal Timing */}
          <View style={{marginBottom:5}}>
          <Text style={styles.noteText}>Note: Lunch will be available at 12:30 PM</Text>
          </View>
          {/* <Text style={styles.orText}>Or</Text> */}
          <View style={styles.orContainer}>
  <View style={styles.line} />
  <Text style={styles.orText}>Or</Text>
  <View style={styles.line} />
</View>


          {/* QR Code Scan Option */}
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <TouchableOpacity style={styles.scanButton}  onPress={() => navigation.navigate('QRCodeScanner')}>
              <Text style={styles.scanButtonText}>Scan a QR</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // <>
        //   {/* Tiffin Request Section */}
        //   {/* <View style={styles.tiffinContainer}>
        //     <Text style={styles.tiffinText}>Tiffin service has been requested.</Text>
        //     <Text style={styles.tiffinSubText}>Your meal will be packed and ready for pickup.</Text>
        //   </View> */}
        //   <View style={{paddingHorizontal:10}}>
        //     <Text style={{color:"#2A2A2A",fontWeight:"400",fontSize:16}}>Enjoy home-cooked meals with our convenient tiffin delivery service.</Text>
        //   </View>

        //   <View style={{paddingHorizontal:10}}>
        //     <Text style={{color:"#000000",fontWeight:"400",fontSize:16,marginTop:15}}>Update Address</Text>
        //   </View>
        // </>
        <>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ color: "#2A2A2A", fontWeight: "400", fontSize: 16 }}>
            Enjoy home-cooked meals with our convenient tiffin delivery service.
          </Text>
        </View>
  
        {/* Update Address Section */}
        <View style={{ paddingHorizontal: 10, marginTop: 15 }}>
          <Text style={{ color: "#000000", fontWeight: "400", fontSize: 16 }}>Update Address</Text>
  
          {/* Address Input Field */}
          <View style={{flexDirection:"row",gap:5}}>
            <TextInput
              style={styles.addressInput}
              placeholder="Enter your address"
              placeholderTextColor="#999"
              value={address}
              onChangeText={setAddress}
              numberOfLines={2} 
            />

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={()=>updateAddress()}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Fethc location */}
        {/* <View style={styles.activeButton}>
          <Button title="Get Location" onPress={getLocation} />
          {location && (
            <Text style={{ marginTop: 20 }}>
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </Text>
          )}
        </View> */}
        <View style={styles.container1}>
      <View style={styles.row1}>
        {/* Non-editable Address Input */}
        <TextInput
          style={styles.addressInput1}
          // placeholder="Address will appear here"
          placeholder={placeholder} 
          placeholderTextColor="#999"
          value={address}
          editable={false} // Makes it non-editable
          fontSize={13}
        />

        {/* Map Icon Button */}
        <TouchableOpacity style={styles.mapButton1} onPress={getLocation}>
          <Icon name="map-marker" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>

        
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.optOutButton}
            // onPress={() => Alert.alert('Opted out', 'You have opted out of today\'s meal.')}
            onPress={()=>handleModalOpen()}
          >
            <Text style={styles.optOutText}>Opt-Out of Today's Meal</Text>
          </TouchableOpacity>
        </View>

      </>

      )}



      <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisibleDate}
              onRequestClose={handleModalClose}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Pick Date and Time</Text>
      
                  <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                    <Text style={styles.pickDateText}>
                      {selectedDate ? selectedDate.toString() : 'Select Date and Time'}
                    </Text>
                  </TouchableOpacity>
      
                  {/* <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleDateConfirm}
                    onCancel={handleDateCancel}
                  /> */}
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10,height:45 }}
                    placeholder="Enter Date (e.g. 29-01-2025 10:25pm)"
                    value={dateString}
                    onChangeText={handleDateChange}
                  />
      
                  <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
      
                  <TouchableOpacity style={styles.sendButton} onPress={handleOptOut}>
                    <Text style={styles.sendButtonText}>Send Date</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  container1: {
    padding: 16,
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  addressInput1: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#F5F5F5",
    color: "#2A2A2A",
  },
  mapButton1: {
    // padding: 12,
    paddingVertical:8,
    paddingHorizontal:15,
    borderRadius: 8,
    backgroundColor: "#007AFF", // Blue color for better visibility
    justifyContent: "center",
    alignItems: "center",
  },

  banner: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    alignItems: 'center',
    // position:"absolute",
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  pickDateText: {
    fontSize: 16,
    marginBottom: 20,
    color: 'blue',
  },
  closeButton: {
    backgroundColor: 'gray',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: 'green',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  optOutText:{
    color:"white"
  },
  optOutButton: {
    width:"70%",
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
  card: {
    flex:1,
    marginTop:20,
    // justifyContent:"center",
    alignItems:"center",
    // backgroundColor: 'green',
   
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  addressInput: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
    color: "#2A2A2A",
    flex:1,
    fontSize: 10,
  },
  saveButton: {
    marginTop: 10,
    // width: 121,
    // height: 27,
    // paddingVertical:5,
    padding:8,
    // paddingHorizontal:5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    // paddingVertical:5,
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 15,
    color: "#000",
  },
  orContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1, 
    height: 1, 
    backgroundColor: '#F6F6F6', // Change color as needed
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333', // Change color as needed
  },
  container: { padding: 20, backgroundColor: 'white', flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcomeText: { fontSize: 18, fontWeight: '400', color: "#1F1F1F" },
  bellIcon: { paddingRight: 10, color: "black" },
  userName: { fontSize: 22, fontWeight: '400', marginBottom: 10, color: "#1F1F1F" },
  // toggleContainer: { flexDirection: 'row', borderRadius: 8, overflow: 'hidden', marginVertical: 12,borderWidth:1, },
  toggleContainer: { 
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    paddingTop:5,
    paddingBottom:5,
    marginVertical: 12,
    borderTopWidth: 1,      // Only top border
    borderBottomWidth: 1,   // Only bottom border
    borderColor: '#F6F6F6', // Set border color
},

  toggleButton: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 8,fontSize:20 },
  activeButton: { backgroundColor: '#ff4d4d',borderRadius:100 },
  // inactiveButton: { backgroundColor: '#f2f2f2' },
  activeButtonText: { color: '#fff', fontWeight: '500',fontSize:14 },
  inactiveButtonText: { color: '#333',fontSize:14 },
  creditContainer: { backgroundColor: '#FFF2F3', padding: 15,paddingTop:25,paddingBottom:25, borderRadius: 8, marginVertical: 10,flexDirection:'row',justifyContent:`space-between`,alignItems:`center`,paddingVertical:20 },
  creditTitle: { fontSize: 18, fontWeight: '600',color:"#AA0D0D" },
  creditSubText: { fontSize: 13, color: '#4B4B4B'  },
  creditValue: { fontSize: 24, fontWeight: '500', color: '#BE0B0B', textAlign: 'left',paddingRight:10 },
  sectionTitle: { fontSize: 18, fontWeight: '500', marginTop: 15,marginBottom:10,color:"#202020" },
  menuRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  menuItem: { backgroundColor: '#FFF2F3',padding: 8, borderRadius: 8, flex: 1, textAlign: 'center', marginHorizontal: 5,fontSize:12,paddingVertical:12,color:"#4B4B4B" },
  noteText: { fontSize: 13, color: '#202020',fontWeight:"400"},
  orText: { textAlign: 'center', fontSize: 12, fontWeight: '400', marginVertical: 6,color:"#000000" },
  scanButton: { backgroundColor: '#ff4d4d', padding: 12, borderRadius: 8, alignItems: 'center',width:"80%" ,marginTop:5},
  scanButtonText: { color: '#fff', fontWeight: '500', fontSize: 16 },
  tiffinContainer: { backgroundColor: '#e6f7ff', padding: 15, borderRadius: 8, marginVertical: 10, alignItems: 'center' },
  tiffinText: { fontSize: 18, fontWeight: 'bold', color: '#007acc' },
  tiffinSubText: { fontSize: 14, color: '#555', marginTop: 5, textAlign: 'center' },
});

export default HomeScreen;
