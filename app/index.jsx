import { Link, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';
import { useLayoutEffect } from 'react';
import { firebaseAuth, firestoreDB } from '../config/firebase.console';
import { doc, getDoc } from 'firebase/firestore';
import { SET_USER } from '../context/action/userAction';
import { useDispatch } from 'react-redux';

export default function App() {
  const router = useRouter();
  const dispatch = useDispatch();

  const checkLoggedUser = async () => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred?.uid) {
        getDoc(doc(firestoreDB, 'users', userCred?.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            console.log("User Data:", docSnap.data());
            dispatch(SET_USER(docSnap.data()));
          }
        }).then(() => {
          setTimeout(() => {
            router.push("/home");  // Navigate to home after user is verified
          }, 2000);
        });
      } else {
        router.push("/sign-in");  // Navigate to sign-in if no user is logged in
      }
    });
  };

  return (
    <View className="bg-white">
      <LottieView
        source={require("../assets/splash2.json")}
        style={{ width: "100%", height: "100%" }}
        autoPlay
        loop={false}
        onAnimationFinish={() => {
          checkLoggedUser();  // Check if the user is logged in after animation finishes
        }}
      />
    </View>
  );
}
