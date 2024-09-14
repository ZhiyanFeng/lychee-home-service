import {Timestamp} from "rxjs";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email?: string;
  phone?: string;
  picture?: string;
  address?: string;
}
