import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { Day } from '../models/day.model';

@Injectable({
  providedIn: 'root',
})
export class AddAppointmentService {
  private calendar: Day[] = [];

  constructor() {}

  addAppointment(day: Date, appointment: Appointment): void {
    const dayIndex = this.calendar.findIndex(
      (d) =>
        d.date.getDate() === day.getDate() &&
        d.date.getMonth() === day.getMonth() &&
        d.date.getFullYear() === day.getFullYear()
    );

    if (dayIndex !== -1) {
      this.calendar[dayIndex].appointments.push(appointment);
    } else {
      this.calendar.push({
        date: day,
        appointments: [appointment],
      });
    }
  }

  getAppointmentsForDay(day: Date): Appointment[] {
    const foundDay = this.calendar.find(
      (d) =>
        d.date.getDate() === day.getDate() &&
        d.date.getMonth() === day.getMonth() &&
        d.date.getFullYear() === day.getFullYear()
    );

    return foundDay ? foundDay.appointments : [];
  }
  // Get all appointments
  getAppointments(): Day[] {
    return this.calendar;
  }
  setCalendar(appointments: Day[]): void {
    this.calendar = appointments;
  }
}
