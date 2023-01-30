import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../../config/colors";

const HomeScreen = function({props}){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello Home!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text:{
        color: colors.PRIMARYWHITE,
        fontSize: 20,
    }
})

export default HomeScreen;