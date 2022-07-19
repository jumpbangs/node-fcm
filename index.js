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
  // notification: {
  //   body: "Firebase Cloud Message Body",
  //   title: "Firebase Cloud Message Title",
  // },
  data: {
    urlLink: "",
    notificationType: "local",
    liveStreamReminderTime: "12345567",
  },
  topic: "push-notification-reminder",
  // token:
  //   "cAfOVkfLRbSBauvLXr88wB:APA91bGN26BeXFvgdSu6SVGZUzflzlDaCtv1cGfYDG_hxACnn6zp-AkFoerA7doRc9i78d30clzY8yt16qvlmQUrPH2c74Vs83YoyHoiG4J32P3JKpw3vfn_FIwd3oMuk8Sp8jfWAyKW",
};

const sendPushNotification = async (type, reminderTime) => {
  const fcmMessage = {
    data: {
      notificationType: type,
      liveStreamReminderTime: reminderTime,
    },
    topic: "Live stream notification",
  };

  try {
    const response = await admin.messaging().send(fcmMessage);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const sendSilentPushNotification = async (message) => {
  try {
    const response = await admin.messaging().send(message);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

APP.use(cors());

APP.post("/push", (req, res) => {
  const type = req.query?.type;
  const reminderTime = req.query?.reminderTime;

  console.log(type, reminderTime);
  sendPushNotification(type, reminderTime);
  res.send("Sending push notification");
});

APP.get("/push-silent", (req, res) => {
  sendSilentPushNotification(fcmMessage);
  console.log(req);
  res.send("Sending silent push notification");
});

APP.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
