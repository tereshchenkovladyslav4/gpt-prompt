import { Component, OnInit } from '@angular/core';
import { ContentEdit, Template } from '@models';
import { FormValidationService, OpenaiApiService, TemplateApiService } from '@services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContentType } from '@enums';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
  initialParams: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private templateApiService: TemplateApiService,
    private openaiApiService: OpenaiApiService,
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

    this.initialParams = this.route.snapshot.queryParams;
  }

  checkError(form: FormGroup, field: string, error: string | string[]) {
    return this.formValidationService.checkError(form, field, error);
  }

  syncQueryParams() {
    this.infoForm.valueChanges.pipe(untilDestroyed(this)).subscribe((values: { [key: number]: string }) => {
      const params: { [key: string]: string } = {};
      Object.entries(values).forEach(([key, val]) => {
        const placeholder = this.contents[+key]?.title;
        if (placeholder && val) {
          params[placeholder] = val;
        }
      });

      this.router.navigate([`/${this.template?.id}`], {
        queryParams: params,
        queryParamsHandling: 'merge',
      });
    });
  }

  private getTemplate(id: number) {
    this.templateApiService.getTemplate(id).subscribe(
      (res) => {
        if (!res.success) {
          this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
          return;
        }
        this.template = res.result;
        let contentStr = this.template?.content || '';
        this.contents = [];
        this.infoForm = this.fb.group({});

        let index = 0;
        while (1) {
          const matches = /([^{]*.)(\{\{([A-Za-z0-9 _-]*)\}\})/g.exec(contentStr);
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

            this.infoForm.addControl(
              `${index++}`,
              new FormControl(this.initialParams[matches[3]] || '', [Validators.required]),
            );
          }
        }

        this.syncQueryParams();
      },
      (err: HttpErrorResponse) => {
        this.snackBar.open(err.message || '', 'Dismiss', { duration: 4000 });
      },
    );
  }

  submitForm() {
    if (!this.infoForm.valid) {
      this.infoForm.markAllAsTouched();
      return;
    }

    if (!this.template) return;
    this.submitted = true;
    this.openaiApiService.getCompletion(this.template.id, JSON.stringify(this.infoForm.value)).subscribe(
      (res) => {
        if (!res.success) {
          this.snackBar.open(res.message?.[0] || '', 'Dismiss', { duration: 4000 });
          return;
        }
        this.submitted = false;
        this.responseAnswer = res.result || '';
      },
      (err: HttpErrorResponse) => {
        this.submitted = false;
        this.snackBar.open(err.message || '', 'Dismiss', { duration: 4000 });
      },
    );
  }
}
