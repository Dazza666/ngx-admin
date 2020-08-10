import { NgModule } from '@angular/core';
import { NbCardModule, NbTabsetModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { UserManagementComponent } from './userManagement.component';

@NgModule({
  imports: [
    Ng2SmartTableModule,
    NbTabsetModule,
    NbCardModule,
    ThemeModule,
  ],
  declarations: [
    UserManagementComponent,
  ],
})
export class UserManagementModule { }
