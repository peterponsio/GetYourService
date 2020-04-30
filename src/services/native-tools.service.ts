import { Injectable } from "@angular/core";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NativeToolsService {
  constructor(
    private imagePicker: ImagePicker,
    private storage: AngularFireStorage,
    private db: AngularFirestore
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

  OpenGallery() {
    this.imagePicker.getPictures(this.optionsPicker).then(
      async (results) => {
        let base64Image = "data:image/jpeg;base64," + results;

        let ruta = this.db.createId();
        let route = `/${ruta}`;
        const fileRef = this.storage.ref(route);
        const task = fileRef.putString(base64Image, "data_url");
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                localStorage.setItem("url", url);
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
}
