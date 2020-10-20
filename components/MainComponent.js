import React, { Component } from 'react';
import Home from './HomeComponent';
import MenuComponent from './MenuComponent';
import Dishdetail from './DishDetail';
import AboutUs from './AboutUsComponent';
import Contact from './ContactComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer } from 'react-navigation';
import { Constants } from 'react-native-unimodules';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';

const MenuNavigator = createStackNavigator(
    {
        Menu: { screen: MenuComponent },
        Dishdetail: { screen: Dishdetail }
    }, {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            }
        }
    }
);

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home },
    }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            }
        }
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact },
    }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            }
        }
    }
);

const AboutUsNavigator = createStackNavigator(
    {
        AboutUs: { screen: AboutUs },
    }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            }
        }
    }
);
const MainNavigator = createDrawerNavigator({
    Home : {
        screen : HomeNavigator,
        navigationOptions : {
            title : 'Home',
            drawerLabel : 'Home'
        }
    },
    Menu : {
        screen : MenuNavigator,
        navigationOptions : {
            title : 'Menu',
            drawerLabel : 'Menu'
        }
    },
    AboutUs : {
        screen : AboutUsNavigator,
        navigationOptions : {
            title : 'About Us',
            drawerLabel : 'About Us'
        }
    },
    Contact : {
        screen : ContactNavigator,
        navigationOptions : {
            title : 'Contact',
            drawerLabel : 'Contact'
        }
    },
}, {
    drawerBackgroundColor : '#D1C4E9'
})

class MainComponent extends Component {
    
    render() {
        // const MenuNav = createAppContainer(MenuNavigator);
        const MainNav = createAppContainer(MainNavigator);
        return (
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
                {/* <MenuNav/> */}
                <MainNav/>
            </View>
        );
    }
}

export default MainComponent;