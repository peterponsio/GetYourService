import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  dm: boolean;

  constructor() {
    this.dm = false;
  }

  ngOnInit() {
    // if (this.dm == false) {
    //   let body = document.getElementById("body");
    //   body.classList.add("dark");
    // } else {
    //   let body = document.getElementById("body");
    //   body.classList.remove("dark");
    // }
  }

  onClickDarkMode() {
    if (this.dm == false) {
      let body = document.getElementById("body");
      body.classList.add("dark");
      this.dm = true;
    } else {
      let body = document.getElementById("body");
      body.classList.remove("dark");
      this.dm = false;
    }
  }
}
