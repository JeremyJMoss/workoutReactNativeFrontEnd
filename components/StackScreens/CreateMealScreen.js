import { Text, View, StyleSheet, TextInput, ScrollView } from "react-native";
import { colors } from "../../config/config";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nameChange, servingSizeChange, unitOfMeasurementChange, energyChange, proteinChange, totalFatChange, saturatedFatChange, carbohydratesChange, sugarsChange, sodiumChange, createMeal } from "../../config/reducers/adminReducer";
import RadioForm from "react-native-simple-radio-button";
import PrimaryButton from "../UIElements/PrimaryButton"

const CreateMealScreen = () => {
    const dispatch = useDispatch();
    const newMealData = useSelector((state) => state.admin.newMealData);
    const {token} = useSelector(state => state.login.loginResponse);
    const [hasNameError, setHasNameError] = useState(false);
    const [hasServingSizeError, setHasServingSizeError] = useState(false);
    const [hasEnergyError, setHasEnergyError] = useState(false);
    const [hasProteinError, setHasProteinError] = useState(false);
    const [hasTotalFatError, setHasTotalFatError] = useState(false);
    const [hasSaturatedFatError, setHasSaturatedFatError] = useState(false);
    const [hasCarbohydratesError, setHasCarbohydratesError] = useState(false);
    const [hasSugarsError, setHasSugarsError] = useState(false);
    const [hasSodiumError, setHasSodiumError] = useState(false);

    const changeField = (text, dispatchFunction, fieldState, stateSetter) => {
        dispatch(dispatchFunction({value: text}));
        if (fieldState) return;
        stateSetter(false);
    }

    const sendMealData = () => {
        const strippedValues = Object.entries(newMealData)
        .reduce((acc, [index, value]) => {
            return {...acc, [index]: value.trim()}
        }, {})

        if (!strippedValues.name) setHasNameError(true);
        if (!strippedValues.servingSize) setHasServingSizeError(true);
        if (!strippedValues.protein) setHasProteinError(true);
        if (!strippedValues.energy) setHasEnergyError(true);
        if (!strippedValues.totalFat) setHasTotalFatError(true);
        if (!strippedValues.saturatedFat) setHasSaturatedFatError(true);
        if (!strippedValues.carbohydrates) setHasCarbohydratesError(true);
        if (!strippedValues.sugars) setHasSugarsError(true);
        if (!strippedValues.sodium) setHasSodiumError(true);

        if (Object.values(strippedValues).every(val => val !== "")){
            dispatch(createMeal({token, meal: newMealData}));
        }
    } 

    return (
        <ScrollView style={styles.inputs}>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>Name</Text>
                <View style={{...styles.fieldInput, ...hasNameError && styles.errorField}}>
                    <TextInput
                    autoCapitalize="words"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => changeField(text, nameChange, newMealData.name, setHasNameError)}
                    value={newMealData.name}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>Serving Size</Text>
                <View style={{...styles.fieldInput, ...hasServingSizeError && styles.errorField}}>
                    <TextInput
                    keyboardType="number-pad"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => changeField(text, servingSizeChange, newMealData.servingSize, setHasServingSizeError)}
                    value={newMealData.servingSize}/>
                </View>
            </View>
            <RadioForm
                radio_props={[{label: "g", value: "g"}, {label: "mL", value: "mL"}]}
                initial={0}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={colors.PRIMARYWHITE}
                selectedButtonColor={colors.SECONDARYACCENTTINT}
                animation={true}
                labelStyle={
                    {
                        color: colors.PRIMARYWHITE, 
                        marginRight: 15, 
                        fontSize: 20
                    }
                }
                onPress={(value) => dispatch(unitOfMeasurementChange({value}))}
            />
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>Energy</Text>
                <View style={{...styles.fieldInput, ...hasEnergyError && styles.errorField}}>
                    <TextInput
                    keyboardType="number-pad"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => changeField(text, energyChange, newMealData.energy, setHasEnergyError)}
                    value={newMealData.energy}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>Protein</Text>
                <View style={{...styles.fieldInput, ...hasProteinError && styles.errorField}}>
                    <TextInput
                    keyboardType="number-pad"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => changeField(text, proteinChange, newMealData.protein, setHasProteinError)}
                    value={newMealData.protein}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>Total Fat</Text>
                <View style={{...styles.fieldInput, ...hasTotalFatError && styles.errorField}}>
                    <TextInput
                    keyboardType="number-pad"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => changeField(text, totalFatChange, newMealData.totalFat, setHasTotalFatError)}
                    value={newMealData.totalFat}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>Saturated Fat</Text>
                <View style={{...styles.fieldInput,...hasSaturatedFatError && styles.errorField}}>
                    <TextInput
                    keyboardType="number-pad"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => changeField(text, saturatedFatChange, newMealData.saturatedFat, setHasSaturatedFatError)}
                    value={newMealData.saturatedFat}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>Carbohydrates</Text>
                <View style={{...styles.fieldInput, ...hasCarbohydratesError && styles.errorField}}>
                    <TextInput
                    keyboardType="number-pad"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => changeField(text, carbohydratesChange, newMealData.carbohydrates, setHasCarbohydratesError)}
                    value={newMealData.carbohydrates}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>Sugars</Text>
                <View style={{...styles.fieldInput, ...hasSugarsError && styles.errorField}}>
                    <TextInput
                    keyboardType="number-pad"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => changeField(text, sugarsChange, newMealData.sugars, setHasSugarsError)}
                    value={newMealData.sugars}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>Sodium</Text>
                <View style={{...styles.fieldInput, ...hasSodiumError && styles.errorField}}>
                    <TextInput
                    keyboardType="number-pad"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => changeField(text, sodiumChange, newMealData.sodium, setHasSodiumError)}
                    value={newMealData.sodium}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton
                onPress={sendMealData}
                styleOptions={styles.buttonStyle}
                >Submit</PrimaryButton>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    field: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    fieldLabel: {
        flex: 5,
        fontSize: 17,
        fontWeight: "500",
        color: colors.SECONDARYACCENTTINT,
    },
    fieldInput: {
        flex: 6,
        backgroundColor: colors.PRIMARYWHITE,
        borderRadius: 10,
        marginVertical: 15,
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    errorField: {
        borderColor: "red",
        borderWidth: 2.5,
    },
    fieldTextInput: {
        marginLeft: 10,
        flex: 1,
        fontWeight: "bold",
        fontSize: 14
    },
    inputs: {
        marginHorizontal: 20
    },
    servingMetric: {
        top: 5,
        right: 8,
        fontSize: 18
    },
    buttonStyle: {
        backgroundColor: colors.SECONDARYACCENTTINT,
        color: colors.ACCENTTINT,
        fontSize: 18,
        width: 180,
        borderWidth: 3,
    },
    buttonContainer: {
        alignItems: "center",
        margin: 20
    }
})

export default CreateMealScreen;