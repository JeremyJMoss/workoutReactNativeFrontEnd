import { Text, View, StyleSheet, ActivityIndicator, TextInput } from "react-native";
import { colors, BASE_URL } from "../../config/config";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DropDownPicker from "../UIElements/DropDownPicker";
import { toFixedNoRound } from "../../config/helper/helper";
import HeaderButton from "../UIElements/HeaderButton";

const ItemDetailsScreen = ({route, navigation}) => {
    const [fetchStatus, setFetchStatus] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [mealData, setMealData] = useState({});
    const {token} = useSelector(state => state.login.loginResponse);
    const [selectedServingSize, setSelectedServingSize] = useState(null);
    const [quantity, setQuantity] = useState("");
    const {date} = useSelector(state => state.date);

    const {id, name} = route.params.meal;
    const {mealType} = route.params;

    useEffect(() => {
    navigation.setOptions({
        headerRight: () => (
            <HeaderButton 
            title="Save"
            onPress={sendMealEntry}/>
        ),
      });
    }, [navigation, sendMealEntry]);

    useEffect(() => {
        if(Object.keys(mealData).length < 1) return;
        setSelectedServingSize({name: "Serving", option:`${mealData.servings.find(serving => serving.name == "Serving")?.servingSize}${mealData.unitOfMeasurement}`});
    }, [mealData])

    useEffect(() => {
        setFetchStatus("loading");
        fetch(`${BASE_URL}/meals/getmealbyid`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({id})
        })
        .then(response => {
            if (response.status === 404){
                throw new Error("Network Error");
            }
            if (!response.ok){
                throw new Error(response.json());    
            }

            return response.json();
        })
        .then(data => {
            setFetchStatus("success");
            setMealData(data.meal);
        })
        .catch(error => {
            setFetchStatus("error");
            setErrorMessage(error.message);
        })
    }, [id, token])

    const sendMealEntry = function() {
        if (!quantity) return;
        setFetchStatus("loading");
        fetch(`${BASE_URL}/meals/createmealentry`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                dateEaten: date,
                mealType,
                foodId: id,
                servingName: selectedServingSize.name,
                quantity
            })
        })
        .then(response => {
            if (response.status === 404){
                throw new Error("Network Error");
            }
            if (!response.ok){
                throw new Error(response.json());    
            }

            return response.json();
        })
        .then(data => {
            setFetchStatus("success");
        })
        .catch(error => {
            setFetchStatus("error");
            setErrorMessage(error.message);
        })
    }

    const servingSize = parseInt(selectedServingSize?.option) * parseFloat(quantity);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{name}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.fields}>
                    {fetchStatus == "success" &&    
                    <>    
                        <View style={styles.rowContainer}>
                            <Text style={styles.fieldText}>Quantity:</Text>
                            <TextInput
                            style={styles.quantityField}
                            keyboardType="number-pad"
                            onChangeText={text => setQuantity(text)}
                            value={quantity}
                            />
                        </View>
                        <View style={styles.rowContainer}>
                            {mealData && selectedServingSize &&
                            <DropDownPicker
                            setSelectedValue={setSelectedServingSize}
                            selectedValue={selectedServingSize.option}
                            optionKeys={mealData.servings?.map(serving => serving.name)}
                            options={mealData.servings?.map(serving => {
                                if (serving.name === "Single"){
                                    return `${serving.servingSize}${mealData.unitOfMeasurement}`;
                                }
                                return `${serving.name} (${serving.servingSize}${mealData.unitOfMeasurement})`;
                            })}
                            />}
                        </View>
                        {mealData && selectedServingSize && quantity &&
                        <View style={styles.servingInfoContainer}>
                            <View style={styles.servingInfo}>
                                <View>
                                    <Text style={styles.fieldData}>Energy</Text>
                                    <Text style={{...styles.fieldData, ...styles.values}}>{Math.round(servingSize * mealData.energy)}cal</Text>
                                </View>
                                <View>
                                    <Text style={styles.fieldData}>Protein</Text>
                                    <Text style={{...styles.fieldData, ...styles.values}}>{toFixedNoRound(servingSize * mealData.protein, 2)}g</Text>
                                </View>
                                <View>
                                    <Text style={styles.fieldData}>Total Fat</Text> 
                                    <Text style={{...styles.fieldData, ...styles.values}}>{toFixedNoRound(servingSize * mealData.totalFat, 2)}g</Text>
                                </View>
                                <View>
                                    <Text style={styles.fieldData}>Sat Fat</Text>
                                    <Text style={{...styles.fieldData, ...styles.values}}>{toFixedNoRound(servingSize * mealData.saturatedFat, 2)}g</Text>
                                </View>
                            </View>
                            <View style={styles.servingInfo}>
                                <View>
                                    <Text style={styles.fieldData}>Carbs</Text>
                                    <Text style={{...styles.fieldData, ...styles.values}}>{toFixedNoRound(servingSize * mealData.carbohydrates, 2)}g</Text>
                                </View>
                                <View>
                                    <Text style={styles.fieldData}>Sugars</Text>
                                    <Text style={{...styles.fieldData, ...styles.values}}>{toFixedNoRound(servingSize * mealData.sugars, 2)}g</Text>
                                </View>
                                <View>
                                    <Text style={styles.fieldData}>Sodium</Text>
                                    <Text style={{...styles.fieldData, ...styles.values}}>{Math.round(servingSize * mealData.sodium)}mg</Text>
                                </View>
                            </View>
                        </View>}
                    </>
                    }
                    {fetchStatus === "loading" && <ActivityIndicator size="large" color="#777"/>}
                    {fetchStatus === "error" && <Text >{errorMessage}</Text>}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        alignItems: "center",
    },
    headerContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.PRIMARYWHITE,
        padding: 15,
        borderRadius: 5
    },
    headerText:{
        color: colors.ACCENTTINT,
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center"
    },
    fieldText: {
        color: colors.SECONDARYACCENTTINT,
        fontWeight: "600",
        fontSize: 18,
        marginVertical: 30
    },
    body: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        padding: 30
    },
    fields: {
        flex: 1,
        width: "100%",
        alignItems: "center",
    },  
    rowContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    quantityField: {
        backgroundColor: colors.PRIMARYWHITE,
        fontSize: 18,
        paddingVertical: 10,
        width: "20%",
        textAlign: "center",
        borderRadius: 5
    },
    fieldData: {
        marginBottom: 15,
        fontSize: 16,
        color: colors.PRIMARYWHITE,
        textAlign: "center"
    },
    values: {
        color: colors.SECONDARYACCENTTINT
    },
    servingInfo: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly"
    },
    servingInfoContainer: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: colors.PRIMARYWHITE
    }
})

export default ItemDetailsScreen;