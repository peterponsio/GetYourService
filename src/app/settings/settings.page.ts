import { Component, OnInit } from "@angular/core";
import { AutenticationService } from "src/services/autentication.service";
import { VisualService } from "src/services/visual.service";
import { stat } from "fs";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  dm: boolean;

  constructor(
    private autentication: AutenticationService,
    private visual: VisualService
  ) {
    this.dm = false;
  }

  ngOnInit() {}

  ionViewWillEnter() {
    let dark = JSON.parse(sessionStorage.getItem("userInfo"));
    if (dark.darkMode == true) {
      console.log("entro");
      let body = document.getElementById("body");
      body.classList.add("dark");
      this.dm = true;
    } else {
      let body = document.getElementById("body");
      body.classList.remove("dark");
      this.dm = false;
    }
  }

  ///Activate Dark Mode
  onDarkMode() {
    if (this.dm == false) {
      let body = document.getElementById("body");
      body.classList.add("dark");
      this.dm = true;
      this.autentication.SetDarkModeToUser();
    } else {
      let body = document.getElementById("body");
      body.classList.remove("dark");
      this.dm = false;
      this.autentication.UnSETDarkModeToUser();
    }
  }

  //////RESET PASSWORD

  onClickResetPassword() {
    this.visual.AlertChangePass();
  }
}
