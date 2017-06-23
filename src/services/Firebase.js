import * as firebase from 'firebase';
//let app1 = new Firebase("https://chatapplication-1d367.firebaseio.com");
const firebaseConfig = {
  apiKey: "AIzaSyA49gIzAT9IIfzHq5Kz5RvtAqnjoBCliY4",
  authDomain: "chatapplication-1d367.firebaseapp.com",
  databaseURL: "https://chatapplication-1d367.firebaseio.com",
  storageBucket: "chatapplication-1d367.appspot.com"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);
