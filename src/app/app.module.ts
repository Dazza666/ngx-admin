/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NbDatepickerModule, NbDialogModule, NbMenuModule, NbSidebarModule, NbToastrModule, NbWindowModule, } from '@nebular/theme';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'; 
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NbFirebaseAuthModule, NbFirebasePasswordStrategy } from '@nebular/firebase-auth';
import { environment } from '../environments/environment';
import { AuthGuard } from './auth-guard.service';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { URL as DATABASE_URL } from '@angular/fire/database';
import { ORIGIN as FUNCTIONS_ORIGIN } from '@angular/fire/functions';
import { SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/firestore';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbEvaIconsModule,
    ThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbFirebaseAuthModule,
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NgxChartsModule,
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    // ...
    AuthGuard,
    {
      provide: DATABASE_URL,
      useValue: environment.useEmulators ? `http://localhost:9000?ns=${environment.firebase.projectId}` : undefined
    },
    { provide: FIRESTORE_SETTINGS, useValue: environment.useEmulators ? { host: 'localhost:8080', ssl: false } : {} },
    { provide: FUNCTIONS_ORIGIN, useValue: environment.useEmulators ? 'http://localhost:5001' : undefined },
    // { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },
    // { provide: USE_DATABASE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9100] : undefined },
    // { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
    // { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined },
  ]

})
export class AppModule {
}
