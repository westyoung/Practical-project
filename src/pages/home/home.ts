import { Component } from '@angular/core';
import { NavController ,AlertController} from 'ionic-angular';

import {ManagerPage} from '../manager/manager'


import { IonicPage, NavParams, ModalController, ItemSliding} from 'ionic-angular';

import {NewsModalPage} from '../news-modal/news-modal'
import { InAppBrowser } from '@ionic-native/in-app-browser';

import * as firebase from 'firebase';
import * as moment from 'moment';
import { setTimeout } from 'timers';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private userName : any; 
  private userEmail : any;
  private userId : any; 

  private masterEmail : any = "master@gmail.com";
  private masterSwitch: any;

  private userProfile = {
    name : '',
    email : '',
    password: '',
    date: '',
    id:''
  }

  private newses : any;
  private mode: any;

  constructor(public navCtrl: NavController, 
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private iab: InAppBrowser) {
      this.masterSwitch = false;
      this.getUserProfile();
  

  }

  async doRefresh(refresher) {

    try{
      var newsRef = firebase.database().ref("news/");
      const items = await newsRef.once("value");
      this.newses = [];

      if(items){
        items.forEach((item)=>{
          this.newses.push({
            title : item.val().title,
            category : item.val().category,
            source: item.val().source,
            webUrl: item.val().webUrl,
            date: item.val().date,
            clickCount: item.val().clickCount,
            key: item.val().key
          })
        })
      }else{
        console.log("no news data");
      }
    }catch(error){
        console.log(error.message);
    }
  
    setTimeout(()=>{
      console.log('Async operation has ended');
      refresher.complete();
    },2000);

  }
  

search(){
    let prompt = this.alertCtrl.create({
    title: 'Search',
    message: "검색 정보 입력",
    inputs: [
      {
        name: 'keyword',
        placeholder: 'keyword here...',
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '검색',
        handler: data => {
          this.searchNews(data.keyword);
        }
       }
    ]
  });
  prompt.present();

  }

searchNews(keyword){

    var tmpNews = [];
    var newsRef = firebase.database().ref("news/");
    newsRef.once('value',(items: any)=>{
      if(items.val()){
        items.forEach((item)=>{
          tmpNews.push({
          title : item.val().title,
          category : item.val().category,
          source : item.val().source,
          webUrl : item.val().webUrl,
          date : item.val().date,
          clickCount : item.val().clickCount,
          key : item.val().key

          });
        });
      }else{
        console.log("no news data");
      }
    }).then(()=>{
    this.newses = [];
    if (keyword && keyword.trim() != '') {
      this.newses = tmpNews.filter((news) => {
        return (news.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
      })
  }
    }).catch((error)=>{
      console.log(error.message);
    });

}
  
clickNews(news){
  const browser = this.iab.create(news.webUrl);
}

async initPage(){
  try{
    var newsRef = firebase.database().ref("news/");
    const items = await newsRef.once("value");
    this.newses = [];
    if(items){
      items.forEach((item)=>{
        this.newses.push({
          title : item.val().title,
          category : item.val().category,
          source : item.val().source,
          webUrl : item.val().webUrl,
          date : item.val().date,
          clickCount : item.val().clickCount,
          key : item.val().key

        })
    })
    }else{
      console.log("no news data");
    }
  }catch(error){
    console.log(error.message);
  }

}


  gotoManagerPage(){
    this.navCtrl.push(ManagerPage);
  }



  async getUserProfile(){

    try{
      const userId =firebase.auth().currentUser.uid;
      if(userId){
        var userRef = firebase.database().ref("users/" + userId);
        userRef.once('value', (item: any)=> {
          if(item.val()){
            this.userProfile = {
              name : item.val().name,
              email : item.val().email,
              password: item.val().password,
              date: item.val().date,
              id: item.val().id
            }

          }else{
            console.log("no data");
          }
        }).then(()=>{
            console.log(this.userProfile);
            if(this.masterEmail === this.userProfile.email){
              this.masterSwitch = true;
            }else{
              this.masterSwitch = false;
            }
            this.initPage();
        }).catch((error)=>{
            console.log(error.message)
        });
      }

    }catch(error){
      console.log(error.message);
    }

  }

  logout(){

    let confirm = this.alertCtrl.create({
      title: 'Log out ',
      message: 'log out 하시겠습니까 ?',
      buttons: [
        {
          text: '아니오',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '예',
          handler: () => {
            firebase.auth().signOut().then(() => {
              console.log("log out");
            }).catch( (error) => {
              console.log("log out errror");
            });
          }
        }
      ]
    });
    confirm.present();
  }

}
