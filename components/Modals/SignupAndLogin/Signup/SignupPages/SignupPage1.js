import { useState } from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import { colors } from "../../../../../config/config";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { firstNameChange, lastNameChange, emailChange } from "../../../../../config/reducers/signupReducer";

const SignupPage1 = () => {
    const dispatch = useDispatch();
    const {firstName, lastName, email} = useSelector((state) => state.signup.signupData);
    const [firstNameFocused, setFirstNameFocused] = useState(false);
    const [lastNameFocused, setLastNameFocused] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);

    return (
        <View style={styles.inputs}>
            <View style={styles.field}>
                <Text style={{...styles.fieldLabel, ...!firstNameFocused && firstName === "" && styles.overlay}}>FIRST NAME</Text>
                <View style={styles.fieldInput}>
                    <Ionicons name="person-circle-outline" size={20}/>
                    <TextInput
                    autoCapitalize="words"
                    onBlur={() => setFirstNameFocused(false)} 
                    onFocus={() => setFirstNameFocused(true)} 
                    style={styles.fieldTextInput}
                    onChangeText={(text) => {dispatch(firstNameChange({value: text}))}}
                    value={firstName}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={{...styles.fieldLabel, ...!lastNameFocused && lastName === "" && styles.overlay}}>LAST NAME</Text>
                <View style={styles.fieldInput}>
                    <Ionicons name="person-circle" size={20}/>
                    <TextInput
                    autoCapitalize="words"
                    onBlur={() => setLastNameFocused(false)} 
                    onFocus={() => setLastNameFocused(true)} 
                    style={styles.fieldTextInput}
                    onChangeText={(text) => {dispatch(lastNameChange({value: text}))}}
                    value={lastName}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={{...styles.fieldLabel, ...!emailFocused && email === "" && styles.overlay}}>EMAIL</Text>
                <View style={styles.fieldInput}>
                    <Ionicons name="mail-outline" size={20}/>
                    <TextInput
                    autoCapitalize="none"
                    onBlur={() => setEmailFocused(false)} 
                    onFocus={() => setEmailFocused(true)}  
                    style={styles.fieldTextInput}
                    onChangeText={(text) => {dispatch(emailChange({value: text}))}}
                    value={email}/>
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

export default SignupPage1;