import React, { Component } from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ListItem from './ListItem';
import Database from './Database';

const myWidth = Dimensions.get("window").width
const myHeight = Dimensions.get("window").height

/**@typedef {import("./interfaces").alarmRow} alarmRow */

export default class AlarmScreen extends Component {
   constructor(props) {
      super(props);
      this.state = {
         /**@type {alarmRow[]} */
         alarms: []
      };      
      this.refresh = this.refresh.bind(this);
   }
   async componentDidMount() {
      this.setState({
         alarms: await Database.instance.getAll()
      }, () => {      
      })
   }
   refresh(){
      this.componentDidMount();
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
               <View style={{ width: 100, height: 100, backgroundColor: "red", borderRadius: 100, display: "flex", justifyContent: "center", alignItems: "center",}}>
                  <Ionicons name={"add"} size={80} color="white"/>
               </View>
            </TouchableNativeFeedback>
         </View>
      );
   }
}


const styles = StyleSheet.create({
   container: {
      width: myWidth,
      height: myHeight,
      backgroundColor: "#393939",
      position: "relative",
      display: "flex",
      alignItems: "center",
   },

   // ------------------------
   // TOUCHABLE CONTAINER 
   // ------------------------
   touchableStyle: {

   },
   TouchableText: {
      textAlign: "center",
      color: "white",
      fontSize: myWidth * 0.05,
   },


   // ------------------------
   // settings
   // ------------------------

   alarmCont: {
      // height: myHeight - 300,
      width: "100%",
      height: "70%",
      // height: 40,
      paddingTop: 15,
      display: "flex",
      alignItems: "center"
   }
})