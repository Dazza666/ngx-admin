import { NgModule } from '@angular/core';
import { NbCardModule, NbTabsetModule, NbSpinnerModule, NbSearchModule, NbInputModule, NbFormFieldModule, NbIconModule, NbAccordionModule} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../@theme/theme.module';
import { AisConfigsComponent } from './aisConfigs.component';
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
  ],
  declarations: [
    AisConfigsComponent,
  ],
})
export class AisConfigsModule { }
