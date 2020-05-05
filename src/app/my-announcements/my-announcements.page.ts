import { Component, OnInit } from "@angular/core";
import { VisualService } from "src/services/visual.service";
import { ManageDataService } from "src/services/manage-data.service";
import { Announcements } from "src/interfaces/announcements";

@Component({
  selector: "app-my-announcements",
  templateUrl: "./my-announcements.page.html",
  styleUrls: ["./my-announcements.page.scss"],
})
export class MyAnnouncementsPage implements OnInit {
  listAnnouncements: any;

  constructor(
    private visual: VisualService,
    private manage: ManageDataService
  ) {}

  ngOnInit() {}

  ///Get my own announcements data
  ionViewWillEnter() {
    this.manage
      .GetMyAnnouncements()
      .then((data) => {
        data.valueChanges().subscribe((res) => {
          this.listAnnouncements = res.reverse();
        });
      })
      .catch();
  }

  ////Delete all the announcements

  onClickDeleteAnnouncements() {
    this.visual.AlertDeleteMyAnnouncements().then((res) => {});
  }

  //Delete One anncouncement
  Delete(item: Announcements) {
    this.visual.AlertDeleteOneAnnouncement(item);
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
}
