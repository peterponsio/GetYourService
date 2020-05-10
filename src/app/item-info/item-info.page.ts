import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

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

  constructor(private activatedRoute: ActivatedRoute) {}

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
}
