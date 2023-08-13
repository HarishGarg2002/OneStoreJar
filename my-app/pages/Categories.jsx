import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ImageInput from "../parts/ImageInput";
import ImageColumns from "./../parts/ImageColumns";
import axios from "axios";
import axiosRoute from "../config/axiosRoute";
import Free from "./Free";

// const data = [
//   {
//     id: 1,
//     text: "Buy",
//     icon: "cart",
//     colors: ["#0f2027", "#203a43", "#2c5364"],
//     iconType: "ionicon",
//   },
//   {
//     id: 2,
//     text: "Rent",
//     image: require("../assets/icons/renttnew.png"),
//     // icon: "home",
//     colors: ["#373b44", "#4286f4"],
//   },
//   {
//     id: 3,
//     text: "Lost & Found",
//     icon: "search",
//     colors: ["#b92b27", "#1565c0"],
//   },
//   {
//     id: 4,
//     text: "Free",
//     image: require("../assets/icons/no_money.png"),
//     colors: ["#00467f", "#a5cc82"],
//   },
//   {
//     id: 5,
//     text: "All Items",
//     image: require("../assets/icons/savings.png"),
//     colors: ["#283048", "#859398"],
//   },
//   {
//     id: 6,
//     text: "Add Post",
//     icon: "plus",
//     iconType: "foundation",
//     colors: ["#00c9ff", "#92fe9d"],
//   },
// ];

const Categories = ({ navigation }) => {
  const [dataCat, setDataCat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${axiosRoute}/category/getCategories`)
      .then((res) => {
        console.log(res.data);
        setDataCat(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const importantData = dataCat.filter((item) => item.important === true);

  const notImportantData = dataCat.filter((item) => item.important === false);

  if (loading === true) {
    return <Free />;
  } else {
    return (
      <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
        <View style={styles.container}>
          {importantData.map((item) => (
            <ImageInput
              key={item.id}
              text={item.name}
              icon={item.icon}
              color={item.colors}
              iconType={item.iconType}
              image={item.image}
              fontSize={13}
              textLength={12}
              textLengthMargin={-31}
              onPress={() => navigation.navigate(item.navigationScreen)}
            />
          ))}
        </View>
        <Text style={styles.heading}>Buy</Text>
        <View style={styles.container}>
          <ImageColumns data={notImportantData} cat="Buy" />
        </View>
        <Text style={styles.heading}>Rent</Text>
        <View style={styles.container}>
          <ImageColumns data={notImportantData} cat="Rent" />
        </View>
        <Text style={styles.heading}>Free</Text>
        <View style={styles.container}>
          <ImageColumns data={notImportantData} cat="Free" />
        </View>
      </ScrollView>
    );
  }
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // flex: 1,
    paddingVertical: 25,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  heading: {
    fontSize: 46,
    fontWeight: "bold",
    color: "black",
    marginLeft: 40,
  },
});
