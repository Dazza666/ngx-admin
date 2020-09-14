import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FirmwareComponent } from './firmware/firmware.component';
import { UserManagementComponent } from './userManagement/userManagement.component';
import { MmsiManagementComponent } from './ais/mmsiManagement/mmsiManagement.component';
import { AisConfigsComponent } from './ais/aisConfigs/aisConfigs.component';
import { SupportComponent } from './support/support.component';

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
      path: 'ais/mmsi',
      component: MmsiManagementComponent,
    },
    {
      path: 'ais/aisConfigs',
      component: AisConfigsComponent,
    },
    {
      path: 'support/support',
      component: SupportComponent,
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
