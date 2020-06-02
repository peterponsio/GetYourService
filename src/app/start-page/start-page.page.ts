import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AutenticationService } from "src/services/autentication.service";

@Component({
  selector: "app-start-page",
  templateUrl: "./start-page.page.html",
  styleUrls: ["./start-page.page.scss"],
})
export class StartPagePage implements OnInit {
  constructor(private navigate: Router, private aut: AutenticationService) {}

  ngOnInit() {}

  onClickSingIn() {
    this.navigate.navigateByUrl("login");
  }
  onClickSingUp() {
    this.navigate.navigateByUrl("register");
  }

  onClickAnonymous() {
    this.aut.LogInAnonyous().then((res) => {
      setTimeout(() => {
        //<<<---    using ()=> syntax
        this.navigate.navigateByUrl("/tabs");
      }, 1500);
    });
  }
}
