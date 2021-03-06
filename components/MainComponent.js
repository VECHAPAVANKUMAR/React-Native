import React, { Component } from 'react';
import Login from './LoginComponent';
import Home from './HomeComponent';
import MenuComponent from './MenuComponent';
import Dishdetail from './DishDetail';
import Favorites from './FavoriteComponent';
import AboutUs from './AboutUsComponent';
import Contact from './ContactComponent';
import Reservation from './ReservationComponent';
import { View, Platform, Text, ScrollView, Image, StyleSheet, ToastAndroid } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack'; 
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { Constants } from 'react-native-unimodules';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreator';
import NetInfo from '@react-native-community/netinfo';

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes : () => dispatch(fetchDishes()),
    fetchComments : () => dispatch(fetchComments()),
    fetchPromos : () => dispatch(fetchPromos()),
    fetchLeaders : () => dispatch(fetchLeaders()),
})

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

const LoginNavigator = createStackNavigator({
    Login: Login
  }, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    title: 'Login',
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }} 
      onPress={ () => navigation.toggleDrawer() } />    
  })
});

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

const ReservationNavigator = createStackNavigator(
    {
        Reservation: { screen : Reservation }
    }, 
    {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"            
        },
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}
            iconStyle={{ color: 'white' }} 
            onPress={ () => navigation.toggleDrawer() } />    
    })
})

const FavoritesNavigator = createStackNavigator(
    {
        Reservation: { screen : Favorites }
    }, 
    {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"            
        },
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}
            iconStyle={{ color: 'white' }} 
            onPress={ () => navigation.toggleDrawer() } />    
    })
})
    
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
    Login: { 
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor, focused }) => (
            <Icon
                name='sign-in'
                type='font-awesome'            
                size={24}
                iconStyle={{ color: tintColor }}
            />
            ),
        }
    },  
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
    MyFavorites : {
        screen : FavoritesNavigator,
        navigationOptions : {
            title : 'My Favorites',
            drawerLabel : 'My Favorites',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                  name='heart'
                  type='font-awesome'            
                  size={22}
                  color={tintColor}
                />
            ),
        }
    },
    Reservation : { 
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor, focused }) => (
            <Icon
                name='cutlery'
                type='font-awesome'            
                size={24}
                iconStyle={{ color: tintColor }}
            />
            ),
        }
    }
}, {
    initialRouteName: 'Home',
    drawerBackgroundColor : '#D1C4E9',
    contentComponent : CustomDrawerContentComponent,
})

class MainComponent extends Component {
    
    // fetching the dishes, comments , promotions and leaders from json-server
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

        NetInfo.addEventListener(state => {
            const conType = state.type === "none" ? 'offline' : 'online' ;
            if (Platform.OS !== 'web') {
                ToastAndroid.show(`${conType}`,ToastAndroid.LONG)
            }
        });
    }

    componentWillUnmount() {
    }
    
    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {
          case 'none':
            ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
            break;
          case 'wifi':
            ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
            break;
          case 'cellular':
            ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);
            break;
          case 'unknown':
            ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);
            break;
          default:
            break;
        }
    }
    
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

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);

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