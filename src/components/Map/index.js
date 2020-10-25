import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import api from '../API';
// import Search from '../Search';

export default class Map extends Component {
    state = {
        region: null,
        errorMessage: null
    };
    data = null;

    getWildFire = async () => {
        try {
            const response = await api.get('/categories/wildfires')
            const { events } = response.data;
            console.log(response)
            this.data = response;
            console.log('foi');
        } catch (response) {
            console.log('erro');
            this.setState({ errorMessage: response.data.error })
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
                maximumAge: 1000,
            }
        );

        this.getWildFire();
    }

    render() {
        const { region } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <MapView 
                    style={{ flex: 1 }}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                />
                {/* <Search /> */}
                <View>
                    <Text>slasla</Text>
                </View>
            </View>
        );
    }
}