import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Users } from "src/interfaces/users";
import { Announcements } from "src/interfaces/announcements";

import { Menssage } from "src/app/menssage";
import { Chat } from "src/interfaces/chat";
import { Sesion } from "src/interfaces/sesion";
import { DatePipe } from "@angular/common";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root",
})
export class ManageDataService {
  listFavs: any;
  ListAnnouncements: any;

  mensagge: Chat = {
    id: "",
    id_receiver: "",
    id_sender: "",
    content: "",
    sendDate: 0,
    fav: false,
  };

  session: Sesion = {
    id: "",
    id_receiver: "",
    id_sender: "",
    creationDate: 0,
    receiver_userName: "",
    announcements: "",
    img: "",
  };

  constructor(private db: AngularFirestore, private datePipe: DatePipe) {}

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
    let myDate = new Date();
    let date = this.datePipe.transform(myDate, "dd-MM-yyyy-hh-mm");

    newAnnouncement.creationDate = date;

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

  //////Get loged user Data/////

  async getUserLogedData(id: string) {
    let data = this.db.collection<Users>("Users").doc(id);
    return data;
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

  ///Clear all favs
  async DeleteFavorites() {
    this.GetListFavorites().then((data) => {
      data.valueChanges().subscribe((res) => {
        this.listFavs = res;
        this.listFavs.forEach((element) => {
          this.db
            .doc(
              "Users/" +
                sessionStorage.getItem("user") +
                "/Favorites/" +
                element.id
            )
            .delete();
        });
      });
    });
  }

  /////Delete all the specific user announcements
  async DeleteMyAnnouncements() {
    this.GetMyAnnouncements().then((data) => {
      data.valueChanges().subscribe((res) => {
        this.ListAnnouncements = res;
        this.ListAnnouncements.forEach((element) => {
          this.db
            .doc(
              "Users/" +
                sessionStorage.getItem("user") +
                "/Announcements/" +
                element.id
            )
            .delete();
          this.db.doc("/Announcements/" + element.id).delete();
        });
      });
    });
  }
  //Delete 1 Announcement
  async DeleteOneAnnouncement(item: Announcements) {
    //Delete for all
    this.db.doc("/Announcements/" + item.id).delete();
    //Delete for the user
    this.db
      .doc(
        "Users/" + sessionStorage.getItem("user") + "/Announcements/" + item.id
      )
      .delete();
  }

  ////Get announcements of a specific  user
  async GetMyAnnouncements() {
    let data: AngularFirestoreCollection = this.db.collection<Announcements>(
      "Users/" + sessionStorage.getItem("user") + "/Announcements"
    );
    return data;
  }

  ///Edit Announcement

  async EditAnnouncement(item: Announcements) {
    ///Edit in main announcements
    this.db.doc("Announcements/" + item.id).set(item);

    //Edit in user announcements
    this.db
      .doc(
        "Users/" + sessionStorage.getItem("user") + "/Announcements/" + item.id
      )
      .set(item);
  }

  ///Chat Things and hacking xd
  ///// Chat Sessions

  async CreateChatSession(item: Announcements) {
    let currentUser = JSON.parse(sessionStorage.getItem("userInfo"));

    let id = this.db.createId();

    //Create the sesion chat by a specific announcement
    let myDate = new Date();
    let date = this.datePipe.transform(myDate, "yyyyMMddhhmmss");

    this.session.id = "" + date;
    this.session.id_receiver = item.userId;
    this.session.id_sender = sessionStorage.getItem("user");
    this.session.announcements = item.tittle;
    this.session.img = item.Img;
    this.session.receiver_userName = item.userName;
    this.session.creationDate = parseInt(date);

    ////////////////////////////////////////////////////////////777
    this.db
      .doc("Users/" + sessionStorage.getItem("user") + "/Chats/" + item.id)
      .set(this.session);
    ////Create the sesion in the announcement user owner
    this.db.doc("Users/" + item.userId + "/Chats/" + item.id).set(this.session);
  }

  ///Get all chat sesions chats of the user

  async GetChatSessions() {
    let sesionData: AngularFirestoreCollection = this.db.collection<Sesion>(
      "Users/" + sessionStorage.getItem("user") + "/Chats"
    );
    return sesionData;
  }

  //Send a new Mensagge Sender Part

  async NewMensaggeSender(sesion: Sesion, text: string) {
    // Create the mensagge in the sender part
    let myDate = new Date();
    let date = this.datePipe.transform(myDate, "yyyyMMddhhmmss");
    this.mensagge.id = "" + date;
    this.mensagge.id_sender = sesion.id_sender;
    this.mensagge.id_receiver = sesion.id_receiver;
    this.mensagge.fav = false;
    this.mensagge.sendDate = parseInt(date);
    this.mensagge.content = text;
    this.db
      .doc(
        "Users/" +
          sessionStorage.getItem("user") +
          "/Chats/" +
          sesion.id +
          "/Mensagges/" +
          this.mensagge.id
      )
      .set(this.mensagge);
    ////Create the mensagge in the receiver
    this.db
      .doc(
        "Users/" +
          sesion.id_receiver +
          "/Chats/" +
          sesion.id +
          "/Mensagges/" +
          this.mensagge.id
      )
      .set(this.mensagge);
  }

  //Send a new Mensagge

  async NewMensaggeReceiver(sesion: Sesion, text: string) {
    // Create the mensagge in the sender part
    let myDate = new Date();
    let date = this.datePipe.transform(myDate, "yyyyMMddhhmmss");
    this.mensagge.id = "" + date;
    this.mensagge.id_sender = sesion.id_receiver;
    this.mensagge.id_receiver = sesion.id_sender;
    this.mensagge.fav = false;
    this.mensagge.sendDate = parseInt(date);
    this.mensagge.content = text;
    this.db
      .doc(
        "Users/" +
          sessionStorage.getItem("user") +
          "/Chats/" +
          sesion.id +
          "/Mensagges/" +
          this.mensagge.id
      )
      .set(this.mensagge);
    ////Create the mensagge in the receiver
    this.db
      .doc(
        "Users/" +
          sesion.id_sender +
          "/Chats/" +
          sesion.id +
          "/Mensagges/" +
          this.mensagge.id
      )
      .set(this.mensagge);
  }

  ///Get all sesion mensagges  of the user

  async GetChatMensagges(sesion_id: string) {
    firebase
      .database()
      .ref(
        "Users/" +
          sessionStorage.getItem("user") +
          "/Chats/" +
          sesion_id +
          "/Mensagges/"
      )
      .on("value", function (snapshot) {
        console.log(snapshot.val());
      });

    let sesionData: AngularFirestoreCollection = this.db.collection<Menssage>(
      "Users/" +
        sessionStorage.getItem("user") +
        "/Chats/" +
        sesion_id +
        "/Mensagges/"
    );

    return sesionData;
  }
}
