import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
    }
}

class MenuComponent extends Component {
    
    static navigationOptions = {
        title : 'Menu'
    }

    render() {

        const renderMenuItem = ({item, index}) => {
            return (
                <Tile
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    imageSrc={{ uri: baseUrl + item.image}}
                />
            );
        }
    
        const { navigate } = this.props.navigation;

        if (this.props.dishes.isLoading) {
            return (
                <Loading />
            ); 
        } else if (this.props.dishes.errMess) {
            return (
                <Text>{this.props.dishes.errMess}</Text>
            );
        } else {
            return (
                // renderItem is used to specify how to render each element in the list
                // keyExtractor will get the id from dish and use it as a key
                <FlatList
                    data = {this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }
}

export default connect(mapStateToProps)(MenuComponent);