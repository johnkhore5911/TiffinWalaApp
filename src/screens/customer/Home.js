// import React, { useEffect, useState, useCallback,useContext,useRef  } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator, Platform } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import PushNotification from 'react-native-push-notification';
// import { DeliveryContext } from '../../../App';


// const HomeScreen = () => {
//   const [credits, setCredits] = useState(null); // State to store meal credits
//   const [remainingCredits, setRemainingCredits] = useState(0); // State to track remaining credits
//   const [userName, setUserName] = useState('Customer'); // State to store the user's name
//   const [loading, setLoading] = useState(true); // State to manage loading
//   const [hasSentNotification, setHasSentNotification] = useState(false); // State to track notification sending
//   const navigation = useNavigation();
//   const [showTiffinBanner, setShowTiffinBanner] = useState(false); // State to control banner visibility

//   const [refreshing, setRefreshing] = useState(false);
//   const { refreshData } = useContext(DeliveryContext);
//   const { redundedRefresh } = useContext(DeliveryContext);
//   const { deliveryUserId } = useContext(DeliveryContext);
//   const isInitialRender = useRef(true);


//     useEffect(() => {
//       // Fetch data whenever refreshData changes

//       if (isInitialRender.current) {
//         isInitialRender.current = false; // Mark the initial render as completed
//         return; // Skip the first mount
//       }
//       setShowTiffinBanner(true);
//       fetchUserData();
//     }, [refreshData]);




    
    
//     // useEffect(() => {
//     //   // console.log('deliveryUserId:', deliveryUserId);
//     //   setShowTiffinBanner(true);
//     //   console.log("data aya hai aur delivery id yeh hai: ",deliveryUserId);
//     //   // Other logic using deliveryUserId
//     // }, [deliveryUserId]);

//     // useEffect(() => {
//     //   if (deliveryUserId) { // Only execute if deliveryUserId is truthy
//     //     setShowTiffinBanner(true);
//     //     console.log("Data aya hai aur delivery id yeh hai: ", deliveryUserId);
//     //     // Other logic using deliveryUserId
//     //   }
//     // }, [deliveryUserId]);



//     useEffect(() => {
//       // Check AsyncStorage for the flag on app load
//       // const checkBannerState = async () => {
//       //   const bannerFlag = await AsyncStorage.getItem('showTiffinBanner');
//       //   if (bannerFlag === 'true') {
//       //     setShowTiffinBanner(true);
//       //   }
//       // };
//       // checkBannerState();
//       console.log("123231: ",deliveryUserId);
//       fetchUserData();
//     }, [deliveryUserId]);



//     useEffect(() => {
//       fetchUserData();
//     }, [redundedRefresh]);


//   // const handleTiffinResponse = async(response) => {
//   //   console.log(response);
//   //   setShowTiffinBanner(false); // Hide banner after response
//   //   // await AsyncStorage.removeItem('showTiffinBanner');
//   //   Alert.alert(
//   //     'Thank You!',
//   //     response === 'yes' ? 'We are glad you received your tiffin!' : 'We will look into the issue.'
//   //   );
    

//   //   // Optionally send the response to the server
//   //   // axios.post('http://192.168.18.235:4000/api/userRoutes/updateDeliveryStatus', { received: response === 'yes' });
//   //   try{
//   //       const token = await AsyncStorage.getItem('token');
//   //       if (!token) {
//   //         throw new Error('User token not found');
//   //       }
//   //       // console.log("response : ",r)
//   //       const responseApi = await axios.post('http://192.168.18.235:4000/api/userRoutes/updateDeliveryStatus',{deliveryId:deliveryUserId , status : response === 'yes' ? 'Delivered' : 'Missed' }, {
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           Authorization: `Bearer ${token}`, // Pass token in Authorization header
//   //         },
//   //       });
//   //     // fetchUserData();
//   //   }
//   //   catch(error){
//   //     console.error(error);
//   //     console.log("error hai",error)
//   //   }
//   // };



//   const handleTiffinResponse = async (response) => {
//     console.log("response: ",response);
//     setShowTiffinBanner(false); // Hide banner after response
//     // await AsyncStorage.removeItem('showTiffinBanner');

//     // Display appropriate alert based on response
//     Alert.alert(
//       'Thank You!',
//       response === 'yes' ? 'We are glad you received your tiffin!' : 'We will look into the issue.'
//     );

//     try {
//         const token = await AsyncStorage.getItem('token');
//         if (!token) {
//             throw new Error('User token not found');
//         }

//         // Send the response to update the delivery status
//         const updateDeliveryResponse = await axios.post(
//             'https://tiffin-wala-backend.vercel.app/api/userRoutes/updateDeliveryStatus', 
//             {
//                 deliveryId: deliveryUserId,
//                 status: response === 'yes' ? 'Delivered' : 'Missed' 
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,  // Pass token in Authorization header
//                 },
//             });

//         // Call closeTiffinModal API after updating the delivery status
//         const closeModalResponse = await axios.post(
//             'https://tiffin-wala-backend.vercel.app/api/userRoutes/closeTiffinModal',
//             {},  // No data to send, just token in headers
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,  // Pass token in Authorization header
//                 },
//             });

//         // Optionally, you can log or handle the responses here
//         console.log('Update delivery response:', updateDeliveryResponse);
//         console.log('Close modal response:', closeModalResponse);

//         // You can fetch user data or take other actions if necessary
//         // fetchUserData(); 

//     } catch (error) {
//         console.error("Error in handling tiffin response:", error);
//         console.log("Error details:", error);
//     }
//   };



//   const fetchUserData = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         throw new Error('User token not found');
//       }

//       // API Request
//       const response = await axios.get('https://tiffin-wala-backend.vercel.app/api/userRoutes/userData', {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`, // Pass token in Authorization header
//         },
//       });

//       console.log('User Data: ', response.data);

//       if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to fetch user data');
//       }
//       // Set credits and user name
//       const availableCredits = response.data.data.credits.available;

//       setCredits(response.data);
//       setUserName(response.data.data.user.name);
//       if(response.data.data.user?.showTiffinModal){
//         setShowTiffinBanner(true);
//       }
//       else{
//         setShowTiffinBanner(false);
//       }


//       setRemainingCredits(availableCredits); // Set remaining credits

//       // If remaining credits are 5 or less, and no notification has been sent, send notification
//       if (availableCredits <= 5 && response.data.data.mealPlan ) {
//         sendNotification();
//         setHasSentNotification(true); // Mark that the notification has been sent
//       } 
//       console.log("5")

      
//       // // If remaining credits are more than 5, reset the notification flag to allow future notifications
//       // if (availableCredits > 5) {
//       //   setHasSentNotification(false); // Reset the flag if credits are above 5
//       // }

//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       // Alert.alert('Error', 'Unable to fetch user data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []); // Run once on mount

//   useFocusEffect(
//     useCallback(() => {
//       fetchUserData();
//     }, []) // Re-run when screen is focused
//   );

//   PushNotification.configure({
//     onNotification: function (notification) {
//       console.log('Notification received:', notification);
//     },
//     requestPermissions: Platform.OS === 'ios',
//   });

//   // Ensure notification permissions for Android 13+
//   if (Platform.OS === 'android' && Platform.Version >= 33) {
//     PushNotification.requestPermissions()
//       .then((response) => {
//         console.log('Notification permission status:', response);
//       })
//       .catch((err) => {
//         console.log('Permission request failed:', err);
//       });
//   }

//   // Create a notification channel (required for Android 8+)
//   PushNotification.createChannel(
//     {
//       channelId: 'student-channel', // Unique ID
//       channelName: 'Student Notifications', // Displayed Name
//       channelDescription: 'Notifications for student updates', // Description
//       soundName: 'default', // Optional
//       importance: 4, // Importance level
//       vibrate: true, // Default vibration for notifications
//     },
//     (created) => console.log(`Channel created: ${created}`) // Callback for channel creation
//   );

//   // Function to trigger a local notification
//   const sendNotification = () => {
//     PushNotification.localNotification({
//       channelId: 'student-channel',
//       title: 'Meal Credits Low',
//       message: 'Your meal credits are running low. Please renew your plan soon to avoid any interruptions!',
//       color: 'red',
//     });
//   };
//   return (
//     <ScrollView contentContainerStyle={styles.container}>

//       {showTiffinBanner && (
//         <View style={styles.banner}>
//           <Text style={styles.bannerText}>Did you receive your tiffin?</Text>
//           <View style={styles.bannerButtons}>
//             <TouchableOpacity
//               style={styles.yesButton}
//               onPress={() => handleTiffinResponse('yes')}
//             >
//               <Text style={styles.buttonText}>Yes</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.noButton}
//               onPress={() => handleTiffinResponse('no')}
//             >
//               <Text style={styles.buttonText}>No</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       )}

//       {/* Welcome Section */}
//       <View style={styles.header}>
//         <Text style={styles.greeting}>Welcome, {userName}!</Text>
//         {/* <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('Profile')}>
//           <Icon name="user-circle" size={30} color="#007bff" />
//         </TouchableOpacity> */}
//       </View>

//       {/* Meal Credits System */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Meal Credits</Text>
//         <View style={styles.credits}>
//           <Text style={styles.creditsText}>
//             Remaining Credits: {remainingCredits || 0}
//           </Text>
//           <TouchableOpacity style={styles.renewButton} onPress={() => navigation.navigate('PlanRenewal')}>
//             <Text style={styles.renewButtonText}>Renew Plan</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Daily Meal Notifications */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Daily Meal</Text>
//         <Text style={styles.menuText}>
//           Today's Menu: {credits?.mealPlan?.menu || 'N/A'}
//         </Text>
//         <TouchableOpacity
//           style={styles.optOutButton}
//           onPress={() => Alert.alert('Opted out', 'You have opted out of today\'s meal.')}
//         >
//           <Text style={styles.optOutText}>Opt-Out of Today's Meal</Text>
//         </TouchableOpacity>
//       </View>

//       {/* QR Code Scanning for Dining */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Dining Access</Text>
//         <TouchableOpacity style={styles.qrButton} onPress={() => navigation.navigate('QRCodeScanner')}>
//           <Icon name="qrcode" size={30} color="#fff" />
//           <Text style={styles.qrText}>Scan QR Code</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('ScanHistory')}>
//           <Text style={styles.historyText}>View Scan History</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Notification Center */}
//       <View style={styles.notification}>
//         <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
//           <Icon name="bell" size={30} color="#007bff" />
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#f7f9fc',
//   },
//   banner: {
//     backgroundColor: '#f1f1f1',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//     elevation: 3,
//     alignItems: 'center',
//   },
//   bannerText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   bannerButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
//   },
//   yesButton: {
//     backgroundColor: '#4caf50',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   noButton: {
//     backgroundColor: '#f44336',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   loader: {
//     marginTop: 50,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   greeting: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   profileIcon: {
//     padding: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 20,
//     marginBottom: 20,
//     borderRadius: 10,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#007bff',
//     marginBottom: 10,
//   },
//   credits: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   creditsText: {
//     fontSize: 16,
//   },
//   renewButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   renewButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   menuText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   optOutButton: {
//     backgroundColor: '#f44336',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginTop: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   optOutText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   qrButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 10,
//     justifyContent: 'center',
//   },
//   qrText: {
//     color: '#fff',
//     marginLeft: 10,
//     fontWeight: 'bold',
//   },
//   historyText: {
//     color: '#007bff',
//     marginTop: 10,
//     fontSize: 14,
//   },
//   notification: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 50,
//     elevation: 5,
//   },
// });

// export default HomeScreen;


// import React, { useEffect, useState, useCallback,useContext,useRef  } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView, ActivityIndicator, Platform,Modal,TextInput } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import PushNotification from 'react-native-push-notification';
// import { DeliveryContext } from '../../../App';
// import { format } from 'date-fns';


// const HomeScreen = () => {
//   const [credits, setCredits] = useState(null); // State to store meal credits
//   const [remainingCredits, setRemainingCredits] = useState(0); // State to track remaining credits
//   const [userName, setUserName] = useState('Customer'); // State to store the user's name
//   const [loading, setLoading] = useState(true); // State to manage loading
//   const [hasSentNotification, setHasSentNotification] = useState(false); // State to track notification sending
//   const navigation = useNavigation();
//   const [showTiffinBanner, setShowTiffinBanner] = useState(false); // State to control banner visibility
//   const [deliveryDetails, setDeliveryDetails] = useState(null);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [dateString, setDateString] = useState('');

//   const [refreshing, setRefreshing] = useState(false);
//   const { refreshData } = useContext(DeliveryContext);
//   const { redundedRefresh } = useContext(DeliveryContext);
//   const { deliveryUserId } = useContext(DeliveryContext);
//   const isInitialRender = useRef(true);

//   const [deliveryData,setDeliveryData]= useState();


//   const [modalVisibleDate, setModalVisibleDate] = useState(false);
//   const [isDatePickerVisible, setDatePickerVisible] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(null);


//   const handleDateConfirm = (date) => {
//     setSelectedDate(date);
//     setDatePickerVisible(false); // Close the date picker
//   };

//   const handleDateCancel = () => {
//     setDatePickerVisible(false); // Close the date picker
//   };

//   const handleModalOpen = () => {
//     console.log("!23")
//     setModalVisibleDate(true);
//   };

//   const handleModalClose = () => {
//     setModalVisibleDate(false);
//   };


//   const handleDateChange = (text) => {
//     // Example: "29-01-2025 10:25pm" format
//     setDateString(text);
//     // const parsedDate = new Date(text);
//     // if (!isNaN(parsedDate)) {
//     //   setSelectedDate(parsedDate);
//     // } else {
//     //   Alert.alert('Invalid Date Format');
//     // }
//   };



//   const handleOptOut = async () => {
//     if (dateString) {
//       try {
//         // Retrieve token from AsyncStorage
//         const token = await AsyncStorage.getItem('token');
        
//         // Check if token exists
//         if (!token) {
//           Alert.alert('You are not logged in.');
//           return;
//         }
  
//         // Define the request body
//         const requestBody = {
//           date: dateString, // the dateString you've set earlier
//         };
  
//         // Send POST request
//         const response = await fetch('https://tiffin-wala-backend.vercel.app/api/userRoutes/optOutMeal', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`, // Include the token in the headers
//           },
//           body: JSON.stringify(requestBody),
//         });
  
//         // Handle response
//         if (response.ok) {
//           const responseData = await response.json();
//           console.log('Response Data:', responseData);
//           Alert.alert(
//             'Opt-Out Successful',
//             'You have successfully opted out of the meal.'
//           );
//           setDateString("");
//           handleModalClose();
//         } else {
//           const errorData = await response.json();
//           console.error('Error:', errorData);
//           Alert.alert('Failed to opt out. Please try again.',"Either you have already opt out");
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         Alert.alert('Something went wrong.');
//       }
//     } else {
//       Alert.alert('Please select a valid date.');
//     }
//   };



//     useEffect(() => {
//       fetchUserData();
//     }, [deliveryUserId]);

//     useEffect(() => {
//       fetchUserData();
//     }, [redundedRefresh]);

//   const handleTiffinResponse = async (deliveryId, response) => {
//     console.log("deliveryIdx: ",deliveryId);
//     console.log("responsex: ",response);
//     // setShowTiffinBanner(false); // Hide banner after response
//     Alert.alert(
//       'Thank You!',
//       response === 'yes' ? 'We are glad you received your tiffin!' : 'We will look into the issue.'
//     );

//     try {
//         const token = await AsyncStorage.getItem('token');
//         if (!token) {
//             throw new Error('User token not found');
//         }
//         // Send the response to update the delivery status
//         const updateDeliveryResponse = await axios.post(
//             'https://tiffin-wala-backend.vercel.app/api/userRoutes/updateDeliveryStatus', 
//             {
//                 deliveryId,
//                 status: response === 'yes' ? 'Delivered' : 'Missed' 
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,  // Pass token in Authorization header
//                 },
//             });

//         // Call closeTiffinModal API after updating the delivery status
//         const closeModalResponse = await axios.post(
//             'https://tiffin-wala-backend.vercel.app/api/userRoutes/closeTiffinModal',
//             {deliveryId},  // No data to send, just token in headers
//             {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,  // Pass token in Authorization header
//                 },
//             });

//         console.log('Update delivery response:', updateDeliveryResponse);
//         console.log('Close modal response:', closeModalResponse);
//         fetchUserData();

//     } catch (error) {
//         console.error("Error in handling tiffin response:", error);
//         console.log("Error details:", error);
//     }
//   };

//   const fetchDeliveryDetails = async (deliveryId) => {
//     setLoading(true);
//     try {
//       const token = await AsyncStorage.getItem('token');
//         if (!token) {
//             throw new Error('User token not found');
//         }
//       const response = await axios.post("https://tiffin-wala-backend.vercel.app/api/userRoutes/getDeliveryDetails", 
//       {deliveryId},
//       {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,  // Pass token in Authorization header
//         },
//       }
//       );
//       // const data = await response.json();
//       console.log("response:data: ",response.data);
//       setDeliveryDetails(response.data); // Set the fetched details
//     } catch (error) {
//       console.error('Error fetching delivery details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show details modal
//   const showDetails = (deliveryId) => {
//     fetchDeliveryDetails(deliveryId); // Fetch delivery details for the clicked ID
//     setModalVisible(true); // Show the modal
//   };


//   const fetchUserData = async () => {
//     try {
//       setLoading(true);
//       const token = await AsyncStorage.getItem('token');
//       if (!token) {
//         throw new Error('User token not found');
//       }
//       const response = await axios.get('https://tiffin-wala-backend.vercel.app/api/userRoutes/userData', {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`, // Pass token in Authorization header
//         },
//       });
//       console.log('User Data: ', response.data.data.user);
//       if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to fetch user data');
//       }
//       const availableCredits = response.data.data.credits.available;
//       setCredits(response.data);
//       setUserName(response.data.data.user.name);
//       setDeliveryData(response.data.data.user.showTiffinModal)
//       if(response.data.data.user?.showTiffinModal.length !=0){
//         setShowTiffinBanner(true);
//       }
//       else{
//         setShowTiffinBanner(false);
//       }
//       setRemainingCredits(availableCredits); // Set remaining credits

//       // If remaining credits are 5 or less, and no notification has been sent, send notification
//       if (availableCredits <= 5 && response.data.data.mealPlan ) {
//         sendNotification();
//         setHasSentNotification(true); // Mark that the notification has been sent
//       } 
//       console.log("5")

//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       // Alert.alert('Error', 'Unable to fetch user data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []); // Run once on mount

//   useFocusEffect(
//     useCallback(() => {
//       fetchUserData();
//     }, []) // Re-run when screen is focused
//   );

//   PushNotification.configure({
//     onNotification: function (notification) {
//       console.log('Notification received:', notification);
//     },
//     requestPermissions: Platform.OS === 'ios',
//   });

//   // Ensure notification permissions for Android 13+
//   // if (Platform.OS === 'android' && Platform.Version >= 33) {
//   //   PushNotification.requestPermissions()
//   //     .then((response) => {
//   //       console.log('Notification permission status:', response);
//   //     })
//   //     .catch((err) => {
//   //       console.log('Permission request failed:', err);
//   //     });
//   // }

//   // Create a notification channel (required for Android 8+)
//   PushNotification.createChannel(
//     {
//       channelId: 'student-channel', // Unique ID
//       channelName: 'Student Notifications', // Displayed Name
//       channelDescription: 'Notifications for student updates', // Description
//       soundName: 'default', // Optional
//       importance: 4, // Importance level
//       vibrate: true, // Default vibration for notifications
//     },
//     (created) => console.log(`Channel created: ${created}`) // Callback for channel creation
//   );

//   // Function to trigger a local notification
//   const sendNotification = () => {
//     PushNotification.localNotification({
//       channelId: 'student-channel',
//       title: 'Meal Credits Low',
//       message: 'Your meal credits are running low. Please renew your plan soon to avoid any interruptions!',
//       color: 'red',
//     });
//   };
//   return (
//     <ScrollView contentContainerStyle={styles.container}>

//       {showTiffinBanner &&
//         deliveryData.map(deliveryId => (
//           <View key={deliveryId} style={styles.banner}>
//             <Text style={styles.bannerText}>
//               Did you receive you tiffin
//             </Text>
//             <TouchableOpacity
//               style={styles.detailsButton}
//               onPress={() => showDetails(deliveryId)}
//             >
//               <Text style={styles.detailsButtonText}>Show Details</Text>
//             </TouchableOpacity>
//             <View style={styles.bannerButtons}>
//               <TouchableOpacity
//                 style={styles.yesButton}
//                 onPress={() => handleTiffinResponse(deliveryId, 'yes')}
//               >
//                 <Text style={styles.buttonText}>Yes</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.noButton}
//                 onPress={() => handleTiffinResponse(deliveryId, 'no')}
//               >
//                 <Text style={styles.buttonText}>No</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         ))}


//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {loading ? (
//               <ActivityIndicator size="large" color="#0000ff" />
//             ) : (
//               <>
//                 {deliveryDetails ? (
//                   <>
//                     <Text style={styles.modalTitle}>Delivery Details</Text>
//                     <Text>Delivery Person name: <Text style={{fontSize:16,fontWeight:"800"}}>{deliveryDetails?.deliveryPersonName}</Text></Text>
//                     <Text>Time of delivery: <Text style={{fontSize:16,fontWeight:"800"}}>{deliveryDetails?.timeOfDelivery}</Text></Text>
//                   </>
//                 ) : (
//                   <Text>No details available.</Text>
//                 )}
//               </>
//             )}
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setModalVisible(false)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>




//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisibleDate}
//         onRequestClose={handleModalClose}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Pick Date and Time</Text>

//             <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
//               <Text style={styles.pickDateText}>
//                 {selectedDate ? selectedDate.toString() : 'Select Date and Time'}
//               </Text>
//             </TouchableOpacity>

//             {/* <DateTimePickerModal
//               isVisible={isDatePickerVisible}
//               mode="datetime"
//               onConfirm={handleDateConfirm}
//               onCancel={handleDateCancel}
//             /> */}
//             <TextInput
//               style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10,height:45 }}
//               placeholder="Enter Date (e.g. 29-01-2025 10:25pm)"
//               value={dateString}
//               onChangeText={handleDateChange}
//             />

//             <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.sendButton} onPress={handleOptOut}>
//               <Text style={styles.sendButtonText}>Send Date</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Welcome Section */}
//       <View style={styles.header}>
//         <Text style={styles.greeting}>Welcome, {userName}!</Text>
//         {/* <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('Profile')}>
//           <Icon name="user-circle" size={30} color="#007bff" />
//         </TouchableOpacity> */}
//       </View>

//       {/* Meal Credits System */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Meal Credits</Text>
//         <View style={styles.credits}>
//           <Text style={styles.creditsText}>
//             Remaining Credits: {remainingCredits || 0}
//           </Text>
//           <TouchableOpacity style={styles.renewButton} onPress={() => navigation.navigate('PlanRenewal')}>
//             <Text style={styles.renewButtonText}>Renew Plan</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Daily Meal Notifications */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Daily Meal</Text>
//         {/* <Text style={styles.menuText}> */}
//           {/* Today's Menu: {credits?.mealPlan?.menu || 'N/A'} */}
//         {/* </Text> */}
//         <TouchableOpacity
//           style={styles.optOutButton}
//           // onPress={() => Alert.alert('Opted out', 'You have opted out of today\'s meal.')}
//           onPress={()=>handleModalOpen()}
//         >
//           <Text style={styles.optOutText}>Opt-Out of Today's Meal</Text>
//         </TouchableOpacity>
//       </View>

//       {/* QR Code Scanning for Dining */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Dining Access</Text>
//         <TouchableOpacity style={styles.qrButton} onPress={() => navigation.navigate('QRCodeScanner')}>
//           <Icon name="qrcode" size={30} color="#fff" />
//           <Text style={styles.qrText}>Scan QR Code</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('ScanHistory')}>
//           <Text style={styles.historyText}>View Scan History</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Notification Center */}
//       {/* <View style={styles.notification}>
//         <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
//           <Icon name="bell" size={30} color="#007bff" />
//         </TouchableOpacity>
//       </View> */}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   openModalButton: {
//     fontSize: 18,
//     color: 'blue',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: 300,
//   },
//   modalTitle: {
//     fontSize: 20,
//     marginBottom: 10,
//   },
//   pickDateText: {
//     fontSize: 16,
//     marginBottom: 20,
//     color: 'blue',
//   },
//   closeButton: {
//     backgroundColor: 'gray',
//     padding: 10,
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   sendButton: {
//     backgroundColor: 'green',
//     padding: 10,
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   sendButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   closeButton: {
//     marginTop: 20,
//     backgroundColor: '#FF5733',
//     padding: 10,
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#FFF0F1D1',
//   },
//   banner: {
//     backgroundColor: '#f1f1f1',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//     elevation: 3,
//     alignItems: 'center',
//   },
//   bannerText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   bannerButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
//   },
//   yesButton: {
//     backgroundColor: '#4caf50',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   noButton: {
//     backgroundColor: '#f44336',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginHorizontal: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   loader: {
//     marginTop: 50,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   greeting: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   profileIcon: {
//     padding: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 20,
//     marginBottom: 20,
//     borderRadius: 10,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   credits: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   creditsText: {
//     fontSize: 16,
//   },
//   renewButton: {
//     backgroundColor: '#FD3245',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   renewButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   menuText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   optOutButton: {
//     backgroundColor: '#FD3245',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginTop: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   optOutText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   qrButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FD3245',
//     padding: 15,
//     borderRadius: 10,
//     justifyContent: 'center',
//   },
//   qrText: {
//     color: '#fff',
//     marginLeft: 10,
//     fontWeight: 'bold',
//   },
//   historyText: {
//     color: '#333',
//     marginTop: 10,
//     fontSize: 14,
//   },
//   notification: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 50,
//     elevation: 5,
//   },
// });

// export default HomeScreen;




import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ userName = "Guest", mealCredits = 10, remainingCredits = 4, lunchMenu = [] }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Notification Icon */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Ionicons name="notifications-outline" size={26} color="#333" style={styles.bellIcon} />
      </View>
      <Text style={styles.userName}>{userName}</Text>

      {/* Meal Selection Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity style={styles.activeButton}>
          <Text style={styles.activeButtonText}>Dine In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inactiveButton}>
          <Text style={styles.inactiveButtonText}>Ask for Tiffin</Text>
        </TouchableOpacity>
      </View>

      {/* Meal Credit Section */}
      <View style={styles.creditContainer}>
        <Text style={styles.creditTitle}>Total Meal Credit</Text>
        <Text style={styles.creditSubText}>Credit Remaining: {remainingCredits}</Text>
        <Text style={styles.creditValue}>{mealCredits}</Text>
      </View>

      {/* Lunch Menu Section */}
      <Text style={styles.sectionTitle}>Today's Lunch Menu</Text>
      <FlatList
        data={lunchMenu}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.menuRow}
        renderItem={({ item }) => <Text style={styles.menuItem}>{item}</Text>}
      />

      {/* Note for Meal Timing */}
      <Text style={styles.noteText}>Note: Lunch will be available at 12:30 PM</Text>

      {/* QR Code Scan Option */}
      <Text style={styles.orText}>Or</Text>
      <TouchableOpacity style={styles.scanButton}>
        <Text style={styles.scanButtonText}>Scan QR for Meal</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#FFF0F1D1', flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcomeText: { fontSize: 18, fontWeight: 'bold' },
  bellIcon: { paddingRight: 10 },
  userName: { fontSize: 22, fontWeight: '600', marginBottom: 10 },
  toggleContainer: { flexDirection: 'row', borderRadius: 8, overflow: 'hidden', backgroundColor: '#f2f2f2', marginVertical: 10 },
  activeButton: { flex: 1, backgroundColor: '#ff4d4d', padding: 10, alignItems: 'center', borderRadius: 8 },
  inactiveButton: { flex: 1, padding: 10, alignItems: 'center' },
  activeButtonText: { color: '#fff', fontWeight: 'bold' },
  inactiveButtonText: { color: '#333' },
  creditContainer: { backgroundColor: '#ffe6e6', padding: 15, borderRadius: 8, marginVertical: 10 },
  creditTitle: { fontSize: 16, fontWeight: 'bold' },
  creditSubText: { fontSize: 14, color: '#666' },
  creditValue: { fontSize: 24, fontWeight: 'bold', color: '#ff4d4d', textAlign: 'right' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  menuRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  menuItem: { backgroundColor: '#f2f2f2', padding: 8, borderRadius: 8, flex: 1, textAlign: 'center', marginHorizontal: 5 },
  noteText: { fontSize: 14, color: '#666', marginTop: 5 },
  orText: { textAlign: 'center', fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  scanButton: { backgroundColor: '#ff4d4d', padding: 12, borderRadius: 8, alignItems: 'center' },
  scanButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default HomeScreen;

