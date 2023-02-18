import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './config/config';
import MainContent from './MainContent';
import store from './config/store/store';
import { Provider } from "react-redux";

const App = function() {


  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar backgroundColor={colors.PRIMARYBACKGROUND} style="light"/>
          <MainContent/>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};



export default App;