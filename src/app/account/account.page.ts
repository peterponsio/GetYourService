import { Component, OnInit } from "@angular/core";
import { AutenticationService } from "src/services/autentication.service";
import { VisualService } from "src/services/visual.service";
import { Router } from "@angular/router";

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
    private visual: VisualService,
    private router: Router
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
  onClickMyAnnoncements() {
    this.router.navigateByUrl("my-announcements");
  }

  onClickMyFavorites() {
    this.router.navigateByUrl("my-favorites");
  }

  onClickSettings() {
    this.router.navigateByUrl("settings");
  }
}
