import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

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

@NgModule({
  declarations: [AppComponent, PopoverPage, AddImgPage],
  entryComponents: [PopoverPage, AddImgPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ImagePicker,
    CallNumber,
    AngularFireStorage,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
