import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-chats",
  templateUrl: "./chats.page.html",
  styleUrls: ["./chats.page.scss"],
})
export class ChatsPage implements OnInit {
  chats: boolean;
  nochats: boolean;

  constructor() {
    this.chats = false;
    this.nochats = true;
  }

  ngOnInit() {}
}
