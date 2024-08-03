import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {MovingOrder} from "../../../features/moving/models/moving-order";
import {collection, doc, Firestore, getDocs, getFirestore, serverTimestamp, setDoc} from "@angular/fire/firestore";
import {MovingType} from "../../../features/moving/enums/moving-type";
import {environment} from "../../../../environments/environment.development";


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  db: Firestore;
  constructor( private router: Router) {
    this.db = getFirestore();
  }

  async getMovingOrders() {
    return collection(this.db, 'moving_order');
  }

  async loadMovingOrders(): Promise<MovingOrder[]> {
    let movingOrders: MovingOrder[] = [];
    const collectionRef = collection(this.db, environment.firebaseConstants.orderCollection);
    await getDocs(collectionRef).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let movingOrder = this.convertToMovingOrder(doc.data());
        movingOrders = [...movingOrders, movingOrder];
      });
    })
    return movingOrders;
  }

  convertToMovingOrder(data: any): MovingOrder {
    return {
      id: data.id,
      type: data.type,
      status: data.status,
      trip: data.trip,
      movingDate: data.movingDate.toDate(),
      contact: data.contact,
      property: data.property,
      bulkyItems: data.bulkyItems,
      payload: data.payload,
      createdAt: data.createdAt.toDate()
    };
  }

  async save(movingOrder: MovingOrder) {
    const movingOrderRef = doc(this.db, environment.firebaseConstants.orderCollection, movingOrder.id);
    await setDoc(movingOrderRef, {...movingOrder, createdAt: serverTimestamp()});
    if(movingOrder.type == MovingType.Residential) {
      await  this.sendEmail(movingOrder, 'moving_summary');
    }else{
      await this.sendEmail(movingOrder, 'small_moving_summary');
    }
  }

  async sendEmail(movingOrder: MovingOrder, template: string) {
    const emailRef = doc(this.db, "email");
    await setDoc(emailRef, {
      from: environment.companyEmail,
      to: movingOrder.contact.email,
      template: {
        name: template,
        data: {
          from: movingOrder.trip.from,
          to: movingOrder.trip.to,
          movingDate: movingOrder.movingDate.toDateString(),
          residentialType: movingOrder.property.residentialType,
          rooms: movingOrder.property.rooms,
          piano: movingOrder.bulkyItems.piano,
          marbleFurniture: movingOrder.bulkyItems.marbleFurniture,
          refrigerator: movingOrder.bulkyItems.refrigerator
        }
      },
    });
  }
}
