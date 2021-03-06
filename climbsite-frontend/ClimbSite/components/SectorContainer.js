import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import AscentModal from "./AscentContainer";
import fetch_url from "../host";

export default function SectorContainer({
  data,

  Buttontext,
}) {
  const { height } = useWindowDimensions();
  const [selectedSector, setSelectedSector] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  async function getRoute(sector_id) {
    const url_route = `${fetch_url}/api/crags/routes?sector_id=${sector_id}`;
    try {
      const response = await axios.get(url_route);
      const data_received = await response.data;
      setRoute(data_received);
      setModalVisible(true);
    } catch (error) {
      console.warn(error);
    }
  }

  const [route, setRoute] = useState();

  return (
    <View>
      {data &&
        data.map((item) => {
          return (
            <View
              key={item.id}
              style={{
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  getRoute(item && item.id);
                }}
                style={{
                  backgroundColor: "#2F3F4A",
                  borderRadius: 15,
                  padding: 20,
                  width: 320,
                  height: 65,
                  alignSelf: "center",
                  marginTop: 20,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    marginLeft: 20,
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    marginLeft: 20,
                    fontSize: 12,
                  }}
                >
                  {Buttontext}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={setModalVisible}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0,0.6)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: "#2F3F4A",
              borderRadius: 15,

              width: 320,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginVertical: 10,
                color: "white",
                alignSelf: "center",
              }}
            >
              Log Climb
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <FlatList
                key={(item) => item.id}
                data={route && route}
                renderItem={({ item }) => (
                  <Pressable>
                    <View
                      style={{
                        height: 50,
                        marginLeft: 20,
                        justifyContent: "center",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 18, flex: 0.8 }}>
                          {item.name}
                        </Text>
                        <TouchableOpacity
                          style={{ flex: 0.1 }}
                          onPress={() => {
                            setSelectedItem(item);
                            setModalVisible2(true);
                          }}
                        >
                          <AntDesign name="check" size={24} color="black" />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        borderBottomColor: "rgba(255, 255, 255, 0.25)",
                        borderBottomWidth: 1,
                      }}
                    />
                  </Pressable>
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <AscentModal
        setModalVisible={() => {
          setModalVisible2(!modalVisible);
        }}
        modalVisible={modalVisible2}
        item={selectedItem && selectedItem}
      />
    </View>
  );
}
