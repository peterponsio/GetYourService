import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
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

@NgModule({
  declarations: [
    AppComponent,
    PopoverPage,
    AddImgPage,
    EditAnnouncementPage,
    FilterPage,
  ],
  entryComponents: [PopoverPage, AddImgPage, EditAnnouncementPage, FilterPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ImagePicker,
    CallNumber,
    AngularFireStorage,
    Geolocation,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
