import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './config/config';
import MainContent from './MainContent';

const App = function() {


  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.PRIMARYBACKGROUND} style="light"/>
        <MainContent/>
      </NavigationContainer>
    </SafeAreaView>
  );
};



export default App;