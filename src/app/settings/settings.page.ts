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
  anonimo: boolean;

  constructor(
    private autentication: AutenticationService,
    private visual: VisualService
  ) {
    this.dm = false;
  }

  ngOnInit() {}

  ionViewWillEnter() {
    if (
      sessionStorage.getItem("anonymous") != "" ||
      sessionStorage.getItem("anonymous") != undefined
    ) {
      this.anonimo = true;
    }
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
      let dark = JSON.parse(sessionStorage.getItem("userInfo"));
      dark.darkMode = true;
      sessionStorage.setItem("userInfo", JSON.stringify(dark));
    } else {
      let body = document.getElementById("body");
      body.classList.remove("dark");
      this.dm = false;
      this.autentication.UnSETDarkModeToUser();
      let dark = JSON.parse(sessionStorage.getItem("userInfo"));
      dark.darkMode = false;
      sessionStorage.setItem("userInfo", JSON.stringify(dark));
    }
  }

  //////RESET PASSWORD

  onClickResetPassword() {
    this.visual.ReautenticateToPass();
  }
}
