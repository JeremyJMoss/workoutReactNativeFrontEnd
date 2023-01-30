import { Button, View, StyleSheet } from "react-native";
import PrimaryButton from "../../UIElements/PrimaryButton";

const FloatingButtonsModal = function({props}){
    return (
        <View style={styles.btnContainer}>
            <PrimaryButton>Signup</PrimaryButton>
            <PrimaryButton>Login</PrimaryButton>
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        width: "90%",
        height: "90%",
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default FloatingButtonsModal;