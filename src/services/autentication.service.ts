import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

import { AngularFireAuth } from "@angular/fire/auth";

import * as firebase from "firebase";

import { Router } from "@angular/router";
import { Users } from "src/interfaces/users";
import { ManageDataService } from "./manage-data.service";
import { VisualService } from "./visual.service";

@Injectable({
  providedIn: "root",
})
export class AutenticationService {
  constructor(
    private aut: AngularFireAuth,
    private manage: ManageDataService,
    private router: Router,
    private db: AngularFirestore
  ) {}

  ////Interface USERS///

  user: Users = {
    id: "",
    name: "",
    mail: "",
    password: "",
    credits: 0,
    darkMode: false,
  };
  newUser: Users = {
    id: "",
    name: "",
    mail: "",
    password: "",
    credits: 0,
    darkMode: false,
  };

  DarkMode: Users = {
    id: "",
    name: "",
    mail: "",
    password: "",
    credits: 0,
    darkMode: false,
  };

  //SING UP METHOD USING FIREBASE METHODS IN THIS CASE EMAIL AND PASSWORD AUTH
  async SingUP(user) {
    return await this.aut.auth
      .createUserWithEmailAndPassword(user.mail, user.password)
      .then((res) => {
        sessionStorage.setItem("user", res.user.uid);
        sessionStorage.setItem("userInfo", JSON.stringify(user));
        sessionStorage.setItem("user_credential", JSON.stringify(res));
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
          data.valueChanges().subscribe((res: Users) => {
            sessionStorage.setItem("userInfo", JSON.stringify(res));
            sessionStorage.setItem("user_credential", JSON.stringify(res));
            if (res.darkMode == true) {
              let body = document.getElementById("body");
              body.classList.add("dark");
            } else {
              let body = document.getElementById("body");
              body.classList.remove("dark");
            }
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

    //REmove dark mode
    let body = document.getElementById("body");
    body.classList.remove("dark");
  }

  async LogInAnonyous() {
    this.aut.auth.signInAnonymously().then((res) => {
      sessionStorage.setItem("anonymous", res.user.uid);
    });
  }

  /////Change password

  async ChangePassword(newPass: string) {
    var user = firebase.auth().currentUser;
    user.updatePassword(newPass).catch((err) => {
      alert("Sensitive Operation, log in again");
    });
  }

  ///Change Mail

  async ChangeUserAndMail(userName: string, mail: string) {
    var user = firebase.auth().currentUser;
    user.updateEmail(mail).catch((err) => {
      alert("Sensitive Operation, log in again");
    });
    let userLog = JSON.parse(sessionStorage.getItem("userInfo"));
    userLog.name = userName;
    userLog.mail = mail;
    this.db.doc("Users/" + sessionStorage.getItem("user")).update(userLog);
  }

  ////Set DARK MODE

  async SetDarkModeToUser() {
    let user = JSON.parse(sessionStorage.getItem("userInfo"));
    this.DarkMode.darkMode = true;
    this.DarkMode.credits = 0;
    this.DarkMode.id = sessionStorage.getItem("user");
    this.DarkMode.mail = user.mail;
    this.DarkMode.name = user.name;
    this.db
      .doc("Users/" + sessionStorage.getItem("user"))
      .update(this.DarkMode);
  }

  ////UNSET DARK MODE

  async UnSETDarkModeToUser() {
    let user = JSON.parse(sessionStorage.getItem("userInfo"));
    this.DarkMode.darkMode = false;
    this.DarkMode.credits = 0;
    this.DarkMode.id = sessionStorage.getItem("user");
    this.DarkMode.mail = user.mail;
    this.DarkMode.name = user.name;

    this.db
      .doc("Users/" + sessionStorage.getItem("user"))
      .update(this.DarkMode);
  }

  async DeleteUser() {
    var user = firebase.auth().currentUser;

    user
      .delete()
      .then(function () {})
      .catch(function (error) {
        alert("Sensitive Operation, log in again");
      });
  }

  async Reautenticate(pass: string) {
    var user = firebase.auth().currentUser;

    var datos = JSON.parse(sessionStorage.getItem("userInfo"));

    var credentials = firebase.auth.EmailAuthProvider.credential(
      datos.mail,
      pass
    );

    let cambio = user
      .reauthenticateWithCredential(credentials)
      .then(function () {
        return true;
      })
      .catch(function (error) {
        // An error happened.
      });
    return cambio;
  }
}
