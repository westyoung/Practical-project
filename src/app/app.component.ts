import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login"; 

import * as firebase from 'firebase'; 

var config = {
  apiKey: "AIzaSyCbU8DRNx0_2QRbTsF6-fFY3iSA-cZNscQ",
  authDomain: "newson-a650e.firebaseapp.com",
  databaseURL: "https://newson-a650e.firebaseio.com",
  projectId: "newson-a650e",
  storageBucket: "newson-a650e.appspot.com",
  messagingSenderId: "1053563170238"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) =>{
      if (user) {
       this.rootPage = HomePage; 
      } else {
       this.rootPage = LoginPage; 
      }
    });
  }
}

