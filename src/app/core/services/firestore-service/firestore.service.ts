import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {MovingOrder, ResidentialMovingOrder} from "../../../features/moving/models/moving-order";

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore, private router: Router) { }

  save(moving_order: ResidentialMovingOrder){
    this.db.collection('moving_orders').add(moving_order).then(
      response => {
        this.db.collection('email').add({
          from: "lychee.home.service@gmail.com",
          to:  moving_order.contact.email,
          template: {
            name: 'moving_summary',
            data: {
              from: moving_order.trip.from,
              to: moving_order.trip.to,
              movingDate: moving_order.movingDate.toDateString(),
              residentialType: moving_order.property.residentialType,
              rooms: moving_order.property.rooms,
              piano: moving_order.bulkyItems.piano,
              marbleFurniture: moving_order.bulkyItems.marbleFurniture,
              refrigerator: moving_order.bulkyItems.refrigerator
            }
          },
        }).then( response => {
            this.router.navigate(['thankyou']);
          }
        )
      }
    ).catch(error=>{
      console.log(error);
    });
  }
}
