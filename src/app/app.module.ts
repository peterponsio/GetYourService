import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

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
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    Camera,
    DatePipe,
    ImagePicker,
    AngularFireStorage,
    CallNumber,
    EmailComposer,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
