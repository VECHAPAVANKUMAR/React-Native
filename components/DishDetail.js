import React, { Component, useState } from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button, TouchableHighlight } from 'react-native';
import { Card, Icon, Rating, Input, AirbnbRating  } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreator';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments : state.comments,
        favorites : state.favorites,
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

class RenderDish extends Component {

    state = {
        author : '',
        comment: '',
        rating : 3,
        showModal : false,
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleSubmit = () => {
        console.log(JSON.stringify(this.state));
        alert(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm = () => {
        this.setState({
            author : '',
            comment: '',
            rating : 3,
            showModal : false,
        })
    }

    render() {
        const dish = this.props.dish;
        if (dish != null) {
            return (
                <Animatable.View animation="fadeInDown" duration={2000} delay={500}>
                    <Card>
                        <Card.Title>
                            {dish.name}
                        </Card.Title>
                        <Card.Divider/>
                        <Card.Image source={{ uri: baseUrl + dish.image }} />
                        <Text style={{marginBottom: 10}}>
                            {dish.description}
                        </Text>
                        <View style={{alignItems : 'center', justifyContent : 'center',
                            flex : 1, flexDirection: 'row'}}>
                            <Icon
                                // raised will make the icon as a button
                                style={{flex : 1}}
                                raised
                                // reverse the color of the button
                                // That means outer color of icon changes to inner color and inner color
                                // changes to outer color
                                reverse
                                name={ this.props.favorite ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#f50'
                                onPress={() => this.props.favorite ? console.log('Already favorite') : this.props.onPress()}
                            />
                            <Icon
                                style={{flex : 2}}
                                // raised will make the icon as a button
                                raised
                                // reverse the color of the button
                                // That means outer color of icon changes to inner color and inner color
                                // changes to outer color
                                reverse
                                name={'pencil-square'}
                                type='font-awesome'
                                color='#0000FF'
                                onPress={() => this.toggleModal()}
                            />
                        </View>
                            <Modal 
                                animationType = "slide" 
                                transparent = {false}
                                visible = {this.state.showModal}
                                onDismiss = {() => this.toggleModal() }
                                onRequestClose = {() => this.toggleModal() }>
                            <View>
                                <AirbnbRating
                                    count={5}
                                    reviews={["Rating : 1/5", "Rating : 2/5", "Rating : 3/5", "Rating : 4/5", "Rating : 5/5"]}
                                    defaultRating={this.state.rating}
                                    size={20}
                                    onFinishRating = {(val) => this.setState({rating : val})}
                                />
                                <Input
                                    placeholder="author"
                                    value = {this.state.author}
                                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                                    onChangeText={(val) => this.setState({ author : val })}
                                />
                                <Input
                                    placeholder="Comment"
                                    value = {this.state.comment}
                                    leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                                    onChangeText={value => this.setState({ comment: value })}
                                />
                                <Button 
                                    onPress = {() =>{this.handleSubmit(); this.resetForm();}}
                                    color="#512DA8"
                                    title="Submit" 
                                />
                                <Button 
                                    onPress = {() =>{this.toggleModal(); this.resetForm();}}
                                    color="#000000"
                                    title="Close" 
                                />
                            </View>
                        </Modal>
                    </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
    }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{alignItems:'flex-start'}}>
                    <Rating showRating reviews={[]} imageSize={20} startingValue={item.rating} />
                </Text>
                {/* <Text style={{fontSize: 12}}>{item.rating} Stars</Text> */}
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={500}>        
            <Card title='Comments' >
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class Dishdetail extends Component {

    static navigationOptions = {
        title: 'Dish Details',
    };

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        // + is used to convert dishId from string to number
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                />
                {/* getting all the comments taht are belonged to particular dish */}
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);