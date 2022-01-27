
import React from 'react';
import { View, Text } from 'react-native';
export default class SocketTest extends React.Component {

    constructor(props) {
        super(props);
        this.webSocket = this.webSocket.bind(this);
    }

    webSocket() {
        const ws = new WebSocket('wss://socialapidev.upsquad.com:2000"');

        ws.onopen = (e) => {
            console.log('connected on wsServer');
        }
        
        ws.addEventListener('open', function (event) {
            ws.send('Hello from React Native!');
        });
        
        ws.addEventListener('message', function (event) {
            this.message = event.data;
            console.log('Message from server ', event.data);
        });
        
        ws.onerror = (e) => {
            console.log(e);
        }
    }
    
    render() {
        return (
            <View>
                <Text>
                    Socket.io YES
                </Text>
            </View>
        )
    }

    componentDidMount() {
        this.webSocket();
    }

}
