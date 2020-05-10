import { Component, OnInit } from "@angular/core";
import { ManageDataService } from "src/services/manage-data.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { NativeToolsService } from "src/services/native-tools.service";
import { Announcements } from "src/interfaces/announcements";
import { VisualService } from "src/services/visual.service";
import { element } from "protractor";
import { Router } from "@angular/router";

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
    private visual: VisualService,
    private router: Router
  ) {
    ///Get current user
    this.currentUser = sessionStorage.getItem("user");
    this.usingFilters = false;
  }

  usingFilters: boolean;

  listFavs: any;

  listOriginalAnnouncements: any;
  listAnnouncements: any;
  listFilter: any;

  search: string;

  ///Use on init to get all the data from firebase
  ngOnInit() {}
  ////////////////////////////////////////////////////////////////////////////////////////////////////////7
  // Use will enter to get data to
  ionViewWillEnter() {
    this.manage
      .GetListAnnouncements()
      .then((data) => {
        data.valueChanges().subscribe((res) => {
          this.listAnnouncements = res.reverse();
          //////Array copy to filter//////////
          this.listOriginalAnnouncements = res.reverse();
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
            this.listOriginalAnnouncements.forEach((announcement) => {
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

  FilterItems(ev) {
    if (
      this.search === "" ||
      this.search == undefined ||
      this.search.length == 0
    ) {
      this.listAnnouncements = this.listOriginalAnnouncements;
    }
    if (this.search != "") {
      this.listFilter = this.listAnnouncements.filter(
        (element) =>
          element.tittle.toLowerCase().includes(this.search.toLowerCase()) ||
          element.categorie.toLowerCase().includes(this.search.toLowerCase()) ||
          element.Location.toLowerCase().includes(this.search.toLowerCase())
      );
      this.listAnnouncements = this.listFilter;
    }
  }
  //On click to clear the filters
  ClearFilters() {
    this.usingFilters = false;
    this.listAnnouncements = this.listOriginalAnnouncements;
  }

  ///Filters of the modal filters
  MoreFilters() {
    this.visual.ModalFilters().then((res) => {
      this.listAnnouncements = this.listOriginalAnnouncements;
      console.log(res);
      if (res.search != "" && res.search != undefined) {
        this.listFilter = this.listAnnouncements.filter((element) =>
          element.tittle.toLowerCase().includes(res.search.toLowerCase())
        );
        this.listAnnouncements = this.listFilter;
        this.usingFilters = true;
      }
      if (res.categorie != undefined && res.categorie != "") {
        this.listFilter = this.listAnnouncements.filter((element) =>
          element.categorie.toLowerCase().includes(res.categorie.toLowerCase())
        );
        this.listAnnouncements = this.listFilter;
        this.usingFilters = true;
      }
      if (res.location != "" && res.location != undefined) {
        this.listFilter = this.listAnnouncements.filter((element) =>
          element.Location.toLowerCase().includes(res.location.toLowerCase())
        );
        this.listAnnouncements = this.listFilter;
        this.usingFilters = true;
      }
      if (res.priceLow != undefined && res.priceLow > 0) {
        this.listFilter = this.listAnnouncements.filter(
          (element) => element.price >= res.priceLow
        );
        this.listAnnouncements = this.listFilter;
        this.usingFilters = true;
      }
      if (res.priceMax != undefined && res.priceMax > 1) {
        this.listFilter = this.listAnnouncements.filter(
          (element) => element.price <= res.priceMax
        );
        this.listAnnouncements = this.listFilter;
        this.usingFilters = true;
      }
    });
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

  ///Seee info of the item

  onClickInfoItem(item: Announcements) {
    this.router.navigate(["item-info", { data: JSON.stringify(item) }]);
  }
}
