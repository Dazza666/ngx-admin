import { NgModule } from '@angular/core';
import { NbAlertModule, NbButtonModule, NbCardModule, NbTabsetModule, NbSpinnerModule, NbSearchModule, NbInputModule, NbFormFieldModule, NbIconModule, NbAccordionModule, NbTooltipModule} from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';
import { SupportComponent } from './support.component';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
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
    NgxChartsModule,
  ],
  declarations: [
    SupportComponent,
  ],
})
export class SupportModule { }
