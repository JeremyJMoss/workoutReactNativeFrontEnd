import { useState } from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import { colors } from "../../../../../config/config";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { usernameChange, passwordChange } from "../../../../../config/reducers/signupReducer";

const SignupPage2 = () => {
    const dispatch = useDispatch();
    const {username, password} = useSelector((state) => state.signup.signupData);
    const [usernameFocused, setUsernameFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    return (
        <View style={styles.inputs}>
            <View style={styles.field}>
                <Text style={{...styles.fieldLabel, ...!usernameFocused && username === "" && styles.overlay}}>USERNAME</Text>
                <View style={styles.fieldInput}>
                    <Ionicons name="person-outline" size={20}/>
                    <TextInput
                    autoCapitalize="none"
                    onBlur={() => setUsernameFocused(false)} 
                    onFocus={() => setUsernameFocused(true)} 
                    style={styles.fieldTextInput}
                    onChangeText={(text) => {dispatch(usernameChange({value: text}))}}
                    value={username}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={{...styles.fieldLabel, ...!passwordFocused && password === "" && styles.overlay}}>PASSWORD</Text>
                <View style={styles.fieldInput}>
                    <Ionicons name="lock-closed-outline" size={20}/>
                    <TextInput
                    autoCapitalize="none"
                    onBlur={() => setPasswordFocused(false)} 
                    onFocus={() => setPasswordFocused(true)} 
                    style={styles.fieldTextInput}
                    onChangeText={(text) => {dispatch(passwordChange({value: text}))}}
                    value={password}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        left: "20%",
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
    },
    inputs: {
        marginVertical: 30
    },
})

export default SignupPage2;