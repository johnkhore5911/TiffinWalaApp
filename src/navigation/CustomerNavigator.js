import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing vector icons

// Import Screens
import Signup from '../screens/customer/Signup';
import Login from '../screens/customer/Login';
import QRCodeScanner from '../screens/customer/QRCodeScanner';
import HomeScreen from '../screens/customer/Home';
import MealCredits from '../screens/customer//MealPlanner'; // Example screen
// import DailyMenu from '../screens/customer/'; // Example screen
import Profile from '../screens/customer/Profile'; // Example screen
// import Notifications from '../screens/customer/Notifications'; // Example screen
import PlanRenewal from '../screens/customer/PlanRenewal';
// Create Stack and Tab Navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

const CustomerNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Signup">
      <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} options={{ headerShown: false }} />
      <Stack.Screen name="PlanRenewal" component={PlanRenewal} options={{ headerShown: false }} />
      {/* Bottom Tabs as a default screen */}
      <Stack.Screen name="HomeTabs" component={BottomTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default CustomerNavigator;
