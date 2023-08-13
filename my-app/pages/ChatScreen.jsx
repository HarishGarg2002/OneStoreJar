import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { io } from "socket.io-client";
import axiosRoute from "../config/axiosRoute";

const socket = io(axiosRoute);

socket.on("connect", () => {
  console.log("Connected to server" + socket.id);
});

socket.on("disconnect", () => {
  console.log("Disconnected to server");
});

const ChatScreen = ({ navigation, route }) => {
  const [messages, setMessages] = useState([]);

  // console.log(route.params);
  // console.log(navigation);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "Harish",
          avatar:
            "https://res.cloudinary.com/harishgarg/image/upload/v1669069058/esnzbljrpvjqrzcjj0jt.jpg",
        },
        image:
          "https://res.cloudinary.com/harishgarg/image/upload/v1669069058/esnzbljrpvjqrzcjj0jt.jpg",
        sent: true,
        received: true,
        pending: true,
        quickReplies: {
          type: "radio", // or 'checkbox',
          keepIt: true,
          values: [
            {
              title: "😋 Yes",
              value: "yes",
            },
            {
              title: "📷 Yes, let me show you with a picture!",
              value: "yes_picture",
            },
            {
              title: "😞 Nope. What?",
              value: "no",
            },
          ],
        },
      },
      {
        _id: 2,
        text: "Hello world",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  socket.on("message-back", (data) => {
    console.log("data" + data);
    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, data)
    // );
  });
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    console.log(messages[0]);
    // socket.emit("message", messages[0]);
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={route.params.user}
      showUserAvatar
      // renderTicks={renderTicks}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
