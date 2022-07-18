// Port Settings
const PORT = "8080";

import cors from "cors";
import express from "express";
import admin from "firebase-admin";

const GOOGLE_SDK_CREDENTIALS = "./jp-app-firebase-adminsdk.json";
admin.initializeApp({
  credential: admin.credential.cert(GOOGLE_SDK_CREDENTIALS),
});

const APP = express();

const fcmMessage = {
  //   apns: {
  //     payload: {
  //       aps: {
  //         "content-available": 1,
  //         alert: "",
  //       },
  //     },
  //   },
  //   notification: {
  //     title: "Firebase Notification",
  //     body: "Testing for Firebase Notification",
  //   },
  data: {
    notificationType: "local",
    liveStreamReminderTime: "12345567",
    key3: "one_more",
  },
  token:
    "cAfOVkfLRbSBauvLXr88wB:APA91bGN26BeXFvgdSu6SVGZUzflzlDaCtv1cGfYDG_hxACnn6zp-AkFoerA7doRc9i78d30clzY8yt16qvlmQUrPH2c74Vs83YoyHoiG4J32P3JKpw3vfn_FIwd3oMuk8Sp8jfWAyKW",
};

const sendPushNotification = async (message) => {
  try {
    const response = await admin.messaging().send(message);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

APP.use(cors());

APP.get("/", (req, res) => {
  res.send("Sending push notification");
  sendPushNotification(fcmMessage);
});

APP.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
