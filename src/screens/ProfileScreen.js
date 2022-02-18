import React, {useEffect, useState} from "react";
import {View, SafeAreaView, ScrollView, Image, StyleSheet, TextInput, Text, TouchableOpacity,} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

import { useSelector, useDispatch} from "react-redux";
import {getUser} from "../store/actions";
import {useNavigation} from "@react-navigation/native";
import GoToRepositoryPage from "../components/GoToRepoButton";

const ProfileScreen = () => {

    const user = useSelector((state) => state.user)
    const errorMessage = useSelector((state) => state.errorMessage)
    const dispatch = useDispatch()

    const [userInput, setUserInput] = useState('');

    const searchUser = React.useCallback(() => {
        dispatch(getUser(userInput))
        console.log('DEBUG USER',user)
    },[userInput, user])

    console.log('DEBUG ERROR', errorMessage)

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        style={styles.textInput}
                        value={userInput}
                        onChangeText={value => setUserInput(value)}/>
                    <TouchableOpacity onPress={() => searchUser()} style={styles.searchIcon}>
                        <FontAwesome style={styles.searchIcon} name="search" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {errorMessage ? <View><Text>{errorMessage}</Text></View> :
                    (<View>
                        <View style={{alignItems: 'center'}}>
                            <View style={styles.profileImage}>
                                <Image source={{uri: user?.avatar_url}} style={styles.image} resizeMode="center"/>
                            </View>
                        </View>
                        <View style={styles.userInfoContainer}>
                            <Text style={{fontWeight: "200", fontSize: 36}}>{user.name}</Text>
                            <Text style={{color: "#AEB5BC", fontSize: 14}}>{user.location}</Text>
                            <Text style={{color: "#AEB5BC", fontSize: 14}}>{user.company}</Text>
                        </View>
                        <View style={styles.userStatsContainer}>
                            <View style={styles.statsBox}>
                                <Text style={{fontSize: 24}}>{user.followers}</Text>
                                <Text style={styles.statsText}>Followers</Text>
                            </View>
                            <View style={[styles.statsBox, {
                                borderColor: '#DFD8C8',
                                borderLeftWidth: 1,
                                borderRightWidth: 1
                            }]}>
                                <Text style={{fontSize: 24}}>{user.following}</Text>
                                <Text style={styles.statsText}>Following</Text>
                            </View>
                            <View style={styles.statsBox}>
                                <Text style={{fontSize: 24}}>{user.public_repos}</Text>
                                <Text style={styles.statsText}>Repositories</Text>
                            </View>
                        </View>
                        <GoToRepositoryPage props={{username: userInput}}/>
                    </View>)
                }
            </ScrollView>
        </SafeAreaView>
    );
}


export default ProfileScreen;

const styles = StyleSheet.create({
    searchIcon: {
        marginVertical:10,
        marginHorizontal: 10,
    },
    textInput: {
        flex:1,
        height:30,
        paddingHorizontal: 5,
        paddingVertical:2,
        marginVertical:10,
        marginHorizontal: 10,
        borderWidth:1,
        borderRadius:5,
        backgroundColor:'#EEEEEE',
        textTransform: 'lowercase'
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined
    },
    userInfoContainer: {
        alignSelf:"center",
        alignItems:"center",
        marginTop: 16,
    },
    userStatsContainer: {
        flexDirection:"row",
        alignSelf:"center",
        marginTop: 32,
    },
    statsBox: {
        alignItems:'center',
        flex:1
    },
    statsText: {
        fontSize:12,
        color: '#AEB5BC',
        textTransform: 'uppercase',
        fontWeight: "500"
    },
    button: {

    }
})
