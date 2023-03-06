import { Text, View, StyleSheet } from "react-native";
import { colors } from "../../../config/config";
import { useSelector } from "react-redux";

const DashBoardScreen = function({navigation}){
    const {username, isAdmin} = useSelector(state => state.login.userDetails);
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome Back {username}!</Text>
         </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text:{
        color: colors.PRIMARYWHITE,
        fontSize: 20,
    }
})

export default DashBoardScreen;