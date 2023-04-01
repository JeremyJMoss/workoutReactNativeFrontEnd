import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from './SettingsScreen';
import AddMealItemScreen from './AddMealItemScreen';
import SideDrawer from '../DrawerScreens/SideDrawer';
import CreateMealScreen from './CreateMealScreen';
import ItemDetailsScreen from './ItemDetailsScreen';
import { colors } from '../../config/config';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator 
        initialRouteName='Main'
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.PRIMARYBACKGROUND
            },
            headerStyle: {
                backgroundColor: colors.PRIMARYBACKGROUND,
                shadowColor:"transparent",
                elevation:0,
            },
            headerTintColor: colors.PRIMARYWHITE
        }}>
            <Stack.Screen 
            name="Main" 
            component={SideDrawer}
            options={{
                headerShown: false
            }}
            />
            <Stack.Screen
            name="CreateMeal"
            component={CreateMealScreen}
            options={{
                title: "Create Meal",
            }}
            />
            <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            />
            <Stack.Screen 
            name="AddMealItem" 
            component={AddMealItemScreen}
            options={({ route }) => ({ title: route.params.title })}
            />
            <Stack.Screen
            name="ItemDetails"
            component={ItemDetailsScreen}
            options={() => ({ title: "Item Details", })}
            />
        </Stack.Navigator>
    )
}

export default StackNavigation;
