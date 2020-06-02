import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
<<<<<<< HEAD
import { FormsModule } from "@angular/forms";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { CallNumber } from "@ionic-native/call-number/ngx";

import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { EmailComposer } from "@ionic-native/email-composer/ngx";
import { firebaseConfig } from "../../src/app/consts/firebaseConf";
import { PopoverPage } from "./popover/popover.page";
import { PopoverPageModule } from "./popover/popover.module";
import { AddImgPage } from "./add-img/add-img.page";
import { AngularFireStorage } from "@angular/fire/storage";
import { from } from "rxjs";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { EditAnnouncementPage } from "./edit-announcement/edit-announcement.page";
import { FilterPage } from "./filter/filter.page";
import { DatePipe } from "@angular/common";
import { TickedsPage } from "./tickeds/tickeds.page";
import { EmailSupportPage } from "./email-support/email-support.page";
import { GoogleMap } from "@ionic-native/google-maps/ngx";
import { ErrorInformsPage } from "./error-informs/error-informs.page";
import { UserIdeasPage } from "./user-ideas/user-ideas.page";

import { ModalEditUserPage } from "./modal-edit-user/modal-edit-user.page";
import { GaoDeLocation } from "cordova-plugin-gaodelocation-chenyu/ionic/gao-de-location/ngx";
=======

import {
  IonicModule,
  IonicRouteStrategy,
  ModalController,
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { AngularFireModule } from "@angular/fire";

import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AngularFireAuthModule } from "@angular/fire/auth";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import { AngularFireStorage } from "@angular/fire/storage";
import { from } from "rxjs";
import { firebaseConfig } from "src/environments/environment";
import { DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { PopoverPage } from "./popover/popover.page";
import { AddImgPage } from "./add-img/add-img.page";
import { EditAnnouncementPage } from "./edit-announcement/edit-announcement.page";
import { FilterPage } from "./filter/filter.page";
import { TickedsPage } from "./tickeds/tickeds.page";
import { EmailSupportPage } from "./email-support/email-support.page";
import { ErrorInformsPage } from "./error-informs/error-informs.page";
import { UserIdeasPage } from "./user-ideas/user-ideas.page";
import { ModalEditUserPage } from "./modal-edit-user/modal-edit-user.page";
import { CallNumber } from "@ionic-native/call-number/ngx";
import { EmailComposer } from "@ionic-native/email-composer/ngx";
>>>>>>> Add picture ok

@NgModule({
  declarations: [
    AppComponent,
    PopoverPage,
    AddImgPage,
    EditAnnouncementPage,
    FilterPage,
    TickedsPage,
    EmailSupportPage,
    ErrorInformsPage,
    UserIdeasPage,
    ModalEditUserPage,
  ],
  entryComponents: [
<<<<<<< HEAD
=======
    AppComponent,
>>>>>>> Add picture ok
    PopoverPage,
    AddImgPage,
    EditAnnouncementPage,
    FilterPage,
    TickedsPage,
    EmailSupportPage,
    ErrorInformsPage,
    UserIdeasPage,
    ModalEditUserPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
<<<<<<< HEAD
    FormsModule,
=======
>>>>>>> Add picture ok
  ],
  providers: [
    StatusBar,
    SplashScreen,
<<<<<<< HEAD
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
=======
    Facebook,
    Camera,
    DatePipe,
>>>>>>> Add picture ok
    ImagePicker,

    CallNumber,
    AngularFireStorage,
<<<<<<< HEAD
    Geolocation,
    DatePipe,
    EmailComposer,
=======
    CallNumber,
    EmailComposer,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
>>>>>>> Add picture ok
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
