// import React, {useState} from 'react';
// import {StyleSheet, Text, View} from 'react-native';
// import {
//   Camera,
//   Code,
//   useCameraDevice,
//   useCameraPermission,
//   useCodeScanner,
// } from 'react-native-vision-camera';

// function App() {
//   const {hasPermission, requestPermission} = useCameraPermission();
//   const device = useCameraDevice('back');
//   const [latestScannedData, setLatestScannedData] = useState(null);

//   React.useEffect(() => {
//     requestPermission();
//   }, []);

//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr', 'ean-13'],
//     onCodeScanned: (codes: Code[]) => {
//       // Update the state with the latest scanned data
//       setLatestScannedData(codes[0].value);
//       console.log(codes[0].value);
//     },
//   });

//   if (device == null) {
//     return (
//       <View>
//         <Text>Device Not Found</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         codeScanner={codeScanner}
//         device={device}
//         isActive={true}
//       />
//       {latestScannedData && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultTitle}>Latest Scanned Code:</Text>
//           <Text style={styles.resultText}>{latestScannedData}</Text>
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   resultContainer: {
//     position: 'absolute',
//     bottom: 40, // Adjust the position to provide space between the camera view and the result container
//     left: 20,
//     right: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   resultTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: 'white',
//   },
//   resultText: {
//     fontSize: 14,
//     color: 'white',
//   },
// });

// export default App;


// import React, {useState} from 'react';
// import {StyleSheet, Text, View, StatusBar, TouchableOpacity} from 'react-native';
// import {
//   Camera,
//   Code,
//   useCameraDevice,
//   useCameraPermission,
//   useCodeScanner,
// } from 'react-native-vision-camera';

// function App() {
//   const {hasPermission, requestPermission} = useCameraPermission();
//   const device = useCameraDevice('back');
//   const [latestScannedData, setLatestScannedData] = useState(null);
//   const [flashOn, setFlashOn] = useState(false);

//   React.useEffect(() => {
//     requestPermission();
//   }, []);

//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr', 'ean-13'],
//     onCodeScanned: (codes: Code[]) => {
//       // Update the state with the latest scanned data
//       setLatestScannedData(codes[0].value);
//       console.log(codes[0].value);
//     },
//   });

//   if (device == null) {
//     return (
//       <View style={styles.container}>
//         <Text>Device Not Found</Text>
//       </View>
//     );
//   }

//   // Function to toggle flashlight
//   const toggleFlash = () => {
//     setFlashOn(!flashOn);
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" hidden={true} />
//       <Camera
//         style={styles.camera}
//         codeScanner={codeScanner}
//         device={device}
//         isActive={true}
//         torch={flashOn ? 'on' : 'off'} // Control flashlight
//       />
//       {latestScannedData && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultTitle}>Latest Scanned Code:</Text>
//           <Text style={styles.resultText}>{latestScannedData}</Text>
//         </View>
//       )}
//       {/* Flashlight Button */}
//       <TouchableOpacity onPress={toggleFlash} style={styles.flashButton}>
//         <Text style={styles.flashButtonText}>{flashOn ? 'Turn Off Flash' : 'Turn On Flash'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   resultContainer: {
//     position: 'absolute',
//     bottom: 40, // Adjust the position to provide space between the camera view and the result container
//     left: 20,
//     right: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   resultTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: 'white',
//   },
//   resultText: {
//     fontSize: 14,
//     color: 'white',
//   },
//   flashButton: {
//     position: 'absolute',
//     bottom: 100, // Adjust the position of the flash button
//     padding: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     borderRadius: 5,
//   },
//   flashButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });

// export default App;



// import React, { useState } from 'react';
// import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
// import {
//   Camera,
//   Code,
//   useCameraDevice,
//   useCameraPermission,
//   useCodeScanner,
// } from 'react-native-vision-camera';
// import axios from 'axios';

// function App() {
//   const { hasPermission, requestPermission } = useCameraPermission();
//   const device = useCameraDevice('back');
//   const [latestScannedData, setLatestScannedData] = useState(null);
//   const [flashOn, setFlashOn] = useState(false);

//   React.useEffect(() => {
//     requestPermission();
//   }, []);

//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr', 'ean-13'],
//     onCodeScanned: (codes: Code[]) => {
//       const scannedData = codes[0].value;
//       setLatestScannedData(scannedData);
//       console.log(scannedData);

//       // Hit the API with the scanned QR code data
//       if (scannedData) {
//         axios
//           .post('http://192.168.18.235:4000/api/qrCodeRoutes/generate', {
//             validDate: scannedData, // Assuming the QR code contains the validDate
//           })
//           .then((response) => {
//             console.log('API Response:', response.data);
//           })
//           .catch((error) => {
//             console.error('Error calling API:', error);
//           });
//       }
//     },
//   });

//   if (device == null) {
//     return (
//       <View style={styles.container}>
//         <Text>Device Not Found</Text>
//       </View>
//     );
//   }

//   // Function to toggle flashlight
//   const toggleFlash = () => {
//     setFlashOn(!flashOn);
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" hidden={true} />
//       <Camera
//         style={styles.camera}
//         codeScanner={codeScanner}
//         device={device}
//         isActive={true}
//         torch={flashOn ? 'on' : 'off'} // Control flashlight
//       />
//       {latestScannedData && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultTitle}>Latest Scanned Code:</Text>
//           <Text style={styles.resultText}>{latestScannedData}</Text>
//         </View>
//       )}
//       {/* Flashlight Button */}
//       <TouchableOpacity onPress={toggleFlash} style={styles.flashButton}>
//         <Text style={styles.flashButtonText}>{flashOn ? 'Turn Off Flash' : 'Turn On Flash'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   resultContainer: {
//     position: 'absolute',
//     bottom: 40, // Adjust the position to provide space between the camera view and the result container
//     left: 20,
//     right: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   resultTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: 'white',
//   },
//   resultText: {
//     fontSize: 14,
//     color: 'white',
//   },
//   flashButton: {
//     position: 'absolute',
//     bottom: 100, // Adjust the position of the flash button
//     padding: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     borderRadius: 5,
//   },
//   flashButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });

// export default App;


// import React, { useState } from 'react';
// import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
// import {
//   Camera,
//   Code,
//   useCameraDevice,
//   useCameraPermission,
//   useCodeScanner,
// } from 'react-native-vision-camera';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// function App() {
//   const { hasPermission, requestPermission } = useCameraPermission();
//   const device = useCameraDevice('back');
//   const [latestScannedData, setLatestScannedData] = useState(null);
//   const [flashOn, setFlashOn] = useState(false);
//   const [apiResponse, setApiResponse] = useState(null); // To store API response

//   React.useEffect(() => {
//     requestPermission();
//   }, []);

//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr', 'ean-13'],
//     onCodeScanned: (codes: Code[]) => {
//       const scannedData = codes[0].value;
//       setLatestScannedData(scannedData);
//       console.log(scannedData);

//       // Hit the API with the scanned QR code data
//       if (scannedData) {
        
//         axios
//           .get(`http://192.168.18.235:4000/api/qrCodeRoutes/scan-qr`, {
//             params: { qrCode: scannedData }, // Send QR code data as a query parameter
//             headers: {
//               Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//             },
//           })
//           .then((response) => {
//             console.log('API Response:', response.data);
//             setApiResponse(response.data); // Store the response to display it
//           })
//           .catch((error) => {
//             console.error('Error calling API:', error);
//           });
//       }
//     },
//   });

//   if (device == null) {
//     return (
//       <View style={styles.container}>
//         <Text>Device Not Found</Text>
//       </View>
//     );
//   }

//   // Function to toggle flashlight
//   const toggleFlash = () => {
//     setFlashOn(!flashOn);
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" hidden={true} />
//       <Camera
//         style={styles.camera}
//         codeScanner={codeScanner}
//         device={device}
//         isActive={true}
//         torch={flashOn ? 'on' : 'off'} // Control flashlight
//       />
//       {latestScannedData && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultTitle}>Latest Scanned Code:</Text>
//           <Text style={styles.resultText}>{latestScannedData}</Text>
//         </View>
//       )}

//       {/* Display the API response */}
//       {apiResponse && (
//         <View style={styles.apiResponseContainer}>
//           <Text style={styles.apiResponseText}>API Response:</Text>
//           <Text style={styles.apiResponseText}>{JSON.stringify(apiResponse)}</Text>
//         </View>
//       )}

//       {/* Flashlight Button */}
//       <TouchableOpacity onPress={toggleFlash} style={styles.flashButton}>
//         <Text style={styles.flashButtonText}>{flashOn ? 'Turn Off Flash' : 'Turn On Flash'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   resultContainer: {
//     position: 'absolute',
//     bottom: 40, // Adjust the position to provide space between the camera view and the result container
//     left: 20,
//     right: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   resultTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: 'white',
//   },
//   resultText: {
//     fontSize: 14,
//     color: 'white',
//   },
//   apiResponseContainer: {
//     position: 'absolute',
//     bottom: 120, // Adjust the position of the API response container
//     left: 20,
//     right: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   apiResponseText: {
//     fontSize: 14,
//     color: 'white',
//   },
//   flashButton: {
//     position: 'absolute',
//     bottom: 100, // Adjust the position of the flash button
//     padding: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     borderRadius: 5,
//   },
//   flashButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });

// export default App;



// import React, { useState } from 'react';
// import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
// import {
//   Camera,
//   Code,
//   useCameraDevice,
//   useCameraPermission,
//   useCodeScanner,
// } from 'react-native-vision-camera';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// function App() {
//   const { hasPermission, requestPermission } = useCameraPermission();
//   const device = useCameraDevice('back');
//   const [latestScannedData, setLatestScannedData] = useState(null);
//   const [flashOn, setFlashOn] = useState(false);
//   const [apiResponse, setApiResponse] = useState(null); // To store API response

//   React.useEffect(() => {
//     requestPermission();
//   }, []);

//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr', 'ean-13'],
//     onCodeScanned: async (codes: Code[]) => {
//       const scannedData = codes[0].value;
//       setLatestScannedData(scannedData);
//       console.log(scannedData);

//       // Retrieve token from AsyncStorage
//       try {
//         const token = await AsyncStorage.getItem('token');
//         if (token) {
//           // Hit the API with the scanned QR code data and include the token in the header
//           axios
//             .get('http://192.168.18.235:4000/api/qrCodeRoutes/scan-qr', {
//               params: { qrCode: scannedData }, // Send QR code data as a query parameter
//               headers: {
//                 Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//               },
//             })
//             .then((response) => {
//               console.log('API Response:', response.data);
//               setApiResponse(response.data); // Store the response to display it
//             })
//             .catch((error) => {
//               console.error('Error calling API:', error);
//             });
//         } else {
//           console.log('No token found in AsyncStorage');
//         }
//       } catch (error) {
//         console.error('Error retrieving token from AsyncStorage:', error);
//       }
//     },
//   });

//   if (device == null) {
//     return (
//       <View style={styles.container}>
//         <Text>Device Not Found</Text>
//       </View>
//     );
//   }

//   // Function to toggle flashlight
//   const toggleFlash = () => {
//     setFlashOn(!flashOn);
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" hidden={true} />
//       <Camera
//         style={styles.camera}
//         codeScanner={codeScanner}
//         device={device}
//         isActive={true}
//         torch={flashOn ? 'on' : 'off'} // Control flashlight
//       />
//       {latestScannedData && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultTitle}>Latest Scanned Code:</Text>
//           <Text style={styles.resultText}>{latestScannedData}</Text>
//         </View>
//       )}

//       {/* Display the API response */}
//       {apiResponse && (
//         <View style={styles.apiResponseContainer}>
//           <Text style={styles.apiResponseText}>API Response:</Text>
//           <Text style={styles.apiResponseText}>{JSON.stringify(apiResponse)}</Text>
//         </View>
//       )}

//       {/* Flashlight Button */}
//       <TouchableOpacity onPress={toggleFlash} style={styles.flashButton}>
//         <Text style={styles.flashButtonText}>{flashOn ? 'Turn Off Flash' : 'Turn On Flash'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   resultContainer: {
//     position: 'absolute',
//     bottom: 40, // Adjust the position to provide space between the camera view and the result container
//     left: 20,
//     right: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   resultTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: 'white',
//   },
//   resultText: {
//     fontSize: 14,
//     color: 'white',
//   },
//   apiResponseContainer: {
//     position: 'absolute',
//     bottom: 120, // Adjust the position of the API response container
//     left: 20,
//     right: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   apiResponseText: {
//     fontSize: 14,
//     color: 'white',
//   },
//   flashButton: {
//     position: 'absolute',
//     bottom: 100, // Adjust the position of the flash button
//     padding: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     borderRadius: 5,
//   },
//   flashButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });

// export default App;


// import React, { useState } from 'react';
// import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
// import {
//   Camera,
//   Code,
//   useCameraDevice,
//   useCameraPermission,
//   useCodeScanner,
// } from 'react-native-vision-camera';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// function App() {
//   const { hasPermission, requestPermission } = useCameraPermission();
//   const device = useCameraDevice('back');
//   const [latestScannedData, setLatestScannedData] = useState(null);
//   const [flashOn, setFlashOn] = useState(false);
//   const [apiResponse, setApiResponse] = useState(null); // To store API response
//   const [isRequestSent, setIsRequestSent] = useState(false); // Flag to track request state

//   React.useEffect(() => {
//     requestPermission();
//   }, []);

//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr', 'ean-13'],
//     onCodeScanned: async (codes: Code[]) => {
//       const scannedData = codes[0].value;

//       // Check if the scanned data is different from the previous scan
//       if (scannedData !== latestScannedData && !isRequestSent) {
//         setLatestScannedData(scannedData);
//         setIsRequestSent(true); // Set flag to prevent sending another request

//         console.log(scannedData);

//         // Retrieve token from AsyncStorage
//         try {
//           const token = await AsyncStorage.getItem('authToken');
//           if (token) {
//             // Hit the API with the scanned QR code data and include the token in the header
//             axios
//               .get('http://192.168.18.235:4000/api/qrCodeRoutes/scan-qr', {
//                 params: { qrCode: scannedData }, // Send QR code data as a query parameter
//                 headers: {
//                   Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//                 },
//               })
//               .then((response) => {
//                 console.log('API Response:', response.data);
//                 setApiResponse(response.data); // Store the response to display it
//               })
//               .catch((error) => {
//                 console.error('Error calling API:', error);
//               });
//           } else {
//             console.log('No token found in AsyncStorage');
//           }
//         } catch (error) {
//           console.error('Error retrieving token from AsyncStorage:', error);
//         }
//       }
//     },
//   });

//   if (device == null) {
//     return (
//       <View style={styles.container}>
//         <Text>Device Not Found</Text>
//       </View>
//     );
//   }

//   // Function to toggle flashlight
//   const toggleFlash = () => {
//     setFlashOn(!flashOn);
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" hidden={true} />
//       <Camera
//         style={styles.camera}
//         codeScanner={codeScanner}
//         device={device}
//         isActive={true}
//         torch={flashOn ? 'on' : 'off'} // Control flashlight
//       />
//       {latestScannedData && (
//         <View style={styles.resultContainer}>
//           <Text style={styles.resultTitle}>Latest Scanned Code:</Text>
//           <Text style={styles.resultText}>{latestScannedData}</Text>
//         </View>
//       )}

//       {/* Display the API response */}
//       {apiResponse && (
//         <View style={styles.apiResponseContainer}>
//           <Text style={styles.apiResponseText}>API Response:</Text>
//           <Text style={styles.apiResponseText}>{JSON.stringify(apiResponse)}</Text>
//         </View>
//       )}

//       {/* Flashlight Button */}
//       <TouchableOpacity onPress={toggleFlash} style={styles.flashButton}>
//         <Text style={styles.flashButtonText}>{flashOn ? 'Turn Off Flash' : 'Turn On Flash'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   resultContainer: {
//     position: 'absolute',
//     bottom: 40, // Adjust the position to provide space between the camera view and the result container
//     left: 20,
//     right: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   resultTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     color: 'white',
//   },
//   resultText: {
//     fontSize: 14,
//     color: 'white',
//   },
//   apiResponseContainer: {
//     position: 'absolute',
//     bottom: 120, // Adjust the position of the API response container
//     left: 20,
//     right: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.8)',
//     padding: 10,
//     borderRadius: 5,
//   },
//   apiResponseText: {
//     fontSize: 14,
//     color: 'white',
//   },
//   flashButton: {
//     position: 'absolute',
//     bottom: 100, // Adjust the position of the flash button
//     padding: 10,
//     backgroundColor: 'rgba(255, 255, 255, 0.7)',
//     borderRadius: 5,
//   },
//   flashButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });

// export default App;


import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // For navigation

function App() {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [latestScannedData, setLatestScannedData] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const [apiResponse, setApiResponse] = useState(null); // To store API response
  const [isRequestSent, setIsRequestSent] = useState(false); // Flag to track request state

  const navigation = useNavigation(); // To access the navigation

  React.useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    // Clear the scanned data when navigating back or the screen unfocuses
    const unsubscribe = navigation.addListener('blur', () => {
      setLatestScannedData(null);
      setIsRequestSent(false); // Reset flag when you leave the screen
    });

    return unsubscribe;
  }, [navigation]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: async (codes: Code[]) => {
      const scannedData = codes[0].value;

      // Check if the scanned data is different from the previous scan
      if (scannedData !== latestScannedData && !isRequestSent) {
        setLatestScannedData(scannedData);
        setIsRequestSent(true); // Set flag to prevent sending another request

        console.log(scannedData);

        // Retrieve token from AsyncStorage
        try {
          const token = await AsyncStorage.getItem('token');
          console.log("token: ",token)
          if (token) {
            // Hit the API with the scanned QR code data and include the token in the header
            axios
              .get('http://192.168.18.235:4000/api/qrCodeRoutes/scan-qr', {
                params: {
                  qrCode: scannedData, // Send QR code data as a query parameter
                },
                headers: {
                  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
              })
              .then((response) => {
                console.log('API Response:', response.data);
                setApiResponse(response.data); // Store the response to display it
              })
              .catch((error) => {
                console.error('Error calling API:', error);
              });
          } else {
            console.log('No token found in AsyncStorage');
          }
        } catch (error) {
          console.error('Error retrieving token from AsyncStorage:', error);
        }
      }
    },
  });

  if (device == null) {
    return (
      <View style={styles.container}>
        <Text>Device Not Found</Text>
      </View>
    );
  }

  // Function to toggle flashlight
  const toggleFlash = () => {
    setFlashOn(!flashOn);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={true} />
      <Camera
        style={styles.camera}
        codeScanner={codeScanner}
        device={device}
        isActive={true}
        torch={flashOn ? 'on' : 'off'} // Control flashlight
      />
      {latestScannedData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Latest Scanned Code:</Text>
          <Text style={styles.resultText}>{latestScannedData}</Text>
        </View>
      )}

      {/* Display the API response */}
      {apiResponse && (
        <View style={styles.apiResponseContainer}>
          <Text style={styles.apiResponseText}>API Response:</Text>
          <Text style={styles.apiResponseText}>{JSON.stringify(apiResponse)}</Text>
        </View>
      )}

      {/* Flashlight Button */}
      <TouchableOpacity onPress={toggleFlash} style={styles.flashButton}>
        <Text style={styles.flashButtonText}>{flashOn ? 'Turn Off Flash' : 'Turn On Flash'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 40, // Adjust the position to provide space between the camera view and the result container
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  resultText: {
    fontSize: 14,
    color: 'white',
  },
  apiResponseContainer: {
    position: 'absolute',
    bottom: 120, // Adjust the position of the API response container
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  apiResponseText: {
    fontSize: 14,
    color: 'white',
  },
  flashButton: {
    position: 'absolute',
    bottom: 100, // Adjust the position of the flash button
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
  },
  flashButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default App;
