import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@components';
import { PricingComponent } from 'ngx-stripe-subscription';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'signup',
        loadChildren: () => import('./modules/signup/signup.module').then((m) => m.SignupModule),
      },
      {
        path: 'login',
        loadChildren: () => import('./modules//login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'pricing',
        component: PricingComponent,
      },
      {
        path: '',
        loadChildren: () => import('./modules/template/template.module').then((m) => m.TemplateModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
