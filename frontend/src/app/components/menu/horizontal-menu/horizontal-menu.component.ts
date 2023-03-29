import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { MenuService } from '@services';
import { Router } from '@angular/router';
import { Menu } from '@models';

@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HorizontalMenuComponent implements OnInit, OnChanges {
  @Input('menuParentId') menuParentId: number | undefined;
  public menuItems: Array<Menu> | undefined;

  constructor(public menuService: MenuService, public router: Router) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['menuParentId']) {
      this.menuItems = this.menuService.getHorizontalMenuItems().filter((item) => item.parentId == this.menuParentId);
    }
  }
}
