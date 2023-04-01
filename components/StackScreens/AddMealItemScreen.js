import { Text, View, StyleSheet, TextInput, ActivityIndicator} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BASE_URL, colors } from "../../config/config";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MealItem from "../TabScreens/Nutrition/MealItem";

const AddMealItemScreen = ({navigation, route}) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [firstLoad, setFirstLoad] = useState(true);
    const [mealItems, setMealItems] = useState([]);
    const [fetchStatus, setFetchStatus] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {token} = useSelector(state => state.login.loginResponse);

    const mealType = route.params.title;

    useEffect(() => {
        if (firstLoad){
            setFirstLoad(false);
            return;
        }
        if (!searchQuery) {
            setMealItems([]);
            setFetchStatus("");
            return;
        }
        setFetchStatus("loading");
        const timer = setTimeout(() => {
            fetch(`${BASE_URL}/meals/filteredmeals`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({searchQuery})
            })
            .then(response => {
                if (response.status === 404){
                    throw new Error("Network Error");
                }
                if (!response.ok && response.status !== 404){
                    throw new Error(response.json());    
                }

                return response.json();
            })
            .then(data => {
                setFetchStatus("success");
                setMealItems(data.results);
            })
            .catch(error => {
                setFetchStatus("error");
                setErrorMessage(error.message);
            })
            
        }, 800);
        return () => clearTimeout(timer);
    }, [searchQuery, firstLoad])

    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={18} color={colors.PRIMARYBAR}/>
                <TextInput
                placeholder="Find a food..."
                style={styles.searchField}
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
                autoCapitalize="none"/>
            </View>
            <View style={styles.mealListContainer}>
                <ScrollView style={styles.mealsList}>
                    {mealItems.length > 0 && fetchStatus === "success" && 
                    mealItems.map((item) => {
                        return ( 
                        <MealItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        onPress={() => {
                            navigation.navigate("ItemDetails", {meal: item, mealType})
                        }}/>
                        )    
                    })}
                    {mealItems.length === 0 && fetchStatus === "success" && <Text style={{textAlign: "center"}}>No meals found...</Text>}
                    {fetchStatus === "loading" && <ActivityIndicator size="large" color="#777"/>}
                    {fetchStatus === "error" && <Text>{errorMessage}</Text>}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 20,
    },
    searchBar:{
        height: 50,
        width: "100%",
        backgroundColor: colors.PRIMARYWHITE,
        borderRadius: 30,
        marginBottom: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    searchField: {
        fontSize: 18,
        height: "100%",
        flexGrow: 1,
        paddingHorizontal: 5
    },
    mealListContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: colors.PRIMARYWHITE,
        borderRadius: 15,
        padding: 10,
        alignItems: "center",
    },
    mealsList: {
        width: "100%"
    }
})

export default AddMealItemScreen;