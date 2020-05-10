import { Component, OnInit } from "@angular/core";
import { ManageDataService } from "src/services/manage-data.service";
import { Sesion } from "src/interfaces/sesion";
import { Router } from "@angular/router";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.page.html",
  styleUrls: ["./chats.page.scss"],
})
export class ChatsPage implements OnInit {
  chats: boolean;

  listSesions: any;

  constructor(private manage: ManageDataService, private router: Router) {
    this.chats = false;
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.manage
      .GetChatSessions()
      .then((data) => {
        data.valueChanges().subscribe((res) => {
          this.listSesions = res;

          this.chats = this.listSesions.length != 0 ? true : false;
        });
      })
      .catch();
  }

  //Open Chat Sesion

  onClickOpenSesion(sesion: Sesion) {
    this.router.navigate(["mensagges", { data: JSON.stringify(sesion) }]);
  }
}
