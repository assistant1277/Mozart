import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormConfig } from './models/form-config.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormConfigService {
  constructor(private http: HttpClient) {}

  getFormConfig() {
    return this.http.get<FormConfig>('assets/form-config.json').pipe(
      map(config => ({
        ...config,
        controls: config.controls.sort((a, b) => (a.order || 0) - (b.order || 0))
      }))
    );
  }
}