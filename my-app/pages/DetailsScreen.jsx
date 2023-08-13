import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { add } from "react-native-reanimated";
import {
  addToLikedCart,
  removeFromLikedCart,
} from "./../reduxstorage/likedCart/action";
import store from "../reduxstorage/store";

const DetailsScreen = ({ route }) => {
  // console.log(route.params.item);

  const item = route.params.item;

  const [heart, setHeart] = React.useState(false);

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const navigation = useNavigation();

  const likingCart = () => {
    setHeart(!heart);
    if (heart) {
      store.dispatch(removeFromLikedCart(item));
    } else {
      store.dispatch(addToLikedCart(item));
    }
  };

  // console.log(store.getState().likedCart);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <Image
          source={{
            uri: route.params.item.images[0],
          }}
          style={{
            width: "100%",
            height: height / 2.3,
            resizeMode: "cover",
            // resizeMode: "cover",
            position: "relative",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            padding: 20,
            position: "absolute",
            justifyContent: "space-between",
          }}
        >
          <Icon
            name="arrow-back"
            type="ionicon"
            size={25}
            color="black"
            style={{ padding: 4 }}
            onPress={() => {
              navigation.goBack();
            }}
          />

          {heart ? (
            <Icon
              name="heart"
              onPress={() => {
                setHeart(false);
                removeFromLikedCart(route.params.item);
                store
                  .getState()
                  .cart.likedCart.map((item) => console.log(item));
              }}
              style={{ padding: 4 }}
              color="red"
              type="ionicon"
              size={25}
            />
          ) : (
            <Icon
              name="heart-outline"
              onPress={() => {
                setHeart(true);
                addToLikedCart(route.params.item);
                store
                  .getState()
                  .cart.likedCart.map((item) => console.log(item));
              }}
              style={{ padding: 4 }}
              color="black"
              type="ionicon"
              size={25}
            />
          )}
        </View>
      </View>
      {/* <View
        style={{
          // marginHorizontal: 10,
          width: width,
          height: width,
          backgroundColor: "white",
          // flex: 1,
          zIndex: 1,
          borderRadius: width / 2 - 100,
          elevation: 5,
          position: "absolute",
          top: -5,
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 7,
          // top: height / 2.3 - width / 2,
        }}
      >
        <View
          style={{
            width: "7%",
            height: 5,
            backgroundColor: "lightgray",
            borderRadius: 10,
          }}
        />
      </View> */}
      <View
        style={{
          // flex: 1,
          width: "100%",
          // margin: 20,
          // paddingVertical: 50,
          padding: 15,
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          top: -45,
          backgroundColor: "lightgray",
          // justifyContent: "center",\
          alignItems: "center",
          zIndex: 5,
        }}
      >
        <View
          style={{
            width: "7%",
            marginBottom: 20,
            height: 5,
            backgroundColor: "gray",
            borderRadius: 10,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            // alignItems: "baseline",
            // backgroundColor: "red",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              // textAlign: "left",
              padding: 10,
              // justifyContent: "flex-start",
              fontWeight: "700",
              marginBottom: 10,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              alignSelf: "baseline",
            }}
          >
            ₹ {item.price}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 100,
            elevation: 3,
            backgroundColor: "white",
            borderRadius: 20,
            paddingHorizontal: 10,
            alignItems: "center",
            flexDirection: "row",

            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "70%",
              // justifyContent: "space-between",
              // backgroundColor: "pink",
              // overflow: "hidden",
            }}
          >
            <View
              style={{
                width: 70,
                elevation: 5,
                height: 70,
                borderRadius: 40,
                overflow: "hidden",
                // padding: 4,
              }}
            >
              <Image
                source={require(".././images/bike.jpg")}
                style={{
                  resizeMode: "cover",
                  width: "100%",
                  height: "100%",
                  // borderRadius: 45,
                  // padding: 30,
                }}
              />
            </View>
            <View
              style={{
                marginLeft: 9,
                width: "55%",
                justifyContent: "space-between",
                // paddingVertical: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  marginTop: 10,
                  color: "#333",
                }}
              >
                Harish garg
              </Text>
              <TouchableOpacity
                style={
                  {
                    // alignSelf: "flex-end",
                  }
                }
              >
                <Text>Open Marketplace</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{}}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  backgroundColor: "red",
                  padding: 3,
                  borderRadius: 10,
                  width: 60,
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  color: "white",
                  marginRight: 5,
                }}
              >
                Selling
              </Text>
              <Text
                style={{
                  fontStyle: "italic",
                }}
              >
                {" "}
                At{" "}
              </Text>
            </View>
            <View>
              <Text style={{ marginTop: 6, fontWeight: "700" }}>
                ₹ {item.price}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 20,
            // height: 200,
            flex: 1,
            elevation: 5,
            backgroundColor: "white",
            borderRadius: 30,
            paddingHorizontal: 10,
            flexDirection: "row",
            overflow: "hidden",
            padding: 30,
          }}
        >
          <View
            style={{
              width: "60%",
              // backgroundColor: "pink",
              height: "100%",
              borderRightWidth: 2,
              borderColor: "lightgray",
              borderStyle: "dashed",
            }}
          >
            <Text
              style={{ fontWeight: "600", fontSize: 16, fontStyle: "italic" }}
            >
              Communication Timings
            </Text>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.mainText}>Call</Text>
                <Text> : </Text>
                <Text>9:00 AM - 9:00 PM</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.mainText}>Chat</Text>
                <Text> : </Text>
                <Text>9:00 AM - 9:00 PM</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.mainText}>Meet</Text>
                <Text> : </Text>
                <Text>9:00 AM - 9:00 PM</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "40%",
              paddingHorizontal: 5,
              justifyContent: "space-between",
              // backgroundColor: "pink",
              height: "100%",
            }}
          >
            <View>
              <Text style={{ fontSize: 12 }}>Current : </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={{ fontSize: 13 }}>K Hostel</Text>
              <Text style={{ fontSize: 11, marginLeft: 4 }}>Room No. 226</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Icon
                name="call"
                type="ionicon"
                size={14}
                color="white"
                style={{
                  padding: 7,
                  backgroundColor: "blue",
                  borderRadius: 15,
                }}
              />
              <Icon
                name="ios-chatbubbles"
                type="ionicon"
                size={14}
                color="white"
                style={{
                  padding: 7,
                  backgroundColor: "blue",
                  borderRadius: 15,
                }}
              />
              <Icon
                name="location"
                type="ionicon"
                size={14}
                color="white"
                style={{
                  padding: 7,
                  backgroundColor: "blue",
                  borderRadius: 15,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    width: "100%",
    zIndex: 3,
    // padding: 10,
    borderBottomWidth: 2,
    // borderStyle: "dashed",
    borderBottomColor: "lightgray",
    // borderWidth: 10,
    // borderColor: "gray",
    backgroundColor: "white",
  },
  bottom: {
    // flex: 1,
    // zIndex: 4,
    // height: "100%",
    width: "100%",
    backgroundColor: "yellow",
  },
  mainText: {
    fontWeight: "500",
    fontSize: 14,
    fontStyle: "italic",
  },
});
