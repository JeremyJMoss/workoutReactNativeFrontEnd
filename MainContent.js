import { View, StyleSheet} from 'react-native';
import DashBoardScreen from './components/TabScreens/DashBoard/DashBoardScreen';
import WorkOutScreen from './components/TabScreens/Workout/WorkOutScreen';
import NutritionScreen from './components/TabScreens/Nutrition/NutritionScreen';
import SignupAndLoginModal from './components/Modals/SignupAndLogin/SignupAndLoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './config/config';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const MainContent = function(){
    const isLoggedIn = useSelector((state) => state.login.userDetails?.userId)

    return (
        <View style={styles.container}>
            <SignupAndLoginModal isVisible={!isLoggedIn}/>
            <Tab.Navigator
                sceneContainerStyle={{backgroundColor:colors.PRIMARYBACKGROUND}}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;
                        switch (rn){
                            case "DashBoard":
                                iconName = focused ? "home" : "home-outline";
                                break;
                            case "Workout":
                                iconName = focused ? "barbell" : "barbell-outline";
                                break;
                            case "Nutrition":
                                iconName = focused ? "restaurant" : "restaurant-outline";
                                break;
                        }
                        
                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                    tabBarStyle:{        
                            backgroundColor: colors.PRIMARYBAR,
                            //removing border from top of tab bar}
                            borderTopWidth: 0,
                            padding: 10,
                            height: 70,
                    },
                    tabBarHideOnKeyboard: true,
                    tabBarActiveTintColor: colors.ACCENTTINT,
                    tabBarInactiveTintColor: colors.PRIMARYWHITE,
                    tabBarLabelStyle: {color: colors.PRIMARYWHITE, paddingBottom: 10, fontSize: 11},
                    headerShown: false,
                })}
            >
                <Tab.Screen name="DashBoard" component={DashBoardScreen}/>
                <Tab.Screen name="Nutrition" component={NutritionScreen}/>
                <Tab.Screen name="Workout" component={WorkOutScreen}/>
            </Tab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: colors.PRIMARYBACKGROUND,
    }
});

export default MainContent;