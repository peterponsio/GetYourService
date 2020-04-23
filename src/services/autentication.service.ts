import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

import { AngularFireAuth } from "@angular/fire/auth";

import * as firebase from "firebase";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";
import { Users } from "src/interfaces/users";

@Injectable({
  providedIn: "root",
})
export class AutenticationService {
  constructor(private aut: AngularFireAuth) {}

  ////Interface USERS///

  user: Users = {
    id: "",
    name: "",
    mail: "",
    password: "",
    credits: 0,
    Anouncements: {
      id: "",
      tittle: "",
      categorie: "",
      price: 0,
      description: "",
      Location: "",
      Img: "",
      fav: false,
    },
  };

  //SING UP METHOD USING FIREBASE METHODS IN THIS CASE EMAIL AND PASSWORD AUTH
  async SingUP(user) {
    console.log(user);
  }
}
