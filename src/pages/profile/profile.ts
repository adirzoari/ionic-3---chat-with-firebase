import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

// import providers
import { UserProvider } from './../../providers/user/user';
import { AuthProvider } from './../../providers/auth/auth';
import { ImghandlerProvider } from './../../providers/imghandler/imghandler';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  avatar: string;
  displayName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public userservice:UserProvider, public zone: NgZone, public alertCtrl: AlertController,
  public authservice: AuthProvider,public imghandler:ImghandlerProvider) {
  }

  ionViewWillEnter(){
     this.loaduserdetails();
  }

  loaduserdetails(){
    this.userservice.getuserdetails().then((res: any)=>{
      this.displayName = res.displayName;
      this.zone.run(() =>{
        this.avatar = res.photoURL;
      })

    })

  }

editImage(){
  let statusalert = this.alertCtrl.create({
    buttons: ['okay']
  });
  this.imghandler.uploadimage().then((urlImage:any)=>{
    this.zone.run(()=>{
      this.avatar = urlImage; 
    })
    this.userservice.updateImage(urlImage).then((res:any)=>{
      if(res.success){
        statusalert.setTitle('Updated');
        statusalert.setSubTitle('Your profile pic has been changed successfully!!!');
        statusalert.present();
        this.zone.run(()=>{
          this.avatar = urlImage;
        }) 
      }
    }).catch((err)=>{
      statusalert.setTitle('Failed');
      statusalert.setSubTitle('Your profile pic was not changed');
      statusalert.present();
    })
  })

}


  editName(){
    console.log("asdsa");
    let statusalert = this.alertCtrl.create({
      buttons:['okay']
    });
    let alert = this.alertCtrl.create({
      title:'Edit Nickname',
      inputs:[{
        name: 'nickname',
        placeholder: 'Nick Name'
      }],
      buttons:[{
        text: 'Cancel',
        role: 'cancel',
        handler: data =>{

        }
      },
      {
        text: 'Edit',
        handler: data =>{
          if(data.nickname){ // update the nickname
            this.userservice.updatedisplayname(data.nickname).then((res:any)=>{
              if(res.success){
                statusalert.setTitle('Updated');
                statusalert.setSubTitle('Your nickname has been changed successfully!!!');
                statusalert.present();
                this.zone.run(()=>{
                  this.displayName = data.nickname;
                })
              }
              else{
                statusalert.setTitle('Failed');
                statusalert.setSubTitle('Your nickname was not changed');
                statusalert.present();
                
              }
            })

          }
        }
      }
    ]
    });

    alert.present();

  }

  logOut(){
    this.authservice.logout().then(()=>{
      // console.log(this.navCtrl.parent);
      // console.log(this.navCtrl.parent.parent);
      this.navCtrl.parent.parent.setRoot('LoginPage');
    })

  }

}
