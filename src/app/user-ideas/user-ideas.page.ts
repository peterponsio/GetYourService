import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-user-ideas",
  templateUrl: "./user-ideas.page.html",
  styleUrls: ["./user-ideas.page.scss"],
})
export class UserIdeasPage implements OnInit {
  topic: string;
  notes: string;
  constructor(private modal: ModalController) {}

  ngOnInit() {}

  onClickClose() {
    this.modal.dismiss();
  }

  onClickSendIdea() {
    this.modal.dismiss({
      topic: this.topic,
      notes: this.notes,
    });
  }
}
