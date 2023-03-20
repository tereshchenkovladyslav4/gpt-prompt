import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, MediaService } from '@services';
import { UserInfo } from '@models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { environment } from '@env/environment';
@UntilDestroy()
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public serverUrl = environment.apiURL;
  @ViewChild('sidenav') sidenav: any;
  public user: UserInfo | undefined;
  public menuHidden = false;

  constructor(public mediaService: MediaService, public authService: AuthService) {}

  ngOnInit() {
    this.authService
      .getUserUpdates()
      .pipe(untilDestroyed(this))
      .subscribe((user) => (this.user = user));
  }

  closeMenu() {
    this.menuHidden = false;
  }

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  public toggleSidenav() {
    this.sidenav.toggle();
  }

  logout() {
    this.authService.logout();
    this.closeMenu();
  }
}
