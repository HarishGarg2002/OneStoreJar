import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Corousel from "../parts/Corousel";
import Dropdown from "../parts/Dropdown";
import CustomButton from "../parts/CustomButton";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Prompt } from "expo-auth-session";
import axios from "axios";
import Navigation from "./Navigation";
import axiosRoute from "../config/axiosRoute";

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];
const DATA = [
  {
    key: "3571572",
    title: "Multi-lateral intermed  moratorium",
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: require("../images/arcade-machine.png"),
  },
  {
    key: "3571747",
    title: "Automated radical data-warehouse",
    description:
      "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    image: require("../images/video-game.png"),
  },
  {
    key: "3571680",
    title: "Inverse attitude-oriented system engine",
    description:
      "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    image: require("../images/turntable.png"),
  },
  {
    key: "3571603",
    title: "Monitored global data-warehouse",
    description: "We need to program the open-source IB interface!",
    image: require("../images/memphis-style.png"),
  },
];

const data = [
  { name: "Thapar Institute", email: "thapar.edu" },
  { name: "Chitkara", email: "chitkara.edu" },
  { name: "PEC", email: "punjab.edu" },
  { name: "Punjabi", email: "punjabi.edu" },
];

WebBrowser.maybeCompleteAuthSession();

const Entrypage = ({ ...rest }) => {
  const [userInfo, setUserInfo] = React.useState();
  const [selected, setSelected] = React.useState();
  const [message, setMessage] = React.useState();
  const [accessToken, setAccessToken] = React.useState();
  const [email, setEmail] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "919842427618-2dl77pvjefb2rvb36m683cnhfsjcomdq.apps.googleusercontent.com",
    iosClientId:
      "919842427618-lmshldume6eb0me126sqq5bvbdrj85p0.apps.googleusercontent.com",
    expoClientId:
      "919842427618-506ilbfac88v59bvvoqsb14g5b8sbmuq.apps.googleusercontent.com",
    webClientId:
      "919842427618-506ilbfac88v59bvvoqsb14g5b8sbmuq.apps.googleusercontent.com",
    prompt: Prompt.Login,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      // console.log(response);
      setAccessToken(response.authentication.accessToken);

      const getUserInfo = async () => {
        await getUserData();
      };

      getUserInfo();
    } else {
      console.log("response error", response);
    }
  }, [response, accessToken]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse
      .json()
      .then((data) => {
        console.log("userInfoResponse", data);
        if (data.hd === selected.email) {
          console.log("inside=", data.hd);
          axios
            .post(`${axiosRoute}/user/register`, {
              name: data.name,
              email: data.email,
              picture:
                data.picture ||
                "https://www.pexels.com/photo/two-young-girls-sitting-on-couch-with-laptop-9989392/",
            })
            .then((res) => {
              console.log(res.data);
              setUserInfo(data);
              rest.navigation.push("Verification", { email: data.email });
            })
            .catch((err) => {
              console.log("Error" + err);
            });

          // setMessage("Logged in successfully");
          // rest.navigation.replace("Home");
        } else {
          setMessage(`Please login with your ${selected.email} email`);
        }
      })
      .catch((error) => {
        console.log("catching error", error.message);
      });
  }
  return (
    <View
      style={{
        flex: 1,
        marginBottom: 0,
        paddingBottom: 0,
        alignItems: "center",
      }}
    >
      <Corousel DATA={DATA} bgs={bgs} />
      <Dropdown
        data={data}
        selected={selected}
        setSelected={setSelected}
        property="name"
      />
      <Text style={{ position: "absolute", bottom: 70 }}>{message}</Text>
      <CustomButton
        disabled={!selected}
        styleButton={{
          bottom: 15,
          width: 150,
          position: "absolute",
          height: 50,
        }}
        onPress={() => {
          setAccessToken(null);
          promptAsync();
        }}
      />
    </View>
  );
};

export default Entrypage;

const styles = StyleSheet.create({});
