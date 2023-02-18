import { useState } from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import { colors } from "../../../../../config/config";
import { useSelector, useDispatch } from "react-redux";
import { firstNameChange, lastNameChange, emailChange } from "../../../../../config/reducers/signupReducer";

const SignupPage1 = () => {
    const dispatch = useDispatch();
    const firstName = useSelector((state) => state.signup.firstName);
    const lastName = useSelector((state) => state.signup.lastName);
    const email = useSelector((state) => state.signup.email);

    return (
        <View style={styles.inputs}>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>FIRST NAME</Text>
                <View style={styles.fieldInput}>
                    <TextInput
                    autoCapitalize="words"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => {dispatch(firstNameChange({value: text}))}}
                    value={firstName}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>LAST NAME</Text>
                <View style={styles.fieldInput}>
                    <TextInput
                    autoCapitalize="words"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => {dispatch(lastNameChange({value: text}))}}
                    value={lastName}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>EMAIL</Text>
                <View style={styles.fieldInput}>
                    <TextInput
                    autoCapitalize="none" 
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
        left: 15,
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
        fontWeight: "bold",
        color: colors.SECONDARYACCENTTINT,
        position: "absolute",
        top: -20,
        left: 20
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