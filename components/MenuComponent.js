import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class MenuComponent extends Component {
    
    state = {
        dishes : DISHES,
        selectedDish : null,
    }
    

    static navigationOptions = {
        title : 'Menu'
    }

    onDishSelect = (dishId) => {
        this.setState({
            selectedDish : dishId,
        })
    }

    render() {

        const renderMenuItem = ({item, index}) => {
            // heideCheveron by defaukt when displaying list items it will keep a arrow at the start of each item
            // index is the value that we passed to key extractor in flatlist that means index is item id
            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('Dishdetail', {dishId : item.id})}
                    leftIcon={() => <Avatar rounded 
                            source={{uri: require('./images/uthappizza.png')}} 
                            // Dishdetail is the name that we given to DishDetail component while 
                            // creating menu navigator
                    />}
                  />
            );
        }
    
        const { navigate } = this.props.navigation;

        return (
            // renderItem is used to specify how to render each element in the list
            // keyExtractor will get the id from dish and use it as a key
            <FlatList
                data = {this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
            />
        )
    }
}

export default MenuComponent;