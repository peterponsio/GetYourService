import { Component, OnInit } from "@angular/core";
import { VisualService } from "src/services/visual.service";
import { ModalController } from "@ionic/angular";
import { Cities } from "../consts/cities.js";
import { Categories } from "../consts/categories.js";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.page.html",
  styleUrls: ["./filter.page.scss"],
})
export class FilterPage implements OnInit {
  //NG MODELS
  search: string;
  categorie: string;
  location: string;
  priceLow: number;
  priceMax: number;

  listCategories: any;
  listCities: any;
  constructor(private modalController: ModalController) {
    //Array of cities and categories that are in the const folder
    this.listCities = Cities;
    this.listCategories = Categories;
    this.search = "";
    this.categorie = "";
    this.location = "";
    this.priceLow = undefined;
    this.priceMax = undefined;
  }

  ngOnInit() {}

  customPopoverOptions: any = {
    message: "Only select one categorie",
  };

  OptionsLocation: any = {
    message: "Only select one location",
  };

  onClickClose() {
    this.modalController.dismiss();
  }

  onClickClear() {
    this.search = "";
    this.categorie = "";
    this.location = "";
    this.priceLow = undefined;
    this.priceMax = undefined;
  }
  onClickApply() {
    this.modalController.dismiss({
      search: this.search,
      categorie: this.categorie,
      location: this.location,
      priceLow: this.priceLow,
      priceMax: this.priceMax,
    });
  }
}
