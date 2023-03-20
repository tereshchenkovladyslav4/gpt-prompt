import { Component, OnInit } from '@angular/core';
import { AuthService, DialogService } from '@services';
import { Router } from '@angular/router';
import { TemplateDialogComponent } from '@modules/template/components/template-dialog/template-dialog.component';
import { DialogType } from '@enums';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private authService: AuthService, private dialogService: DialogService, private router: Router) {}

  ngOnInit() {}

  openTemplateDialog() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.dialogService
      .open(TemplateDialogComponent, {
        data: { dialogType: DialogType.TEMPLATE },
        width: '800px',
      })
      .afterClosed()
      .subscribe((res) => {});
  }
}
