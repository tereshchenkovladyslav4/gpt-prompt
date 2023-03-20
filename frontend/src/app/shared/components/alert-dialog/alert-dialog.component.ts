import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '@models';
import { DialogType } from '@enums';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss'],
})
export class AlertDialogComponent implements OnInit {
  readonly DialogType = DialogType;

  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {}

  onNoClick(result: string): void {
    this.dialogRef.close(result);
  }
}
