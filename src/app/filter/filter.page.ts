import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.page.html",
  styleUrls: ["./filter.page.scss"],
})
export class FilterPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  CategoriesOptions: any = {
    header: "Categorie",
    subHeader: "Select your categorie",
    message: "Only select one categorie",
  };

  LocationOptions: any = {
    header: "Categorie",
    subHeader: "Select your categorie",
    message: "Only select one categorie",
  };
}
