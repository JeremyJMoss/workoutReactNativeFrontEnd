import { View, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../config/config";

const AddMealButton = ({onPress}) => {
    return (
        <View>
            <Pressable onPress={onPress}>
                <Ionicons name="add-outline" color={colors.PRIMARYWHITE} size={25}/>
            </Pressable>
        </View>
    )
}

export default AddMealButton;