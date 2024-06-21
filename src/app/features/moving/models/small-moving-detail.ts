import {MovingOrder} from "./moving-order";

export interface SmallMovingDetail{
  owner: string;
  from: string;
  to: string;
  distance: number;
  duration: number;
  shippingDate: Date;
  shipment: string[];
}
