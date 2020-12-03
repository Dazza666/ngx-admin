import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  template: `
    <nb-card class="dialog-card">
      <nb-card-header class="text-center">{{ title }}</nb-card-header>
      <nb-card-body>
      {{ content }}
      </nb-card-body>
      <nb-card-footer class="text-center">
        <button nbButton status="primary" (click)="dismiss()">Ok</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class ShowcaseDialogComponent {
  @Input() title: string;
  @Input() content: string;

  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>) {
  }

  dismiss() {
    this.ref.close();
  }
}