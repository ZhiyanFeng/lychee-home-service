import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {MovingOrder, ResidentialMovingOrder, SmallMovingOrder} from "../../../features/moving/models/moving-order";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore, private router: Router) { }

  async save(residentialMovingOrder: ResidentialMovingOrder) {
    return this.db.collection('residential_moving_order').doc(residentialMovingOrder.contact.phone)
      .set(residentialMovingOrder).then(response =>{
        this.db.collection('email').add({
          from: "lychee.home.service@gmail.com",
          to: residentialMovingOrder.contact.email,
          template: {
            name: 'moving_summary',
            data: {
              from: residentialMovingOrder.trip.from,
              to: residentialMovingOrder.trip.to,
              movingDate: residentialMovingOrder.movingDate.toDateString(),
              residentialType: residentialMovingOrder.property.residentialType,
              rooms: residentialMovingOrder.property.rooms,
              piano: residentialMovingOrder.bulkyItems.piano,
              marbleFurniture: residentialMovingOrder.bulkyItems.marbleFurniture,
              refrigerator: residentialMovingOrder.bulkyItems.refrigerator
            }
          },
        });
      }
    )
  }

  async saveSmallMovingOrder(smallMovingOrder: SmallMovingOrder) {
    return this.db.collection('small_moving_order').add(smallMovingOrder).then(response =>{
      return this.db.collection('email').add({
        from: "lychee.home.service@gmail.com",
        to: smallMovingOrder.contact.email,
        template: {
          name: 'moving_summary',
          data: {
            from: smallMovingOrder.trip.from,
            to: smallMovingOrder.trip.to,
            movingDate: smallMovingOrder.movingDate.toDateString(),
            payload: smallMovingOrder.payload
          }
        },
      });
    })
  }
}
