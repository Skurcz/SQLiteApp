import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableNativeFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Database from './Database';

// withNavi

const myWidth = Dimensions.get("window").width
const myHeight = Dimensions.get("window").height


export default class SetAlarmScreen extends Component {
   constructor(props) {
      super(props);

      this.state = {
      };
   }

   async componentDidMount() {
      console.log(await Database.instance.getAll());
   }

   render() {
      return (
         <View style={styles.container}>
            <View style={styles.titleView}>
               <Text style={styles.titleText}>
                  "+" dodaje do bazy budzik z godziną 00:00
               </Text>
            </View>


            <TouchableNativeFeedback
               background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
               onPress={() => {                  
                  Database.instance.add({});

                  this.props.route.params.refresh();
                  this.props.navigation.navigate("AlarmList",)
               }}

               style={{
                  width: 100,
                  height: 100,
                  display:"flex", justifyContent: "center", alignItems: "center"
               }}
            >
               <View style={{ width: 100, height: 100, backgroundColor: "red", borderRadius: 100, display:"flex", justifyContent: "center", alignItems: "center"}}>
                  <Ionicons name={"add"} size={80} color="white" />
               </View>
            </TouchableNativeFeedback>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: '100%',      
      display: "flex",      
      justifyContent: "center",
      alignItems: "center",      
      backgroundColor: "#393939"
   },
   titleView: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",      
   },
   titleText: {      
      textAlign: "center",
      fontSize: myWidth * 0.12,
      color: "white"
   },
   descriptionView: {
      flex: 1,
      display: "flex",
      justifyContent: "flex-start",
      padding: 25
   },
   descriptionText: {
      fontSize: myWidth * 0.05,
      textAlign: "center",
      color: "white"
   }
})
