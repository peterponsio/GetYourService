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

  constructor(
    private navigate: Router,
    private autentication: AutenticationService,
    private visual: VisualService
  ) {
    this.inputMailInvalid = false;
    this.inputPasswordInvalid = false;
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
      this.user.mail = this.inputMail;
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
      !this.inputMail.includes(".") ||
      !this.inputMail.includes("gmail") ||
      !this.inputMail.includes("hotmail") ||
      !this.inputMail.includes("outlook") ||
      !this.inputMail.includes("solvam")
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

  onClickForgot() {
    this.visual.AlertMens("Forgot passwrd").then((res) => {});
  }
}
