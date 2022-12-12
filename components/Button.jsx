import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Font from "expo-font";

class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontloaded: false
        };

    }
    componentDidMount = async () => {
        await Font.loadAsync({
            'myfont': require('./montheavy.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        if (this.props.custom == "abc")
            this.setState({ fontloaded: true })
        else
            this.setState({ fontloaded: false })
    }

    render() {
        return (
            <TouchableOpacity style={{
                textAlign: 'center',
                justifyContent: 'center'
            }} onPress={this.props.user}>
                {

                    this.state.fontloaded
                        ?
                        <Text style={{

                            fontFamily: "myfont",
                            fontSize: 50,
                            width: 250,
                            height: 100,
                            textAlign: 'center',
                            color: 'white',
                            justifyContent: 'center'
                        }}>{this.props.text} </Text>
                        :
                        <Text style={{
                            backgroundColor: `${this.props.color}`,
                            fontSize: 10,
                            width: 120,
                            height: 30,
                            margin: 10,
                            textAlign: 'center',
                            color: 'white',
                            justifyContent: 'center'
                        }}>{this.props.text} </Text>
                }
            </TouchableOpacity>

        );
    }
}


export default MyButton;