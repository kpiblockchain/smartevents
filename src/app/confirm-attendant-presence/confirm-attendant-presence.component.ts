import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-attendant-presence',
  templateUrl: './confirm-attendant-presence.component.html',
  styleUrls: ['./confirm-attendant-presence.component.css']
})
export class ConfirmAttendantPresenceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmAttendantPresenceComponent>) { }

  ngOnInit() {
  }

}
