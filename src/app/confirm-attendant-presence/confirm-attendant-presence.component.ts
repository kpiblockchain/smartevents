import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {AttendantVm} from '../attendant-vm';

@Component({
  selector: 'app-confirm-attendant-presence',
  templateUrl: './confirm-attendant-presence.component.html',
  styleUrls: ['./confirm-attendant-presence.component.css']
})
export class ConfirmAttendantPresenceComponent implements OnInit {
  displayedColumns = [ 'select', 'nick', 'address' ];
  dataSource = new MatTableDataSource<AttendantVm>();
  selection = new SelectionModel<AttendantVm>(true, []);

  constructor(public dialogRef: MatDialogRef<ConfirmAttendantPresenceComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataSource.data = data.attendants;
  }

  ngOnInit() {
  }

}
