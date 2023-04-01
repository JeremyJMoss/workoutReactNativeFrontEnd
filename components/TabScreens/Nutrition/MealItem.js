import { StyleSheet, View, Text, Pressable } from "react-native";
import { colors } from "../../../config/config";

const MealItem = ({id, name, onPress}) => {
    return ( 
        <View style={styles.mealItem}>
            <Pressable 
            style={styles.pressableArea} 
            onPress={onPress} 
            android_ripple={{color: "#bcbcbc"}}>
                <Text 
                key={id}
                style={styles.mealText}
                >
                {name}
                </Text>
            </Pressable>
        </View>
    ) 
}

const styles = StyleSheet.create({
    mealItem: {
        flex: 1,
        alignItems: "flex-start",
        margin: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#888"
    },
    pressableArea: {
        flex: 1,
        padding: 15,
        width: "100%"
    },
    mealText: {
        fontSize: 16,
        color: colors.PRIMARYBAR
    }
})

export default MealItem;