import {Text, View, Pressable, TextInput, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../../config/config";
import PrimaryButton from "../../../UIElements/PrimaryButton";
import { useState} from "react";

const Login = ({setPage}) => {
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [loginResponse, setLoginResponse] = useState({});

    const setTextInput = (text, callbackFunc) => {
            callbackFunc(text);
    }

    const loginHandler = async() => {
        try{
            const response = await fetch(
                "http://192.168.1.93:3000/authenticateLogin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({username: usernameInput, password: passwordInput})
                }
            );
            const data = await response.json();
            setLoginResponse(data);
            if(loginResponse.error){
                setTimeout(() => setLoginResponse({}), 3000)
            }
        }
        catch(err){
            setLoginResponse({loggedIn:false, error:err.message});
        }
    }

    return (
        <View style={styles.window}>
            <View style={styles.closeButton}>
                <Pressable onPress={() => setPage("buttons")}>
                    <Ionicons size={32} color={colors.PRIMARYWHITE} name="close-outline"/>
                </Pressable>
            </View>
            {loginResponse.error && <View style={styles.banner}><Text style={styles.error}>{loginResponse.error}</Text></View>}
            {loginResponse.loggedIn && <View style={styles.banner}><Text style={styles.success}>Logged In</Text></View>}
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Login</Text>
                    <Text style={styles.subText}>Please sign in to continue.</Text>
                </View>
                <View style={styles.inputs}>
                    <View style={styles.field}>
                        <Text style={{...styles.fieldLabel, ...!usernameFocused && usernameInput === "" && styles.overlay}}>USERNAME</Text>
                        <View style={styles.fieldInput}>
                            <Ionicons name="person-outline" size={20}/>
                            <TextInput
                            autoCapitalize="none"
                            onBlur={() => {setUsernameFocused(false)}} 
                            onFocus={() => setUsernameFocused(true)} 
                            style={styles.fieldTextInput}
                            onChangeText={(text) => {setTextInput(text, setUsernameInput)}}
                            value={usernameInput}/>
                        </View>
                    </View>
                    <View style={styles.field}>
                        <Text style={{...styles.fieldLabel, ...!passwordFocused && passwordInput === "" && styles.overlay}}>PASSWORD</Text>
                        <View style={styles.fieldInput}>
                            <Ionicons name="lock-closed-outline" size={20}/>
                            <TextInput
                            autoCapitalize="none"
                            onBlur={() => {setPasswordFocused(false)}} 
                            onFocus={() => {setPasswordFocused(true)}} 
                            style={styles.fieldTextInput}
                            onChangeText={(text) => {setTextInput(text, setPasswordInput)}}
                            value={passwordInput}/>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton styleOptions={styles.loginButton} onPress={loginHandler}>Login</PrimaryButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    window: {
        width: "100%",
        height: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "center"
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    banner: {
        position: "absolute",
        top: 12,
        width:"100%",
        alignItems: "center",
        backgroundColor: "#111"
    },
    container:{
        height: "60%",
        width: "75%",
        justifyContent: "space-evenly"
    },
    buttonContainer: {
        alignItems: "flex-end",
    },
    loginButton: {
        backgroundColor: colors.SECONDARYACCENTTINT,
        color: colors.ACCENTTINT,
        borderRadius: 20,
        width: 130
    },
    heading: {
        fontSize: 40,
        fontWeight: "bold",
        color: colors.ACCENTTINT,
        fontFamily: "serif"
    },
    subText: {
        fontSize: 20,
        fontWeight: "300",
        color: "lightsteelblue",
        marginTop: 5
    },
    error: {
        fontSize: 20,
        color: colors.ACCENTTINT,
    },
    success: {
        fontSize: 20,
        color: colors.SECONDARYACCENTTINT
    },
    inputs: {
        marginVertical: 30
    },
    overlay: {
        position: "absolute",
        left: "18%",
        top: 16,
        pointerEvents: "none"
    },
    field: {
        position: "relative",
        backgroundColor: colors.PRIMARYWHITE,
        borderRadius: 10,
        marginVertical: 15,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    fieldLabel: {
        fontSize: 13,
        color: "#777"
    },
    fieldInput: {
        flexDirection: "row",
        alignItems: "center",
    },
    fieldTextInput: {
        marginLeft: 10,
        flex: 1,
        fontWeight: "bold"
    }
})

export default Login;