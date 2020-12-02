import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, share, take } from 'rxjs/operators';
import { NbAuthService, NbAuthToken } from '@nebular/auth';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './roleManagement.component.html',
})
export class RoleManagementComponent {

  createEmail: string;
  createPassword: string;


  onKeyUpEventAddEmail(event: any) {

  }

  onKeyUpEventCreatePassword(event: any) {

  }
  

}
