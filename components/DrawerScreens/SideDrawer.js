import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors } from '../../config/config';
import MainContent from '../../MainContent';
import GeneralHeader from '../UIElements/GeneralHeader';
import DrawerContent from './DrawerContent';
import { useSelector, useDispatch } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { attemptTokenAuthentication } from '../../config/reducers/loginReducer';

const Drawer = createDrawerNavigator();

const SideDrawer = () => {
    const isReloadingApp = useSelector((state) => state.login.isReloadingApp);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!isReloadingApp) return;

        dispatch(attemptTokenAuthentication());

    }, [isReloadingApp])

    return (
        <>
            {isReloadingApp && <ActivityIndicator size="large" color={colors.SECONDARYACCENTTINT}/>}
            {!isReloadingApp && <Drawer.Navigator 
                initialRouteName="Home"
                drawerContent={props => <DrawerContent {...props}/>}
                screenOptions={{
                    header: (props) => {
                        return <GeneralHeader {...props} />
                    },
                    drawerStyle: {       
                        backgroundColor: colors.PRIMARYBAR,
                    },
                    overlayColor: "rgba(46, 46, 46, 0.6)"
                }}
                >
                <Drawer.Screen name="MainContent" component={MainContent} />
            </Drawer.Navigator>}
        </>
    )
}

export default SideDrawer;