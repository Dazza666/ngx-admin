import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbRadioModule, } from '@nebular/theme';
import { DialogComponent } from './dialog.component';
import { ShowcaseDialogComponent } from './showcase-dialog.component';

@NgModule({
  declarations: [
    DialogComponent,
    ShowcaseDialogComponent,
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
    ShowcaseDialogComponent,
  ],
})
export class DialogModule {}