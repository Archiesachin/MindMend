import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseAuth, firestoreDB } from '../../config/firebase.console'; 
import { View, Image, Text } from 'react-native';

const CustomDrawerContent = (props) => {
    const { userData } = props; // Receiving user data as a prop
    const handleLogout = async () => {
        try {
            // Sign out the user from Firebase
            await firebaseAuth.signOut();
            console.log("User has been logged out.");
            
            // Redirect to the sign-in screen
            router.replace('/sign-in');  // Use `replace` to prevent going back to the previous route
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <DrawerContentScrollView {...props}>
            {userData && (
                <View style={{ padding: 20, alignItems: 'center' }}>
                    <Image 
                        source={{ uri: userData?.profilePic || 'https://via.placeholder.com/100' }} 
                        style={{ width: 100, height: 100, borderRadius: 50 }} 
                    />
                    <Text style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold' }}>
                        {userData.fullName}
                    </Text>
                </View>
            )}

            {/* Drawer navigation items */}
            <DrawerItem 
                icon={({ color, size }) => (
                    <MaterialIcons name="home" size={24} color={"#6c6d83"} />
                )} 
                label={'Home'}
                onPress={() => {
                    router.push('/(drawer)/(tabs)/home');
                }}
            />
             <DrawerItem 
                icon={({ color, size }) => (
                    <Entypo name="list" size={24} color={"#6c6d83"} />
                )} 
                label={'To-do list'}
                onPress={() => {
                    router.push('/(drawer)/(tabs)/todo');
                }}
            />

            <DrawerItem 
                icon={({ color, size }) => (
                    <MaterialIcons name="book" size={24} color={"#6c6d83"} />
                )} 
                label={'Journals'}
                onPress={() => {
                    router.push('/(drawer)/(tabs)/journal');
                }}
            />
             <DrawerItem 
                icon={({ color, size }) => (
                    <Entypo name="controller-play" size={24} color={"#6c6d83"} />
                )} 
                label={'Games'}
                onPress={() => {
                    router.push('/(drawer)/(tabs)/games');
                }}
            />
             <DrawerItem 
                icon={({ color, size }) => (
                    <MaterialIcons name="person" size={24} color={"#6c6d83"} />
                )} 
                label={'Profile'}
                onPress={() => {
                    router.push('/(drawer)/(tabs)/profile');
                }}
            />
            <DrawerItem 
                icon={({ color, size }) => (
                    <MaterialIcons name="logout" size={24} color={"#6c6d83"} />
                )} 
                label={'Logout'}
                onPress={() => {
                    handleLogout;
                }}
            />
        </DrawerContentScrollView>
    );
}


export default function Layout() {
    const [userData, setUserData] = useState(null);

    // Fetch user data from Firestore
    useEffect(() => {
      const fetchUserData = async () => {
        const user = firebaseAuth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(firestoreDB, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        }
      };
      fetchUserData();
    }, []);
  
    return (
      <Drawer 
        drawerContent={(props) => <CustomDrawerContent {...props} userData={userData} />}
      />
    );
  }

