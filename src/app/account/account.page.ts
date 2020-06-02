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
  userMail: string;
  userName: string;

  anonimo: boolean;

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
    if (
      sessionStorage.getItem("anonymous") != "" &&
      sessionStorage.getItem("anonymous") != undefined &&
      sessionStorage.getItem("anonymous") != null
    ) {
      this.anonimo = true;
    } else {
      this.anonimo = false;
    }

    console.log(this.anonimo);

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
    if (this.anonimo == true) {
      this.visual.Anonymous();
    } else {
      this.router.navigateByUrl("my-announcements");
    }
  }

  onClickMyFavorites() {
    if (this.anonimo == true) {
      this.visual.Anonymous();
    } else {
      this.router.navigateByUrl("my-favorites");
    }
  }

  onClickSettings() {
    if (this.anonimo == true) {
      this.visual.Anonymous();
    } else {
      this.router.navigateByUrl("settings");
    }
  }
  onClickTerms() {
    this.router.navigateByUrl("terms-and-conditions");
  }
  onClickHelp() {
    if (this.anonimo == true) {
      this.visual.Anonymous();
    } else {
      this.router.navigateByUrl("help");
    }
  }

  onClickEditProfile() {
    this.visual.ModalEditUser(this.userMail, this.userName).then((res) => {
      console.log(res);
      this.autenticacion
        .ChangeUserAndMail(res.newUser, res.newMail)
        .then((res) => {
          this.autenticacion.CloseSesion();
        });
      this.visual.ToastMensagge("Saved changes");
    });
  }
}
