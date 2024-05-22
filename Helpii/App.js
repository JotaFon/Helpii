import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  AuthContext,
  AuthProvider,
} from "./src/components/autenticacao/AuthContext";
import TabNavigator from "./src/components/navigation/TabNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DetailsScreen,
  DonateScreen,
} from "./src/components/navigation/screens/DonateScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{ animation: "default" }}
          />
          <Stack.Screen
            name="Doações"
            component={DonateScreen}
            options={{ animation: "default" }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ animation: "default" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
