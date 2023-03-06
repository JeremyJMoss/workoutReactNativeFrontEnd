import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MealSection from "./MealSection";
import DateScroll from "../../UIElements/DateScroll";
import { useSelector, useDispatch } from "react-redux";
import { fetchMealTypes } from "../../../config/reducers/mealsReducer";
import { useEffect } from "react";

const NutritionScreen = function({navigation}){
    const {mealTypes} = useSelector((state) => state.meals);
    const {fetchStatus} = useSelector((state) => state.meals.loginResponse);
    const dispatch = useDispatch();

    useEffect(() => {
        if(mealTypes.length < 1){
            dispatch(fetchMealTypes());
        }
    }, [mealTypes])

    return (
        <View style={styles.container}>
            <DateScroll/>
            <ScrollView>
                {fetchStatus !== "loading" && mealTypes.map((meal, index) => {
                    return <MealSection 
                    navigation={navigation} 
                    mealType={meal.mealType} 
                    key={meal.mealType}/>
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default NutritionScreen;