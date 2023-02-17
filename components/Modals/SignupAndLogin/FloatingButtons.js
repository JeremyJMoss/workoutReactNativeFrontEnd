import { View, StyleSheet } from "react-native";
import { colors } from "../../../config/config";
import PrimaryButton from "../../UIElements/PrimaryButton";

const FloatingButtons = function({setPage}){
    
    return (
        <View style={styles.btnContainer}>
            <PrimaryButton styleOptions={styles.buttonStyle} onPress={() => setPage("signup")}>Signup</PrimaryButton>
            <PrimaryButton styleOptions={styles.buttonStyle} onPress={() => setPage("login")}>Login</PrimaryButton>
        </View>
    )
}

const styles = StyleSheet.create({
    btnContainer: {
        width: "60%",
        height: "30%",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    buttonStyle: {
        backgroundColor: colors.SECONDARYACCENTTINT,
        color: colors.ACCENTTINT,
        fontSize: 22,
        width: 180,
        borderWidth: 3,
    }
})

export default FloatingButtons;