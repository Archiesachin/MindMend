import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack} from 'expo-router'
import { Provider } from "react-redux";
import Store from "../context/store";

const RootLayout = () => {
  return(
    <Provider store={Store}>
  <Stack>
    <Stack.Screen name='index' options={{headerShown: false }} />
     <Stack.Screen name='(auth)' options={{headerShown: false}} />
     {/* <Stack.Screen name='(tabs)' options={{headerShown: false}} /> */}
     <Stack.Screen name='(drawer)' options={{headerShown: false}} />
  
  </Stack>
  </Provider>
  ) 
}

export default RootLayout
