import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native'
import React from 'react'
import {images} from "../../constants"
import UserTextInput from '../../components/UserTextInput'
import { useState } from 'react'
import { useRouter, useNavigation } from 'expo-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth, firestoreDB } from '../../config/firebase.console'
import { getDoc, doc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import {SET_USER} from '../../context/action/userAction'


const Signin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const[getEmailValidationStatus, setGetEmailValidationStatus] = useState(false)
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState(null)

  const navigation = useNavigation()
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    if (getEmailValidationStatus && email !== ""){
      await signInWithEmailAndPassword(firebaseAuth, email, password).then(userCred => {
        if(userCred){
          console.log("User ID:", userCred?.user.uid)
          getDoc(doc(firestoreDB, 'users', userCred?.user.uid)).then(docSnap =>{
            if(docSnap.exists()){
              console.log("User Data:", docSnap.data())
              dispatch(SET_USER(docSnap.data()))
              router.push("/home")
            }
          })
        }
      }).catch(err =>{
        console.log("Error", err.message)
        if(err.message.includes("wrong-password")){
          setAlert(true)
          setAlertMessage("Wrong Password")

        }else if(err.message.includes("user-not-found")){
          setAlert(true)
          setAlertMessage("User Does not Exist")
          setInterval(() =>{
            setAlert(false)
          }, 2000)
        }
        else{
          setAlert(true)
          setAlertMessage("Invalid Email")
        }
        setInterval(() =>{
          setAlert(false)
        }, 2000)
      })
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView>
    <View className="flex-1 items-center justify-start bg-white h-full"> 
    <Image
    source={images.hero} resizeMode='cover' className="h-96 w-full"
    />

    <View className="w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-start py-6 px-6">
      <Image
      source={images.logo}
      resizeMode='contain'
      className="w-[140px] h-[150px]"/>
    {/* <Text className="py-2 text-primary text-xl font-semibold">Welcome Back!</Text> */}
    <View className="w-full items-center justify-center">

      {alert && (
         <Text className="text-base text-red-600">
         {alertMessage}
       </Text>
      )}

      <UserTextInput placeholder="Email" isPass={false} setStateValue={setEmail} setGetEmailValidationStatus={setGetEmailValidationStatus}
  
      />
      
      <UserTextInput placeholder="Password" isPass={true} setStateValue={setPassword}
      />

      <TouchableOpacity onPress={handleLogin}
      className="w-full px-4 py-2 rounded-xl bg-secondary my-3 flex items-center justify-center">
        <Text className="py-2 text-white text-xl font-semibold">Sign In</Text>

      </TouchableOpacity>

      <View className="w-full py-4 flex-row items-center justify-center space-x-2">
        <Text className="text-base text-primary">Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("sign-up")}>
          <Text className="text-base font-semibold text-secondary">Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>
    </View>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Signin

const styles = StyleSheet.create({})