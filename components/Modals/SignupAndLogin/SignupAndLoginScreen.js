import { View, StyleSheet } from "react-native";
import { Modal } from "react-native";
import FloatingButtons from "./FloatingButtons";
import {colors} from "../../../config/config";
import { useState } from "react";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

const SignupAndLogin = function({isVisible}){
    const [modalPage, setModalPage] = useState("buttons");

    return (
        <Modal visible={isVisible} transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {modalPage === "buttons" && <FloatingButtons setPage={setModalPage}/>}
                    {modalPage === "login" && <Login setPage={setModalPage}/>}
                    {modalPage == "signup" && <Signup setPage={setModalPage}/>}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        width: "90%",
        height: "90%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        backgroundColor: colors.PRIMARYBACKGROUND
    }
})

export default SignupAndLogin;