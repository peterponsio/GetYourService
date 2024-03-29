import { Injectable } from "@angular/core";

import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { Announcements } from "src/interfaces/announcements";

// import {
//   GaoDeLocation,
//   PositionOptions,
//   LocationModeEnum,
//   LocationProtocolEnum,
//   DesiredAccuracyEnum,
//   PositionRes,
// } from "cordova-plugin-gaodelocation-chenyu/ionic/gao-de-location/ngx";

import { ImagePicker } from "@ionic-native/image-picker/ngx";

@Injectable({
  providedIn: "root",
})
export class NativeToolsService {
  constructor(
    // private imagePicker: ImagePicker,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private callNumber: CallNumber,
    private imagePicker: ImagePicker // private gaoDeLocation: GaoDeLocation
  ) {}

  optionsPicker = {
    // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
    // selection of a single image, the plugin will return it.
    maximumImagesCount: 1,

    // max width and height to allow the images to be.  Will keep aspect
    // ratio no matter what.  So if both are 800, the returned image
    // will be at most 800 pixels wide and 800 pixels tall.  If the width is
    // 800 and height 0 the image will be 800 pixels wide if the source
    // is at least that wide.
    width: 300,
    height: 300,

    // quality of resized image, defaults to 100
    quality: 100,

    // output type, defaults to FILE_URIs.
    // available options are
    // window.imagePicker.OutputType.FILE_URI (0) or
    // window.imagePicker.OutputType.BASE64_STRING (1)
    outputType: 1,
  };
  // positionOptions: PositionOptions = {
  //   androidOption: {
  //     locationMode: LocationModeEnum.Hight_Accuracy,
  //     gpsFirst: false,
  //     HttpTimeOut: 30000,
  //     interval: 2000,
  //     needAddress: true,
  //     onceLocation: false,
  //     onceLocationLatest: false,
  //     locationProtocol: LocationProtocolEnum.HTTP,
  //     sensorEnable: false,
  //     wifiScan: true,
  //     locationCacheEnable: true,
  //   },
  //   iosOption: {
  //     desiredAccuracy: DesiredAccuracyEnum.kCLLocationAccuracyBest,
  //     pausesLocationUpdatesAutomatically: "YES",
  //     allowsBackgroundLocationUpdates: "NO",
  //     locationTimeout: 10,
  //     reGeocodeTimeout: 5,
  //   },
  // };

  OpenGallery(item: Announcements) {
    this.imagePicker.getPictures(this.optionsPicker).then(
      async (results) => {
        let base64Image = "data:image/jpeg;base64," + results;

        alert("despues del base 64");

        let ruta = this.db.createId();

        let route = `/${ruta}`;
        const fileRef = this.storage.ref(route);

        alert(route);
        const task = fileRef.putString(base64Image, "data_url");
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                item.Img = url;

                //Update IMG IN THE ANNOUNCDMENTS OF USERS
                this.db
                  .doc(
                    "/Users/" +
                      sessionStorage.getItem("user") +
                      "/Announcements/" +
                      item.id
                  )
                  .update(item);
                //////Update IMG IN GENEREAL ANNOUNCEMENTS
                this.db.doc("/Announcements/" + item.id).update(item);
              });
            })
          )
          .subscribe();
      },
      (err) => {
        alert(err);
      }
    );
  }
  ///CAll announcement user

  CallClient(item: Announcements) {
    this.callNumber
      .callNumber(item.userPhone, true)
      .then((res) => {})
      .catch((err) => console.log("Error launching dialer", err));
  }

  // Get Current Location of user //////

  async GetCurrentLocation() {
    // this.gaoDeLocation
    //   .getCurrentPosition(this.positionOptions)
    //   .then((res) => {
    //     alert("ENTRO EN CURRENT");
    //     alert(res.city);
    //     return res.city;
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
  }
}
