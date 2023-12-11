import { Appointment } from "./appointment.model";

export interface Day {
  date: Date;
  appointments: Appointment[];
}
