import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Users } from "src/interfaces/users";
import { Announcements } from "src/interfaces/announcements";

@Injectable({
  providedIn: "root",
})
export class ManageDataService {
  constructor(private db: AngularFirestore) {}

  /////////Method to create a newUser in the database ///////////////

  async CreateNewUser(newUser: Users) {
    this.db
      .doc("/Users/" + newUser.id)
      .set(newUser)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }

  async AddAnnouncement(newAnnouncement: Announcements) {
    let idAnnouncement = this.db.createId();
    newAnnouncement.id = idAnnouncement;
    // newAnnouncement.Img = "deafault.jpeg";

    ///Create the announcement inside the specific user than created
    this.db
      .doc(
        "/Users/" +
          sessionStorage.getItem("user") +
          "/Announcements/" +
          idAnnouncement
      )
      .set(newAnnouncement)
      .then((res) => {
        ///Create the announcement in the main announcements collection
        this.db
          .doc("/Announcements/" + idAnnouncement)
          .set(newAnnouncement)
          .then((res) => {})
          .catch((err) => {});
        // CAll modal to add imgs
      })
      .catch((err) => {});
  }

  //ANNCOUNCEMNETS LIST PROMISE

  async GetListAnnouncements() {
    let data: AngularFirestoreCollection = this.db.collection<Announcements>(
      "Announcements"
    );
    return data;
  }

  ///////////////MAKE A FAVS COLLECTION

  async AddFavAnnouncement(item: Announcements) {
    this.db
      .doc("Users/" + sessionStorage.getItem("user") + "/Favorites/" + item.id)
      .set(item)
      .then((res) => {})
      .catch((err) => {
        alert("Exploto");
      });
  }
  ////////////////REmove from favorites
  async RemoveFavorite(item: Announcements) {
    this.db
      .doc("Users/" + sessionStorage.getItem("user") + "/Favorites/" + item.id)
      .delete()
      .then((res) => {})
      .catch((err) => {
        alert("Exploto");
      });
  }

  //Get Favorites LIST

  async GetListFavorites() {
    let data: AngularFirestoreCollection = this.db.collection<Announcements>(
      "Users/" + sessionStorage.getItem("user") + "/Favorites"
    );
    return data;
  }

  ///// Chat Sessions

  async CreateChatSession(item: Announcements) {
    let currentUser = JSON.parse(sessionStorage.getItem("userInfo"));
    let session = currentUser.mail;
    this.db
      .doc(
        "Users/" +
          sessionStorage.getItem("user") +
          "/Chats/" +
          item.userMail +
          "-" +
          session
      )
      .set(item);
  }
}
