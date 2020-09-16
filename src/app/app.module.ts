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
    AuthGuard
  ]

})
export class AppModule {
}
