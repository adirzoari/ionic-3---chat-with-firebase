import { Component, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

// import providers
import { ImghandlerProvider } from './../../providers/imghandler/imghandler';
import { UserProvider } from './../../providers/user/user';
@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {
  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  moveon = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public imgservice: ImghandlerProvider,
  public zone:NgZone,public userservice: UserProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilepicPage');
  }

  chooseImage(){
    let loader = this.loadingCtrl.create({
      content:'Please wait'
    })
    loader.present();
    this.imgservice.uploadimage().then((uploadedurl:any) =>{
      loader.dismiss();
      this.zone.run(()=>{
        this.imgurl = uploadedurl;
        this.moveon = false;
        
      })
    })

  }

  updateProceed(){
    let loader = this.loadingCtrl.create({
      content:'Please wait'
    })
    loader.present();
    this.userservice.updateImage(this.imgurl).then((res:any)=>{
      loader.dismiss();
      if(res.success){
        this.navCtrl.setRoot('TabsPage');
      }
      else{
        alert(res);
      }
    })
  }

  skipStep(){
    this.navCtrl.setRoot('TabsPage');
  }

}
