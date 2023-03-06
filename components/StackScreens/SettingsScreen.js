import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../config/config";

const SettingsScreen = ({props}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello Settings!</Text>
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

export default SettingsScreen;