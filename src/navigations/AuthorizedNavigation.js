import { DrawerNavigator } from 'react-navigation';
import HomeNavigation from './HomeNavigation';
import Profile from './../screens/authorized/Profile';
import Setting from './../screens/authorized/Setting';

const AuthorizedNavigation = DrawerNavigator({
    Home: { screen: HomeNavigation },
    Profile: { screen: Profile },
    Setting: { screen: Setting }
});

export default AuthorizedNavigation;
