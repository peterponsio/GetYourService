import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

import { AngularFireAuth } from "@angular/fire/auth";

import * as firebase from "firebase";

import { Router } from "@angular/router";
import { Users } from "src/interfaces/users";
import { ManageDataService } from "./manage-data.service";

@Injectable({
  providedIn: "root",
})
export class AutenticationService {
  constructor(
    private aut: AngularFireAuth,
    private manage: ManageDataService,
    private router: Router
  ) {}

  ////Interface USERS///

  user: Users = {
    id: "",
    name: "",
    mail: "",
    password: "",
    credits: 0,
  };
  newUser: Users = {
    id: "",
    name: "",
    mail: "",
    password: "",
    credits: 0,
  };

  //SING UP METHOD USING FIREBASE METHODS IN THIS CASE EMAIL AND PASSWORD AUTH
  async SingUP(user) {
    return await this.aut.auth
      .createUserWithEmailAndPassword(user.mail, user.password)
      .then((res) => {
        sessionStorage.setItem("user", res.user.uid);
        sessionStorage.setItem("userInfo", JSON.stringify(user));
        this.newUser.id = res.user.uid;
        this.newUser.mail = user.mail;
        this.newUser.name = user.name;
        this.newUser.credits = user.credits;

        this.manage.CreateNewUser(this.newUser);
      })
      .catch((err) => {
        throw err;
      });
  }

  //SING UP METHOD USING FIREBASE METHODS IN THIS CASE EMAIL AND PASSWORD AUTH
  async SingIn(user) {
    return await this.aut.auth
      .signInWithEmailAndPassword(user.mail, user.password)
      .then((res) => {
        sessionStorage.setItem("user", res.user.uid);
        this.manage.getUserLogedData(res.user.uid).then((data) => {
          data.valueChanges().subscribe((res) => {
            sessionStorage.setItem("userInfo", JSON.stringify(res));
          });
        });
      })
      .catch((err) => {
        throw err;
      });
  }
  ///////Forgot Password method using email for send a reset /////////////////////
  async Forgot(data) {
    this.aut.auth
      .sendPasswordResetEmail(data)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  /////// CLose session/////////////////////////

  async CloseSesion() {
    this.aut.auth.signOut();

    sessionStorage.clear();

    sessionStorage.removeItem("user");

    this.router.navigateByUrl("/");
  }
}
