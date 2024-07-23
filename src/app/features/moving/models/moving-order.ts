import {Trip} from "./trip";
import {Property} from "./property";
import {BulkyItems} from "./bulkyItems";
import {Contact} from "../services/models/contact";
import {Observable} from "rxjs";

export interface MovingOrder {
  trip: Trip;
  movingDate: Date;
  contact: Contact;
}
export interface ResidentialMovingOrder extends MovingOrder{
  property: Property;
  bulkyItems: BulkyItems;
}
export interface SmallMovingOrder extends MovingOrder{
   payload: string[] | undefined;
}
