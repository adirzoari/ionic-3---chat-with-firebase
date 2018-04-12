import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { UserProvider } from './../../providers/user/user';

// import models
import { connreq } from './../../models/interfaces/request';

//import providers
import { RequestsProvider } from './../../providers/requests/requests';
import firebase from 'firebase';
@IonicPage()
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})
export class BuddiesPage {

  newrequest = {} as connreq;
  filteredUsers = [];
  tempArr =[]; // for save the filtered users

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userservice:UserProvider, public alertCtrl: AlertController,
    public requestservice:RequestsProvider) {
      this.userservice.getallusers().then((res:any)=>{
        this.filteredUsers = res;
        this.tempArr = res;
        console.log(this.filteredUsers)

      })
  }

  searchUser(searchbar) {
    this.filteredUsers = this.tempArr;
    var q = searchbar.target.value; // get value from event
    if(q.trim() == ''){
      return;
    }

    this.filteredUsers = this.filteredUsers.filter((v)=>{
      if( (v.displayName.toLowerCase().indexOf(q.toLowerCase()))>-1 ){
            return true;
      }
      else false;
    })
  
  }

  sendreq(recipient){
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid; // id of user we want to send him

    if(this.newrequest.sender == this.newrequest.recipient){
      alert('You are your friend always');
    }
    else{
      let successalert = this.alertCtrl.create({
        title: 'Request sent',
        subTitle:' Your request was to '+ recipient.displayName,
        buttons:['Ok']
      })
      this.requestservice.sendrequest(this.newrequest).then((req:any)=>{
        if(req.success){
          successalert.present();
          // we want to remove the user we already sent him request for now sent some times
          let sentuser = this.filteredUsers.indexOf(recipient);
          this.filteredUsers.splice(sentuser,1);
        }

      }).catch((err)=>{
        alert(err);
      })
    }
  }

 



}
