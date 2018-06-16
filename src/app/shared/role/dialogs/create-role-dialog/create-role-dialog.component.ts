import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { Role } from '../../../data-access/models/role';

@Component({
  selector: 'knnl-create-role-dialog',
  templateUrl: './create-role-dialog.component.html',
  styleUrls: ['./create-role-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRoleDialogComponent {
  fg: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateRoleDialogComponent>,
    fb: FormBuilder
  ) {
    this.fg = fb.group({
      name: fb.control('', Validators.required),
      description: fb.control('')
    });
  }

  finish() {
    const role: Role = this.fg.value;
    this.dialogRef.close(role);
  }
}
