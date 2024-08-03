import {Trip} from "./trip";
import {Property} from "./property";
import {BulkyItems} from "./bulkyItems";
import {Contact} from "../services/models/contact";
import {Nullable} from "primeng/ts-helpers";

export interface MovingOrder {
  id: string
  type: string;
  status:Nullable<string>;
  trip: Trip;
  movingDate: Date;
  contact: Contact;
  property?: Nullable<Property>;
  bulkyItems?: Nullable<BulkyItems>;
  payload?: Nullable<string[]>;
  createdAt?: Date;
}

