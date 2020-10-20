import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

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
                    <Icon
                        // raised will make the icon as a button
                        raised
                        // reverse the color of the button
                        // That means outer color of icon changes to inner color and inner color
                        // changes to outer color
                        reverse
                        name={ props.favorite ? 'heart' : 'heart-o'}
                        type='font-awesome'
                        color='#f50'
                        onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends Component {

    state = {
        dishes : DISHES,
        comments : COMMENTS,
        favorites : [],
    }

    static navigationOptions = {
        title: 'Dish Details',
    };

    markFavorite(dishId) {
        this.setState({favorites: this.state.favorites.concat(dishId)});
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        // + is used to convert dishId from string to number
        return (
            <ScrollView>
                <RenderDish dish={this.state.dishes[+dishId]}
                    favorite={this.state.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                />
                {/* getting all the comments taht are belonged to particular dish */}
                <RenderComments comments={this.state.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default Dishdetail;