import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import Home from "./Home";

const Onboardingpage = ({ navigation }) => {
  return (
    <Onboarding
      style={{ flex: 1 }}
      onSkip={() => navigation.replace("Home")}
      onDone={() => navigation.navigate("Home")}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={{ height: "60%", width: "80%" }}
              source={require("../images/undraw_Buddies_2ae5.png")}
              resizeMode="center"
            />
          ),
          title: "Onboarding",
          subtitle: "Done with React Native Onboarding Swiper",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={{ height: "60%", width: "80%" }}
              source={require("../images/undraw_Healthy_habit_re_duor.png")}
              resizeMode="center"
            />
          ),
          title: "Onboarding Next",
          subtitle: "Done with React ",
        },
      ]}
    />
  );
};

export default Onboardingpage;

const styles = StyleSheet.create({});
