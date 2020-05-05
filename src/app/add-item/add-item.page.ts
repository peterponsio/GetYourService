import { Component, OnInit } from "@angular/core";
import { Cities } from "../consts/cities.js";
import { Categories } from "../consts/categories.js";
import { Announcements } from "src/interfaces/announcements.js";
import { VisualService } from "src/services/visual.service.js";
import { ManageDataService } from "src/services/manage-data.service.js";

@Component({
  selector: "app-add-item",
  templateUrl: "./add-item.page.html",
  styleUrls: ["./add-item.page.scss"],
})
export class AddItemPage implements OnInit {
  listCities: any;
  listCategories: any;

  ///All the ngModels variables ////
  announcement: string;
  categorie: string;
  description: string;
  price: number;
  location: string;
  userName: string;
  userEmail: string;
  telephone: string;
  userId: string;

  constructor(
    private visual: VisualService,
    private manage: ManageDataService
  ) {
    //Array of cities and categories that are in the const folder
    this.listCities = Cities;
    this.listCategories = Categories;
  }

  ngOnInit() {}

  customPopoverOptions: any = {
    subHeader: "Select your categorie",
    message: "Only select one categorie",
  };

  newAnnouncement: Announcements = {
    id: "",
    tittle: "",
    categorie: "",
    price: 0,
    creationDate: 0,
    userMail: "",
    userName: "",
    userPhone: "",
    userId: "",
    description: "",
    Location: "",
    Img: "defaultImg.png",
    fav: false,
    reports: 0,
  };

  //Call to a db method to add a new announcement Also check all the inputs are valids

  onClickAddAnnouncement() {
    let date = new Date();
    this.newAnnouncement.userPhone = this.telephone;
    this.newAnnouncement.tittle = this.announcement;
    this.newAnnouncement.categorie = this.categorie;
    this.newAnnouncement.price = this.price;
    this.newAnnouncement.description = this.description;
    this.newAnnouncement.Location = this.location;
    this.newAnnouncement.userMail = this.userEmail;
    this.newAnnouncement.userName = this.userName;

    this.newAnnouncement.userId = sessionStorage.getItem("user");

    this.newAnnouncement.creationDate =
      date.getDate() + date.getMonth() + date.getFullYear();

    this.newAnnouncement.Img = "defaultImg.png";

    if (
      this.newAnnouncement.tittle != "" &&
      this.newAnnouncement.tittle != undefined &&
      this.newAnnouncement.categorie != undefined &&
      this.newAnnouncement.categorie != "" &&
      this.newAnnouncement.price != undefined &&
      this.newAnnouncement.price != 0 &&
      this.newAnnouncement.description != undefined &&
      this.newAnnouncement.description != "" &&
      this.newAnnouncement.Location != "" &&
      this.newAnnouncement.Location != undefined &&
      this.newAnnouncement.userMail != "" &&
      this.newAnnouncement.userMail != undefined &&
      this.newAnnouncement.userMail.includes("@") &&
      this.newAnnouncement.userMail.includes(".") &&
      this.newAnnouncement.userName != "" &&
      this.newAnnouncement.userName != undefined &&
      this.newAnnouncement.userPhone != "" &&
      this.newAnnouncement.userPhone != undefined
    ) {
      this.manage
        .AddAnnouncement(this.newAnnouncement)
        .then((res) => {
          this.visual
            .ModalImg(this.newAnnouncement)
            .then()
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });

      this.visual.ToastMensagge("Announcement Created");
    } else {
      this.visual.ToastMensagge("All the fields are obligatories");
    }
  }
}
