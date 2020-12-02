import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, share, take } from 'rxjs/operators';
import { NbAuthService, NbAuthToken } from '@nebular/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './roleManagement.component.html',
})
export class RoleManagementComponent {

  createEmail: string;
  createPassword: string;
  angularFireFunctions: AngularFireFunctions;
  data$: Observable<any>;
  productRegistration: any;
  emailPattern = "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
  constructor(private fns: AngularFireFunctions) {
    this.angularFireFunctions = fns;
    this.productRegistration = {};
    this.productRegistration.email = "";
  }

  onKeyUpEventAddEmail(event: any) {
    this.createEmail = event.target.value;
  }

  onKeyUpEventCreatePassword(event: any) {
    this.createPassword = event.target.value;
  }

  createUser() {
    //Get a reference to the function
    const callable = this.angularFireFunctions.httpsCallable('createUser');
    //Lets get the payload ready
    this.data$ = callable({ email: 'test21@test.com', pass: 'meow', role: 'admin', });

    this.data$.toPromise().then(function (responce) {
      console.log('created new user: ' + responce.result);
    }).catch(function (error) {
      console.log('Error creating new user: ' + error);
    });

    // this.data$.pipe(
    //   map(userids => {
    //     console.log("here we go");
    //     console.log(userids);
    //   })).subscribe()
  }

}
