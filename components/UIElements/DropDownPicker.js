import { View, Text, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useState } from "react";
import { colors } from "../../config/config";

const DropDownPicker =  ({options, optionKeys, selectedValue, setSelectedValue}) => {
    const [dropDownOpen, setDropDownOpen] = useState(false);


    const dropDownIcon = dropDownOpen ? "caret-down-outline" : "caret-forward-outline";

    return (
        <View style={styles.dropDownContainer}>
            <View>
                <Pressable style={styles.dropDownButton} onPress={() => {setDropDownOpen(state => !state)}}>
                    <Text style={styles.dropDownButtonText}>{selectedValue}</Text>
                    <View style={styles.dropDownIcon}>
                        <Ionicons size={20} color="#111" name={dropDownIcon}/>
                    </View>
                </Pressable>
            </View>
            <View style={styles.dropDownFieldContainer}>
                {dropDownOpen && options.map((option, index) => {
                    return (
                    <View key={optionKeys[index]}>
                        <Pressable style={styles.dropDownOptionField} onPress={() => {
                            setDropDownOpen(false);
                            setSelectedValue({name: optionKeys[index], option});
                        }}>
                            <Text style={styles.dropDownFieldText}>{option}</Text>
                        </Pressable>
                    </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dropDownContainer: {
        position: "relative",
        zIndex: 10
    },
    dropDownButton: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colors.PRIMARYWHITE
    },
    dropDownIcon: {
        position: "absolute",
        right: 10
    },
    dropDownButtonText: {
        color: "#111",
        marginHorizontal: 10,
        fontSize: 18,
        flex: 1,
        textAlign: "center"
    },
    dropDownOptionField: {
        padding: 10,
        alignItems: "center"
    },
    dropDownFieldText: {
        fontSize: 18
    },
    dropDownFieldContainer: {
        position:"absolute",
        backgroundColor: colors.PRIMARYWHITE,
        top: 44,
        width: "100%",
        
    }
})

export default DropDownPicker;