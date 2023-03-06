import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './config/config';
import store from './config/store/store';
import { Provider } from "react-redux";
import 'react-native-gesture-handler';
import StackNavigation from './components/StackScreens/StackNavigation';

const App = function() {

  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <NavigationContainer>
            <StatusBar backgroundColor={colors.PRIMARYBACKGROUND} style="light"/>
            <StackNavigation/>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};



export default App;