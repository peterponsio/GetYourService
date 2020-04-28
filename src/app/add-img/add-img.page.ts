import { Component, OnInit } from "@angular/core";
import { VisualService } from "src/services/visual.service";
import { NativeToolsService } from "../../services/native-tools.service";

@Component({
  selector: "app-add-img",
  templateUrl: "./add-img.page.html",
  styleUrls: ["./add-img.page.scss"],
})
export class AddImgPage implements OnInit {
  constructor(
    private visual: VisualService,
    private native: NativeToolsService
  ) {}

  ngOnInit() {}

  onClickCloseModal() {
    this.visual.ModalImgClose();
  }
  onClickCloseModalContinue() {
    this.visual.ModalImgClose();
  }

  onClickAddIMG() {
    this.native.OpenGallery();
  }
}
