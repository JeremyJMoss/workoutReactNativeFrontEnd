import {Text, View, Pressable, TextInput, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../../config/config";
import PrimaryButton from "../../../UIElements/PrimaryButton";
import { useFonts } from "expo-font";

const Login = ({setPage}) => {
const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../../../assets/fonts/Poppins-Regular.ttf'),
});

    return (
        <View style={styles.window}>
            
            <View style={styles.closeButton}>
                <Pressable onPress={() => setPage("buttons")}>
                    <Ionicons size={32} color={colors.PRIMARYWHITE} name="close-outline"/>
                </Pressable>
            </View>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{...styles.heading, fontFamily:"Poppins-Regular"}}>Login</Text>
                    <Text style={styles.subText}>Please sign in to continue.</Text>
                </View>
                <View style={styles.inputs}>
                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>Username</Text>
                        <TextInput style={styles.fieldTextInput}/>
                    </View>
                    <View style={styles.field}>
                        <Text style={styles.fieldLabel}>Password</Text>
                        <TextInput style={styles.fieldTextInput}/>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton styleOptions={styles.loginButton}>Login</PrimaryButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    window: {
        width: "100%",
        height: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "center"
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    container:{
        height: "60%",
        width: "70%",
        justifyContent: "space-evenly"
    },
    buttonContainer: {
        alignItems: "flex-end",
    },
    loginButton: {
        
    }
})

export default Login;