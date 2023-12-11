import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Appointment } from '../../models/appointment.model';
import { Day } from '../../models/day.model';
import { AddAppointmentService } from '../../services/add-appointment.service';
import { StorageManagerService } from '../../services/storage-manager.service';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <h2 mat-dialog-title>Add Appointment</h2>
    <h3 mat-dialog-title>{{ appointmentDay.date | date : 'fullDate' }}</h3>
    <mat-dialog-content>
      <form [formGroup]="appointmentForm" (ngSubmit)="onFormSubmit()">
        <mat-form-field appearance="fill">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" />
        </mat-form-field>
        <!-- Add more fields as needed -->

        <div class="actions">
          <button mat-button mat-dialog-close>Cancel</button>
          <button
            mat-button
            color="primary"
            [disabled]="!appointmentForm.valid"
          >
            Save
          </button>
        </div>
      </form>
    </mat-dialog-content>
  `,
  styles: [
    `
      mat-form-field {
        width: 100%;
        margin-bottom: 1rem;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;

        button {
          margin-left: 0.5rem;
        }
      }
    `,
  ],
})
export class AddAppointmentComponent {
  appointmentForm!: FormGroup;
  appointmentDay!: Day;
  // Data Getter
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _appointmentService: AddAppointmentService,
    private _storageManager: StorageManagerService
  ) {}

  ngOnInit(): void {
    this.appointmentForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });

    this.appointmentDay = this.data.day;
    console.log(this.appointmentDay.date);
  }

  onFormSubmit(): void {
    if (this.appointmentForm.valid) {
      this._appointmentService.addAppointment(
        this.appointmentDay.date,
        this.appointmentForm.value as Appointment
      );
    }

    this._storageManager.save(
      'calendar',
      this._appointmentService.getAppointments()
    );

    this.appointmentForm.reset();
  }
}
