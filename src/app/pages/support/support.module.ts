import { NgModule } from '@angular/core';
import { NbAlertModule, NbButtonModule, NbCardModule, NbTabsetModule, NbSpinnerModule, NbSearchModule, NbInputModule, NbFormFieldModule, NbIconModule, NbAccordionModule, NbTooltipModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { SupportComponent } from './support.component';
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
    NbButtonModule,
    NbAlertModule,
  ],
  declarations: [
    SupportComponent,
  ],
})
export class AisConfigsModule { }
