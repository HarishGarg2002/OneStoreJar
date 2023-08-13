import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import ImageColumns from "../parts/ImageColumns";

import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import Avatar from "./../parts/Avatar";
import AvatarRow from "../parts/AvatarRow";
import ShoppingCard from "../parts/ShoppingCard";
import ImageInput from "../parts/ImageInput";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "../parts/CustomButton";
import WishlistProduct from "../parts/WishlistProduct";
import Marketplace from "./Marketplace";

export const Profile = ({ navigation }) => {
  const data = [
    {
      id: 1,
      price: 1000,
      image: require("../images/bike.jpg"),
      type: "Rent",
      title: "Motorola Bike",
    },
    {
      id: 2,
      price: 1000,
      image: require("../images/bike.jpg"),
      type: "Rent",
      title: "Motorola Bike",
    },
    {
      id: 3,
      price: 1000,
      image: require("../images/bike.jpg"),
      type: "Rent",
      title: "Motorola Bike",
    },
    {
      id: 4,
      price: 1000,
      image: require("../images/bike.jpg"),
      type: "Rent",
      title: "Motorola Bike",
    },
    {
      id: 5,
      price: 1000,
      image: require("../images/bike.jpg"),
      type: "Rent",
      title: "Motorola Bike",
    },
    {
      id: 6,
      price: 1000,
      image: require("../images/bike.jpg"),
      type: "Rent",
      title: "Motorola Bike",
    },
    {
      id: 7,
      price: 1000,
      image: require("../images/bike.jpg"),
      type: "Rent",
      title: "Motorola Bike",
    },
    {
      id: 8,
      price: 1000,
      image: require("../images/bike.jpg"),
      type: "Rent",
      title: "Motorola Bike",
    },
    {
      id: 9,
      price: 1000,
      image: require("../images/bike.jpg"),
      type: "Rent",
      title: "Motorola Bike",
    },
    {
      id: 10,
      price: 1000,
      image: require("../images/bike.jpg"),
      type: "Rent",
      title: "Motorola Bike",
    },
  ];

  let width = Dimensions.get("window").width;
  return (
    // <View style={styles.container}>
    //   <View style={styles.profileContainer}>
    //     <View style={{ justifyContent: "space-between", paddingVertical: 15 }}>
    //       <Text style={{ fontWeight: "600", fontSize: 20 }}>Harish garg</Text>
    //       <TouchableOpacity
    //         onPress={() => navigation.navigate("Marketplace")}
    //         style={{ flexDirection: "row", alignItems: "center" }}
    //       >
    //         <Text style={{ fontStyle: "italic" }}>Open your Marketplace</Text>
    //         <Icon name="chevron-right" size={13} style={{ marginLeft: 10 }} />
    //       </TouchableOpacity>
    //     </View>
    //     <Image source={require("../images/box.png")} style={styles.image} />
    //   </View>

    //   <View style={styles.wishlistContainer}>
    //     <Text style={{ fontWeight: "600", fontSize: 30, marginLeft: 10 }}>
    //       {" "}
    //       Wishlist Items
    //     </Text>
    //     <ScrollView
    //       horizontal={true}
    //       showsHorizontalScrollIndicator={false}
    //       style={styles.scrollList}
    //     >
    //       <View style={{ flexDirection: "row" }}>
    //         <WishlistProduct />
    //         <WishlistProduct />
    //         <WishlistProduct />
    //         <WishlistProduct />
    //       </View>
    //     </ScrollView>
    //   </View>
    // </View>

    <View style={styles.container}>
      <Marketplace />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    flex: 1,
  },
  profileContainer: {
    // margin: 15,
    // marginHorizontal: 10,
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "rgba(176, 196, 222,0.4)",
    flexDirection: "row",
    height: 150,
    width: "93%",
    justifyContent: "space-between",
    // alignItems: "center",
    padding: 20,
    borderRadius: 30,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  wishlistContainer: {
    marginTop: 20,
    backgroundColor: "white",
    // flex: 1,
    // height: 300,
    width: "100%",
    borderRadius: 30,
    paddingVertical: 20,
    // backgroundColor: "rgba(176, 196, 222,0.4)",
    elevation: 10,
  },
  scrollList: {
    paddingTop: 20,
  },
});
