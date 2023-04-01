import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MealSection from "./MealSection";
import DateScroll from "../../UIElements/DateScroll";
import { mealTypes } from "../../../config/config";

const NutritionScreen = function({navigation}){

    return (
        <View style={styles.container}>
            <DateScroll/>
            <ScrollView>
                {mealTypes.map((meal, index) => {
                    return <MealSection 
                    navigation={navigation} 
                    mealType={meal} 
                    key={index}/>
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
}
})

export default NutritionScreen;