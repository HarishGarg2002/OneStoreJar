import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../parts/CustomButton";
import axios from "axios";
import { io } from "socket.io-client";
import axiosRoute from "../config/axiosRoute";

const Verification = ({ route, ...rest }) => {
  const now = new Date().toLocaleTimeString();
  const abortController = useRef(null);

  //   const [time, setTime] = React.useState(now);
  //   const [count, setCount] = React.useState(0);
  const [timer, setTimer] = React.useState(20);
  const [disabled, setDisabled] = React.useState(true);
  const [start, setStart] = React.useState(true);
  const intRef = useRef(null);

  useEffect(() => {
    console.log("Verification inside");

    abortController.current = new AbortController();
    const { signal } = abortController.current;
    console.log(abortController);
    console.log(signal);
    console.log(route.params.email);
    axios
      .get(`${axiosRoute}/user/verify?email=${route.params.email}`, {
        signal,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("res.data", res.data);

          rest.navigation.replace("Home");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("err.messsage" + err.messsage);
      });

    const interval = setInterval(() => {
      setTimer((timer) => timer - 1);

      console.log("working");
    }, 1000);
    intRef.current = interval;
    return () => (clearInterval(interval), console.log("cleared"));
  }, [start]);

  useEffect(() => {
    if (timer === 0) {
      setDisabled(false);
      clearInterval(intRef.current);
    }
  }, [timer]);

  function sendNewToken() {
    abortController.current && abortController.current.abort();
    console.log("email" + route.params.email);

    axios
      .put(`${axiosRoute}/user/newEmailToken`, {
        email: route.params.email,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("hello");
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <Ionicons name="ios-mail-unread" size={70} color="blue" />
      <Text
        style={{
          textAlign: "center",
          fontSize: 17,
          fontWeight: "bold",
          marginBottom: 7,
          marginTop: 15,
        }}
      >
        Check Your Mail Inbox For Verfiying Your Email
      </Text>
      <Text>Also Check your Spam Box</Text>
      {/* {clearRefInterval()} */}
      {timer > 0 && <Text>Resend in {timer}</Text>}
      <CustomButton
        title="Resend Email"
        styleButton={{ position: "absolute", bottom: 50 }}
        disabled={disabled}
        onPress={() => {
          sendNewToken();
          setTimer(10);
          setStart(!start);
          setDisabled(true);
        }}
      />
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 90,
  },
});
