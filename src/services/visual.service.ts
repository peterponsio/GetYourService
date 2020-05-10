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
import { single } from "rxjs/operators";
import { ManageDataService } from "./manage-data.service";
import { EditAnnouncementPage } from "src/app/edit-announcement/edit-announcement.page";
import { FilterPage } from "src/app/filter/filter.page";

@Injectable({
  providedIn: "root",
})
export class VisualService {
  constructor(
    private popoverController: PopoverController,
    private alertController: AlertController,
    private autentication: AutenticationService,
    private toastController: ToastController,
    private modalController: ModalController,
    private manage: ManageDataService
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

      duration: 1500,
    });

    toast.present();
  }

  async ModalImg(Anoun: Announcements) {
    const modal = await this.modalController.create({
      componentProps: { obj: Anoun },
      component: AddImgPage,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);
  }

  async ModalImgClose() {
    this.modalController.dismiss();
  }
  ////Alert to delete all the favs list
  async AlertSure() {
    const alert = await this.alertController.create({
      header: "Are you sure? ",

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
          handler: () => {
            this.manage.DeleteFavorites().then((res) => {
              this.ToastMensagge("All favorites deleted");
            });
          },
        },
      ],
    });
    alert.present();
  }
  ////Delete all the loged user announcements
  async AlertDeleteMyAnnouncements() {
    const alert = await this.alertController.create({
      header: "Are you sure? ",

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
          handler: () => {
            this.manage.DeleteMyAnnouncements().then((res) => {
              this.ToastMensagge("All you announcements deleted");
            });
          },
        },
      ],
    });
    alert.present();
  }

  ////Delete One of  the loged user announcement
  async AlertDeleteOneAnnouncement(item: Announcements) {
    const alert = await this.alertController.create({
      header: "Are you sure? ",

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
          handler: () => {
            this.manage.DeleteOneAnnouncement(item).then((res) => {
              this.ToastMensagge("announcement deleted");
            });
          },
        },
      ],
    });
    alert.present();
  }

  ////Edit announcements MODAL

  async ModalEdit(Anoun: Announcements) {
    const modal = await this.modalController.create({
      componentProps: { obj: Anoun },
      component: EditAnnouncementPage,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);
  }

  async ModalEditClose() {
    this.modalController.dismiss();
  }

  /////Modal Filters

  async ModalFilters() {
    const modal = await this.modalController.create({
      component: FilterPage,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();

    return data;
  }

  async ModalFiltersClose() {
    this.modalController.dismiss();
  }
}
