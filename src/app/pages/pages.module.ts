import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { FirmwareModule } from './firmware/firmware.module';
import { UserManagementModule } from './userManagement/userManagement.module';
import { MmsiManagementModule } from './ais/mmsiManagement/mmsiManagement.module';
import { AisConfigsModule } from './ais/aisConfigs/aisConfigs.module';
import { SupportModule } from './support/v100/support.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    FirmwareModule,
    UserManagementModule,
    MmsiManagementModule,
    AisConfigsModule,
    SupportModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
