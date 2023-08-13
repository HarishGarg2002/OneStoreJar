import {
  StyleSheet,
  Text,
  View,
  Easing,
  Animated,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useEffect } from "react";
import HeaderWordsDynamic from "../parts/HeaderWordsDynamic";
import ImageInput from "../parts/ImageInput";
import Lottie from "lottie-react-native";
import DetailsScreen from "./DetailsScreen";
import Search from "../parts/Search";
import Avatar from "../parts/Avatar";
import ShoppingCard from "../parts/ShoppingCard";
import ProductsList from "./ProductsList";
import MainProductCard from "../parts/MainProductCard";
import MainProductList from "../parts/MainProductList";
import ProfileCard from "../parts/ProfileCard";
import ProfileCardList from "../parts/ProfileCardList";
// import ImageInput from "../parts/ImageInput";
import axios from "axios";
import Free from "./Free";
import axiosRoute from "../config/axiosRoute";
import ImagePickerExample from "../parts/ImagePickerExample";

let go = 0;

const MainScreen = ({ navigation }) => {
  const firstWord = useRef(new Animated.Value(0)).current;
  const runner = useRef(null);
  const [change, setChange] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);

  // const products = [
  //   {
  //     id: 1,
  //     name: "Iphone 12 case",
  //     price: 200,
  //     description: " ",
  //     category: "Accessories",
  //     quantity: 1,
  //     images: [
  //       "https://res.cloudinary.com/harishgarg/image/upload/v1669797542/OneStoreJar/Products/iphone_case_nvr58w.jpg",
  //     ],
  //   },

  //   {
  //     id: 2,
  //     name: "Reynolds Racer Gel",
  //     price: 100,
  //     description: " ",
  //     category: "Stationary",
  //     quantity: 10,
  //     images: [
  //       "https://res.cloudinary.com/harishgarg/image/upload/v1669797653/OneStoreJar/Products/reynolds_gel_pen_jracvl.jpg",
  //     ],
  //   },

  //   {
  //     id: 3,
  //     name: "Mattress",
  //     price: 2000,
  //     description: " ",
  //     category: "Mattress",
  //     quantity: 1,
  //     images: [
  //       "https://res.cloudinary.com/harishgarg/image/upload/v1669797791/OneStoreJar/Products/matress_l15dw9.jpg",
  //     ],
  //   },

  //   {
  //     id: 4,
  //     name: "Cycle",
  //     price: 5000,
  //     description: " ",
  //     category: "Cycles",
  //     quantity: 1,
  //     images: [
  //       "https://res.cloudinary.com/harishgarg/image/upload/v1669797928/OneStoreJar/Products/cycle_vzxte6.jpg",
  //     ],
  //   },

  //   {
  //     id: 5,
  //     name: "Cycle",
  //     price: 5000,
  //     description: " ",
  //     category: "Cycles",
  //     quantity: 1,
  //     images: [
  //       "https://res.cloudinary.com/harishgarg/image/upload/v1669797928/OneStoreJar/Products/cycle_vzxte6.jpg",
  //     ],
  //   },

  //   {
  //     id: 6,
  //     name: "Registers",
  //     price: 400,
  //     description: " ",
  //     category: "Stationary",
  //     quantity: 4,
  //     images: [
  //       "https://res.cloudinary.com/harishgarg/image/upload/v1669798065/OneStoreJar/Products/download_dnpfzw.jpg",
  //     ],
  //   },
  // ];

  // const data = [
  //   {
  //     id: 1,
  //     firstText: "Want To",
  //     secondText: "Read Books",
  //     image: require("../images/bike.jpg"),
  //     start: { value: 1, easing: Easing.bounce, duration: 4000 },
  //     end: { value: 0, easing: Easing.bounce, duration: 2000 },
  //     textAnimation: {
  //       opacity: firstWord,
  //       transform: [
  //         {
  //           scale: firstWord.interpolate({
  //             inputRange: [0, 1],
  //             outputRange: [0.5, 0.8],
  //           }),
  //           // translateX: firstWord.interpolate({
  //           //   inputRange: [0, 1],
  //           //   outputRange: [-400, 30],
  //           // }),
  //         },
  //       ],
  //     },
  //     imageAnimation: {
  //       transform: [
  //         {
  //           translateX: firstWord.interpolate({
  //             inputRange: [0, 1],
  //             outputRange: [-400, 30],
  //           }),
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     id: 2,
  //     firstText: "Ride a",
  //     secondText: "Bicycle",
  //     image: require("../images/box.png"),
  //     start: { value: 1, easing: Easing.bounce, duration: 4000 },
  //     end: { value: 0, easing: Easing.bounce, duration: 2000 },
  //     textAnimation: {
  //       opacity: firstWord,
  //       transform: [
  //         {
  //           scale: firstWord.interpolate({
  //             inputRange: [0, 1],
  //             outputRange: [0.5, 0.7],
  //           }),
  //           // translateX: firstWord.interpolate({
  //           //   inputRange: [0, 1],
  //           //   outputRange: [-400, 30],
  //           // }),
  //         },
  //       ],
  //     },
  //     imageAnimation: {
  //       transform: [
  //         {
  //           translateX: firstWord.interpolate({
  //             inputRange: [0, 1],
  //             outputRange: [-400, 30],
  //           }),
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     id: 3,
  //     firstText: "This is  not for",
  //     secondText: "Dating",
  //     image: require("../images/box.png"),
  //     start: { value: 1, easing: Easing.bounce, duration: 4000 },
  //     end: { value: 0, easing: Easing.bounce, duration: 2000 },
  //     textAnimation: {
  //       opacity: firstWord,
  //       transform: [
  //         {
  //           scale: firstWord.interpolate({
  //             inputRange: [0, 1],
  //             outputRange: [0.5, 0.7],
  //           }),
  //           // translateX: firstWord.interpolate({
  //           //   inputRange: [0, 1],
  //           //   outputRange: [-400, 30],
  //           // }),
  //         },
  //       ],
  //     },
  //     imageAnimation: {
  //       transform: [
  //         {
  //           translateX: firstWord.interpolate({
  //             inputRange: [0, 1],
  //             outputRange: [-400, 30],
  //           }),
  //         },
  //       ],
  //     },
  //   },
  // ];

  const dataCatr = [
    {
      id: 1,
      name: "Buy1",
      type: "Buy",
      icon: "cart",
      colors: ["#0f2027", "#203a43", "#2c5364"],
      iconType: "ionicon",
    },
    {
      id: 2,
      name: "Rent",
      type: "Rent",
      image: require("../assets/icons/renttnew.png"),
      // icon: "home",
      colors: ["#373b44", "#4286f4"],
    },
    {
      id: 3,
      name: "Lost & Found",
      type: "Lost & Found",
      icon: "search",
      colors: ["#b92b27", "#1565c0"],
    },
    {
      id: 4,
      name: "Free",
      type: "Free",
      image: require("../assets/icons/no_money.png"),
      colors: ["#00467f", "#a5cc82"],
    },
    {
      id: 5,
      name: "All Items",
      type: "All Items",
      image: require("../assets/icons/savings.png"),
      colors: ["#283048", "#859398"],
    },
    {
      id: 6,
      name: "Add Post",
      type: "Add Post",
      icon: "plus",
      iconType: "foundation",
      colors: ["#00c9ff", "#92fe9d"],
    },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${axiosRoute}/mainAnimation/getAnimation`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        for (let i = 0; i < res.data.length; i++) {
          console.log(data[i]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //getProducts();
    axios
      .get(`${axiosRoute}/product/getProducts`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let i;

  const MovingTextScreens = () => {
    if (data.length !== 0) {
      // console.log(go);
      // console.log("length" + data.length);
      i = go % data.length;
      // console.log(i);

      setTimeout(() => {
        setChange(!change);
      }, 6000);
      go++;
    }

    const heightView = Dimensions.get("window").height;

    if (loading === false && data.length !== 0) {
      return (
        // <View style={{ height: heightView }}>
        <ScrollView style={{}}>
          <HeaderWordsDynamic
            firstText={data[i].firstText}
            secondText={data[i].secondText}
            image={data[i].image}
            removeRunner={() => clearInterval(runner.current)}
            start={data[i].start}
            end={data[i].end}
            firstWord={firstWord}
            textAnimation={data[i].textAnimation}
            imageAnimation={data[i].imageAnimation}
          />
          {/* <View style={styles.categories}> */}
          {/* <Text style={styles.headingText}>Categories</Text> */}

          {/* <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {dataCatr.map((item) => (
                <ImageInput
                  key={item.id}
                  text={item.name}
                  icon={item.icon}
                  color={item.colors}
                  iconType={item.iconType}
                  // image={item.image}
                  fontSize={13}
                  textLength={9}
                  heightImg={60}
                  widthImg={60}
                  marginImg={8}
                  // onPress={() => navigation.navigate("Products")}
                />
              ))}
            </View> */}
          {/* </View> */}
          <MainProductList navigation={navigation} products={products} />
          {/* <MainProductList text="hello" navigation={navigation} /> */}
          <ProfileCardList />
        </ScrollView>
        // </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  };

  return <View style={styles.container}>{MovingTextScreens()}</View>;
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  headingText: {
    fontSize: 41,
    fontWeight: "500",
    padding: 20,
  },
  productInScroll: {},
});

// Most Visited Categories
// Hot & Trending
// New Arrivals
// Best Sellers
// Featured Products
// Popular Products
// Recommended Products
// Top Rated Products
// Top Selling Products
// Top Viewed Products
// Trending Products
// Most Viewed Products
// Most Popular Products
// Most Rated Products
// Most Liked Products
// Most Bought Products
// Most Sold Products
// Most Shared Products
// Most Commented Products
// Most Reviewed Products
// Most Discussed Products
// Most Favorited Products
// Most Liked Products
