import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import InsertDatabase from "./screens/InsertDatabase";
import ViewDatabase from "./screens/ViewDatabase";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            height: 100,
          },
          headerTitleStyle: {
            fontSize: 14,
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="InsertDatabase" component={InsertDatabase} />
        <Stack.Screen name="ViewDatabase" component={ViewDatabase} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
