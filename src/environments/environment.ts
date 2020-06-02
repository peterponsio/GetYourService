<<<<<<< HEAD
=======
import * as firebase from "firebase";

>>>>>>> Add picture ok
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

<<<<<<< HEAD
=======
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyANrD-2fjgIopwlIno2lQ8FotuqHOeaJdA",
  authDomain: "g-service-dc873.app.com",
  databaseURL: "https://g-service-dc873.io.com",
  projectId: "g-service-dc873",
  storageBucket: "g-service-dc873.appspot.com",
  messagingSenderId: "173984271064",
  appId: "1:173984271064:web:158de884a05fbf2d6525ad",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

>>>>>>> Add picture ok
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
