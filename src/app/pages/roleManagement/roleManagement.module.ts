import { NgModule } from '@angular/core';
import { NbCardModule, NbTabsetModule, NbSpinnerModule, NbSearchModule, NbInputModule, NbFormFieldModule, NbIconModule, NbAccordionModule, NbTooltipModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { RoleManagementComponent } from './roleManagement.component';
import { FormsModule as ngFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    Ng2SmartTableModule,
    NbTabsetModule,
    NbCardModule,
    ThemeModule,
    NbSpinnerModule,
    NbSearchModule,
    NbInputModule,
    ngFormsModule,
    NbFormFieldModule,
    NbIconModule, 
    NbAccordionModule,
    NbTooltipModule,
  ],
  declarations: [
    RoleManagementComponent,
  ],
})
export class RoleManagementModule { }
