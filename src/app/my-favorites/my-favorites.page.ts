import { Component, OnInit } from "@angular/core";
import { ManageDataService } from "src/services/manage-data.service";
import { VisualService } from "src/services/visual.service";
import { Announcements } from "src/interfaces/announcements";
import { NativeToolsService } from "src/services/native-tools.service";

@Component({
  selector: "app-my-favorites",
  templateUrl: "./my-favorites.page.html",
  styleUrls: ["./my-favorites.page.scss"],
})
export class MyFavoritesPage implements OnInit {
  listAnnouncements: any;
  listFavs: any;
  currentUser: any;
  listChats: any;

  constructor(
    private manage: ManageDataService,
    private visual: VisualService,
    private native: NativeToolsService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.manage
      .GetListFavorites()
      .then((data) => {
        data.valueChanges().subscribe((res) => {
          this.listFavs = res;
          let ee = [];
          for (var i = this.listFavs.length - 1; i >= 0; i--) {
            ee.push(this.listFavs[i]);
          }
          this.listFavs = ee;
        });
      })
      .catch();
    //COMPARE TO GET TEXT CHAT INITIALIZE
    this.manage
      .GetChatSessions()
      .then((data) => {
        data.valueChanges().subscribe((res) => {
          this.listChats = res;

          if (this.listChats != undefined && this.listChats != null) {
            this.listFavs.forEach((favs) => {
              this.listChats.forEach((chats) => {
                if (chats.id_announcement == favs.id) {
                  favs.chatOn = true;
                }
              });
            });
          }
        });
      })
      .catch();
  }
  onClickDeleteFavs() {
    this.visual.AlertSure().then((res) => {});
  }

  doRefresh(event) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    }, 500);
  }

  ////Method to open the filter modal and recover data

  FilterItems() {
    console.log("asdasd");
  }
  ///////CAll client///////////////////////
  Call(item: Announcements) {
    this.native.CallClient(item);
  }

  /////Text Client////////////////////////77
  Text(item: Announcements) {
    this.manage
      .CreateChatSession(item)
      .then((res) => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Unfav Item and removed from favs collection
  UnFav(item: Announcements, index) {
    this.manage.RemoveFavorite(item).then((res) => {
      this.visual.ToastMensagge("Removed from favorites");
    });
  }
  //Report Anouncement
  Report(item: Announcements) {
    this.manage.ReportAnnouncement(item).then((res) => {
      this.visual.ToastMensagge("Announcement report");
    });
  }
}
