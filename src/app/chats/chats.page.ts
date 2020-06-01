import { Component, OnInit } from "@angular/core";
import { ManageDataService } from "src/services/manage-data.service";
import { Sesion } from "src/interfaces/sesion";
import { Router } from "@angular/router";
import { VisualService } from "src/services/visual.service";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.page.html",
  styleUrls: ["./chats.page.scss"],
})
export class ChatsPage implements OnInit {
  chats: boolean;

  listSesions: any;

  constructor(
    private manage: ManageDataService,
    private router: Router,
    private visual: VisualService
  ) {
    this.chats = false;
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.manage
      .GetChatSessions()
      .then((data) => {
        data.valueChanges().subscribe((res) => {
          this.listSesions = res;
          let ee = [];
          for (var i = this.listSesions.length - 1; i >= 0; i--) {
            ee.push(this.listSesions[i]);
          }
          this.listSesions = ee;
          this.chats = this.listSesions.length != 0 ? true : false;
        });
      })
      .catch();
  }

  //Open Chat Sesion

  onClickOpenSesion(sesion: Sesion) {
    this.router.navigate(["mensagges", { data: JSON.stringify(sesion) }]);
  }

  ////DelEte chat sesion
  DeleteChat(item: Sesion) {
    this.manage.DeleteOneChatSesion(item).then((res) => {
      this.visual.ToastMensagge("Chat sesion deleted");
    });
  }
}
