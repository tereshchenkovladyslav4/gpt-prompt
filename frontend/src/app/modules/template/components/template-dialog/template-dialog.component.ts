import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData, Template } from '@models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService, TemplateApiService } from '@services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './template-dialog.component.html',
  styleUrls: ['./template-dialog.component.scss'],
})
export class TemplateDialogComponent implements OnInit {
  public submitted: boolean = false;
  public infoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formValidationService: FormValidationService,
    private templateApiService: TemplateApiService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<TemplateDialogComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData<Template>,
  ) {
    this.infoForm = this.fb.group({
      id: this.data.data?.id,
      title: [this.data.data?.title || '', [Validators.required, this.formValidationService.isBlank]],
      content: [
        this.data.data?.content || '',
        [Validators.required, Validators.maxLength(500), this.formValidationService.isBlank],
      ],
    });
  }

  ngOnInit() {}

  checkError(form: FormGroup, field: string, error: string | string[]) {
    return this.formValidationService.checkError(form, field, error);
  }

  submitForm() {
    if (this.infoForm.valid) {
      this.submitted = true;
      this.templateApiService.saveTemplate(this.infoForm.value).subscribe((res) => {
        if (!res.success) {
          this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
          return;
        }
        this.submitted = false;
        this.dialogRef.close(res.result);
      });
    }
  }
}
