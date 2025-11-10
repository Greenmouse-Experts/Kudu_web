/* eslint-disable no-undef */

// Load Firebase compat scripts (required in SW)
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js",
);

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyCmaKk8gia1QXolLCCoLQBcQkmai0RzQFI",
  authDomain: "kudumart-c0b78.firebaseapp.com",
  projectId: "kudumart-c0b78",
  storageBucket: "kudumart-c0b78.firebasestorage.app",
  messagingSenderId: "142182317218",
  appId: "1:142182317218:web:c03e5138f070a889c6abfb",
  measurementId: "G-3VN1RL0PE5",
});

// Retrieve messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );

  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: "/icon.png", // optional icon
    data: payload.data, // Include custom data in the notification
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  console.log("[firebase-messaging-sw.js] Notification clicked", event);
  event.notification.close(); // Close the notification

  const clickedNotificationData = event.notification.data;
  if (clickedNotificationData && clickedNotificationData.url) {
    event.waitUntil(clients.openWindow(clickedNotificationData.url));
  } else {
    // Fallback if no URL is provided, open a default page or the app's main page
    event.waitUntil(clients.openWindow("/"));
  }
});
