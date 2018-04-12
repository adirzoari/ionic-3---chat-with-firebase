import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';

// import models
import { connreq } from './../../models/interfaces/request';

// import providers
import { RequestsProvider } from './../../providers/requests/requests';

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  myrequests;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public requestservice: RequestsProvider,public events: Events) {
  }

  ionViewCanEnter(){
    this.getMyRequests();
    this.events.subscribe('gotrequests',()=>{
      this.myrequests = [];
      this.myrequests  = this.requestservice.userdetails;

    })
  }

  ionViewDidLeave(){
    this.events.unsubscribe('gotrequests');   
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }

  addBuddy(){
    this.navCtrl.push('BuddiesPage');

  }

  getMyRequests(){


  }

}
