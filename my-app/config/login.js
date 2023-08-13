import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Prompt } from "expo-auth-session";
import axios from "axios";

export default function auth({
  selected,
  setSelected,
  userInfo,
  setUserInfo,
  message,
  setMessage,
  accessToken,
  setAccessToken,
}) {
  auth(
    selected,
    setSelected,
    userInfo,
    setUserInfo,
    message,
    setMessage,
    accessToken,
    setAccessToken
  );
}
