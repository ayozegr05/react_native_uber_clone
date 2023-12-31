import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {API_KEY2} from '@env'
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";


const NavigateCard = () => {
    const dispatch =  useDispatch();
    const navigation = useNavigation()

    return (
        <SafeAreaView style={tw`bg-white flex-1 p-6`}>
            <Text style={tw`text-center py-3 text-xl`}>
                Good Morning
            </Text>

            <View >
                <View>
                    <GooglePlacesAutocomplete 
                        placeholder="Where to?"
                        styles={{
                            container: {
                                backgroundColor: "white",
                                paddingTop: 10,
                                flex: 0
                            },
                            textInput: {
                                backgroundColor: "#DDDDDF",
                                borderRadius: 0,
                                fontSize: 18,
                            },
                        }}
                        enablePoweredByContainer={false}
                        fetchDetails={true}
                        returnKeyType={"search"}
                        minLength={2}
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                location:details.geometry.location,
                                description: data.description
                            }))
                            navigation.navigate('RideOptionsCard')  
                        }}
                        query={{
                            key: API_KEY2,
                            language: "en",
                        }}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        debounce={300}
                    />
                </View>
                <NavFavourites />
            </View>

            <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
               <TouchableOpacity 
                    style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                    onPress={() => navigation.navigate("RideOptionsCard")}    
               >
                <Icon  name="car" type="font-awesome" color="white" size={16} />
                <Text style={tw`text-white text-center`}>
                    Rides
                </Text>
               </TouchableOpacity> 

               <TouchableOpacity style={tw`flex flex-row justify-between  w-24 px-4 py-3 rounded-full border`}>
                <Icon  name="fast-food-outline" type="ionicon" color="black" size={16} />
                <Text style={tw`text-center`}>
                    Eats
                </Text>
               </TouchableOpacity> 
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

// const toInputBoxStyles = StyleSheet.create({
//     container: {
//         backgroundColor: "white",
//         paddingTop: 10,
//         flex: 0
//     },
//     textinput: {
//         backgroundColor: "red",
//         borderRadius: 0,
//         fontSize: 18,
//     },
//     textInputcontainer: {
//         paddingHorizontal: 20,
//         paddingBottom: 0
//     }
// })