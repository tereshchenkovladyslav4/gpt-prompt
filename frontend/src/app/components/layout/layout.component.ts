import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { AuthService, MediaService } from '@services';
import { UserInfo } from '@models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { environment } from '@env/environment';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public serverUrl = environment.apiURL;
  @ViewChild('sidenav') sidenav: any;
  @ViewChild('sidenavPS') sidenavPS: PerfectScrollbarComponent | undefined;
  public user: UserInfo | undefined;
  public menuHidden = false;

  constructor(
    private router: Router,
    public mediaService: MediaService,
    public authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit() {
    this.authService
      .getUserUpdates()
      .pipe(untilDestroyed(this))
      .subscribe((user) => (this.user = user));

    this.router.events
      .pipe(untilDestroyed(this))
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (isPlatformBrowser(this.platformId)) {
          if (this.sidenav) {
            this.sidenav.close();
          }
          window.scrollTo(0, 0);
        }
      });
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

  public updatePS() {
    this.sidenavPS?.directiveRef?.update();
  }
}
