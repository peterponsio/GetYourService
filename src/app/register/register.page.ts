import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AutenticationService } from "src/services/autentication.service";
import { Users } from "src/interfaces/users";

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

  constructor(
    private navigate: Router,
    private autentication: AutenticationService
  ) {}

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

  ngOnInit() {}

  // SING UP CALL METHOD USING AUTENTICATION SERVICE

  onClickSingUp() {
    if (
      this.inputMail !== "" &&
      this.inputName !== "" &&
      this.inputPassword !== "" &&
      this.terms
    ) {
      this.user.name = this.inputName;
      this.user.mail = this.inputMail;
      this.user.password = this.inputPassword;
      this.autentication.SingUP(this.user).then((res) => {
        this.navigate.navigateByUrl("/tabs");
      });
    }
  }
}
