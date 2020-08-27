import { Component, Input,} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { RadioOptions } from './RadioOptions';

@Component({
    template: `
    <nb-card class="dialog-card">
      <nb-card-header>{{ title }}</nb-card-header>
      <nb-card-body>
      <nb-radio-group [(value)] = "selectedOption" status = {{status}}>
      <nb-radio 
        *ngFor="let option of options;"
        [checked] = "option.checked"
        [value]="option.value"
        name="decision">
        {{ option.label }}
      </nb-radio>
    </nb-radio-group>
      </nb-card-body>
      <nb-card-footer>
        <button class="float-right" nbButton status="danger" (click)="dismiss()">Cancel</button>
        <button nbButton float-right status="success" (click)="confirm(selectedOption)">Ok</button>
      </nb-card-footer>
    </nb-card>
  `,
})

export class DialogComponent {
    @Input() title: string;
    @Input() options: RadioOptions[];
    @Input() status: string;

    //The varible that will be written to when the user clicks a selection
    selectedOption: string;

    constructor(protected ref: NbDialogRef<DialogComponent>) {
    }

    ngOnInit() {
    //On init we pre populate the selected option with what has been passed in as the checked value
    this.options.forEach(radioOption => {
        if (radioOption.checked) {
            this.selectedOption = radioOption.value;
        }
    }) 
    }

    dismiss() {
        this.ref.close();
    }

    confirm(value) {
        this.ref.close(value);
    }
}