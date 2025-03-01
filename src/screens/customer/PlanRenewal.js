// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';

// const PlanRenewal = () => {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   const fetchPlans = async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       console.log("token: ", token);
//       const response = await axios.get('https://tiffin-wala-backend.vercel.app/api/mealPlanRoutes/meal-plans', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }); // Replace with your API endpoint
//       setPlans(response.data.data);  // Accessing the 'data' array from the response
//       console.log("response.data: ", response.data);
//     } catch (error) {
//       console.error('Error fetching meal plans:', error);
//       Alert.alert('Error', 'Failed to fetch meal plans. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   // Handle the renewal of a plan
//   const handleRenewal = (plan) => {
//     console.log("planie: ",plan);
//     Alert.alert('Renew Plan', `Are you sure you want to renew the ${plan.name} plan?`, [
//       {
//         text: 'Cancel',
//         style: 'cancel',
//       },
//       {
//         text: 'Renew',
//         onPress: () => {
//           navigation.navigate("Payment",plan);
//           // Call your API to renew the plan
//           // console.log(`Renewing plan: ${plan.name}`);
//           // Alert.alert('Success', `${plan.name} plan has been renewed!`);
//         },
//       },
//     ]);

//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Renew Your Plan</Text>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <FlatList
//           data={plans}
//           keyExtractor={(item) => item._id}
//           renderItem={({ item }) => (
//             <View style={styles.planCard}>
//               <Text style={styles.planTitle}>{item.name}</Text>
//               <Text style={styles.planDescription}>{item.description}</Text>
//               <Text style={styles.planDetails}>Credits: {item.credits}</Text>
//               <Text style={styles.planDetails}>Price: ₹{item.price}</Text>
//               <Text style={styles.planDetails}>Validity: {item.validity} days</Text>
//               <TouchableOpacity
//                 style={styles.renewButton}
//                 onPress={() => handleRenewal(item)}
//               >
//                 <Text style={styles.renewButtonText}>Renew Plan</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f9f9f9',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   planCard: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginVertical: 10,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   planTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#333',
//   },
//   planDescription: {
//     fontSize: 14,
//     color: '#777',
//     marginVertical: 5,
//   },
//   planDetails: {
//     fontSize: 16,
//     color: '#555',
//   },
//   renewButton: {
//     marginTop: 10,
//     backgroundColor: '#4CAF50',
//     paddingVertical: 12,
//     borderRadius: 6,
//     alignItems: 'center',
//   },
//   renewButtonText: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default PlanRenewal;


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PlanRenewal = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchPlans = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("token: ", token);
      const response = await axios.get('https://tiffin-wala-backend.vercel.app/api/mealPlanRoutes/meal-plans', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }); // Replace with your API endpoint
      setPlans(response.data.data);  // Accessing the 'data' array from the response
      console.log("response.data: ", response.data);
    } catch (error) {
      console.error('Error fetching meal plans:', error);
      Alert.alert('Error', 'Failed to fetch meal plans. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // Handle the renewal of a plan
  const handleRenewal = (plan) => {
    console.log("planie: ",plan);
    Alert.alert('Renew Plan', `Are you sure you want to renew the ${plan.name} plan?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Renew',
        onPress: () => {
          navigation.navigate("Payment",plan);
          // Call your API to renew the plan
          // console.log(`Renewing plan: ${plan.name}`);
          // Alert.alert('Success', `${plan.name} plan has been renewed!`);
        },
      },
    ]);

  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Renew Your Plan</Text> */}
      {loading ? (
        <ActivityIndicator size="large" color="#f44336" marginTop={100} />
      ) : (
        <FlatList
          data={plans}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.planCard}>
              <Text style={styles.planTitle}>{item.name} ({item.type})</Text>
              <Text style={styles.planDescription}>{item.description}</Text>
              <Text style={styles.planDetails}>Credits: {item.credits}</Text>
              <Text style={styles.planDetails}>Price: ₹{item.price}</Text>
              <Text style={styles.planDetails}>Validity: {item.validity} days</Text>
              <TouchableOpacity
                style={styles.renewButton}
                onPress={() => handleRenewal(item)}
              >
                <Text style={styles.renewButtonText}>Purchase Plan</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 20,
    // backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    // marginVertical: 20,
  },
  planCard: {
    // backgroundColor: '#fff',
    backgroundColor:'#FAFAFA',
    
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
    borderWidth:1,
    borderColor:'#D9D9D9',
  },
  
  planTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  planDescription: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  planDetails: {
    fontSize: 16,
    color: '#555',
  },
  renewButton: {
    marginTop: 10,
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  renewButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default PlanRenewal;
