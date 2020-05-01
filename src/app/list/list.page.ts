import { Component, OnInit } from "@angular/core";
import { ManageDataService } from "src/services/manage-data.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { NativeToolsService } from "src/services/native-tools.service";
import { Announcements } from "src/interfaces/announcements";
@Component({
  selector: "app-list",
  templateUrl: "./list.page.html",
  styleUrls: ["./list.page.scss"],
})
export class ListPage implements OnInit {
  constructor(
    private manage: ManageDataService,
    private native: NativeToolsService
  ) {}

  listAnnouncements: any;

  ngOnInit() {
    this.manage
      .GetListAnnouncements()
      .then((data) => {
        data.valueChanges().subscribe((res) => {
          console.log(res);
          this.listAnnouncements = res.reverse();
        });
      })
      .catch();
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
  Text() {
    alert("dasdad");
  }
  MakeFav(item: Announcements) {}
}
