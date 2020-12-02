import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FirmwareComponent } from './firmware/firmware.component';
import { UserManagementComponent } from './userManagement/userManagement.component';
import { RoleManagementComponent } from './roleManagement/roleManagement.component';
import { MmsiManagementComponent } from './ais/mmsiManagement/mmsiManagement.component';
import { AisConfigsComponent } from './ais/aisConfigs/aisConfigs.component';
import { SupportComponent } from './support/v100/support.component';
import { SupportComponent as SupportComponentE100 } from './support/e100/support.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'firmware',
      component: FirmwareComponent,
    },
    {
      path: 'user',
      component: UserManagementComponent,
    },
    {
      path: 'userRoles',
      component: RoleManagementComponent,
    },
    {
      path: 'ais/mmsi',
      component: MmsiManagementComponent,
    },
    {
      path: 'ais/aisConfigs',
      component: AisConfigsComponent,
    },
    {
      path: 'support/v100/v100',
      component: SupportComponent,
    },
    {
      path: 'support/v100/sr203',
      component: SupportComponent,
    },
    {
      path: 'support/e100/e100',
      component: SupportComponentE100,
    },

    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
