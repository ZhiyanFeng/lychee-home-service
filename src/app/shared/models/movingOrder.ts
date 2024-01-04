import {Trip} from "./trip";
import {Property} from "./property";
import {BulkyItems} from "./bulkyItems";
import {Contact} from "./contact";

export interface MovingOrder {
  trip: Trip;
  property: Property;
  bulkyItems: BulkyItems;
  movingDate: Date;
  contact: Contact;
}
