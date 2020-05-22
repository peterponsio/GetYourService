import { Component, OnInit } from "@angular/core";
import { VisualService } from "src/services/visual.service";

import { ManageDataService } from "src/services/manage-data.service";
import { AutenticationService } from "src/services/autentication.service";

@Component({
  selector: "app-help",
  templateUrl: "./help.page.html",
  styleUrls: ["./help.page.scss"],
})
export class HelpPage implements OnInit {
  constructor(
    private visual: VisualService,
    private manage: ManageDataService,
    private autentication: AutenticationService
  ) {}

  ngOnInit() {}

  onClickSendTicket() {
    this.visual.ModalTicked().then((data) => {
      console.log(data);

      this.manage.CreateNewTicked(data.topic, data.notes).then((res) => {
        this.visual.ToastMensagge("Ticked Send");
      });
    });
  }

  onClickSendHelpMail() {
    this.visual.ModalEmailSupport().then((data) => {
      console.log(data);
      this.manage.SendEmailSupport(data.topic, data.notes).then((res) => {});
    });
  }

  onClickDeleteUser() {
    this.visual.ReautenticateToDeleteUser();
  }

  onClickResetPassword() {
    this.visual.ReautenticateToPass();
  }

  onClickInform() {}
}
