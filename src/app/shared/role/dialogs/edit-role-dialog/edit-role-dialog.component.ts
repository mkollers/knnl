import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { Role } from '../../../data-access/models/role';

@Component({
  selector: 'knnl-edit-role-dialog',
  templateUrl: './edit-role-dialog.component.html',
  styleUrls: ['./edit-role-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRoleDialogComponent {
  fg: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public role: Role,
    fb: FormBuilder
  ) {
    this.fg = fb.group({
      name: fb.control(role.name, Validators.required),
      description: fb.control(role.description)
    });
  }

  finish() {
    const role: Role = this.fg.value;
    this.dialogRef.close(role);
  }

}
