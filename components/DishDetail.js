import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return (
                <Card>
                    <Card.Title>
                        {dish.name}
                    </Card.Title>
                    <Card.Divider/>
                    <Card.Image source={{ uri: require('./images/uthappizza.png') }} />
                    <Text style={{marginBottom: 10}}>
                        {dish.description}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Dishdetail extends Component {

    state = {
        dishes : DISHES,
    }

    static navigationOptions = {
        title: 'Dish Details',
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        // + is used to convert dishId from string to number
        return(<RenderDish dish={this.state.dishes[+dishId]} />);
    }
}

export default Dishdetail;