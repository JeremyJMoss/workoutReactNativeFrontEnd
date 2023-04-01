import Ionicons from "react-native-vector-icons/Ionicons";
import { Pressable, View, StyleSheet } from "react-native";

const ToggleButton = ({iconName, iconSize, iconColor, onPress}) => {
    return (
        <View>
            <Pressable style={styles.button} onPress={onPress}>
                <Ionicons name={iconName} size={iconSize} color={iconColor}/>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 50,
        paddingVertical: 10
    }
})

export default ToggleButton;