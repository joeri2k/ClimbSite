import { styles } from "../styles";
import {
  Feather,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Explore from "../pages/Explore";
import Log from "../pages/Log";
import { View, Text, TouchableOpacity } from "react-native";
import Rankings from "../pages/Rankings";
import Community from "../pages/Community";
import LogNavigation from "./LogNavigation";
import ExploreNavigation from "./ExploreNavigation";
import HomeNavigation from "./HomeNavigation";
import CommunityNavigation from "./CommunityStack";

const Tab = createMaterialBottomTabNavigator();

export default function Navbar() {
  return (
    <Tab.Navigator
      initialRouteName="HomeNavigation"
      backBehavior="order"
      activeColor="#1B8B6A"
      inactiveColor="rgba(255, 255, 255, 0.3)"
      barStyle={{
        backgroundColor: "#2F3F4A",
        height: 60,
      }}
    >
      <Tab.Screen
        options={{
          title: "My home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <View
              style={{
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="home" size={24} color={color} />
            </View>
          ),
        }}
        name="HomeNavigation"
        component={HomeNavigation}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Explore",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-location-outline" size={24} color={color} />
          ),
        }}
        name="ExploreStack"
        component={ExploreNavigation}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color }) => (
            <View
              style={{ height: 40, width: 40, alignItems: "center", top: -5 }}
            >
              <AntDesign name="pluscircle" size={35} color={color} />
            </View>
          ),
          //   tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
        name="LogStack"
        component={LogNavigation}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Rankings",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="crown-outline"
              size={24}
              color={color}
            />
          ),
        }}
        name="Rankings"
        component={Rankings}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Community",
          tabBarIcon: ({ color }) => (
            <Feather name="users" size={24} color={color} />
          ),
        }}
        name="Community Stack"
        component={CommunityNavigation}
      />
    </Tab.Navigator>
  );
}
