import { View, StyleSheet } from 'react-native';
import HomeScreen from './components/TabScreens/Home/HomeScreen';
import SettingsScreen from './components/TabScreens/Settings/SettingsScreen';
import WorkOutScreen from './components/TabScreens/Workout/WorkOutScreen';
import MealsScreen from './components/TabScreens/Meals/MealsScreen';
import SignupAndLoginModal from './components/Modals/SignupAndLogin/SignupAndLoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './config/config';
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();
const isLoggedIn = true;

const MainContent = function(){
    return (
        <View style={styles.container}>
          <SignupAndLoginModal isVisible={isLoggedIn}/>
          <Tab.Navigator
            sceneContainerStyle={{backgroundColor:colors.PRIMARYBACKGROUND}}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;
                    

                    switch (rn){
                        case "Home":
                            iconName = focused ? "home" : "home-outline";
                            break;
                        case "Workout":
                            iconName = focused ? "bicycle" : "bicycle-outline";
                            break;
                        case "Meals":
                            iconName = focused ? "restaurant" : "restaurant-outline";
                            break;
                        case "Settings":
                            iconName = focused ? "settings" : "settings-outline";
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
                tabBarActiveTintColor: colors.ACCENTTINT,
                tabBarInactiveTintColor: colors.PRIMARYWHITE,
                tabBarLabelStyle: {color: colors.PRIMARYWHITE, paddingBottom: 10, fontSize: 11},
                headerShown: false,
              })}
          >
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Meals" component={MealsScreen}/>
            <Tab.Screen name="Workout" component={WorkOutScreen}/>
            <Tab.Screen name="Settings" component={SettingsScreen} />
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