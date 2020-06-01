import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { VisualService } from "src/services/visual.service";
import { AutenticationService } from "src/services/autentication.service";

@Component({
  selector: "app-modal-edit-user",
  templateUrl: "./modal-edit-user.page.html",
  styleUrls: ["./modal-edit-user.page.scss"],
})
export class ModalEditUserPage implements OnInit {
  constructor(
    private modal: ModalController,
    private aute: AutenticationService
  ) {}

  user;
  mail;

  newUser: string;
  newMail: string;
  pass: string;

  ngOnInit() {}

  ionViewWillEnter() {
    console.log(this.user);
    this.newUser = this.user;
    this.newMail = this.mail;
  }

  onClickCloseModal() {
    this.modal.dismiss();
  }

  onClickEditProfile() {
    if (
      this.newUser != "" &&
      this.newUser != undefined &&
      this.newMail != "" &&
      this.newMail != undefined &&
      this.pass != "" &&
      this.pass != undefined
    ) {
      if (!this.newMail.includes("@") || !this.newMail.includes(".")) {
        alert("The mail is incorrect... Try again");
      } else {
        this.aute
          .Reautenticate(this.pass)
          .then((res) => {
            this.modal.dismiss({
              newUser: this.newUser,
              newMail: this.newMail,
            });
          })
          .catch((err) => {
            alert("Password incorrect");
          });
      }
    } else {
      alert("Fill all the fields");
    }
  }
}
