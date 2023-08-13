import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Modal } from "react-native-paper";

const NewPost = () => {
  return (
    // <View style={{ flex: 1, backgroundColor: }}>
    <Modal
      visible
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
      style={{ flex: 1 }}
    >
      <Text style={{ fontSize: 40 }}>NewPost</Text>
      <Text style={{ fontSize: 40 }}>NewPost</Text>
      <Text style={{ fontSize: 40 }}>NewPost</Text>
      <Text style={{ fontSize: 40 }}>NewPost</Text>
      <Text style={{ fontSize: 40 }}>NewPost</Text>
      <Text style={{ fontSize: 40 }}>NewPost</Text>
      <Text style={{ fontSize: 40 }}>NewPost</Text>
      <Text style={{ fontSize: 40 }}>NewPost</Text>

      <Image source={require("../images/box.png")} />
    </Modal>
    // </View>
  );
};

export default NewPost;

const styles = StyleSheet.create({});
