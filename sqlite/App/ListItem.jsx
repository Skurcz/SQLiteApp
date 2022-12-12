import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableNativeFeedback, Animated } from 'react-native';
import { Switch } from 'react-native-elements/dist/switch/switch';
// import Icon from "react-native-vector-icons/FontAwesome"
import { Ionicons } from '@expo/vector-icons';

import Database from './Database';

const myWidth = Dimensions.get("window").width
const myHeight = Dimensions.get("window").height

/**@typedef {import("./interfaces").listItemProps} listItemProps */



/**@extends {Component<listItemProps>} */
export default class ListItem extends Component {
   constructor(props) {
      super(props);

      this.state = {
         height: new Animated.Value(5), // początkowa wartość wysokości itema
         rotate: new Animated.Value(0.5), // początkowa wartość wysokości itema
         opacity1: new Animated.Value(1), // początkowa wartość wysokości itema
         opacity2: new Animated.Value(0), // początkowa wartość wysokości itema
         expanded: false, // zwinięty

         dayList: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      };

      this.toValueHeight = 0  // przechowanie wartości animowanej, tutaj wysokości
      this.toValueRotate = 0  // przechowanie wartości animowanej, tutaj obrót      
   }

   /**
    * @param {boolean} value
    */
   async switchHandler(value) {
      const { id } = this.props.data

      await Database.instance.update(` 
      UPDATE alarms
      SET activated = ${value ? 1 : 0}
      WHERE id=${id}
      `)

      // this.props.parent.componentDidMount();
      let find = this.props.parent.state.alarms.find(el => el.id == id)
      find.activated = value ? 1 : 0
      this.props.parent.setState({})
   }
   async removeElement() {
      const { id } = this.props.data;

      await Database.instance.remove(id);
      this.props.parent.state.alarms = this.props.parent.state.alarms.filter(el => el.id != id)
      this.props.parent.setState({})
      // this.props.parent.componentDidMount();
   }

   toggle() {
      let opacity1;
      let opacity2;

      if (!this.state.expanded) {
         this.toValueHeight = 50;
         this.toValueRotate = 0
         opacity1 = 0;
         opacity2 = 1;
      }
      else {
         this.toValueHeight = 5
         this.toValueRotate = 0.5
         opacity1 = 1;
         opacity2 = 0;
      }

      this.setState({ expanded: !this.state.expanded });

      Animated.spring(this.state.height, {
         toValue: this.toValueHeight,
         useNativeDriver: false,
      }).start();

      Animated.spring(this.state.rotate, {
         toValue: this.toValueRotate,
         useNativeDriver: false,
      }).start();

      Animated.spring(this.state.opacity1, {
         toValue: opacity1,
         useNativeDriver: false,
      }).start();
      Animated.spring(this.state.opacity2, {
         toValue: opacity2,
         useNativeDriver: false,
      }).start(({ finished }) => {
         // this.setState({ expanded: !this.state.expanded });
      });

      // tu zmień this.state.expanded na przeciwny

   }

   /**
    * 
    * @param {string} day
    */
   async dayEdit(day) {
      const { data, } = this.props;
      const { id } = this.props.data

      await Database.instance.update(` 
         UPDATE alarms
         SET ${day} = ${data[day] == 1 ? 0 : 1}
         WHERE id=${id}
      `)

      let find = this.props.parent.state.alarms.find(el => el.id == id)
      find[day] = data[day] == 1 ? 0 : 1
      this.props.parent.setState({})      
   }

   render() {
      const { data } = this.props;
      const { time, activated } = this.props.data;

      const spin = this.state.rotate.interpolate({
         inputRange: [0, 1],
         outputRange: ['0deg', '360deg']
      })

      return (
         <View style={styles.container}>
            <View>
               <Text style={styles.timeText}> {time} </Text>
               <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={activated == 1 ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={this.switchHandler.bind(this)}
                  value={activated == 1}
               />
            </View>
            <View style={styles.secondLine}>
               <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                  onPress={this.removeElement.bind(this)}

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

            <Animated.View style={{
               height: this.state.height,
            }}>

               <Animated.View style={{ height: 40, opacity: this.state.opacity1 }}>
                  <Text style={{ color: 'white' }}>{this.state.dayList.filter(el => data[el] == 1).join(", ")}</Text>
               </Animated.View>

               <Animated.View style={{ ...styles.daysContainer, opacity: this.state.opacity2 }}>
                  {this.state.expanded
                     ? (


                        this.state.dayList.map((el, ind) => (
                           <TouchableNativeFeedback
                              key={ind}
                              background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                              onPress={() => { this.dayEdit(el) }}

                              style={{
                                 width: 40,
                                 height: 40, display: "flex", justifyContent: "center", alignItems: "center"
                              }}
                           >

                              <View style={{ ...styles.dayButton, backgroundColor: data[el] == 1 ? "black" : null }}>
                                 <Text style={{ color: "white", textAlign: "center" }}> {el}</Text>
                              </View>

                           </TouchableNativeFeedback>
                        ))
                     )
                     : (
                        <View />
                     )
                  }
               </Animated.View>


            </Animated.View>


         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      width: myWidth * 0.8,
      marginBottom: 70,
   },
   timeText: {
      color: "white",
      fontSize: 30
   },

   secondLine: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
   },

   daysContainer: {
      display: "flex",
      flexDirection: "row"
   },
   dayButton: {
      width: 40,
      height: 40,
      borderRadius: 100,

      display: "flex",
      justifyContent: "center",
      alignItems: "center"
   }
})