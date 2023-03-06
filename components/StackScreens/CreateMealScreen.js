import { Text, View, StyleSheet, TextInput } from "react-native";
import { colors } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { energyChange, proteinChange, totalFatChange } from "../../config/reducers/adminReducer";

const CreateMealScreen = ({props}) => {
    const dispatch = useDispatch();
    const {energy, protein, totalFat} = useSelector((state) => state.admin.newMealData);

    return (
        <View style={styles.inputs}>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>ENERGY</Text>
                <View style={styles.fieldInput}>
                    <Ionicons name="person-circle-outline" size={20}/>
                    <TextInput
                    autoCapitalize="none"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => {dispatch(energyChange({value: text}))}}
                    value={energy}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>PROTEIN</Text>
                <View style={styles.fieldInput}>
                    <Ionicons name="person-circle" size={20}/>
                    <TextInput
                    autoCapitalize="none"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => {dispatch(proteinChange({value: text}))}}
                    value={protein}/>
                </View>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>TOTAL FAT</Text>
                <View style={styles.fieldInput}>
                    <Ionicons name="mail-outline" size={20}/>
                    <TextInput
                    autoCapitalize="none"
                    style={styles.fieldTextInput}
                    onChangeText={(text) => {dispatch(totalFatChange({value: text}))}}
                    value={totalFat}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    field: {
        position: "relative",
        backgroundColor: colors.PRIMARYWHITE,
        borderRadius: 10,
        marginVertical: 15,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    fieldLabel: {
        fontSize: 13,
        color: "#777"
    },
    fieldInput: {
        flexDirection: "row",
        alignItems: "center",
    },
    fieldTextInput: {
        marginLeft: 10,
        flex: 1,
        fontWeight: "bold"
    },
    inputs: {
        marginVertical: 30
    },
})

export default CreateMealScreen;