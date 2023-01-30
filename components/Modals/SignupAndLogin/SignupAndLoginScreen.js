import { View, StyleSheet } from "react-native";
import { Modal } from "react-native";
import FloatingButtonsModal from "./FloatingButtonsModal";

const SignupAndLogin = function({isVisible}){
    return (
        <Modal visible={isVisible}>
            <View style={styles.container}>
                <FloatingButtonsModal/>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
})

export default SignupAndLogin;