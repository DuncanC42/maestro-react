// websocket.service.js
import { Client } from '@stomp/stompjs';

class WebSocketService {
    constructor() {
        this.client = null;
        this.subscriptions = new Map();
    }

    connect(onConnected) {
        this.client = new Client({
            brokerURL: 'ws://localhost:8080/ws',  // Utilisation de WebSocket natif
            debug: function (str) {
                console.log('STOMP: ' + str);
            },
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('WebSocket Connected!');
                if (onConnected) onConnected();
            },
            onDisconnect: () => {
                console.log('WebSocket Disconnected');
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            }
        });

        this.client.activate();
    }

    subscribeToGroup(groupName, onPlayerUpdate) {
        if (!this.client?.connected) {
            console.error('STOMP client not connected');
            return;
        }

        if (this.subscriptions.has(groupName)) {
            this.subscriptions.get(groupName).unsubscribe();
        }

        const subscription = this.client.subscribe(
            `/topic/game/${groupName}/players`,
            (message) => {
                try {
                    const playerUpdate = JSON.parse(message.body);
                    onPlayerUpdate(playerUpdate);
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            }
        );

        this.subscriptions.set(groupName, subscription);
    }

    sendJoinNotification(groupName, player) {
        this._sendMessage(`/app/game/${groupName}/join`, player);
    }

    sendLeaveNotification(groupName, player) {
        this._sendMessage(`/app/game/${groupName}/leave`, player);
    }

    sendKickNotification(groupName, player) {
        this._sendMessage(`/app/game/${groupName}/kick`, player);
    }

    _sendMessage(destination, body) {
        if (this.client?.connected) {
            this.client.publish({
                destination: destination,
                body: JSON.stringify(body)
            });
        } else {
            console.error('STOMP client not connected');
        }
    }

    disconnect() {
        if (this.client) {
            this.subscriptions.forEach(sub => sub.unsubscribe());
            this.subscriptions.clear();
            this.client.deactivate();
        }
    }
}

export const webSocketService = new WebSocketService();