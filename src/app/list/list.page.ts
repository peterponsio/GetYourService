import { Component, OnInit } from "@angular/core";
import { ManageDataService } from "src/services/manage-data.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { NativeToolsService } from "src/services/native-tools.service";
import { Announcements } from "src/interfaces/announcements";
import { VisualService } from "src/services/visual.service";
import { element } from "protractor";

@Component({
  selector: "app-list",
  templateUrl: "./list.page.html",
  styleUrls: ["./list.page.scss"],
})
export class ListPage implements OnInit {
  currentUser: any;

  constructor(
    private manage: ManageDataService,
    private native: NativeToolsService,
    private visual: VisualService
  ) {
    ///Get current user
    this.currentUser = sessionStorage.getItem("user");
  }

  listAnnouncements: any;
  listFavs: any;

  ///Use on init to get all the data from firebase
  ngOnInit() {
    // this.manage
    //   .GetListAnnouncements()
    //   .then((data) => {
    //     data.valueChanges().subscribe((res) => {
    //       console.log(res);
    //       this.listAnnouncements = res.reverse();
    //     });
    //   })
    //   .catch();
    // ///Get current user
    // this.currentUser = sessionStorage.getItem("user");
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////7
  // Use will enter to get data to
  ionViewWillEnter() {
    this.manage
      .GetListAnnouncements()
      .then((data) => {
        data.valueChanges().subscribe((res) => {
          this.listAnnouncements = res.reverse();
        });
      })
      .catch();
    //////////////// Get Favorites to compare//////////////////// Incluir en memoria
    this.manage
      .GetListFavorites()
      .then((data) => {
        data.valueChanges().subscribe((res) => {
          this.listFavs = res;
          if (this.listFavs != undefined && this.listFavs != null) {
            this.listAnnouncements.forEach((announcement) => {
              this.listFavs.forEach((favorites) => {
                if (favorites.id == announcement.id) {
                  announcement.fav = true;
                }
              });
            });
          }
        });
      })
      .catch();
    //COmpare normal array with favs array ////////

    ///Get current user
    this.currentUser = sessionStorage.getItem("user");
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
    console.log(item);
    this.manage
      .CreateChatSession(item)
      .then((res) => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ///// FAv Item to add to a favs collection
  MakeFav(item: Announcements, index) {
    this.manage.AddFavAnnouncement(item).then((res) => {
      this.visual.ToastMensagge("Added to favorites");
      this.listAnnouncements[index].fav = true;
    });
  }

  //Unfav Item and removed from favs collection
  UnFav(item: Announcements, index) {
    this.manage.RemoveFavorite(item).then((res) => {
      this.visual.ToastMensagge("Removed from favorites");
      this.listAnnouncements[index].fav = false;
    });
  }
}
