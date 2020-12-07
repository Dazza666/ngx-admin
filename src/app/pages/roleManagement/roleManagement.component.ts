import { Component, ContentChild, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { NbToastrService, NbComponentStatus, NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../components/showcase-dialog.component';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './roleManagement.component.html',
  styleUrls: ['./roleManagement.component.scss'],
})
export class RoleManagementComponent {

  angularFireFunctions: AngularFireFunctions;
  data$: Observable<any>;
  user$: Observable<any>;
  //The object that will hold the user registration information
  userRegistration: any;
  //not a comphrensive, but good enough email reg ex
  emailPattern = "^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$";
  //Is the form submitted?
  submitted: boolean;
  //Dictionary for our password generation
  dictionary = "ABCDEFGHIJKLMNOPWRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@?&="
  //The array version of our dictionary
  dictionaryArray = [];
  //The length of the generated password
  passwordLength = 8;
  //The roles object that will contain the user role options
  roles: string[];
  //The email address used when searching for a user
  userEmailSearch: string;
  //The searched for users role
  userEditRole: string;
  //The loading state of the system
  loading = false;
  //The flag to set when a searched for user has not been found
  noResultsFound: boolean;

  @ViewChild('jeffery', { static: true }) accordion;

  constructor(private fns: AngularFireFunctions, private toastrService: NbToastrService, private dialogService: NbDialogService) {
    this.angularFireFunctions = fns;
    this.userRegistration = {};
    this.submitted = false;
    this.dictionaryArray = [].concat(this.dictionary.split(""));
    //Assign the roles that are available as selections
    this.roles = ['Customer', 'Dealer', 'Admin',];
    //Set our default role
    this.userRegistration.role = this.roles[0];
  }

  isLoading() {
    return this.loading;
  }

  setLoading(isLoading) {
    this.loading = isLoading;
  }

  generatePassword() {
    // Generate random password from array
    var newPassword = "";
    for (var i = 0; i < this.passwordLength; i++) {
      newPassword += this.dictionaryArray[Math.floor(Math.random() * this.dictionary.length)];
    }
    this.userRegistration.password = newPassword;
  }

  showToast(status: NbComponentStatus, email: String, message: String) {
    this.toastrService.show(
      email,
      message,
      { status });
  }

  showFailure(message, dialogService): void {
    dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'Registration Failure!',
        content: message,
      },
    });
  }

  createUser() {
    this.submitted = true;
    //Get a reference to the function
    const callable = this.angularFireFunctions.httpsCallable('createUser');
    //Lets get the payload ready...
    //pull out and assign the local vars
    const userEmail = this.userRegistration.email;
    const userPassword = this.userRegistration.password;
    const role = this.userRegistration.role;
    //Create an empty payload object
    var payload = {};
    //Populate said object with our local vars
    payload['email'] = userEmail;
    payload['pass'] = userPassword;
    //If a role has been selected, and its not a plain old customer - send the role to the server as well
    if (role != 'customer') {
      payload['role'] = role;
    }

    //Load up our callable with the payload (its not sent yet)
    this.data$ = callable(payload);

    //Fire our payload to the server and see whats returned
    this.data$.toPromise().then((responce) => {
      console.log('created new user: ' + responce.result);
      //Great, we have a user created, reset the form now...
      this.showToast('success', `Account ${userEmail} created`, 'Account Created!');
      this.submitted = false;
    }).catch((error) => {
      console.log('Error creating new user: ' + error);
      this.showFailure(error, this.dialogService);
      //Something has gone wrong...leave everything as it is but tell the user.
      this.submitted = false;
    });
  }

  searchUser() {
    this.noResultsFound = false;
    this.setLoading(true);
    //Get a reference to the function
    const callable = this.angularFireFunctions.httpsCallable('getUser');

    var payload = {};
    payload['email'] = this.userEmailSearch;

    this.user$ = callable(payload).pipe(tap(ev => {
      this.setLoading(false);
      this.setRole(ev.record.customClaims);
    })).pipe(catchError(err => {
      this.setLoading(false);
      this.noResultsFound = true;
      console.log('Handling error locally and rethrowing it...', err);
      return throwError(err);
    }));
  }

  setAccountDisabled(uid, isDisabled) {
    this.setLoading(true);
    //Get a reference to the function
    const callable = this.angularFireFunctions.httpsCallable('setAccountDisabled');

    var payload = {};
    payload['isDisabled'] = isDisabled;
    payload['uid'] = uid;

    this.user$ = callable(payload).pipe(tap(ev => {
      this.setLoading(false);
      this.showToast('success', isDisabled ? 'Account Disabled!' : 'Account Enabled!', `Account Updated`);
    }));
  }

  updateUserRole(uid) {
    this.setLoading(true);
    //Get a reference to the function
    const callable = this.angularFireFunctions.httpsCallable('updateUserRole');

    var payload = {};
    payload['uid'] = uid;
    if (this.userEditRole != 'Customer') {
      payload['role'] = this.userEditRole;
    }

    this.user$ = callable(payload).pipe(tap(ev => {
      this.setLoading(false);
      this.showToast('success', `Role changed to: ${this.userEditRole}`, `Account Updated`);
    }));
  }

  setRole(role) {
    var userRole;
    //Theres only one role for now, so looping through everything is fine.
    Object.keys(role).forEach(function (key) {
      userRole = key;
    });

    if (userRole != null) {
      this.userEditRole = userRole;
    }
    else {
      //If we have no role, then we're a plain old customer
      this.userEditRole = 'Customer';
    }
    return true;
  }

}
