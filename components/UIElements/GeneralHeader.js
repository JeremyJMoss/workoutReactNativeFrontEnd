import { DrawerActions } from "@react-navigation/native";
import { View, StyleSheet, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../config/config";

const GeneralHeader = (props) => {
    const toggleDrawer = () => {
        props.navigation.dispatch(DrawerActions.toggleDrawer());
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
            <Pressable
                onPress={toggleDrawer}
                style={styles.leftButton}>
                <Ionicons name="menu-outline" size={35} color={colors.PRIMARYWHITE}/>
            </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.PRIMARYBACKGROUND,
      minHeight: 60,
    },
    headerLeft: {
      flexDirection: 'row',
    },
    leftButton: {
      marginLeft: 20,
    },
});

export default GeneralHeader;