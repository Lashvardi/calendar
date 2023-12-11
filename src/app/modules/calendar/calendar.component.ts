import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAppointmentComponent } from '../standalone/add-appointment.component';
import { Day } from '../../models/day.model';
import { AddAppointmentService } from '../../services/add-appointment.service';
import { StorageManagerService } from '../../services/storage-manager.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Appointment } from '../../models/appointment.model';

const MAX_APPOINTMENTS = 3;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  events: Day[] = [];
  maxAppointments = MAX_APPOINTMENTS;
  today = new Date();
  private draggedAppointment: Appointment | null = null;
  private draggedFromDay: Day | null = null;

  constructor(
    public dialog: MatDialog,
    private _appointmentService: AddAppointmentService,
    private _storageManager: StorageManagerService
  ) {}

  ngOnInit(): void {
    this.loadAppointments();

    if (this.events.length === 0) {
      this.generateCalendarDays();
    }
  }
  loadAppointments(): void {
    const storedAppointments = this._storageManager.get('calendar');

    if (storedAppointments && storedAppointments.length > 0) {
      const convertedAppointments = storedAppointments.map((day: any) => ({
        ...day,
        // Serialize Date object to string (JSON.stringify does not work with Date objects)
        date: new Date(day.date),
        appointments: day.appointments.map((appointment: any) => ({
          ...appointment,
        })),
      }));

      this._appointmentService.setCalendar(convertedAppointments);
      console.log(
        'Loaded appointments from local storage:',
        convertedAppointments
      );
    }

    this.events = this._appointmentService.getAppointments();
  }

  isCurrentDay(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  drag(event: DragEvent, appointment: Appointment, day: Day): void {
    this.draggedAppointment = appointment;
    this.draggedFromDay = day;
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  drop(event: DragEvent, day: Day): void {
    event.preventDefault();
    if (this.draggedAppointment && this.draggedFromDay) {
      const index = this.draggedFromDay.appointments.indexOf(
        this.draggedAppointment
      );
      if (index > -1) {
        this.draggedFromDay.appointments.splice(index, 1);
      }

      day.appointments.push(this.draggedAppointment);

      this.draggedAppointment = null;
      this.draggedFromDay = null;

      this._storageManager.save('calendar', this.events);
    }
  }

  generateCalendarDays(): void {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    for (
      let day = startOfMonth;
      day <= endOfMonth;
      day.setDate(day.getDate() + 1)
    ) {
      this.events.push({ date: new Date(day), appointments: [] });
    }
  }

  openAppointmentDialog(day: any): void {
    const dialogRef = this.dialog.open(AddAppointmentComponent, {
      width: '400px',
      data: { day: day },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
