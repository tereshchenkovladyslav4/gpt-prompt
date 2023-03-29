import { Inject, Injectable } from '@angular/core';
import { horizontalMenuItems, verticalMenuItems } from '@constants';
import { DOCUMENT, Location } from '@angular/common';
import { Router } from '@angular/router';
import { Menu } from '@models';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private location: Location, private router: Router, @Inject(DOCUMENT) private doc: Document) {}

  public getVerticalMenuItems(): Array<Menu> {
    return verticalMenuItems;
  }

  public getHorizontalMenuItems(): Array<Menu> {
    return horizontalMenuItems;
  }

  public expandActiveSubMenu(menu: Array<Menu>) {
    let routerLink = this.location.path(); // url.substring(1, url.length);
    let activeMenuItem = menu.filter((item) => item.routerLink === routerLink);
    if (activeMenuItem[0]) {
      let menuItem = activeMenuItem[0];
      while (menuItem.parentId != 0) {
        menuItem = menu.filter((item) => item.id == menuItem.parentId)[0];
        this.toggleMenuItem(menuItem.id);
      }
    }
  }

  public toggleMenuItem(menuId: number) {
    let menuItem = this.doc.getElementById('menu-item-' + menuId);
    let subMenu = this.doc.getElementById('sub-menu-' + menuId);
    if (subMenu) {
      if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
        menuItem?.classList.remove('expanded');
      } else {
        subMenu.classList.add('show');
        menuItem?.classList.add('expanded');
      }
    }
  }

  public closeOtherSubMenus(menu: Array<Menu>, menuId: number) {
    let currentMenuItem = menu.filter((item) => item.id == menuId)[0];
    if (currentMenuItem.parentId == 0 && !currentMenuItem.target) {
      menu.forEach((item) => {
        if (item.id != menuId) {
          let subMenu = this.doc.getElementById('sub-menu-' + item.id);
          let menuItem = this.doc.getElementById('menu-item-' + item.id);
          if (subMenu) {
            if (subMenu.classList.contains('show')) {
              subMenu.classList.remove('show');
              menuItem?.classList.remove('expanded');
            }
          }
        }
      });
    }
  }
}
