import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ItemSliding } from 'ionic-angular';

import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  private categorys: any;


  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController, 
    public navParams: NavParams) {
 
      this.getCategory();
  }

  getCategory(){
    var userRef = firebase.database().ref('categorys/');
    userRef.on('value', (items : any)=> {
      this.categorys = [];
      if(items.val()){
          items.forEach((item)=>{
            this.categorys.push({
              title : item.val().title,
              code : item.val().code,
               });
          });
      }else{
        console.log("no data");
      }
    });
  }

add(){
  let prompt = this.alertCtrl.create({
    title: '새로운 구단 입력',
    message: "구단 정보를 입력하여 주세요.",
    inputs: [
      {
        name: 'title',
        placeholder: 'title'
      },
      {
        name: 'code',
        placeholder: 'code'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          var tmpCategory = {
            title : data.title,
            code : data.code,
          };
        var updates = {};
        updates['/categorys/' + data.code] = tmpCategory;
        firebase.database().ref().update(updates);
        }
      }
    ]
  });
  prompt.present();

}


edit(item: ItemSliding, category){
  item.close();
  
  let prompt = this.alertCtrl.create({
    title: '새로운 구단 입력',
    message: "구단 정보를 입력하여 주세요.",
    inputs: [
      {
        name: 'title',
        placeholder: 'title',
        value: category.title
      },
      {
        name: 'code',
        placeholder: 'code',
        value: category.code
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          var tmpCategory = {
            title : data.title,
            code : data.code,
          };
        var updates = {};
        updates['/categorys/' + data.code] = tmpCategory;
        firebase.database().ref().update(updates);
        }
      }
    ]
  });
  prompt.present();

}

delete(item: ItemSliding, category){
  item.close();
  let confirm = this.alertCtrl.create({
    title: '구단 삭제',
    message: category.title + '카테고리를 삭제하시겠습니까??',
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
          var deleteRef = firebase.database().ref("categorys/" + category.code);
          deleteRef.remove();
         }
      }
    ]
  });
  confirm.present();

}


}
