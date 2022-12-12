import { Component } from "react";
import { View, Text, Switch, SafeAreaView, ScrollView, StyleSheet, TouchableNativeFeedback } from "react-native";
import CircleButton from "./CircleButton";

import ListItem from "./ListItem"
import add from "./assets/add.png"

export default class Screen2 extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    addAlarm() {
        this.props.navigation.navigate("s3")
    }
    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.alarmCont}>
                    <ScrollView>

                        {this.state.alarms.map((el, ind) => (
                            <ListItem
                                key={el.id}
                                data={el}
                                parent={this}
                            />
                        ))}

                    </ScrollView>
                </SafeAreaView>

                {/* // <View>
                //     <CircleButton
                //         src={add}
                //         handlePress={() => this.addAlarm()}>
                //      </CircleButton>
                // </View> */}


                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                    onPress={() => {
                        this.props.navigation.navigate("SetAlarm", { refresh: this.refresh })
                    }}

                    style={{
                        width: 100,
                        height: 100,
                    }}
                >
                    <View style={{ width: 100, height: 100, backgroundColor: "red", borderRadius: 100, display: "flex", justifyContent: "center", alignItems: "center", }}>
                        <Ionicons name={"add"} size={80} color="white" />
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }
}