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
import { Router } from "@angular/router";
import { TickedsPage } from "src/app/tickeds/tickeds.page";
import { EmailSupportPage } from "src/app/email-support/email-support.page";
import { UserIdeasPage } from "src/app/user-ideas/user-ideas.page";
import { ErrorInformsPage } from "src/app/error-informs/error-informs.page";
import { ModalEditUserPage } from "src/app/modal-edit-user/modal-edit-user.page";

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
    private manage: ManageDataService,
    private router: Router
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
          handler: () => {},
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
          handler: () => {},
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

  async Anonymous() {
    const alert = await this.alertController.create({
      header: "You are log in anonymous: ",

      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            alert.dismiss();
          },
        },
        {
          text: "Log in",
          handler: () => {
            this.router.navigateByUrl("login");
          },
        },
        {
          text: "Create Account",
          handler: () => {
            this.router.navigateByUrl("register");
          },
        },
      ],
    });
    alert.present();
  }

  async ModalEditUser(mail: string, user: string) {
    const modal = await this.modalController.create({
      componentProps: { user: user, mail: mail },
      component: ModalEditUserPage,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();

    return data;
  }

  ////Edit announcements MODAL

  async ModalEdit(Anoun: Announcements) {
    const modal = await this.modalController.create({
      componentProps: { obj: Anoun },
      component: EditAnnouncementPage,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
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
  //////ALERT CHANGE PASSWORD
  async AlertChangePass() {
    const alert = await this.alertController.create({
      header: "Change your password",
      inputs: [
        {
          name: "password",
          type: "text",
          placeholder: "password",
        },
        {
          name: "password2",
          type: "text",
          placeholder: "password again",
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
            this.AlertAcceptChangePassword(data);
          },
        },
      ],
    });
    alert.present();
  }

  ////Sure change password ?
  async AlertAcceptChangePassword(data) {
    const alert = await this.alertController.create({
      header: "Are you sure? ",

      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Ok",
          handler: () => {
            if (data.password == data.password2) {
              this.autentication.ChangePassword(data.password).then((res) => {
                this.ToastMensagge("Password changed correctly").then((res) => {
                  this.autentication.CloseSesion().then((res) => {});
                });
              });
            } else {
              this.ToastMensagge("Please introduce again the password");
            }
          },
        },
      ],
    });
    alert.present();
  }

  ///MODAL TICKEDS PAGE

  async ModalTicked() {
    const modal = await this.modalController.create({
      component: TickedsPage,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    return data;
  }

  /////MODAL SEND MAIL TO SUPPORT

  async ModalEmailSupport() {
    const modal = await this.modalController.create({
      component: EmailSupportPage,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    return data;
  }

  ///MODAL SEND MAIL SUPPORT WITH IDEAS USER
  async ModalEmailIdeas() {
    const modal = await this.modalController.create({
      component: UserIdeasPage,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    return data;
  }

  /////ERRORS INFORM BY USER
  async ModalEmailError() {
    const modal = await this.modalController.create({
      component: ErrorInformsPage,
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    return data;
  }

  ////Sure delete User ?
  async AlertAcceptDeleteUser() {
    const alert = await this.alertController.create({
      header: "Are you sure? ",

      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {},
        },
        {
          text: "Ok",
          handler: () => {
            this.autentication.DeleteUser().then((res) => {
              this.manage.DeleteUserFromDatabase();
              this.ToastMensagge("User deleted correctly");
              sessionStorage.clear();

              sessionStorage.removeItem("user");

              this.router.navigateByUrl("/");

              //REmove dark mode
              let body = document.getElementById("body");
              body.classList.remove("dark");
            });
          },
        },
      ],
    });
    alert.present();
  }

  //////ALERT CHANGE PASSWORD
  async ReautenticateToDeleteUser() {
    const alert = await this.alertController.create({
      header: "Please confirm puting your password",
      inputs: [
        {
          name: "password",
          type: "password",
          placeholder: "password",
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
            this.autentication.Reautenticate(data.password).then((res) => {
              if (res) {
                this.autentication.DeleteUser().then((res) => {
                  this.manage.DeleteUserFromDatabase().then((res) => {
                    this.ToastMensagge("User deleted correctly");
                    sessionStorage.clear();

                    sessionStorage.removeItem("user");

                    this.router.navigateByUrl("/");

                    //REmove dark mode
                    let body = document.getElementById("body");
                    body.classList.remove("dark");
                  });
                });
              }
            });
          },
        },
      ],
    });
    alert.present();
  }
  async ReautenticateToPass() {
    const alert = await this.alertController.create({
      header: "Please confirm puting your password",
      inputs: [
        {
          name: "PVpassword",
          type: "password",
          placeholder: "previous password",
        },
        {
          name: "password1",
          type: "password",
          placeholder: "password",
        },
        {
          name: "password2",
          type: "password",
          placeholder: "password",
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
            this.autentication.Reautenticate(data.PVpassword).then((res) => {
              console.log(res);
              if (res) {
                if (data.password1 == data.password2) {
                  this.autentication
                    .ChangePassword(data.password1)
                    .then((res) => {
                      this.ToastMensagge("Password changed correctly").then(
                        (res) => {
                          this.autentication.CloseSesion().then((res) => {});
                        }
                      );
                    })
                    .catch((err) => {
                      this.ToastMensagge("Something fail, try again");
                    });
                } else {
                  this.ToastMensagge("Please introduce again the password");
                }
              }
            });
          },
        },
      ],
    });
    alert.present();
  }
}
