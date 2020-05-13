import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Announcements } from "src/interfaces/announcements";
import { ManageDataService } from "src/services/manage-data.service";
import { NativeToolsService } from "src/services/native-tools.service";
import { VisualService } from "src/services/visual.service";

@Component({
  selector: "app-item-info",
  templateUrl: "./item-info.page.html",
  styleUrls: ["./item-info.page.scss"],
})
export class ItemInfoPage implements OnInit {
  itemData: any;

  tittle: string;
  img: string;
  descripcion: string;
  price: number;
  categorie: string;
  location: string;
  fav: boolean;
  userName: string;
  userMail: string;
  date: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private manage: ManageDataService,
    private native: NativeToolsService,
    private visual: VisualService,
    private router: Router
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe((params) => {
      this.itemData = JSON.parse(params["data"]);
      console.log(this.itemData);
      this.tittle = this.itemData.tittle;
      this.img = this.itemData.Img;
      this.descripcion = this.itemData.description;
      this.price = this.itemData.price;
      this.categorie = this.itemData.categorie;
      this.location = this.itemData.Location;
      this.fav = this.itemData.fav;
      this.userName = this.itemData.userName;
      this.date = this.itemData.creationDate;
      this.userMail = this.itemData.userMail;
    });
  }

  ///////CAll client///////////////////////
  Call() {
    this.native.CallClient(this.itemData);
  }

  /////Text Client////////////////////////77
  Text() {
    this.manage
      .CreateChatSession(this.itemData)
      .then((res) => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ///// FAv Item to add to a favs collection
  MakeFav() {
    this.manage.AddFavAnnouncement(this.itemData).then((res) => {
      this.visual.ToastMensagge("Added to favorites");
      this.fav = true;
    });
  }

  //Unfav Item and removed from favs collection
  UnFav() {
    this.manage.RemoveFavorite(this.itemData).then((res) => {
      this.visual.ToastMensagge("Removed from favorites");
      this.fav = false;
    });
  }
  ///Go back to refresh list

  onClickBack() {
    this.router.navigateByUrl("/tabs/list");
  }
}
