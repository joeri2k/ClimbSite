import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CragEvents from "../pages/CragEvents";
import Info from "../pages/Info";
import Sectors from "../pages/Sectors";

const Tab = createMaterialTopTabNavigator();

export default function TopTab() {
  return (
    <Tab.Navigator
      initialRouteName="Info"
      screenOptions={{
        tabBarActiveTintColor: "#1B8B6A",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.3)",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: {
          backgroundColor: "#2F3F4A",
          borderTopWidth: 0.75,
          borderTopColor: "rgba(255, 255, 255, 0.3)",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#1B8B6A",
        },
      }}
    >
      <Tab.Screen
        name="Info"
        component={Info}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Sectors"
        component={Sectors}
        options={{ tabBarLabel: "Updates" }}
      />
      <Tab.Screen
        name="CragEvents"
        component={CragEvents}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}
