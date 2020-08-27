import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbRadioModule, } from '@nebular/theme';
import { DialogComponent } from './dialog.component';

@NgModule({
  declarations: [
    DialogComponent,
  ],
  imports: [
    CommonModule,
    NbDialogModule.forRoot(),
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbRadioModule,
  ],
  entryComponents: [
    DialogComponent,
  ],
})
export class DialogModule {}