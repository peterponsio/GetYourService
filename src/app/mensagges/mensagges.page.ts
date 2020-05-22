import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ManageDataService } from "src/services/manage-data.service";
import { collectExternalReferences } from "@angular/compiler";
import { element } from "protractor";

@Component({
  selector: "app-mensagges",
  templateUrl: "./mensagges.page.html",
  styleUrls: ["./mensagges.page.scss"],
})
export class MensaggesPage implements OnInit {
  sesionData: any;
  receiver_userName: string;
  announcement_tittle: string;
  img: string;
  text: string;
  enableSend: boolean;

  listMensagges: any;
  mensagges: boolean;

  currentUser: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private manage: ManageDataService
  ) {
    this.enableSend = true;
    this.mensagges = false;
    this.currentUser = sessionStorage.getItem("user");
  }

  ngOnInit() {}

  ///Get Sesion data

  ionViewWillEnter() {
    this.activatedRoute.params.subscribe((params) => {
      this.sesionData = JSON.parse(params["data"]);
    });

    this.receiver_userName = this.sesionData.receiver_userName;
    this.announcement_tittle = this.sesionData.announcements;
    this.img = this.sesionData.img;

    this.manage
      .GetChatMensagges(this.sesionData.id)

      .then((data) => {
        data.valueChanges().subscribe((res) => {
          this.listMensagges = res;

          this.mensagges = this.listMensagges.length != 0 ? true : false;
        });
      });
  }

  ///Tiping method
  Tiping(ev) {
    if (this.text != "" && this.text != undefined && this.text != null) {
      this.enableSend = false;
    } else {
      this.enableSend = true;
    }
  }
  ///On click to upload the menssagge

  onClickSend() {
    if (this.currentUser == this.sesionData.id_sender) {
      this.manage.NewMensaggeSender(this.sesionData, this.text).then((res) => {
        this.text = "";
      });
    } else {
      this.manage
        .NewMensaggeReceiver(this.sesionData, this.text)
        .then((res) => {
          this.text = "";
        });
    }
  }
}
