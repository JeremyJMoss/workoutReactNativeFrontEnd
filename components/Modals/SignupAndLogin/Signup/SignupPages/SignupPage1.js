import { useState } from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";
import { colors } from "../../../../../config/config";

const SignupPage1 = () => {
    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");

    const setTextInput = (text, callbackFunc) => {
        callbackFunc(text);
    }

    return (
        <View style={styles.inputs}>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>FIRST NAME</Text>
                <View style={styles.fieldInput}>
                    <TextInput
                    autoCapitalize="words"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => {setTextInput(text, setFirstNameInput)}}
                    value={firstNameInput}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>LAST NAME</Text>
                <View style={styles.fieldInput}>
                    <TextInput
                    autoCapitalize="words"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => {setTextInput(text, setLastNameInput)}}
                    value={lastNameInput}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>EMAIL</Text>
                <View style={styles.fieldInput}>
                    <TextInput
                    autoCapitalize="none" 
                    style={styles.fieldTextInput}
                    onChangeText={(text) => {setTextInput(text, setEmailInput)}}
                    value={emailInput}/>
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