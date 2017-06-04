
import { StackNavigator } from 'react-navigation';
import Login from './../screens/unauthorized/Login';
import AuthorizedNavigation from './AuthorizedNavigation';


const RootNavigation = StackNavigator({
    Unauthorized: { 
        screen: Login,
        navigationOptions: {
            title: 'Login'
        } 
    },
    Authorized: {
        screen: AuthorizedNavigation
    }
});

export default RootNavigation;

