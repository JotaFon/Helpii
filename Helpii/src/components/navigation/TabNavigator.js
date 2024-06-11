import React, { useContext, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Text } from "react-native";

// Screens
import HomeScreen from "./screens/HomeScreen";
import CreateButtonScreen from "./screens/CreateButtonScreen";
import UserScreen from "./screens/UserScreen";
import InfoScreen from "./screens/InfoScreen";
import DonateScreen from "./screens/DonateScreen";
import CreateImageScreen from "./screens/CreateImageScreen";
import CreateDescScreen from "./screens/CreateDescScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LocationScreen from "./screens/LocationScreen";
import TesteMaps from "./screens/TesteMaps";
import { AuthContext } from "../autenticacao/AuthContext";

//Screen names
const homeName = "Home";
const createName = "Create";
const userName = "User";
const imageName = "Image";
const descName = "Desc";
const donateName = "Donate";
const infoName = "Info";
const registerName = "Register";
const locationName = "Location";
export const loginName = "Login";
const testeMaps = "TesteMaps";

const Tab = createBottomTabNavigator();

function TabNavigator({ navigation }) {
  const [tokenChecked, setTokenChecked] = useState(false);
  const userAuth = useContext(AuthContext);

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        headerTransparent: true,
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          let iconName;
          let iconColor;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home-outline";
            iconColor = focused ? "#6a99f7" : "#000";
          } else if (rn === createName) {
            iconName = focused ? "add" : "add-outline";
            iconColor = focused ? "#6a99f7" : "#000";
          } else if (rn === userName) {
            iconName = focused ? "person" : "person-outline";
            iconColor = focused ? "#6a99f7" : "#000";
          }

          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
        tabBarLabel: ({ focused, children }) => {
          return (
            <Text style={{ color: `${focused ? "#6a99f7" : "#000"}` }}>
              {children}
            </Text>
          );
        },
      })}
    >
      <Tab.Screen
        name={loginName}
        component={LoginScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name={registerName}
        component={RegisterScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name={infoName}
        component={InfoScreen}
        options={{ tabBarItemStyle: { display: "none" } }}
      />
      <Tab.Screen
        name={descName}
        component={CreateDescScreen}
        options={{ tabBarItemStyle: { display: "none" } }}
      />
      <Tab.Screen
        name={imageName}
        component={CreateImageScreen}
        options={{ tabBarItemStyle: { display: "none" } }}
      />
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={createName} component={CreateButtonScreen} />
      <Tab.Screen name={userName} component={UserScreen} />
      <Tab.Screen name={testeMaps} component={TesteMaps} />
      <Tab.Screen
        name={donateName}
        component={DonateScreen}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name={locationName}
        component={LocationScreen}
        options={{
          tabBarItemStyle: { display: "none" },
          tabBarStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
}
export default TabNavigator;
