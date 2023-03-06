import {Text, View, Pressable, TextInput, StyleSheet, ActivityIndicator} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../../config/config";
import PrimaryButton from "../../../UIElements/PrimaryButton";
import CloseButton from "../../../UIElements/CloseButton";
import { useState, useEffect, useRef } from "react";
import { usernameChange, passwordChange, attemptLogin, setErrorMessage, resetFetchStatus, resetErrorMessage } from "../../../../config/reducers/loginReducer";
import { useSelector , useDispatch } from "react-redux";

const Login = ({setPage}) => {
    const dispatch = useDispatch();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const {username, password} = useSelector((state) => state.login.loginDetails);
    const [hasUsernameError, setHasUsernameError] = useState(false);
    const [hasPasswordError, setHasPasswordError] = useState(false);
    const loginResponse = useSelector((state) => state.login.loginResponse);

    const changePassword = (text) => {
        dispatch(passwordChange({value: text}));
        if (password) return;
        setHasPasswordError(false);
    }

    const changeUsername = (text) => {
        dispatch(usernameChange({value: text}));
        if (username) return;
        setHasUsernameError(false);
    }

    const blurInputs = () => {
        passwordRef.current.blur();
        usernameRef.current.blur();
        setPasswordFocused(false);
        setUsernameFocused(false);
    }

    useEffect(() => {
        if (!loginResponse.errorMessage) return;

        setTimeout(() => {
            if (loginResponse.fetchStatus == "error"){
                dispatch(resetFetchStatus());
            }
            dispatch(resetErrorMessage());
        }, 2500)
    }, [loginResponse.errorMessage])

    //TODO set up login logic using redux async thunk 

    const loginHandler = () => {
        const strippedUsername = username.trim();
        const strippedPassword = password.trim();
        if (!strippedUsername){
            dispatch(setErrorMessage({value:"All fields are required"}));
            setHasUsernameError(true);
        } 
        if (!strippedPassword){
            dispatch(setErrorMessage({value:"All fields are required"}));
            setHasPasswordError(true);
        }
        if (strippedUsername && strippedPassword){
            dispatch(attemptLogin({username: strippedUsername, password: strippedPassword}));
            blurInputs();
        }
    }

    return (
        <Pressable onPress={blurInputs} style={styles.window}>
            <View style={styles.window}>
                <CloseButton onPress={() => setPage("buttons")}/>
                {loginResponse.hasError && <View style={styles.banner}><Text style={styles.error}>{loginResponse.errorMessage}</Text></View>}
                {loginResponse.loggedIn && <View style={styles.banner}><Text style={styles.success}>Logged In</Text></View>}
                <View style={styles.container}>
                    {loginResponse.fetchStatus == "loading" && <ActivityIndicator size="large" color={colors.SECONDARYACCENTTINT}/>}
                    <View style={styles.header}>
                        <Text style={styles.heading}>Login</Text>
                        <Text style={styles.subText}>Please sign in to continue.</Text>
                    </View>
                    <View style={styles.inputs}>
                        <View style={{...styles.field, ...hasUsernameError && styles.errorField}}>
                            <Text style={{...styles.fieldLabel, ...!usernameFocused && username === "" && styles.overlay}}>USERNAME</Text>
                            <View style={styles.fieldInput}>
                                <Ionicons name="person-outline" size={20}/>
                                <TextInput
                                autoCapitalize="none"
                                ref={usernameRef}
                                onBlur={() => {setUsernameFocused(false)}} 
                                onFocus={() => setUsernameFocused(true)} 
                                style={styles.fieldTextInput}
                                onChangeText={(text) => changeUsername(text)}
                                value={username}/>
                            </View>
                        </View>
                        <View style={{...styles.field, ...hasPasswordError && styles.errorField}}>
                            <Text style={{...styles.fieldLabel, ...!passwordFocused && password === "" && styles.overlay}}>PASSWORD</Text>
                            <View style={styles.fieldInput}>
                                <Ionicons name="lock-closed-outline" size={20}/>
                                <Pressable style={styles.eyeIcon} onPress={() => {setPasswordShown((state) => !state)}}>
                                    {passwordShown ? <Ionicons name="eye-outline" size={25}/> : <Ionicons name="eye-off-outline"size={25}/>}
                                </Pressable>
                                <TextInput
                                autoCapitalize="none"
                                ref={passwordRef}
                                onBlur={() => {setPasswordFocused(false)}} 
                                onFocus={() => {setPasswordFocused(true)}} 
                                style={styles.fieldTextInput}
                                onChangeText={(text) => changePassword(text)}
                                value={password}
                                secureTextEntry={!passwordShown}/>
                            </View>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton styleOptions={styles.loginButton} onPress={loginHandler}>Login</PrimaryButton>
                    </View>
                </View>
            </View>
        </Pressable>
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
        paddingVertical: 10,
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
    eyeIcon: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 2
    },
    field: {
        position: "relative",
        backgroundColor: colors.PRIMARYWHITE,
        borderRadius: 10,
        marginVertical: 15,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    errorField: {
        borderColor: "red",
        borderWidth: 3,
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