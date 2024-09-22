import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';


export default function App() {
  const router = useRouter();
  return (
    <View className="bg-blue-200">
    <LottieView
      source={require("../assets/splash2.json")}
      style={{width: "100%", height: "100%"}}
      autoPlay
      loop = {false}
      onAnimationFinish={() =>{
        router.push("/sign-up");
      }}
    />
    </View>
  );
}


