importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDtED7qz9jHmwSkjpuF-vqPzG8KmAChPLY",
  authDomain: "zipsy-f473d.firebaseapp.com",
  projectId: "zipsy-f473d",
  storageBucket: "zipsy-f473d.firebasestorage.app",
  messagingSenderId: "777775426182",
  appId: "1:777775426182:web:05b963ed454904c84a3f07",
  measurementId: "G-S1MPNG1FDT"
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
