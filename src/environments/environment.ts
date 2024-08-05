export const environment = {
  production: true,
  "fireStoreApi": "https://firestore.googleapis.com/v1/projects/home-services-81fe7/databases/(default)/documents/",
  firebase: {
    apiKey: "AIzaSyCKqVNEDWytpskzl3bCYIOeKjckd7gjYAg",
    authDomain: "home-services-81fe7.firebaseapp.com",
    projectId: "home-services-81fe7",
    storageBucket: "home-services-81fe7.appspot.com",
    messagingSenderId: "374154500815",
    appId: "1:374154500815:web:59c6d3884eb4878c5cb5ba",
    measurementId: "G-Q3SR91KHSG"
  },
  payloadUploadPath: "small-moving/payloads/",
  companyEmail: "lychee.home.service@gmail.com",
  companyName: "Lychee Home Service",
  firebaseConstants: {
    emailCollection: 'email',
    orderCollection: 'moving_orders',
    residentialTemplate: 'moving_summary',
    smallMovingTemplate: 'small_moving_summary',
  }
};
