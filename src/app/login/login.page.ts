import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(private navigate: Router) {}

  ngOnInit() {}

  onClickSingIn() {
    this.navigate.navigateByUrl("/tabs");
  }
}
