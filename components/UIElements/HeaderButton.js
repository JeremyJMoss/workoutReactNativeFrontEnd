import { Pressable, Text, View, StyleSheet } from "react-native";
import { colors } from "../../config/config";

const HeaderButton = ({title, onPress}) => {
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.pressableSurface} onPress={onPress}>
                <Text style={styles.buttonText}>{title}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginHorizontal: 20
    },
    pressableSurface: {
        paddingHorizontal: 20
    },
    buttonText: {
        color: colors.ACCENTTINT,
        fontSize: 20,
        fontWeight: "bold"
    }
})

export default HeaderButton;