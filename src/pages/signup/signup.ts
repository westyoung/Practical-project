import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'; 
import {LoaderProvider} from '../../providers/loader/loader'; 

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  private account : any = {
    name : '',
    email : '',
    password : ''
  }

  constructor(public navCtrl: NavController, 
    private loader : LoaderProvider, 
    public navParams: NavParams) {
  }

  //자바스크립트는 비동기 방식 (싱글스레드)
  //var a = fires().then(
  //).catch(error){
  //consolelog("Error");
  //}
  //
  // observable(리스트 형태) promise async
  // 

  async signup() {
   this.loader.show(); 
   
   try{
    const result = await firebase.auth().createUserWithEmailAndPassword(this.account.email, this.account.password)
    if(result){
      console.log(result);

  
    var tmpUser = {
      name : this.account.name,
      email : this.account.email,
      password: this.account.password,
      date: moment().format('YYYY-MM-DD'),
      id: result.uid
    };

  // Get a key for a new Post.
  //var newPostKey = firebase.database().ref().child('posts').push().key;


  var updates = {};
  updates['/users/' + result.uid] = tmpUser;
  firebase.database().ref().update(updates);
   
  
  } else{
    console.log("Error");;
  }
   }catch(error){

    console.log(error.Message); 
   }
  
    this.loader.hide(); 
  } 

  // signup() {
  //   this.loader.show(); 
  //   firebase.auth().createUserWithEmailAndPassword(this.account.email, this.account.password)
  //   .then((result) => {
  //     console.log(result); 
  //   })
  //   .catch( (error) => {
  //     var errorMessage = error.message;
  //     console.log(errorMessage); 
  //   });
  //   this.loader.hide(); 
  // }
}
