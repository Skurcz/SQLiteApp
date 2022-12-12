import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableNativeFeedback, Animated } from 'react-native'
import Database from './Database'


export default class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleSwitch() {

    }
    removeItem() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.timeText}> {time} </Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={activated == 1 ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => this.handleSwitch()}
                        value={activated == 1}
                    />
                </View>
                <View style={styles.secondLine}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                        onPress={() => this.removeItem()}

                        style={{
                            width: 40,
                            height: 40,
                        }}
                    >

                        <View style={{ width: 40, height: 40, borderRadius: 100, }}>
                            <Ionicons name={"trash-bin-sharp"} size={32} color="white" />
                        </View>

                    </TouchableNativeFeedback>

                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                        onPress={() => { this.toggle() }}

                        style={{
                            width: 40,
                            height: 40,
                        }}
                    >

                        <Animated.View style={{ width: 40, height: 40, borderRadius: 100, transform: [{ rotate: spin }], display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Ionicons name={"arrow-up-sharp"} size={32} color="white" />
                        </Animated.View>

                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }
}