import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AutenticationService } from "src/services/autentication.service";
import { Users } from "src/interfaces/users";
import { VisualService } from "src/services/visual.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  inputName: String;
  inputMail: String;
  inputPassword: String;
  terms: Boolean;

  inputNameInvalid: Boolean;
  inputMailInvalid: Boolean;
  inputPasswordInvalid: Boolean;
  inputTermsInvalid: Boolean;
  errorMensg: string;

  seePasswd: boolean;
  type: string;

  constructor(
    private navigate: Router,
    private autentication: AutenticationService,
    private visual: VisualService
  ) {
    this.inputNameInvalid = false;
    this.inputMailInvalid = false;
    this.inputPasswordInvalid = false;
    this.seePasswd = false;
    this.type = "password";
  }

  ////Interface USERS///

  user: Users = {
    id: "",
    name: "",
    mail: "",
    password: "",
    credits: 0,
  };

  ngOnInit() {}

  // SING UP CALL METHOD USING AUTENTICATION SERVICE

  onClickSingUp() {
    if (
      this.inputName !== "" &&
      this.inputName != undefined &&
      this.inputName != null &&
      this.inputMail != undefined &&
      this.inputMail != "" &&
      this.inputPassword != "" &&
      this.inputPassword != undefined &&
      this.terms != null &&
      this.terms != undefined
    ) {
      this.user.name = this.inputName;
      this.user.mail = this.inputMail;
      this.user.password = this.inputPassword;

      this.inputTermsInvalid = false;
      this.inputNameInvalid = false;
      this.inputMailInvalid = false;
      this.inputPasswordInvalid = false;

      this.autentication
        .SingUP(this.user)
        .then((res) => {
          this.navigate.navigateByUrl("/tabs");
          this.inputNameInvalid = false;
        })
        .catch((err) => {});
    } else if (
      this.inputName == "" ||
      this.inputName == undefined ||
      this.inputName == null
    ) {
      this.inputMailInvalid = false;
      this.inputPasswordInvalid = false;
      this.inputNameInvalid = true;
      this.inputTermsInvalid = false;
    } else if (
      this.inputMail == undefined ||
      this.inputMail == null ||
      this.inputMail == "" ||
      !this.inputMail.includes("@") ||
      !this.inputMail.includes(".")
    ) {
      this.inputMailInvalid = true;
      this.inputPasswordInvalid = false;
      this.inputNameInvalid = false;
      this.inputTermsInvalid = false;
    } else if (
      this.inputPassword == "" ||
      this.inputPassword == undefined ||
      this.inputPassword == null ||
      this.inputPassword.length < 6
    ) {
      this.inputMailInvalid = false;
      this.inputPasswordInvalid = true;
      this.inputNameInvalid = false;
      this.inputTermsInvalid = false;
    } else if (this.terms == null || this.terms == undefined) {
      this.inputMailInvalid = false;
      this.inputPasswordInvalid = false;
      this.inputNameInvalid = false;
      this.inputTermsInvalid = true;
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
}
