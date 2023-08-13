import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import ChatCard from "../parts/ChatCard";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "./MessageStyles";

const Messages = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: require("../assets/users/user-3.jpg"),
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: require("../assets/users/user-1.jpg"),
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "3",
    userName: "Ken William",
    userImg: require("../assets/users/user-4.jpg"),
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../assets/users/user-6.jpg"),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../assets/users/user-7.jpg"),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
];

const MessagesScreen = ({ navigation }) => {
  return (
    <ScrollView style={{ height: "100%", width: "100%" }}>
      {Messages.map((item, index) => {
        return (
          <ChatCard
            key={item.id}
            navigation={navigation}
            user={{
              _id: item.id,
              name: "item.UserName",
              avatar:
                "https://res.cloudinary.com/harishgarg/image/upload/v1669069058/esnzbljrpvjqrzcjj0jt.jpg",
            }}
          />
        );
      })}
    </ScrollView>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    // justifyContent: "center",
  },
});

// <Container>
//   <FlatList
//     data={Messages}
//     keyExtractor={(item) => item.id}
//     renderItem={({ item }) => (
//       <Card
//         onPress={() =>
//           navigation.navigate("ChatMessages", { userName: item.userName })
//         }
//       >
//         <UserInfo>
//           <UserImgWrapper>
//             <UserImg source={item.userImg} />
//           </UserImgWrapper>
//           <TextSection>
//             <UserInfoText>
//               <UserName>{item.userName}</UserName>
//               <PostTime>{item.messageTime}</PostTime>
//             </UserInfoText>
//             <MessageText>{item.messageText}</MessageText>
//           </TextSection>
//         </UserInfo>
//       </Card>
//     )}
//   />
// </Container>
