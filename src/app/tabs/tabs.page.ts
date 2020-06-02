import { Component } from "@angular/core";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  notifications: string;
  anonimo: boolean;

  constructor() {
    if (
      sessionStorage.getItem("anonymous") != "" &&
      sessionStorage.getItem("anonymous") != undefined &&
      sessionStorage.getItem("anonymous") != null
    ) {
      this.anonimo = true;
    } else {
      this.anonimo = false;
    }
  }

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
  }
}
