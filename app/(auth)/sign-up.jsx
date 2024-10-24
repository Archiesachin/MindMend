import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { images } from "../../constants";
import UserTextInput from '../../components/UserTextInput';
import { useNavigation } from 'expo-router';
import { avatars } from '../../utils/support';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firestoreDB } from '../../config/firebase.console';
import { doc, setDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const SignUp = () => {
    const screenWidth = Math.round(Dimensions.get("window").width);
    const screenHeight = Math.round(Dimensions.get("window").height);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(""); // New state for phone number
    const [age, setAge] = useState(""); // New state for age
    const [gender, setGender] = useState(""); // New state for gender
    const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url);
    const [isAvatarMenu, setIsAvatarMenu] = useState(false);
    const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);

    const navigation = useNavigation();

    const handleAvatar = (item) => {
        setAvatar(item?.image.asset.url);
        setIsAvatarMenu(false);
    }

    const handleSignUp = async () => {
        if (getEmailValidationStatus && email !== "") {
            await createUserWithEmailAndPassword(firebaseAuth, email, password).then(userCred => {
                const data = {
                    _id: userCred?.user.uid,
                    fullName: name,
                    email: email, // Include email in user data
                    phoneNumber: phoneNumber, // Include phone number
                    age: age, // Include age
                    gender: gender, // Include gender
                    profilePic: avatar,
                    providerData: userCred.user.providerData[0]
                }
                setDoc(doc(firestoreDB, 'users', userCred?.user.uid), data).then(() => {
                    navigation.navigate("sign-in");
                });
            });
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View className="flex-1 items-center justify-start bg-white">
                    {isAvatarMenu && (
                        <View className="absolute inset-0 z-10 w-full h-full">
                            <BlurView className="w-full h-full px-4 py-16 flex-row flex-wrap items-center justify-evenly" tint='light' intensity={100} style={{ width: screenWidth, height: screenHeight }}>
                                <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
                                    style={{ width: screenWidth, height: screenHeight }}>
                                    {avatars?.map((item) => (
                                        <TouchableOpacity onPress={() => handleAvatar(item)}
                                            key={item._id} className="w-20 m-3 h-20 p-1 rounded-full border-2 border-primary relative">
                                            <Image
                                                source={{ uri: item?.image.asset.url }}
                                                className="w-full h-full"
                                                resizeMode='contain' />
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </BlurView>
                        </View>
                    )}

                    <View className="w-full h-full bg-white mt-10 flex items-center justify-start py-6 px-6">
                        <Image
                            source={images.logo}
                            resizeMode='contain'
                            className="w-[140px] h-[150px]" />
                        <View className="w-full items-center justify-center">
                            <View className="w-full flex items-center justify-center relative my-4">
                                <TouchableOpacity onPress={() => setIsAvatarMenu(true)}
                                    className="w-20 h-20 p-1 rounded-full border-2 border-primary">
                                    <Image
                                        source={{ uri: avatar }}
                                        resizeMode='contain'
                                        className="w-full h-full"
                                    />
                                    <View className="w-6 h-6 bg-primary rounded-full absolute top-0 right-0 flex items-center justify-center">
                                        <MaterialIcons name="edit" size={18} color={"#fff"} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <UserTextInput placeholder="Full Name" isPass={false} setStateValue={setName} />
                            <UserTextInput placeholder="Email" isPass={false} setStateValue={setEmail} setGetEmailValidationStatus={setGetEmailValidationStatus} />
                            <UserTextInput placeholder="Phone Number" isPass={false} setStateValue={setPhoneNumber} />
                            <UserTextInput placeholder="Age" isPass={false} setStateValue={setAge} />

                            <View className="w-full border border-gray-200 rounded-xl py-4 space-x-4 my-2">
                                <Picker
                                    selectedValue={gender}
                                    onValueChange={(itemValue) => setGender(itemValue)}
                                    style={{ height: 50, width: '100%', borderWidth: 1, borderRadius: 8 }}
                                  >
                                    <Picker.Item label="Select Gender" value=""/>
                                    <Picker.Item label="Male" value="male" />
                                    <Picker.Item label="Female" value="female" />
                                    <Picker.Item label="Other" value="other" />
                                </Picker>
                            </View>

                            <UserTextInput placeholder="Password" isPass={true} setStateValue={setPassword} />

                            <TouchableOpacity onPress={handleSignUp}
                                className="w-full px-4 py-2 rounded-xl bg-secondary my-3 flex items-center justify-center">
                                <Text className="py-2 text-white text-xl font-semibold">Sign Up</Text>
                            </TouchableOpacity>

                            <View className="w-full py-4 flex-row items-center justify-center space-x-2">
                                <Text className="text-base text-primary">Have an account?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("sign-in")}>
                                    <Text className="text-base font-semibold text-secondary">Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignUp;

const styles = StyleSheet.create({});
