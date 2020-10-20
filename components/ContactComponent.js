import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

function Contact(props) {
    return (
        <Card>
            <Card.Title>Contact Information</Card.Title>
            <Card.Divider/>
            <Text style={{marginBottom: 10, fontWeight:'400'}}>
                121, Clear Water Bay Road {'\n'}
                Clear Water Bay, Kowloon {'\n'}
                HONG KONG {'\n'}
                Tel: +852 1234 5678 {'\n'}
                Fax: +852 8765 4321 {'\n'}
                Email:confusion@food.net {'\n'} 
            </Text>
        </Card>
    );
}

export default Contact;