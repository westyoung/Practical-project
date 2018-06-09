import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ItemSliding, AlertController } from 'ionic-angular';

import {NewsModalPage} from '../news-modal/news-modal'
import { InAppBrowser } from '@ionic-native/in-app-browser';

import * as firebase from 'firebase';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {


  private newses : any;
  private mode: any;

  constructor(public navCtrl: NavController, 
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private iab: InAppBrowser
  ) {

      this.initPage();
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


add(){
  this.mode = "add";
  let profileModal = this.modalCtrl.create(NewsModalPage,{
    mode: 'add',
    news: ''
  });
  profileModal.onDidDismiss(data => {
    console.log("modal data");
    console.log(data);
    this.updateNews(data);

  });
  profileModal.present();
}


edit(item: ItemSliding, news){
  this.mode = "edit";
  item.close();
  let profileModal = this.modalCtrl.create(NewsModalPage,{
    mode : 'edit',
    news :  news
  });
  profileModal.onDidDismiss(data => {
    console.log("modal data");
    console.log(data);
    this.updateNews(data);

  });
  profileModal.present();

}

delete(item: ItemSliding, news){
  item.close();
  let confirm = this.alertCtrl.create({
    title: 'News 삭제',
    message: news.title + '를 삭제하시겠습니까??',
    buttons: [
      {
        text: '아니오',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '예',
        handler: () => {
          var deleteRef = firebase.database().ref("news/" + news.key);
          deleteRef.remove();
         }
      }
    ]
  });
  confirm.present();

  var deleteRef = firebase.database().ref("news/" + news.key);
  deleteRef.remove();

}

updateNews(data){
  if(this.mode ==="add"){
    var key = firebase.database().ref().child('news/').push().key;
    var tmpNews = {
     title : data.title,
     category : data.category,
     source : data.source,
     webUrl : data.webUrl,
     date : moment().format("YYYY-MM-DD:HH:mm:SS"),
     clickCount : 0,
     key : key
    };
  
  var updates = {};
  updates['/news/' + key] = tmpNews;
  firebase.database().ref().update(updates);

  }else{
    tmpNews = {
     title : data.title,
     category : data.category,
     source : data.source,
     webUrl : data.webUrl,
     date : data.date,
     clickCount : data.clickCount,
     key : data.key
    };
  
  updates = {};
  updates['/news/' + data.key] = tmpNews;
  firebase.database().ref().update(updates);
  } 
}


}
