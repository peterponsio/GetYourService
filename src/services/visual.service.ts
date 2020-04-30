import { Injectable } from "@angular/core";
import { Users } from "src/interfaces/users";
import { Announcements } from "src/interfaces/announcements";
import { PopoverPage } from "src/app/popover/popover.page";
import { AddImgPage } from "src/app/add-img/add-img.page";
import {
  PopoverController,
  AlertController,
  ToastController,
  ModalController,
} from "@ionic/angular";
import { AutenticationService } from "./autentication.service";

@Injectable({
  providedIn: "root",
})
export class VisualService {
  constructor(
    private popoverController: PopoverController,
    private alertController: AlertController,
    private autentication: AutenticationService,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  // async presentPopover(mensage: String) {
  //   const popover = await this.popoverController.create({
  //     component: PopoverPage,
  //     componentProps: mensage,
  //   });
  //   return await popover.present();
  // }

  async AlertMens(mesg: string) {
    const alert = await this.alertController.create({
      header: mesg,
      inputs: [
        {
          name: "mail",
          type: "text",
          placeholder: "mail",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: (data) => {
            this.autentication.Forgot(data.mail);
          },
        },
      ],
    });
    alert.present();
  }

  async ToastMensagge(mens: string) {
    const toast = await this.toastController.create({
      header: mens,

      duration: 2000,
    });

    toast.present();
  }

  async ModalImg(Anoun: Announcements) {
    const modal = await this.modalController.create({
      component: AddImgPage,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);
  }

  async ModalImgClose() {
    this.modalController.dismiss();
  }
}
