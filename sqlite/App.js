import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,YellowBox } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './App/Main';
import AlarmScreen from './App/AlarmScreen';
import SetAlarmScreen from './App/SetAlarmScreen';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#0277bd',
            },
          }
          }
        />

        <Stack.Screen
          name="AlarmList"
          component={AlarmScreen}
          options={{
            // headerShown: false,
            headerStyle: {
              backgroundColor: '#0277bd',
            },
          }
          }
        />

        <Stack.Screen
          name="SetAlarm"
          component={SetAlarmScreen}
          options={{
            // headerShown: false,
            headerStyle: {
              backgroundColor: '#0277bd',
            },
          }
          }
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
