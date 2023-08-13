import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import TxtInput from "../parts/TxtInput";
import Dropdown from "../parts/Dropdown";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
// import { SvgUri } from "react-native-svg";
import CustomButton from "../parts/CustomButton";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Prompt } from "expo-auth-session";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import axios from "axios";
import axiosRoute from "../config/axiosRoute";

WebBrowser.maybeCompleteAuthSession();

const Login = ({ isLaunched, ...rest }) => {
  const data = [
    { name: "Thapar Institute", email: "thapar.edu" },
    { name: "Chitkara", email: "chitkara.edu" },
    { name: "PEC", email: "punjab.edu" },
    { name: "Punjabi", email: "punjabi.edu" },
  ];

  const [selected, setSelected] = useState();

  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "919842427618-2dl77pvjefb2rvb36m683cnhfsjcomdq.apps.googleusercontent.com",
    iosClientId:
      "919842427618-lmshldume6eb0me126sqq5bvbdrj85p0.apps.googleusercontent.com",
    clientId:
      "919842427618-506ilbfac88v59bvvoqsb14g5b8sbmuq.apps.googleusercontent.com",
    prompt: Prompt.Login,
  });

  React.useEffect(() => {
    if (response?.type === "success") {
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
          axios
            .post(`${axiosRoute}/user/register/`, {
              name: "HarishGarg",
              email: "harishgarg951@gmail.com",
              picture:
                "https://www.pexels.com/photo/two-young-girls-sitting-on-couch-with-laptop-9989392/",
            })
            .then((res) => {
              console.log(res.data);
              // AsyncStorage.setItem("user", JSON.stringify(res.data));
            })
            .catch((err) => {
              console.log("Error" + err);
            });
          setUserInfo(data);
          setMessage("Logged in successfully");
          !isLaunched
            ? rest.navigation.replace("Home")
            : rest.navigation.navigate("OnBoarding");
        } else {
          setMessage(`Please login with your ${selected.email} email`);
        }
      })
      .catch((error) => {
        console.log("catching error", error.message);
      });
  }

  // function showUserInfo() {
  //   if (userInfo) {
  //     return (
  //       <View style={styles.userInfo}>
  //         {/* <Text>{message.type}</Text> */}
  //         <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
  //         <Text>Welcome {userInfo.name}</Text>
  //         <Text>{userInfo.email}</Text>
  //       </View>
  //     );
  //   }
  // }

  return (
    <View style={styles.container}>
      <Image
        source={require("../images/box.png")}
        style={{
          height: "30%",
          width: "60%",
          resizeMode: "contain",
          marginTop: "40%",
        }}
      />
      {/* <SvgUri
      width="100%"
      height="100%"
      uri="https://www.w3schools.com/w3css/img_lights.svg"
    /> */}
      <View>
        <Dropdown
          data={data}
          selected={selected}
          setSelected={setSelected}
          property="name"
        />
      </View>
      <Text>{message}</Text>
      {/* {showUserInfo()} */}
      <CustomButton
        disabled={!selected}
        styleButton={{
          bottom: 150,
          position: "absolute",
        }}
        onPress={() => {
          axios
            .get("https://damp-shore-46053.herokuapp.com/")
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              console.log("Error" + err);
            });
        }}
      />
      <CustomButton
        disabled={!selected}
        styleButton={{
          bottom: 50,
          position: "absolute",
        }}
        onPress={() => {
          setAccessToken(null);
          promptAsync();
        }}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEBE3",
    alignItems: "center",
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
  },
});
