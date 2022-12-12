import Screen1 from "./components/Main"
import Screen2 from "./components/List"
import Screen3 from "./components/Add"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="s1" component={Screen1} options={{
          title: 'title',
          headerStyle: {
            backgroundColor: '#ff0000',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: false
        }} />
        <Stack.Screen name="s2" component={Screen2} options={{
          title: 'Lista budzików',
          headerStyle: {
            backgroundColor: '#303F9F',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name='s3' component={Screen3} options={{
          title: 'Dodaj budzik',
          headerStyle: {
            backgroundColor: '#303F9F',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

