import { Text, View, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from "../../../constants"

const TabIcon = ({ icon, color, name, focused }) => {
    return (
      <View className="flex items-center justify-center gap-2">
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          className="w-6 h-6"
        />
        <Text
          className={`${focused ? "font-bold" : "font-semibold"} text-xs`}
          style={{ color: color }}
        >
          {name}
        </Text>
      </View>
    );
  };

const TabsLayout = () => {
  return (
    <>
    <Tabs 
    screenOptions={{
        tabBarShowLabel:false,
        tabBarStyle:{
          height: 70,
        }
    }}>
        <Tabs.Screen
            name='home'
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({color, focused}) =>(
                    <TabIcon
                    icon={icons.home}
                    color={color}
                    name='Home'
                    focused={focused}
                    />
                    
                )
            }}
        />


        <Tabs.Screen
            name='profile'
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({color, focused}) =>(
                    <TabIcon
                    icon={icons.profile}
                    color={color}
                    name='Profile'
                    focused={focused}
                    />
                    
                )
            }}
        />

      <Tabs.Screen
        name="journal"
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />

    <Tabs.Screen
        name="todo"
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />

    <Tabs.Screen
        name="games"
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
       <Tabs.Screen
        name="breathingBubble"
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />

    </Tabs>
    </>
  )
}

export default TabsLayout
