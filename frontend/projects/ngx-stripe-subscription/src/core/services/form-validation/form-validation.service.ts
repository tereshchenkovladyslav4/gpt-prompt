import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  isBlank(control: FormControl) {
    return control && control.value && control.value.trim() ? null : { blank: true };
  }

  arePasswordsMismatching(control: FormControl) {
    return control.value && control.parent && control.value === control.parent.get('password')?.value
      ? null
      : {
          passwordsMismatch: true,
        };
  }

  checkError(form: FormGroup, field: string, error: string | string[]) {
    if (Array.isArray(error)) {
      return error.some(
        (err) => form.get(field)?.hasError(err) && (form.get(field)?.dirty || form.get(field)?.touched),
      );
    } else {
      return form.get(field)?.hasError(error) && (form.get(field)?.dirty || form.get(field)?.touched);
    }
  }
}
