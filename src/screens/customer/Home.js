// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // Importing vector icons

// const HomeScreen = () => {
//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Welcome Section */}
//       <View style={styles.header}>
//         <Text style={styles.greeting}>Welcome, Customer!</Text>
//         <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('Profile')}>
//           {/* <Icon name="user-circle" size={30} color="#007bff" /> */}
//         </TouchableOpacity>
//       </View>

//       {/* Meal Credits System */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Meal Credits</Text>
//         <View style={styles.credits}>
//           <Text style={styles.creditsText}>Remaining Credits: 10</Text>
//           <TouchableOpacity style={styles.renewButton} onPress={() => navigation.navigate('RenewPlan')}>
//             <Text style={styles.renewButtonText}>Renew Plan</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Daily Meal Notifications */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Daily Meal</Text>
//         <Text style={styles.menuText}>Today's Menu: Chicken Curry, Rice</Text>
//         <TouchableOpacity style={styles.optOutButton} onPress={() => Alert.alert('Opted out', 'You have opted out of today\'s meal.')}>
//           <Text style={styles.optOutText}>Opt-Out of Today's Meal</Text>
//         </TouchableOpacity>
//       </View>

//       {/* QR Code Scanning for Dining */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Dining Access</Text>
//         <TouchableOpacity style={styles.qrButton} onPress={() => navigation.navigate('QRScanner')}>
//           <Icon name="qrcode" size={30} color="#007bff" />
//           <Text style={styles.qrText}>Scan QR Code</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => navigation.navigate('ScanHistory')}>
//           <Text style={styles.historyText}>View Scan History</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Call to Action Buttons */}
//       {/* <View style={styles.actionButtons}>
//         <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('RenewPlan')}>
//           <Icon name="refresh" size={20} color="#fff" />
//           <Text style={styles.actionButtonText}>Renew Meal Plan</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Menu')}>
//           <Icon name="list" size={20} color="#fff" />
//           <Text style={styles.actionButtonText}>View Today's Menu</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Feedback')}>
//           <Icon name="comment" size={20} color="#fff" />
//           <Text style={styles.actionButtonText}>Provide Feedback</Text>
//         </TouchableOpacity>
//       </View> */}

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
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   greeting: {
//     fontSize: 24,
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
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//   },
//   renewButtonText: {
//     color: '#fff',
//   },
//   menuText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   optOutButton: {
//     backgroundColor: '#f44336',
//     paddingVertical: 5,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//   },
//   optOutText: {
//     color: '#fff',
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
//   },
//   historyText: {
//     color: '#007bff',
//     marginTop: 10,
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//   },
//   actionButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     width: '30%',
//   },
//   actionButtonText: {
//     color: '#fff',
//     marginTop: 5,
//   },
//   notification: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     padding: 10,
//   },
// });

// export default HomeScreen;


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing vector icons

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome Section */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome, Customer!</Text>
        <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('Profile')}>
          <Icon name="user-circle" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Meal Credits System */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Meal Credits</Text>
        <View style={styles.credits}>
          <Text style={styles.creditsText}>Remaining Credits: 10</Text>
          <TouchableOpacity style={styles.renewButton} onPress={() => navigation.navigate('PlanRenewal')}>
            <Text style={styles.renewButtonText}>Renew Plan</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Daily Meal Notifications */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Meal</Text>
        <Text style={styles.menuText}>Today's Menu: Chicken Curry, Rice</Text>
        <TouchableOpacity style={styles.optOutButton} onPress={() => Alert.alert('Opted out', 'You have opted out of today\'s meal.')}>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  greeting: {
    fontSize: 24,
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
