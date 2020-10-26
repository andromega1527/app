import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import api from '../API';
// import Search from '../Search';

export default class Map extends Component {
    state = {
        region: null,
        errorMessage: null,
        events: null
    };

    getWildFire = async () => {
        try {
            const response = await api.get('/categories/wildfires', {
                'status': 'open',
                'days': 1
            });
            this.setState({ events: response.data['events'] });
            console.log('foi');
        } catch (response) {
            console.log('erro');
            this.setState({ errorMessage: response.data.error });
        }
    }

    async componentDidMount() {
        Geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                this.setState({ 
                    region: { 
                        latitude, 
                        longitude, 
                        latitudeDelta: 0.0143, 
                        longitudeDelta: 0.0134 
                    } 
                });
            }, //função de sucesso
            () => {}, //função de erro
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000
            }
        );

        this.getWildFire();
    }

    render() {
        const { region, events } = this.state;
        console.log('------');

        return (
            <View style={{ flex: 1 }}>
                <MapView 
                    style={{ flex: 1 }}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                >
                    {events && events.map((event, index) => (
                        <Marker 
                            key={index}
                            title={event['title']}
                            coordinate={{ 
                                latitude: event['geometry'][0]['coordinates'][1], 
                                longitude: event['geometry'][0]['coordinates'][0]
                            }}
                        />
                    ))}
                </MapView>
                {/* <Search /> */}
            </View>
        );
    }
}