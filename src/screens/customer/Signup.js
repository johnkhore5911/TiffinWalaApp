

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [mealPreferences, setMealPreferences] = useState('');
  const [role, setRole] = useState('customer'); // Default role
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isRoleDropdownVisible, setRoleDropdownVisible] = useState(false); // Role dropdown visibility
  const navigation = useNavigation();

  const handleSignup = async () => {
    await AsyncStorage.setItem('role', role); // Save the selected role
    
    if (!fname || !lname || !email || !password || !contact || !address || !mealPreferences) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      const fcmtoken = await AsyncStorage.getItem("fcmtoken");
      console.log("fcm token hai yeh-> ", fcmtoken);
      console.log("fcm token ka type yeh hai-> ", typeof(fcmtoken));
      const response = await axios.post('https://tiffin-wala-backend.vercel.app/api/auth/signup', {
        firstName: fname,
        lastName: lname,
        email,
        password,
        confirmPassword: password,
        role,
        contact,
        address,
        mealPreferences,
        fcmToken: fcmtoken,
      });
      Alert.alert('Signup Successful', response.data.message);
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Signup Failed', error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create an Account</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={fname}
        onChangeText={setfName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lname}
        onChangeText={setlName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        keyboardType="phone-pad"
        value={contact}
        onChangeText={setContact}
      />
      <TextInput
        style={styles.input}
        placeholder="Please Enter Full Address"
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity
        style={[styles.input, styles.dropdown]}
        onPress={() => setDropdownVisible(true)}
      >
        <Text style={{ color: mealPreferences ? '#000' : '#999' }}>
          {mealPreferences || 'Select Meal Preference'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isDropdownVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Meal Preference</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setMealPreferences('Vegetarian');
                setDropdownVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>Vegetarian</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setMealPreferences('Non-Vegetarian');
                setDropdownVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>Non-Vegetarian</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setDropdownVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Role Dropdown */}
      <TouchableOpacity
        style={[styles.input, styles.dropdown]}
        onPress={() => setRoleDropdownVisible(true)}
      >
        <Text style={{ color: role ? '#000' : '#999' }}>
          {role || 'Select Role'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={isRoleDropdownVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setRoleDropdownVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Role</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setRole('customer');
                setRoleDropdownVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>Customer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setRole('delivery');
                setRoleDropdownVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>Delivery</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.modalOption}
              onPress={() => {
                setRole('admin');
                setRoleDropdownVisible(false);
              }}
            >
              <Text style={styles.modalOptionText}>Admin</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setRoleDropdownVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f9fc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
  dropdown: {
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  modalCancel: {
    marginTop: 20,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default Signup;
