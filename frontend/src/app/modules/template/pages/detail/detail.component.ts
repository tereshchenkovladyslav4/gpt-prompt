import { Component, OnInit } from '@angular/core';
import { ContentEdit, Template } from '@models';
import { FormValidationService, TemplateApiService } from '@services';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContentType } from '@enums';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  readonly ContentType = ContentType;
  template: Template | undefined;
  contents: ContentEdit[] = [];
  infoForm: FormGroup;
  submitted: boolean = false;
  responseAnswer: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private templateApiService: TemplateApiService,
    private formValidationService: FormValidationService,
  ) {
    this.infoForm = this.fb.group({});
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const id = +(params.get('id') || 0);
        if (id) this.getTemplate(id);
      }
    });
  }

  checkError(form: FormGroup, field: string, error: string | string[]) {
    return this.formValidationService.checkError(form, field, error);
  }

  private getTemplate(id: number) {
    this.templateApiService.getTemplate(id).subscribe((res) => {
      if (!res.success) {
        this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
        return;
      }
      this.template = res.result;
      let contentStr = this.template?.content || '';
      this.contents = [];

      let index = 0;
      while (1) {
        const matches = /([^[]*.)(\[([A-Za-z0-9 _-]*)\])/g.exec(contentStr);
        if (!matches) {
          if (!!contentStr) {
            this.contents.push({
              title: contentStr,
              type: ContentType.STRING,
            });
          }
          break;
        }
        contentStr = contentStr.replace(matches[0], '');
        if (matches[1]) {
          this.contents.push({
            title: matches[1],
            type: ContentType.STRING,
          });
          index++;
        }
        if (matches[3]) {
          this.contents.push({
            title: matches[3],
            type: ContentType.KEYWORD,
          });

          this.infoForm.addControl(`${index++}`, new FormControl('', [Validators.required]));
        }
      }
    });
  }

  submitForm() {
    if (!this.infoForm.valid) {
      this.infoForm.markAllAsTouched();
      return;
    }

    const contentString = this.contents
      .map((item, index) => {
        if (item.type == ContentType.STRING) {
          return item.title;
        } else {
          return this.infoForm.value[index];
        }
      })
      .join('');

    this.submitted = true;
    this.templateApiService.getAnswer(contentString).subscribe((res) => {
      if (!res.success) {
        this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
        return;
      }
      this.submitted = false;
      this.responseAnswer = res.result || '';
    });
  }
}
