import React, { Component } from 'react';
import { Text, ScrollView, FlatList } from 'react-native';
import { Avatar, Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        leaders: state.leaders,
    }
}

function History(props) {
    return (
        <Card>
            <Card.Title>Our History</Card.Title>
            <Card.Divider/>
            <Text style={{marginBottom: 10, fontWeight:'400'}}>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
            </Text>
        </Card>
    )
}

class AboutUs extends Component {
    
    static navigationOptions = {
        title : 'About Us'
    }

    render() {
        const { navigate } = this.props.navigation;
        const renderLeader = ({item, index}) => {
            // heideCheveron by defaukt when displaying list items it will keep a arrow at the start of each item
            // index is the value that we passed to key extractor in flatlist that means index is item id
            return (
                <ListItem style={{paddingLeft:15, paddingRight:15, alignItems:'center', justifyContent:'center'}}
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    // subtitleNumberOfLines={15}
                    hideChevron={true}
                    // Dishdetail is the name that we given to DishDetail component while 
                    // creating menu navigator
                    onPress={() => navigate('Dishdetail', {dishId : item.id})}
                    leftIcon={() => <Avatar rounded 
                            source={{uri: baseUrl + item.image}} 
                    />}
                />
            );
        }

        if (this.props.leaders.isLoading) {
            return (
                <ScrollView>
                    <History/>
                    <Card title={'Corporate Leadership'}>
                        <Loading/>
                    </Card>
                </ScrollView>
            );
        } else if (this.props.leaders.errMess) {
            return (
                <ScrollView>
                    <History/>
                    <Card title={'Corporate Leadership'}>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>

            );
        } else {
            return (
                <ScrollView>
                    <History/>
                    <Card title={'Corporate Leadership'}>
                        <FlatList style={{paddingTop:15}}
                            // leaders.leaders because our payload is leaders 
                            data = {this.props.leaders.leaders}
                            renderItem={renderLeader}
                            keyExtractor={item => item.id.toString()}
                        />    
                    </Card>
                </ScrollView>
            );
        }
    }
}

export default connect(mapStateToProps)(AboutUs);