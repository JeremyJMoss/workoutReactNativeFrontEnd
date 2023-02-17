//close button element for modals
import {View, Pressable, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../config/config";

const CloseButton = ({onPress}) => {
    return (
        <View style={styles.closeButton}>
                <Pressable onPress={onPress}>
                    <Ionicons size={32} color={colors.PRIMARYWHITE} name="close-outline"/>
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    closeButton: {
        position: "absolute",
        top: 20,
        right: 20
    }
})

export default CloseButton;