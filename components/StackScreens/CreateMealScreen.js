import { Text, View, StyleSheet, TextInput, ScrollView} from "react-native";
import { colors } from "../../config/config";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { energyMeasurementChange, nameChange, servingSizeChange, unitOfMeasurementChange, energyChange, proteinChange, totalFatChange, saturatedFatChange, carbohydratesChange, sugarsChange, sodiumChange, createMeal, resetFetchStatus, resetErrorMessage, resetFields } from "../../config/reducers/adminReducer";
import RadioForm from "react-native-simple-radio-button";
import CreateMealModal from "../Modals/CreateMealModal.js/CreateMealModal";
import HeaderButton from "../UIElements/HeaderButton";

const CreateMealScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const fetchStatus = useSelector((state) => state.admin.fetchStatus);
    const errorMessage = useSelector((state) => state.admin.errorMessage);
    const newMealData = useSelector((state) => state.admin.newMealData);
    const {token} = useSelector(state => state.login.loginResponse);
    const [hasNameError, setHasNameError] = useState(false);
    const [hasServingSizeError, setHasServingSizeError] = useState(false);
    const [hasEnergyError, setHasEnergyError] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButton 
                title="Save"
                onPress={sendMealData}/>
            ),
          });
    }, [navigation, sendMealData, newMealData]);

    useEffect(() => {
        if (fetchStatus !== "success") return;
        dispatch(resetFetchStatus());
        dispatch(resetErrorMessage());
        dispatch(resetFields());
        navigation.navigate("Main");
    }, [fetchStatus])

    const changeField = (text, dispatchFunction, fieldState, stateSetter = null) => {
        dispatch(dispatchFunction({value: text}));
        if (fieldState) return;
        if (stateSetter){
            stateSetter(false);
        }
    }

    const closeModal = () => {
        dispatch(resetFetchStatus());
        dispatch(resetErrorMessage());
    }

    const sendMealData = () => {
        const strippedValues = Object.entries(newMealData)
        .reduce((acc, [index, value]) => {
            return {...acc, [index]: value.trim() == "" ? null : value.trim()}
        }, {})

        if (!strippedValues.name) setHasNameError(true);
        if (!strippedValues.servingSize) setHasServingSizeError(true);
        if (!strippedValues.energy) setHasEnergyError(true);
        
        if (strippedValues.name && strippedValues.servingSize && strippedValues.energy){
            dispatch(createMeal({token, meal: strippedValues}));
        }
    }; 

    return (
        <View style={styles.container}>
            <CreateMealModal
            isVisible={fetchStatus === "error" || fetchStatus === "loading"}
            status={fetchStatus}
            onClose={closeModal}
            errorMessage={errorMessage}/>
            <ScrollView style={styles.inputs}>
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Name *</Text>
                    <View style={{...styles.nameFieldInput, ...hasNameError && styles.errorField}}>
                        <TextInput
                        autoCapitalize="words"
                        style={styles.fieldTextInput}
                        onChangeText={(text) => changeField(text, nameChange, newMealData.name, setHasNameError)}
                        value={newMealData.name}/>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>{`Serving Size (${newMealData.unitOfMeasurement}) *`}</Text>
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
                            color: colors.SECONDARYACCENTTINT, 
                            marginRight: 15, 
                            fontSize: 16
                        }
                    }
                    onPress={(value) => dispatch(unitOfMeasurementChange({value}))}
                />
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>{`Energy (${newMealData.energyMeasurement}) *`}</Text>
                    <View style={{...styles.fieldInput, ...hasEnergyError && styles.errorField}}>
                        <TextInput
                        keyboardType="number-pad"
                        style={styles.fieldTextInput}
                        onChangeText={(text) => changeField(text, energyChange, newMealData.energy, setHasEnergyError)}
                        value={newMealData.energy}/>
                    </View>
                </View>
                <RadioForm
                    radio_props={[{label: "cal", value: "cal"}, {label: "kj", value: "kj"}]}
                    initial={0}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={colors.PRIMARYWHITE}
                    selectedButtonColor={colors.SECONDARYACCENTTINT}
                    animation={true}
                    labelStyle={
                        {
                            color: colors.SECONDARYACCENTTINT, 
                            marginRight: 15, 
                            fontSize: 16
                        }
                    }
                    onPress={(value) => dispatch(energyMeasurementChange({value}))}
                />
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Protein (g)</Text>
                    <View style={styles.fieldInput}>
                        <TextInput
                        keyboardType="number-pad"
                        style={styles.fieldTextInput}
                        onChangeText={(text) => changeField(text, proteinChange, newMealData.protein)}
                        value={newMealData.protein}/>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Total Fat (g)</Text>
                    <View style={styles.fieldInput}>
                        <TextInput
                        keyboardType="number-pad"
                        style={styles.fieldTextInput}
                        onChangeText={(text) => changeField(text, totalFatChange, newMealData.totalFat)}
                        value={newMealData.totalFat}/>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Saturated Fat (g)</Text>
                    <View style={styles.fieldInput}>
                        <TextInput
                        keyboardType="number-pad"
                        style={styles.fieldTextInput}
                        onChangeText={(text) => changeField(text, saturatedFatChange, newMealData.saturatedFat)}
                        value={newMealData.saturatedFat}/>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Carbohydrates (g)</Text>
                    <View style={styles.fieldInput}>
                        <TextInput
                        keyboardType="number-pad"
                        style={styles.fieldTextInput}
                        onChangeText={(text) => changeField(text, carbohydratesChange, newMealData.carbohydrates)}
                        value={newMealData.carbohydrates}/>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Sugars (g)</Text>
                    <View style={styles.fieldInput}>
                        <TextInput
                        keyboardType="number-pad"
                        style={styles.fieldTextInput}
                        onChangeText={(text) => changeField(text, sugarsChange, newMealData.sugars)}
                        value={newMealData.sugars}/>
                    </View>
                </View>
                <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Sodium (mg)</Text>
                    <View style={styles.fieldInput}>
                        <TextInput
                        keyboardType="number-pad"
                        style={styles.fieldTextInput}
                        onChangeText={(text) => changeField(text, sodiumChange, newMealData.sodium)}
                        value={newMealData.sodium}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
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
        flex: 2,
        backgroundColor: colors.PRIMARYWHITE,
        borderRadius: 10,
        marginVertical: 15,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    nameFieldInput: {
        flex: 14,
        backgroundColor: colors.PRIMARYWHITE,
        borderRadius: 10,
        marginVertical: 15,
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    errorField: {
        borderColor: "red",
        borderWidth: 2.5,
    },
    fieldTextInput: {
        flex: 1,
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center"
    },
    inputs: {
        marginHorizontal: 30,
    },
    servingMetric: {
        top: 5,
        right: 8,
        fontSize: 18
    },
})

export default CreateMealScreen;