import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HorizontalMenuComponent, LayoutComponent, VerticalMenuComponent } from '@components';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@shared';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '@interceptors';
import { AuthGuard } from '@guards';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxStripeSubscriptionModule } from 'ngx-stripe-subscription';
import { environment } from '@env/environment';

@NgModule({
  declarations: [AppComponent, LayoutComponent, HorizontalMenuComponent, VerticalMenuComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    PerfectScrollbarModule,
    NgxStripeSubscriptionModule.forRoot({
      apiURL: environment.apiURL,
      STRIPE_PUBLIC_KEY: environment.STRIPE_PUBLIC_KEY,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
