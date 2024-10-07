import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import { firebaseAuth, firestoreDB } from '../../../config/firebase.console'; // Make sure these are correctly imported
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = firebaseAuth.currentUser; // Get the current user
        if (user) {
          const userDoc = await getDoc(doc(firestoreDB, 'users', user.uid)); // Fetch user document
          if (userDoc.exists()) {
            setUserData(userDoc.data()); // Set user data if it exists
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('No user is currently signed in.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error); // Log any errors
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserData(); // Call the fetch function
  }, []); // Empty dependency array to run only once on mount

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.profileContainer}>
          <Image source={{ uri: userData.profilePic }} style={styles.avatar} /> 
          <Text style={styles.name}>{userData.fullName}</Text>                  
          <Text style={styles.email}>{userData.providerData.email}</Text>     
        </View>
      ) : (
        <Text>No user data found.</Text> 
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#666',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
