import {View, Pressable, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../../config/config";

const Signup = ({setPage}) => {
    return (
        <View style={styles.window}>
            <View style={styles.closeButton}>
                <Pressable onPress={() => setPage("buttons")}>
                    <Ionicons size={32} color={colors.PRIMARYWHITE} name="close-outline"/>
                </Pressable>
            </View>
            <View style={styles.container}>

            </View>
        </View>
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
        top: 20,
        right: 20
    }
})

export default Signup;