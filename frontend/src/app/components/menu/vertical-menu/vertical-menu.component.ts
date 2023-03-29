import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { MenuService } from '@services';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Menu } from '@models';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VerticalMenuComponent implements OnInit, OnChanges {
  @Input('menuParentId') menuParentId: number | undefined;
  @Output() onClickMenuItem: EventEmitter<any> = new EventEmitter<any>();
  public menuItems: Array<Menu> | undefined;

  constructor(public menuService: MenuService, public router: Router, @Inject(DOCUMENT) private doc: Document) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['menuParentId']) {
      this.menuItems = this.menuService.getVerticalMenuItems().filter((item) => item.parentId == this.menuParentId);
    }
  }

  onClick(menuId: number) {
    if (this.menuItems) {
      this.menuService.toggleMenuItem(menuId);
      this.menuService.closeOtherSubMenus(this.menuItems, menuId);
      this.onClickMenuItem.emit(menuId);
    }
  }
}
