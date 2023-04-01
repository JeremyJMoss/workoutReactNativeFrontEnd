import { StyleSheet, Modal, View, ActivityIndicator, Text, Image } from "react-native"
import { colors } from "../../../config/config";
import PrimaryButton from "../../UIElements/PrimaryButton";

const CreateMealModal = ({isVisible, status, errorMessage, onClose}) => {
    
    return (
        <Modal
        animationType="fade"
        visible={isVisible}
        transparent={true}
        >
            <View style={styles.container}>
                <View style={styles.window}>
                    {status === "loading" && <ActivityIndicator size="large" color={colors.SECONDARYACCENTTINT}/>}
                    {status === "error" && 
                    <View style={styles.modalMessage}>
                        <Image
                        style={styles.errorImage}
                        source={require('../.././../assets/images/cloudyError.png')} />
                        <Text style={styles.errorText}>Error</Text>
                        <Text style={styles.errorMessage}>{errorMessage && errorMessage}</Text>
                        <View style={styles.buttonContainer}>
                            <PrimaryButton
                            styleOptions={styles.buttonStyle}
                            onPress={onClose}>
                                Try Again
                            </PrimaryButton>
                        </View>
                    </View>}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(50, 50, 50, 0.5)",
        alignItems: "center",
        justifyContent: "center"
    },
    window: {
        width: "80%",
        height: "60%",
        borderRadius: 20,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    errorText: {
        color: "#111",
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        letterSpacing: 1.5
    },
    errorMessage: {
        margin: 10,
        fontSize: 16,
        textAlign: "center",
        color: "#666"
    },
    errorImage: {
        width: 150,
        height: 150
    },
    buttonContainer: {
        width: "100%",
        alignItems: "center"
    },
    buttonStyle: {
        backgroundColor: colors.SECONDARYACCENTTINT,
        color: "white",
        fontSize: 20,
        width: 180,
        borderWidth: 0,
        margin: 15, 
    },
    modalMessage: {
        width: "80%",
        alignItems: "center",
    }
})

export default CreateMealModal;