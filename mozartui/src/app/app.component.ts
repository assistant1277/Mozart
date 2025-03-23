import { Component } from '@angular/core';
import { FormConfigService } from './form-config.service';
import { FormConfig } from './models/form-config.model';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-5">
      <app-dynamic-form *ngIf="formConfig" [config]="formConfig.controls"></app-dynamic-form>
    </div>
  `
})
export class AppComponent {
  formConfig?: FormConfig;

  constructor(private configService: FormConfigService) {
    this.configService.getFormConfig().subscribe((config: FormConfig) => {
      this.formConfig = config;
    });
  }
}