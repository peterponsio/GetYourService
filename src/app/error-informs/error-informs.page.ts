import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-error-informs",
  templateUrl: "./error-informs.page.html",
  styleUrls: ["./error-informs.page.scss"],
})
export class ErrorInformsPage implements OnInit {
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
