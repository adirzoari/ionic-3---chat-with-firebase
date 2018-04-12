import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import firebase from 'firebase';
import { Camera, CameraOptions, } from '@ionic-native/camera';

@Injectable()
export class ImghandlerProvider {
  nativepath: any;
  firestore = firebase.storage();
  
  constructor(public filechooser: FileChooser,private camera: Camera) {
  }
  uploadimage() {
    var promise = new Promise((resolve, reject) => {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true
      }).then((imagedata) => {
        firebase.storage().ref('/profileimages').child(firebase.auth().currentUser.uid)
          .putString(imagedata, 'base64', {contentType: 'image/png'})
          .then(savePic => {
            resolve(savePic.downloadURL);
          }).catch((err) => {
            reject(err);
          });
      });
    });
    return promise;
  }
}