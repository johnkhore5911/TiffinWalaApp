import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Payment = () => {
  const route = useRoute();
  const plan = route.params;
  console.log("Plan is this -> ",plan)
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState(plan);
  const navigation = useNavigation();
//   const { student } = route.params;
  const [billAmount,setBillAmount] = useState(10)
  
//   useEffect(() => {
    // if (student?.bill) {
    //   setStudentData(student);
    // }
//   }, [student]);


  const fetchClientSecret = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("Token: ",token)
      const response = await axios.post('https://tiffin-wala-backend.vercel.app/create-payment-intent', 
        { amount: ((studentData?.price)*100) }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
  
      const { clientSecret } = response.data;
      setClientSecret(clientSecret);
    } catch (error) {
      console.error('Error fetching client secret:', error);
      Alert.alert('Error', 'Failed to initiate payment.');
    }
    setLoading(false);
  };

  const initializePaymentSheet = async () => {
    if (!clientSecret) return;

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'TiffinWala',
    });

    if (error) {
      Alert.alert('Payment Initialization Failed', error.message);
    }
  };

  const handlePayment = async () => {
    if (!clientSecret) return;
  
    setLoading(true);
    const { error } = await presentPaymentSheet();
    setLoading(false);
  
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Payment Failed',
        text2: error.message || 'Your payment could not be processed. Please try again.',
      });
    } else {
      try{
        console.log(" mealPlanId: studentData._id: ", studentData._id );
        const token = await AsyncStorage.getItem('token');
        console.log("Token: ",token)
        const response = await axios.post('https://tiffin-wala-backend.vercel.app/api/userRoutes/updatePlan', 
          { mealPlanId: studentData._id }, 
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        if(response.status==200){
            Toast.show({
            type: 'success',
            text1: 'Payment Successful',
            text2: 'Your payment was successful, and the bill has been updated.',
            autoHide: true,
            visibilityTime: 3000,
          });
        }
        else{
          console.log("error hai bhai")
        }
      }
      catch(error){
        Toast.show({
          type: 'error',
          text1: 'Payment Failed',
          text2: error.message || 'Your payment could not be processed. Please try again.',
        });
      }
      
    }
  };

  useEffect(() => {
    if (clientSecret) {
      initializePaymentSheet();
    } else {
      fetchClientSecret();
    }
  }, [clientSecret]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <View style={styles.paymentDetails}>
        <Text style={styles.studentInfo}>Plan Name: {studentData?.name}</Text>
        <Text style={styles.studentInfo}>credits: {studentData?.credits}</Text>
        <Text style={styles.studentInfo}>Validity: {studentData?.validity}</Text>
        <Text style={styles.studentInfo}>Plan Type: {studentData?.planType}</Text>
        <Text style={styles.studentInfo}>Total Bill: ₹{studentData?.price}</Text>

      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#4CAF50' }]}
        onPress={handlePayment}
        disabled={loading || !clientSecret}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Processing...' : 'Confirm Payment'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        {clientSecret ? 'Client Secret Received' : 'Initializing Payment...'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  paymentDetails: {
    marginBottom: 30,
    alignItems: 'flex-start',
    width: '100%',
  },
  studentInfo: {
    fontSize: 18,
    color: '#EEE',
    marginBottom: 8,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    color: '#CCC',
    fontSize: 14,
  },
});

export default Payment;
