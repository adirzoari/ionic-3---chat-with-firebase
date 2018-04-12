import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import interfaces
import { usercreds } from './../../models/interfaces/usercreds';

// import providers
import { AuthProvider } from './../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
}) 
export class LoginPage {

  // declare usercreds object
  credentials = {} as usercreds;

  constructor(public navCtrl: NavController, public navParams: NavParams, public authservice: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin(){
    this.authservice.login(this.credentials).then((res:any)=>{
      if(!res.code) // if not error
        this.navCtrl.setRoot('ProfilepicPage');
      else
        alert(res);

    })

  }

  signup(){
    this.navCtrl.push('SignupPage')
  }
  
  passwordreset(){
    this.navCtrl.push('PasswordresetPage')
  }

}
