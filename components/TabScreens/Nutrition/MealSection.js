import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../config/config";
import AddMealButton from "./AddMealButton";

const MealSection = ({mealType, navigation}) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.heading}>{mealType}</Text>
                <AddMealButton onPress={() => navigation.navigate("AddMealItem", { title : mealType })}/>
            </View>
            <View style={styles.mealsContainer}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
    },
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20
    },
    heading: {
        color: colors.PRIMARYWHITE,
        fontSize: 20
    },
    mealsContainer: {
        marginVertical: 15,
        borderTopWidth: 1,
        borderTopColor: "#AAA"
    }
})

export default MealSection;