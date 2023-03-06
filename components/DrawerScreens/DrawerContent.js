import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Text, StyleSheet, View } from "react-native";
import { colors } from "../../config/config";
import { logoutUser } from "../../config/reducers/loginReducer";
import { useSelector, useDispatch } from "react-redux";

const DrawerContent = (props) => {
    const userDetails = useSelector((state) => state.login.userDetails)
    const dispatch = useDispatch();

    const logout = () => {
        props.navigation.navigate("Main");
        props.navigation.closeDrawer()
        dispatch(logoutUser());
    }

    return (
        <View style={styles.drawerContainer}>
            <View style={styles.header}>
                <Text style={styles.headerFullName}>{`${userDetails.firstName} ${userDetails.lastName}`}</Text>
                <Text style={styles.headerEmail}>{userDetails.email}</Text> 
            </View>
            <View style={styles.scrollContainer}>
                <DrawerContentScrollView>
                    {userDetails.isAdmin && <DrawerItem
                    label={() => <Text style={{color: colors.PRIMARYWHITE}}>Create Food</Text>}
                    onPress={() => props.navigation.navigate("CreateMeal")}
                    />}
                    <DrawerItem
                    label={() => <Text style={{color: colors.PRIMARYWHITE}}>Settings</Text>}
                    onPress={() => props.navigation.navigate("Settings")}/>
                    <DrawerItem
                    label={() => <Text style={{color: colors.PRIMARYWHITE}}>Logout</Text>}
                    onPress={logout}
                    />
                </DrawerContentScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1
    },
    header: {
        backgroundColor: colors.PRIMARYBACKGROUND,
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingLeft: 10,
        paddingBottom: 10
    },
    headerEmail: {
        color: colors.SECONDARYACCENTTINT,
        fontSize: 15
    },
    headerFullName: {
        fontSize: 18,
        color: colors.PRIMARYWHITE,
        marginBottom: 5
    },
    scrollContainer: {
        flex: 6,

    }

})

export default DrawerContent;