import React, { Component } from 'react';
import Home from './HomeComponent';
import MenuComponent from './MenuComponent';
import Dishdetail from './DishDetail';
import AboutUs from './AboutUsComponent';
import Contact from './ContactComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { Constants } from 'react-native-unimodules';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';

const MenuNavigator = createStackNavigator(
    {
        Menu: { screen: MenuComponent,
            // navigationOptions is particular to one screen 
            // along with defaultNavigationOptions
            // navigateOptions can also take function by passing navigation props as
            // parameter to that function rather than javascript object
            navigationOptions: ({navigation}) => ({
                headerLeft : <Icon name='menu' size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    },
        Dishdetail: { screen: Dishdetail }
    }, {
        initialRouteName: 'Menu',
        // defaultNavigationOptions is for all the screens
        defaultNavigationOptions: {
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
        // defaultNavigationOptions is for all the screens
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            },
            headerLeft : <Icon name='menu' size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const AboutUsNavigator = createStackNavigator(
    {
        AboutUs: { screen: AboutUs },
    }, {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            },
            headerLeft : <Icon name='menu' size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const ContactNavigator = createStackNavigator(
    {
        Contact: { screen: Contact },
    }, {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"            
            },
            headerLeft : <Icon name='menu' size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        {/* SafeAreaView is specifically for IOS devices */}
        {/* forceInset top is always means side bar created using draerNavbar will
        always occupies the stausbar */}
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
           {/* In this view there are two other views in which fisrt view has flex as 1
           and second view has flux as 2
           That means whaterver space is available in header of the side bar created by drawernavbar
           will be divided into 3 equal parts. So, that first view will occupy one part and
           second view will occupy two parts of the available three parts */}
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            {/* we are passing all the items home, menu, aboutus, contact present in side navbar
            created using createDrawerNavigator as props to this DrawItems */}
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Home : {
        screen : HomeNavigator,
        navigationOptions : {
            title : 'Home',
            drawerLabel : 'Home',
            // drawerIcon recieve tintcolor as parameter
            drawerIcon : ({ tintColor, focused }) => (
                <Icon
                  name='home'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
            ),
        }
    },
    AboutUs : {
        screen : AboutUsNavigator,
        navigationOptions : {
            title : 'About Us',
            drawerLabel : 'About Us',
            drawerIcon : ({ tintColor, focused }) => (
                <Icon
                  name='info-circle'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
            ),  
        }
    },
    Menu : {
        screen : MenuNavigator,
        navigationOptions : {
            title : 'Menu',
            drawerLabel : 'Menu',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='list'
                  type='font-awesome'            
                  size={24}
                  color={tintColor}
                />
            ),
        }
    },
    Contact : {
        screen : ContactNavigator,
        navigationOptions : {
            title : 'Contact',
            drawerLabel : 'Contact',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='address-card'
                  type='font-awesome'            
                  size={22}
                  color={tintColor}
                />
            ),
        }
    },
}, {
    drawerBackgroundColor : '#D1C4E9',
    contentComponent : CustomDrawerContentComponent,
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
});