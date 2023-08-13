import React, { useState, useMemo, useEffect } from "react";

import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "./pages/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import Entrypage from "./pages/Entrypage";
import Verification from "./pages/Verification";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { Provider } from "react-redux";
import store from "./reduxstorage/store";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    // <SafeAreaProvider>
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Entry" options={{ headerShown: false }}>
                {(props) => <Entrypage {...props} />}
              </Stack.Screen>
              <Stack.Screen
                name="Verification"
                options={{ headerShown: false }}
              >
                {(props) => <Verification {...props} />}
              </Stack.Screen>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false, title: "Hi" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </ApplicationProvider>
    </Provider>

    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
