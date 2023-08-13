import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useRef } from "react";
import ImageColumns from "../parts/ImageColumns";

import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import Avatar from "./../parts/Avatar";
import AvatarRow from "../parts/AvatarRow";
import ShoppingCard from "../parts/ShoppingCard";
import ImageInput from "../parts/ImageInput";
import axios from "axios";
import axiosRoute from "../config/axiosRoute";

export const ProductsList = ({ navigation }) => {
  const [products, setProducts] = React.useState([]);
  const [firstSelected, setFirstSelected] = React.useState(false);

  const productsAnimation = useRef(new Animated.Value(0)).current;

  // const data = [
  //   {
  //     id: 1,
  //     price: 1000,
  //     image: require("../images/bike.jpg"),
  //     type: "Rent",
  //     title: "Motorola Bike",
  //   },
  //   {
  //     id: 2,
  //     price: 1000,
  //     image: require("../images/bike.jpg"),
  //     type: "Rent",
  //     title: "Motorola Bike",
  //   },
  //   {
  //     id: 3,
  //     price: 1000,
  //     image: require("../images/bike.jpg"),
  //     type: "Rent",
  //     title: "Motorola Bike",
  //   },
  //   {
  //     id: 4,
  //     price: 1000,
  //     image: require("../images/bike.jpg"),
  //     type: "Rent",
  //     title: "Motorola Bike",
  //   },
  //   {
  //     id: 5,
  //     price: 1000,
  //     image: require("../images/bike.jpg"),
  //     type: "Rent",
  //     title: "Motorola Bike",
  //   },
  //   {
  //     id: 6,
  //     price: 1000,
  //     image: require("../images/bike.jpg"),
  //     type: "Rent",
  //     title: "Motorola Bike",
  //   },
  //   {
  //     id: 7,
  //     price: 1000,
  //     image: require("../images/bike.jpg"),
  //     type: "Rent",
  //     title: "Motorola Bike",
  //   },
  //   {
  //     id: 8,
  //     price: 1000,
  //     image: require("../images/bike.jpg"),
  //     type: "Rent",
  //     title: "Motorola Bike",
  //   },
  //   {
  //     id: 9,
  //     price: 1000,
  //     image: require("../images/bike.jpg"),
  //     type: "Rent",
  //     title: "Motorola Bike",
  //   },
  //   {
  //     id: 10,
  //     price: 1000,
  //     image: require("../images/bike.jpg"),
  //     type: "Rent",
  //     title: "Motorola Bike",
  //   },
  // ];

  const startProductsAnimation = () => {
    Animated.timing(productsAnimation, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const endProductsAnimation = () => {
    Animated.timing(productsAnimation, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    axios.get(`${axiosRoute}/product/getProducts`).then((res) => {
      setProducts(res.data);
      console.log("Res data print karange");
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    firstSelected ? startProductsAnimation() : endProductsAnimation();
  }, [firstSelected]);

  console.log("Printing");
  console.log(firstSelected);

  return (
    <ScrollView style={styles.container}>
      {/* <AvatarRow height={50} margin={3} /> */}
      {/* <AvatarRow width={46} margin={6} /> */}
      <AvatarRow
        width={46}
        margin={6}
        translateYOutput={-70}
        translateXOutput={-300}
        selected={() => {
          setFirstSelected(!firstSelected);
        }}
        animEnd={true}
        firstSelected={firstSelected}
      />
      <AvatarRow
        width={46}
        margin={6}
        translateYOutput={-80}
        firstSelected={firstSelected}
        animEnd={false}
        translateXOutput={0}
        // selected={() => {
        //   setFirstSelected(!firstSelected);
        // }}
        // selected={() => {
        //   setSecondSelected(!secondSelected);
        // }}
      />
      {/* <AvatarRow width={40} margin={2} /> */}

      <Animated.View
        style={[
          styles.itemsContainer,
          {
            transform: [
              {
                translateY: productsAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 10],
                }),
                // translateY: 0,
              },
            ],
          },
        ]}
      >
        {products.map((item) => (
          <ShoppingCard
            key={item._id}
            item={item}
            text="Hello"
            onPress={() => navigation.navigate("ProductDetails", { item })}
          />
        ))}
      </Animated.View>
    </ScrollView>
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(250,250,250,0.8)",
    // paddingVertical: 20,
    flex: 1,
    // marginHorizontal: 9,
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-between",
    // alignItems: "center",
    // backgroundColor: "red",
    // marginHorizontal: 10,
    // paddingVertical: 10,
  },
});
