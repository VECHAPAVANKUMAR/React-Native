import React from 'react';
import { Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';

function Contact(props) {

    const sendMail = () => {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

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
            <Button
                title="Send Email"
                buttonStyle={{backgroundColor: "#512DA8"}}
                icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                onPress={sendMail}
            />
        </Card>
    );
}

export default Contact;