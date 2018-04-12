import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  chatUsersRefDB = firebase.database().ref('/chatusers');
  constructor(public afAuth: AngularFireAuth) {
  }

  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.afAuth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: ''
        }).then(() => {
          this.chatUsersRefDB.child(this.afAuth.auth.currentUser.uid).set({
            uid: this.afAuth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: 'https://scontent.fhfa1-2.fna.fbcdn.net/v/t1.0-9/16265287_10154724224870210_6888063780283190937_n.jpg?oh=a2433b21eb501a9a40faaa43504b7f64&oe=5A3B1CD7'
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err)
          })
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  passwordReset(email) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  updateImage(imageurl){
    var promise = new Promise((resolve,reject)=>{
      this.afAuth.auth.currentUser.updateProfile({
        displayName: this.afAuth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(()=>{
        firebase.database().ref('/users/'+firebase.auth().currentUser.uid).update({
          displayName: this.afAuth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid:firebase.auth().currentUser.uid
        }).then(()=>{
          resolve({success:true});
        }).catch((err)=>{
          reject(err);
        })
      }).catch((err)=>{
        reject(err);
      })
    })
    return promise;
  }

  getuserdetails(){
      var promise = new Promise((resolve,reject)=>{
        firebase.database().ref('/users/'+firebase.auth().currentUser.uid).once('value',(snapshot)=>{
          console.log(snapshot.val())
          resolve(snapshot.val())
        }).catch((err)=>{
          reject(err);
        })
      })
      return promise;
    
  }

  updatedisplayname(newname){
    // update the nickname in two places
    var promise = new Promise((resolve,reject)=>{
      this.afAuth.auth.currentUser.updateProfile({
        displayName: newname,
        photoURL:this.afAuth.auth.currentUser.photoURL
      }).then(()=>{
        this.chatUsersRefDB.child(firebase.auth().currentUser.uid).update({
          displayName: newname,
          photoURL: this.afAuth.auth.currentUser.photoURL,
          uid: this.afAuth.auth.currentUser.uid
        }).then(()=>{
          resolve({success: true})
        }).catch((err)=>{
          reject(err);
        }).catch((err)=>{
          reject(err)
        })
      })
    });
    return promise; 
  }

  getallusers(){
    var promise = new Promise((resolve,reject)=>{
      this.chatUsersRefDB.orderByChild('uid').once('value',(snapshot)=>{
        let userdata = snapshot.val();
        console.log("all usersdata:",userdata);
        let temparr = [];
        for(var key in userdata){
          console.log("key:",key);
          console.log("userdata[key]:",userdata[key]);
          temparr.push(userdata[key]);

        }
        resolve(temparr)
      }).catch((err)=>{
        reject(err);
      })
    })
    return promise;
  }
  
}
