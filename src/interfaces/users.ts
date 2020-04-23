import { Announcements } from "./announcements";

export interface Users {
  id: String;
  name: String;
  mail: String;
  password: String;
  credits: Number;
  Anouncements: Announcements;
}
