import { TabNavigator } from 'react-navigation';
import Home from './../screens/authorized/home/Home';
import Search from './../screens/authorized/home/Search';
import Chat from './../screens/authorized/home/Chat';

const HomeNavigation = TabNavigator({
    TabHome: { screen: Home },
    TabSearch: { screen: Search },
    TabChat: { screen: Chat }
});

export default HomeNavigation;
