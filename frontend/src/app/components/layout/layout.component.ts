import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthService, MediaService } from '@services';
import { UserInfo } from '@models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { environment } from '@env/environment';
import { DOCUMENT } from '@angular/common';

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

  constructor(
    public mediaService: MediaService,
    public authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

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

  toggleSidenav() {
    this.sidenav.toggle();
  }

  closeSubMenus() {
    let menu = this.document.querySelector('.sidenav-menu-outer');
    if (menu) {
      for (let i = 0; i < menu.children[0].children.length; i++) {
        let child = menu.children[0].children[i];
        if (child) {
          if (child.children[0].classList.contains('expanded')) {
            child.children[0].classList.remove('expanded');
            child.children[1].classList.remove('show');
          }
        }
      }
    }
  }

  logout() {
    this.authService.logout();
    this.closeMenu();
  }
}
