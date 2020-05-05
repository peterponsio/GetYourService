import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Users } from "src/interfaces/users";
import { AutenticationService } from "src/services/autentication.service";
import { VisualService } from "src/services/visual.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  inputMail: String;
  inputPassword: String;

  inputNameInvalid: Boolean;
  inputMailInvalid: Boolean;
  inputPasswordInvalid: Boolean;

  seePasswd: boolean;
  type: string;

  constructor(
    private navigate: Router,
    private autentication: AutenticationService,
    private visual: VisualService
  ) {
    this.inputMailInvalid = false;
    this.inputPasswordInvalid = false;
    this.seePasswd = false;
    this.type = "password";
  }

  ngOnInit() {}

  ////Interface USERS///

  user: Users = {
    id: "",
    name: "",
    mail: "",
    password: "",
    credits: 0,
  };

  onClickSingIn() {
    if (
      this.inputMail !== undefined &&
      this.inputMail !== null &&
      this.inputMail !== "" &&
      this.inputMail.includes("@") &&
      this.inputMail.includes(".") &&
      this.inputPassword !== "" &&
      this.inputPassword !== undefined &&
      this.inputPassword.length >= 6
    ) {
      this.user.name = this.user.mail = this.inputMail;
      this.user.password = this.inputPassword;
      this.autentication
        .SingIn(this.user)
        .then((res) => {
          this.navigate.navigateByUrl("/tabs");
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (
      this.inputMail === undefined ||
      this.inputMail === null ||
      this.inputMail === "" ||
      !this.inputMail.includes("@") ||
      !this.inputMail.includes(".")
    ) {
      this.inputMailInvalid = true;
      this.inputPasswordInvalid = false;
    } else if (
      this.inputPassword === "" ||
      this.inputPassword === undefined ||
      this.inputPassword.length < 6
    ) {
      this.inputMailInvalid = false;
      this.inputPasswordInvalid = true;
    }
  }

  onClickSeePass() {
    this.seePasswd = !this.seePasswd;
    if (this.seePasswd) {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }

  onClickForgot() {
    this.visual.AlertMens("Mail Recover").then((res) => {});
  }
}
