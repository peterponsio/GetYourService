import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Users } from "src/interfaces/users";
import { Announcements } from "src/interfaces/announcements";
import { EmailComposer } from "@ionic-native/email-composer/ngx";
import { Menssage } from "src/app/menssage";
import { Chat } from "src/interfaces/chat";
import { Sesion } from "src/interfaces/sesion";
import { DatePipe, JsonPipe } from "@angular/common";
import { Notifications } from "src/interfaces/notifications";
import { Router } from "@angular/router";
import { Tickets } from "src/interfaces/tickets";
import { from } from "rxjs";

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

  ticked: Tickets = {
    id: "",
    user_sender_id: "",
    date: "",
    topic: "",
    notes: "",
  };

  session: Sesion = {
    id: "",
    id_receiver: "",
    id_sender: "",
    id_announcement: "",
    creationDate: 0,
    receiver_userName: "",
    announcements: "",
    img: "",
  };

  notis: Notifications = {
    id: "notis",
    cant: 0,
  };

  constructor(
    private db: AngularFirestore,
    private datePipe: DatePipe,
    private router: Router,
    private emailComposer: EmailComposer
  ) {}

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
    console.log(item);
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

  /////REPORT ANNOUNCEMENT/////////////

  async ReportAnnouncement(item: Announcements) {
    item.reports = item.reports + 1;
    ///report  in main announcements
    this.db.doc("Announcements/" + item.id).update(item);

    //report  in user announcements
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
    this.session.id_announcement = item.id;
    this.session.announcements = item.tittle;
    this.session.img = item.Img;
    this.session.receiver_userName = item.userName;
    this.session.creationDate = parseInt(date);

    ////////////////////////////////////////////////////////////777
    this.db
      .doc(
        "Users/" + sessionStorage.getItem("user") + "/Chats/" + this.session.id
      )
      .set(this.session);
    ////Create the sesion in the announcement user owner
    this.db
      .doc("Users/" + item.userId + "/Chats/" + this.session.id)
      .set(this.session);

    ///ADD NOTIFICATION
    // this.GetNotifications(item.userId).then((data) => {
    //   let canti;
    //   data.valueChanges().subscribe((res) => {
    //     canti = res;
    //   });
    //   console.log(canti);
    // });

    // this.db
    //   .doc("Users/" + item.userId + "/Notifications/" + this.notis.id)
    //   .set(this.notis);

    /// Go to the sesion

    this.router.navigate(["mensagges", { data: JSON.stringify(this.session) }]);
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
    let sesionData: AngularFirestoreCollection = this.db.collection<Menssage>(
      "Users/" +
        sessionStorage.getItem("user") +
        "/Chats/" +
        sesion_id +
        "/Mensagges/"
    );

    return sesionData;
  }

  ///GET ALL NOTIS

  async GetNotifications(id_user: string) {
    let sesionData: AngularFirestoreCollection = this.db.collection<
      Notifications
    >("Users/" + id_user + "/Notifications/" + "notis");

    return sesionData;
  }

  ////DELETE CHAT SESION

  async DeleteOneChatSesion(sesion: Sesion) {
    ///Delete sesion
    console.log(sesion.id);
    this.db
      .doc("Users/" + sessionStorage.getItem("user") + "/Chats/" + sesion.id)
      .delete();
  }

  /////TICKETS FOR HELP

  async CreateNewTicked(topic: string, notes: string) {
    let myDate = new Date();
    let date = this.datePipe.transform(myDate, "yyyyMMddhhmmss");
    let dateFormat = this.datePipe.transform(myDate, "dd-MM-yyyy-hh-mm");

    this.ticked.id = "" + date;
    this.ticked.user_sender_id = sessionStorage.getItem("user");
    this.ticked.date = "" + dateFormat;
    this.ticked.topic = topic;
    this.ticked.notes = notes;
    this.db.doc("Tickets/" + this.ticked.id).set(this.ticked);
  }

  /////SUPPORT EMAIL
  async SendEmailSupport(topic: string, notes: string) {
    let myDate = new Date();
    let date = this.datePipe.transform(myDate, "yyyyMMddhhmmss");
    let dateFormat = this.datePipe.transform(myDate, "dd-MM-yyyy-hh-mm");
    // this.emailComposer.isAvailable().then((available: boolean) => {
    //   if (available) {
    //     //Now we know we can send
    //     console.log("HHHHHHHHHHH");
    //   }
    // });

    let email = {
      to: "pedrodeveloperera@gmail.com",
      cc: "",
      // bcc: ["john@doe.com", "jane@doe.com"],
      // attachments: [
      //   "file://img/logo.png",
      //   "res://icon.png",
      //   "base64:icon.png//iVBORw0KGgoAAAANSUhEUg...",
      //   "file://README.pdf",
      // ],
      subject:
        topic +
        "from user with id: " +
        sessionStorage.getItem("user") +
        " -- " +
        dateFormat,
      body: notes,
      isHtml: true,
    };

    // Send a text message using default options
    this.emailComposer.open(email);
  }

  ///EMAIL WITH USER IDEAS

  async SendEmailIdeas(topic: string, notes: string) {
    let myDate = new Date();
    let date = this.datePipe.transform(myDate, "yyyyMMddhhmmss");
    let dateFormat = this.datePipe.transform(myDate, "dd-MM-yyyy-hh-mm");
    // this.emailComposer.isAvailable().then((available: boolean) => {
    //   if (available) {
    //     //Now we know we can send
    //     console.log("HHHHHHHHHHH");
    //   }
    // });

    let email = {
      to: "pedrodeveloperera@gmail.com",
      cc: "",
      // bcc: ["john@doe.com", "jane@doe.com"],
      // attachments: [
      //   "file://img/logo.png",
      //   "res://icon.png",
      //   "base64:icon.png//iVBORw0KGgoAAAANSUhEUg...",
      //   "file://README.pdf",
      // ],
      subject:
        topic +
        "from user with id: " +
        sessionStorage.getItem("user") +
        " -- " +
        dateFormat,
      body: notes,
      isHtml: true,
    };

    // Send a text message using default options
    this.emailComposer.open(email);
  }

  ///USERS ERROR INFORMS

  async InfoError(topic: string, notes: string) {
    let myDate = new Date();
    let date = this.datePipe.transform(myDate, "yyyyMMddhhmmss");
    let dateFormat = this.datePipe.transform(myDate, "dd-MM-yyyy-hh-mm");

    this.ticked.id = "" + date;
    this.ticked.user_sender_id = sessionStorage.getItem("user");
    this.ticked.date = "" + dateFormat;
    this.ticked.topic = topic;
    this.ticked.notes = notes;
    this.db.doc("ErrorsInforms/" + this.ticked.id).set(this.ticked);
  }

  async DeleteUserFromDatabase() {
    var useid = JSON.stringify(sessionStorage.getItem("user"));

    ///DELETE GLOBAL ANNOUNCEMENTS OF THE USER
    //DELETE ANNOUNCEMENTS OF THE USER
    this.DeleteMyAnnouncements();

    // DELETE CHATS OF THE USER

    this.GetChatSessions().then((data) => {
      data.valueChanges().subscribe((res) => {
        var ListChats = res;
        ListChats.forEach((element) => {
          this.db
            .doc(
              "Users/" + sessionStorage.getItem("user") + "/Chats/" + element.id
            )
            .delete();
        });
      });
    });
    // DELETE FAVS LIST OF THE USER

    this.DeleteFavorites();

    this.db.doc("Users/" + sessionStorage.getItem("user")).delete();
  }

  async SupportChat() {
    let currentUser = JSON.parse(sessionStorage.getItem("userInfo"));

    let id = this.db.createId();

    //Create the sesion chat by a specific announcement
    let myDate = new Date();
    let date = this.datePipe.transform(myDate, "yyyyMMddhhmmss");

    this.session.id = "" + date;
    this.session.id_receiver = "KFrD595T0JNv7UqT8S2qHVf4y8d2";
    this.session.id_sender = sessionStorage.getItem("user");
    this.session.id_announcement = "KFrD595T0JNv7UqT8S2qHVf4y8d2";
    this.session.announcements = "Support Chat";
    this.session.img = "./assets/gys/logo_transparent.png";
    this.session.receiver_userName = currentUser.name;
    this.session.creationDate = parseInt(date);

    ////////////////////////////////////////////////////////////777
    this.db
      .doc(
        "Users/" + sessionStorage.getItem("user") + "/Chats/" + this.session.id
      )
      .set(this.session);
    ////Create the sesion in admin chats or support team
    this.db
      .doc(
        "Users/" + "KFrD595T0JNv7UqT8S2qHVf4y8d2" + "/Chats/" + this.session.id
      )
      .set(this.session);

    ///ADD NOTIFICATION
    // this.GetNotifications("KFrD595T0JNv7UqT8S2qHVf4y8d2").then((data) => {
    //   let canti;
    //   data.valueChanges().subscribe((res) => {
    //     canti = res;
    //   });
    //   console.log(canti);
    // });

    // this.db
    //   .doc(
    //     "Users/" +
    //       "KFrD595T0JNv7UqT8S2qHVf4y8d2" +
    //       "/Notifications/" +
    //       this.notis.id
    //   )
    //   .set(this.notis);

    /// Go to the sesion

    this.router.navigate(["mensagges", { data: JSON.stringify(this.session) }]);
  }
}
