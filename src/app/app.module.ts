import { OverlayModule } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import * as Raven from 'raven-js';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './shared/auth/auth.module';
import { DataAccessModule } from './shared/data-access/data-access.module';
import { LayoutModule } from './shared/layout/layout.module';

registerLocaleData(localeDe, localeDeExtra);

Raven
  .config('https://d0d205afba434a84969b0c6f6741238f@sentry.io/1227633')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    console.error(err);
    if (environment.production) {
      Raven.captureException(err.originalError || err);
    }
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Material
    OverlayModule,
    MatIconModule,
    MatSidenavModule,

    // Firebase
    AngularFireModule.initializeApp(environment.firebase),

    // Custom
    AuthModule,
    DataAccessModule,
    LayoutModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    { provide: LOCALE_ID, useValue: 'de-DE' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
