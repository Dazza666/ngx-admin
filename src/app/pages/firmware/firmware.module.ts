import { NgModule } from '@angular/core';
import { NbCardModule, NbTabsetModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { FirmwareComponent } from './firmware.component';

@NgModule({
  imports: [
    Ng2SmartTableModule,
    NbTabsetModule,
    NbCardModule,
    ThemeModule,
  ],
  declarations: [
    FirmwareComponent,
  ],
})
export class FirmwareModule { }
