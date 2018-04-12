import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {

  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public userservice:UserProvider, public alertCtrl: AlertController) {
  }


  reset(){
    let alert = this.alertCtrl.create({
      buttons:['Ok']
    });
    alert.present();
    this.userservice.passwordReset(this.email).then((res:any)=>{
      if(res.success){
        alert.setTitle('Email Sent');
        alert.setSubTitle('Please follow the instruction in the email to reset your password');
      }
    }).catch((err)=>{
      alert.setTitle('Failed');
      alert.setSubTitle(err);
    })
  }
  goback(){
    this.navCtrl.setRoot('LoginPage');
  }

}
