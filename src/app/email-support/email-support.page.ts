import { Component, OnInit } from "@angular/core";
import { VisualService } from "src/services/visual.service";
import { ManageDataService } from "src/services/manage-data.service";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-email-support",
  templateUrl: "./email-support.page.html",
  styleUrls: ["./email-support.page.scss"],
})
export class EmailSupportPage implements OnInit {
  topic: string;
  notes: string;

  constructor(private modal: ModalController) {}

  ngOnInit() {}

  onClickClose() {
    this.modal.dismiss();
  }

  onClickSendTicked() {
    this.modal.dismiss({
      topic: this.topic,
      notes: this.notes,
    });
  }
}
