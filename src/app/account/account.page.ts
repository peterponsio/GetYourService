import { Component, OnInit } from "@angular/core";
import { AutenticationService } from "src/services/autentication.service";
import { VisualService } from "src/services/visual.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.page.html",
  styleUrls: ["./account.page.scss"],
})
export class AccountPage implements OnInit {
  userMail: String;
  userName: String;

  constructor(
    private autenticacion: AutenticationService,
    private visual: VisualService
  ) {
    this.userMail = "";
    this.userName = "";
  }

  ngOnInit() {}

  ionViewWillEnter() {
    let userData = JSON.parse(sessionStorage.getItem("userInfo"));
    this.userMail = userData.mail;
    this.userName = userData.name;
  }

  // Close SEssion

  onClickCloseSesion() {
    this.autenticacion.CloseSesion().then((res) => {
      this.visual.ToastMensagge("Sesion Closed");
    });
  }
}
