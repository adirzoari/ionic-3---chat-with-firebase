import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { connreq } from './../../models/interfaces/request';
// import providers
import { UserProvider } from './../user/user';
import firebase from 'firebase';



@Injectable()
export class RequestsProvider {
  firereq = firebase.database().ref('/requests');
  userdetails;

  constructor(public userservice: UserProvider, public events: Events) {
  }

  sendrequest(req: connreq){
    var promise = new Promise((resolve,reject)=>{
      this.firereq.child(req.recipient).push({
        sender:req.sender
      }).then(()=>{
        resolve({success:true});
      }).catch((err)=>{
        resolve(err);
      })
    })
    return promise;
  }

  getrequests(){
    let allmyrequests;
    var myrequests =[];
    this.firereq.child(firebase.auth().currentUser.uid).once('value',(snapshot)=>{
      allmyrequests = snapshot.val();
      myrequests = [];
      for(var i in allmyrequests){
        myrequests.push(allmyrequests[i].sender);
      }
      // get all users in the app
      this.userservice.getallusers().then((res)=>{
        var allusers = res; 
        this.userdetails = [];
        // push the user that send me request
        for (var j in myrequests){
          for (var key in allusers){
            if(myrequests[j] == allusers[key].uid){
              this.userdetails.push(allusers[key]);
            }
          }
          this.events.publish('gotrequests');
        }
      })
    
    })
  }

}
