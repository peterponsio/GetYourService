import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-tickeds",
  templateUrl: "./tickeds.page.html",
  styleUrls: ["./tickeds.page.scss"],
})
export class TickedsPage implements OnInit {
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
