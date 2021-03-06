import React, { useState, useEffect, useContext } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { AuthContext } from "../context/userContext";
import { CragContext } from "../context/cragContext";
import fetch_url from "../host";
import { format } from "date-fns";

export default function Explore({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const [cragState, setCragState] = useContext(CragContext);
  const [authState, setAuthState] = useContext(AuthContext);
  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");

  async function getCrag() {
    const crag_url = `${fetch_url}/api/crags/`;
    try {
      const response = await axios.get(crag_url);
      const data_received = await response.data;
      setCrag(data_received);
    } catch (error) {
      console.warn(error);
    }
  }

  const [crag, setCrag] = useState();

  async function getEvents() {
    const token = authState.token;
    const event_url = `${fetch_url}/api/events/get_attendees`;

    try {
      const response = await axios.get(event_url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data_received = await response.data;
      setEvent(data_received);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      getEvents();
      getCrag();
    });
  }, []);

  const [event, setEvent] = useState();

  return (
    <View
      style={{
        backgroundColor: "#122222",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        zIndex: -1,
      }}
    >
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Header navigation={navigation} />

      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height: 675,
        }}
        initialRegion={{
          latitude: 33.787395,
          longitude: 35.72789,
          latitudeDelta: 1.8,
          longitudeDelta: 1.8,
        }}
      >
        {crag &&
          crag.map((item) => {
            return (
              <View key={item.id}>
                <MapView.Marker
                  onPress={() => {
                    setCragState({
                      id: item.id,
                      name: item.name,
                      description: item.description,
                      conditions: item.conditions,
                      gear: item.gear,
                      longitude: item.longitude,
                      latitude: item.latitude,
                      image: item.image,
                    });

                    setModalVisible(true);
                  }}
                  pinColor="#1B8B6A"
                  coordinate={{
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                  }}
                  title={item.name}
                />
              </View>
            );
          })}
        {event &&
          event.map((item) => {
            return (
              <View key={item.id}>
                {item.event.date >= formattedDate ? (
                  <View>
                    <MapView.Marker
                      onPress={() => {
                        // setModalVisible(true);
                      }}
                      pinColor="purple"
                      coordinate={{
                        latitude: parseFloat(item.event.latitude),
                        longitude: parseFloat(item.event.longitude),
                      }}
                      title={item.event.user.full_name}
                    />
                  </View>
                ) : (
                  <></>
                )}
              </View>
            );
          })}
      </MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 50,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Crag");
              setModalVisible(!modalVisible);
            }}
            style={{
              backgroundColor: "#2F3F4A",
              width: 320,
              margin: 20,
              borderRadius: 15,
              padding: 20,
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 0.3 }}>
                <Image
                  style={{ width: 80, height: 80 }}
                  source={{ uri: cragState.image }}
                ></Image>
              </View>
              <View style={{ flex: 0.8, marginLeft: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {cragState && cragState.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles1 = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    zIndex: 1,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
