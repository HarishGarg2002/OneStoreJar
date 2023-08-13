import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  Animated,
  TouchableOpacity,
  Touchable,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { NavigationContainer, StackRouter } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "./MainScreen";
import Buy from "./Buy";
import Rent from "./Rent";
import LostFound from "./LostFound";
import Free from "./Free";
import Categories from "./Categories";
import Profile from "./Profile";
import CustomButton from "../parts/CustomButton";
// import Icon from "react-native-vector-icons";
// import { Icon } from "react-native-elements";
// import Animated from "react-native-reanimated";
import { Icon } from "@rneui/themed";
import MessagesScreen from "./MessagesScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./ChatScreen";
import ProductsList from "./ProductsList";
import DetailsScreen from "./DetailsScreen";
import Marketplace from "./Marketplace";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import NewPost from "./NewPost";

const Stack = createStackNavigator();

const StackNavigator = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "ChatMessages") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({ tabBarStyle: styles.tabBar });
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="ChatMessages" component={ChatScreen} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="Products" component={ProductsList} />
      <Stack.Screen name="ProductDetails" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

const CategoriesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoriesStack" component={Categories} />
      <Stack.Screen name="Products" component={ProductsList} />
      <Stack.Screen name="ProductDetails" component={DetailsScreen} />
      <Stack.Screen name="NewPost" component={NewPost} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoriesStack" component={Profile} />
      <Stack.Screen name="Marketplace" component={Marketplace} />
      {/* <Stack.Screen name="ProductDetails" component={DetailsScreen} /> */}
    </Stack.Navigator>
  );
};
const Tab = createBottomTabNavigator();

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#70FFE5" }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarButton: (props) => {
            const clickAnimation = useRef(new Animated.Value(0)).current;
            const { children, onPress, item } = props;
            const focused = props.accessibilityState.selected;

            useEffect(() => {
              if (focused) {
                Animated.timing(clickAnimation, {
                  toValue: 0.8,
                  duration: 50,
                  useNativeDriver: true,
                }).start();
              } else {
                Animated.timing(clickAnimation, {
                  toValue: 0.7,
                  duration: 100,
                  useNativeDriver: true,
                }).start();
              }
            }, [focused]);

            function loadIcon(route) {
              if (route.name == "Main") {
                return (
                  <>
                    <Icon
                      type="ionicon"
                      name={focused ? "ios-home" : "ios-home-outline"}
                      color={
                        focused
                          ? "rgba(0, 98,255,0.8 )"
                          : "rgba(120,120,120,0.5)"
                      }
                    />
                    {focused && (
                      <Text
                        style={{ color: "rgba(0, 98,255,0.4 )", fontSize: 10 }}
                      >
                        Home
                      </Text>
                    )}
                  </>
                );
              } else if (route.name == "Categories") {
                return (
                  <>
                    <Icon
                      type="ionicon"
                      name={focused ? "ios-list" : "ios-list-outline"}
                      color={
                        focused
                          ? "rgba(0, 98,255,0.8 )"
                          : "rgba(120,120,120,0.5)"
                      }
                    />
                    {focused && (
                      <Text
                        style={{ color: "rgba(0, 98,255,0.4 )", fontSize: 10 }}
                      >
                        Categories
                      </Text>
                    )}
                  </>
                );
              } else if (route.name == "Profile") {
                return (
                  <>
                    <Icon
                      type="ionicon"
                      name={focused ? "ios-person" : "ios-person-outline"}
                      color={
                        focused
                          ? "rgba(0, 98,255,0.8 )"
                          : "rgba(120,120,120,0.5)"
                      }
                    />
                    {focused && (
                      <Text
                        style={{ color: "rgba(0, 98,255,0.4 )", fontSize: 10 }}
                      >
                        Profile
                      </Text>
                    )}
                  </>
                );
              } else if (route.name == "Chat") {
                return (
                  <>
                    <Icon
                      type="ionicon"
                      name={
                        focused ? "ios-chatbubble" : "ios-chatbubble-outline"
                      }
                      color={
                        focused
                          ? "rgba(0, 98,255,0.8 )"
                          : "rgba(120,120,120,0.5)"
                      }
                    />
                    {focused && (
                      <Text
                        style={{ color: "rgba(0, 98,255,0.4 )", fontSize: 10 }}
                      >
                        Profile
                      </Text>
                    )}
                  </>
                );
              }
            }

            return (
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
                onPress={() => {
                  onPress();
                }}
              >
                <Animated.View
                  style={{
                    transform: [{ scale: clickAnimation }],
                  }}
                >
                  {loadIcon(route)}
                </Animated.View>
              </TouchableOpacity>
            );
          },
        })}
      >
        <Tab.Screen name="Main">
          {(props) => <MainStackNavigator {...props} />}
        </Tab.Screen>
        <Tab.Screen name="Categories">
          {() => <CategoriesStackNavigator />}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {() => <ProfileStackNavigator />}
        </Tab.Screen>
        <Tab.Screen name="Chat" component={StackNavigator} />
      </Tab.Navigator>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "lightgrey",
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  tabBar: {
    position: "absolute",
    bottom: 40,
    left: 50,
    right: 50,
    elevation: 4,
    backgroundColor: "white",
    borderRadius: 50,
    height: 60,
  },
});
