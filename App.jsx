// import React,{useState,useEffect} from 'react';
// import AppNavigator from './src/navigation/AppNavigator';
// import { StripeProvider } from '@stripe/stripe-react-native';
// import Toast from 'react-native-toast-message';
// import messaging, { getToken } from '@react-native-firebase/messaging';
// import { Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import PushNotification from 'react-native-push-notification';
// import { Platform } from 'react-native';
// import AuthNavigator from './src/navigation/AuthNavigator';

// const App = () => {

//   async function requestUserPermission() {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
//     if (enabled) {
//       console.log('Push notifications enabled:', authStatus);
//     } else {
//       console.log('Push notifications permission denied');
//     }
//   }
//   useEffect(() => {
//     // Request permission
//     requestUserPermission();
//     getFcmToken();
//     getRole();

//     // Foreground message handler
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       // console.log('FCM Message aya hai:', remoteMessage.notification.body);
//       // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//       // Push local notification instead of showing an alert
//     PushNotification.localNotification({
//       channelId: 'student-channel', // Channel ID should be created as mentioned in your previous code
//       title: remoteMessage.notification.title, // You can use message title
//       message: remoteMessage.notification.body, // You can use message body
//       color: 'blue',  // Optional, change color as per preference
//       soundName: 'default', // Optional
//     });
//     });

//     return unsubscribe; // Cleanup on unmount
//   }, []);



// // Notification configuration
// PushNotification.configure({
//   // Called when a remote or local notification is opened or received
//   onNotification: function (notification) {
//     console.log('Notification received:', notification);
//     // You can handle notification action here, if needed
//   },
//   // iOS only: request permissions
//   requestPermissions: Platform.OS === 'ios', // Request permissions on iOS
// });

// // Create a notification channel (required for Android 8+)
// PushNotification.createChannel(
//   {
//     channelId: 'student-channel', // Unique channel ID
//     channelName: 'Student Notifications', // Channel display name
//     channelDescription: 'Notifications related to student updates', // Channel description
//     soundName: 'default', // Optional sound for notifications
//     importance: 4, // High importance (to show the notification)
//     vibrate: true, // Enable vibration
//   },
//   (created) => console.log(`Channel created: ${created}`) // Callback for channel creation
// );

  // const getFcmToken = async () => {
  //   const token = await messaging().getToken();
  //   console.log('Device Token:', token);
  //   await AsyncStorage.setItem("fcmtoken",token);
    
  //   // Send the token to your backend
  //   // await axios.post('http://your-backend/api/save-token', { token });
  // };

//   const [userRole,setUserRole]= useState("");
//   const getRole = async()=>{
//     const role = await AsyncStorage.getItem("role");
//     setUserRole(role);
//   }



//   return(
//   <StripeProvider publishableKey="pk_test_51QcLAFSEdSgPvqXOWI7rhL7BOC1eEick4MlLuBsZVafntuMgINQl8pg82pwBqIOV1Z5fIZWDQyrRHdqLNcOT2OJp00KCPJrPHt">
//     {/* <AppNavigator /> */}
//     {userRole === 'customer' ? (
//         <CustomerNavigator />
//       ) : userRole === 'delivery' ? (
//         <DeliveryBoyNavigator />
//       ) : (
//         <AuthNavigator />
//       )}
//     <Toast />
//   </StripeProvider>
//   )

// };

// export default App;

import React, { useState, useEffect, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { StripeProvider } from '@stripe/stripe-react-native';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import Signup from './src/screens/customer/Signup';
import Login from './src/screens/customer/Login';
import QRCodeScanner from './src/screens/customer/QRCodeScanner';
import HomeScreen from './src/screens/customer/Home';
import MealCredits from './src/screens/customer//MealPlanner'; 
import Profile from './src/screens/customer/Profile'; 
import PlanRenewal from './src/screens/customer/PlanRenewal';
import Payment from './src/screens/customer/Payment';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


import DailyDeliveries from './src/screens/delivery/DailyDeliveries';
import TiffinCollection from './src/screens/delivery/TiffinCollection';
import ProfileDelievery from './src/screens/delivery/Profile';
import useDeliveries from './src/hooks/useDelivery';

import { PermissionsAndroid } from 'react-native';

export const DeliveryContext = createContext();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarStyle: { backgroundColor: '#f7f9fc' }, // Tab bar background
        tabBarActiveTintColor: '#007bff', // Active tab color
        tabBarInactiveTintColor: '#aaa', // Inactive tab color
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          headerShown:false,
          tabBarIcon: ({ color }) => <Icon name="home" size={30} color={color} />
        }}
      />
      <Tab.Screen
        name="MealCredits"
        component={MealCredits}
        options={{
          tabBarLabel: 'Meal Credits',
          headerShown:false,
          tabBarIcon: ({ color }) => <Icon name="credit-card" size={30} color={color} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          headerShown:false,
          tabBarIcon: ({ color }) => <Icon name="user" size={30} color={color} />
        }}
      />
    </Tab.Navigator>
  );
};


const DeliveryBoyNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Deliveries"
      screenOptions={{
        tabBarStyle: { backgroundColor: '#f7f9fc' }, // Tab bar background
        tabBarActiveTintColor: '#007bff', // Active tab color
        tabBarInactiveTintColor: '#aaa', // Inactive tab color
      }}
    >
      <Tab.Screen
        name="Deliveries"
        component={DailyDeliveries}
        options={{
          tabBarLabel: 'Deliveries',
          headerShown:false,
          tabBarIcon: ({ color }) => <Icon name="truck" size={30} color={color} />
        }}
      />
      <Tab.Screen
        name="Collections"
        component={TiffinCollection}
        options={{
          tabBarLabel: 'Collections',
          headerShown:false,
          tabBarIcon: ({ color }) => <Icon name="shopping-bag" size={30} color={color} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileDelievery}
        options={{
          tabBarLabel: 'Profile',
          headerShown:false,
          tabBarIcon: ({ color }) => <Icon name="id-card" size={30} color={color} />
        }}
      />
    </Tab.Navigator>
  );
};


const App = () => {
  const [userRole, setUserRole] = useState('');
  const { getDeliveriesData, markDelivered } = useDeliveries(); 

  const [refreshData, setRefreshData] = useState(false); 
  const [deliveryUserId,setDeliveryUserId] = useState("");
  const [redundedRefresh,SetRefundedRefresh]= useState(false);

  // Function to request permission for notifications
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('Push notifications enabled:', authStatus);
    } else {
      console.log('Push notifications permission denied');
    }
  }




const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.warn('Notification permission denied');
    }
  }
};


  const getFcmToken = async () => {
    const token = await messaging().getToken();
    console.log('Device Token:', token);
    await AsyncStorage.setItem("fcmtoken",token);
    
    // Send the token to your backend
    // await axios.post('http://your-backend/api/save-token', { token });
  };

  // Fetch the user's role from AsyncStorage
  const getRole = async () => {
    const role = await AsyncStorage.getItem('role');
    console.log("role is this: ",role);
    setUserRole(role);
  };

  // Initial setup
  useEffect(() => {
    requestUserPermission();
    getRole();
    getFcmToken();
    requestNotificationPermission()

    // Configure notifications
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notification received:', notification);
      },
      requestPermissions: Platform.OS === 'ios',
    });

    // Create a notification channel (required for Android 8+)
    PushNotification.createChannel(
      {
        channelId: 'student-channel',
        channelName: 'Student Notifications',
        channelDescription: 'Notifications related to student updates',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`Channel created: ${created}`)
    );

    // Foreground message handler
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // getDeliveriesData();
      PushNotification.localNotification({
        channelId: 'student-channel',
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
        color: 'blue',
        soundName: 'default',
      });
      const { Message } = remoteMessage?.data;

      if(Message==="Refunded"){
        SetRefundedRefresh((prev) => !prev)
        return;
      }

      setRefreshData((prev) => !prev);

      const { deliveryId } = remoteMessage?.data;
      if (deliveryId) {
        console.log('Notification has deliveryId:', deliveryId);
        setDeliveryUserId(deliveryId)
        await AsyncStorage.setItem('showTiffinBanner', 'true');
        // setRefreshData((prev) => !prev);
        // You can use this deliveryId in your app, for example, to navigate to a detailed screen
      }
    });





    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Background notification received:', remoteMessage);
    
      const { deliveryId } = remoteMessage?.data;
    
      if (deliveryId) {
        console.log('Background notification has deliveryId:', deliveryId);
        await AsyncStorage.setItem('showTiffinBanner', 'true');
      }
    });

    return unsubscribe;
  }, []);


  return (
    <StripeProvider publishableKey="pk_test_51QcLAFSEdSgPvqXOWI7rhL7BOC1eEick4MlLuBsZVafntuMgINQl8pg82pwBqIOV1Z5fIZWDQyrRHdqLNcOT2OJp00KCPJrPHt">

<DeliveryContext.Provider value={{ refreshData, setRefreshData,deliveryUserId,setDeliveryUserId,redundedRefresh }}>
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="Login">
        {/* <Stack.Navigator  initialRouteName="HomeTabs"> */}
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} options={{ headerShown: false }} />
        <Stack.Screen name="PlanRenewal" component={PlanRenewal} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTabs" component={BottomTabs} options={{ headerShown: false }} />

        {/* delivery */}
        <Stack.Screen name="Deliveries" component={DailyDeliveries} options={{ headerShown: false }}/>
        <Stack.Screen name="Collections" component={TiffinCollection} options={{ headerShown: false }}/>
        <Stack.Screen name="ProfileDelivey" component={ProfileDelievery} options={{ headerShown: false }}/>
        <Stack.Screen name="DeliveryNavigator" component={DeliveryBoyNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </DeliveryContext.Provider>
    </StripeProvider>
  );

};

export default App;

