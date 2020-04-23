import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.page.html",
  styleUrls: ["./add-item.page.scss"],
})
export class AddItemPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  customPopoverOptions: any = {
    header: "Categorie",
    subHeader: "Select your categorie",
    message: "Only select one categorie",
  };
}
