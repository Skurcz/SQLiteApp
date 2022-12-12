import * as React from 'react';
import { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyButton from "./Button"
import * as Font from "expo-font";

class Screen1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <MyButton user={() => this.props.navigation.navigate('s2')} text="Sqlite App" custom="abc" style={styles.title}></MyButton>
                    <Text style={{ textAlign: "center", color: 'white' }}>manage sqlite</Text>
                    <Text style={{ textAlign: "center", color: 'white' }}>use animation</Text>
                    <Text style={{ textAlign: "center", color: 'white' }}>use ring</Text>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#303F9F",
        alignItems: "center",
        justifyContent: "center"
    },
    titleContainer: {
        flex: 1,
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
    },
})

export default Screen1;