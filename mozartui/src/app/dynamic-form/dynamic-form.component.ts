//corrected refer this only

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormControlConfig } from '../models/form-config.model';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnChanges {

  @Input() config!: FormControlConfig[];
  form!: FormGroup;

  paymentOptions: { value: string; label: string }[] = [];
  hospitalStates: { value: string; label: string }[] = [];
  hospitalCountryOptions: { value: string; label: string }[] = [];
  claimTypeOptions: { value: string; label: string }[] = [];
  subTypeOptions: { value: string; label: string }[] = [];
  casePriorityOptions: { value: string; label: string }[] = [];
  patientGenderOptions: { value: string; label: string }[] = [];
  patientRelationshipOptions: { value: string; label: string }[] = [];
  policyTypeOptions: { value: string; label: string }[] = [];

  claimCategoryOptions: { value: string; label: string }[] = [];
  selectSubTypeOptions: { value: string; label: string }[] = [];
  claimServiceTypeOptions: { value: string; label: string }[] = [];

  benefitGroupOptions: { value: string; label: string }[] = [];
  benefitTypeOptions: { value: string; label: string }[] = [];
  claimTypeOption: { value: string; label: string }[] = [];

  customerConsentOptions: { value: string; label: string }[] = [];
  claimStatusOptions: { value: string; label: string }[] = [];

  classOfAccommodationOptions: { value: string; label: string }[] = [];
  treatmentTypeOptions: { value: string; label: string }[] = [];
  lineOfTreatmentOptions: { value: string; label: string }[] = [];
  branchStateOptions: { value: string; label: string }[] = [];
  accountTypeOptions: { value: string; label: string }[] = [];


  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['config'] && this.config) {
      this.paymentOptions = this.config.find(c => c.key === 'paymentMode')?.options || [];
      this.hospitalStates = this.config.find(c => c.key === 'hospitalState')?.options || [];
      this.hospitalCountryOptions = this.config.find(c => c.key === 'hospitalCountry')?.options || [];
      this.claimTypeOptions = this.config.find(c => c.key === 'claimType')?.options || [];
      this.subTypeOptions = this.config.find(c => c.key === 'selectSubType')?.options || [];
      this.casePriorityOptions = this.config.find(c => c.key === 'casePriority')?.options || [];
      this.patientGenderOptions = this.config.find(c => c.key === 'patientGender')?.options || [];
      this.patientRelationshipOptions = this.config.find(c => c.key === 'patientRelationship')?.options || [];
      this.policyTypeOptions = this.config.find(c => c.key === 'policyType')?.options || [];

      this.claimCategoryOptions = this.config.find(c => c.key === 'claimCategory')?.options || [];
      this.selectSubTypeOptions = this.config.find(c => c.key === 'selectSubType')?.options || [];

      this.claimServiceTypeOptions = this.config.find(c => c.key === 'claimServiceType')?.options || [];

      this.benefitGroupOptions = this.config.find(c => c.key === 'benefitGroup')?.options || [];
      this.benefitTypeOptions = this.config.find(c => c.key === 'benefitType')?.options || [];
      this.claimTypeOption = this.config.find(c => c.key === 'claimType')?.options || [];

      this.customerConsentOptions = this.config.find(c => c.key === 'customerConsent')?.options || [];
      this.claimStatusOptions = this.config.find(c => c.key === 'claimStatus')?.options || [];
      this.classOfAccommodationOptions = this.config.find(c => c.key === 'classOfAccommodation')?.options || [];

      this.treatmentTypeOptions = this.config.find(c => c.key === 'treatmentType')?.options || [];
      this.lineOfTreatmentOptions = this.config.find(c => c.key === 'lineOfTreatment')?.options || [];
      this.branchStateOptions = this.config.find(c => c.key === 'branchState')?.options || [];
      this.accountTypeOptions = this.config.find(c => c.key === 'accountType')?.options || [];

      this.form = this.createForm();
    }
  }


  private createForm(): FormGroup {
    const group = this.fb.group({});
    
    this.config.forEach(control => {
      const validators: ValidatorFn[] = [];
      let defaultValue: any = control.value || '';

      // if (control.type === 'date') {
      //   if (control.value === 'today') {
      //     defaultValue = new Date().toISOString().split('T')[0];
      //   }
      // }


      // Handle date defaults
      // if (control.type === 'date' || control.type === 'datetime-local') {
      //   if (control.value === 'today') {
      //     const now = new Date();
      //     defaultValue = now.toISOString().slice(0, control.type === 'date' ? 10 : 16);
      //   }
      // }

       // Handle date/datetime defaults
       if (control.type === 'date' || control.type === 'datetime-local') {
        if (control.value === 'today' || control.value === 'now') {
          const now = new Date();
          if (control.type === 'date') {
            defaultValue = now.toISOString().split('T')[0];
          } else {
            // Adjust for datetime-local format (remove seconds and milliseconds)
            defaultValue = now.toISOString().slice(0, 16);
          }
        }
      }

      

      // if (control.type === 'date' || control.type === 'datetime-local') {
      //   if (control.value === 'today' || control.value === 'now') {
      //     defaultValue = new Date().toISOString().slice(0, control.type === 'date' ? 10 : 16);
      //   }
      // }

      if (control.validations) {
        control.validations.forEach(validation => {
          switch (validation.validator) {
            case 'required':
              validators.push(Validators.required);
              break;
            case 'minLength':
              validators.push(Validators.minLength(validation.value || 3));
              break;
            case 'maxLength':
              validators.push(Validators.maxLength(validation.value || 100));
              break;
            case 'pattern':
              validators.push(Validators.pattern(validation.value));
              break;
            // case 'min':
            //   const minDate = this.getDateValue(validation.value);
            //   validators.push(this.dateValidator(minDate, true));
            //   break;
            // case 'max':
            //   const maxDate = this.getDateValue(validation.value);
            //   validators.push(this.dateValidator(maxDate, false));
            //   break;
            case 'min':
            case 'max':
              const compareDate = this.getDateValue(validation.value, control.type);
              validators.push(this.dateTimeValidator(
                compareDate, 
                validation.validator === 'min',
                control.type
              ));
              break;
          }
        });
      }

      group.addControl(control.key, this.fb.control(defaultValue, validators));
    });
    
    return group;
  }

  // private getDateValue(value: any): Date | null {
  //   if (value === 'today') return new Date();
  //   if (value === 'policyStartDate') {
  //     const startDate = this.form?.get('policyStartDate')?.value;
  //     return startDate ? new Date(startDate) : null;
  //   }
  //   return value ? new Date(value) : null;
  // }


  // private getDateValue(value: any): Date | null {
  //   if (value === 'today') {
  //     const date = new Date();
  //     date.setHours(0, 0, 0, 0);
  //     return date;
  //   }
  //   if (value === 'policyStartDate') {
  //     const startDate = this.form?.get('policyStartDate')?.value;
  //     if (startDate) {
  //       const date = new Date(startDate);
  //       date.setHours(0, 0, 0, 0);
  //       return date;
  //     }
  //     return null;
  //   }
  //   if (value) {
  //     const date = new Date(value);
  //     date.setHours(0, 0, 0, 0);
  //     return date;
  //   }
  //   return null;
  // }

  private getDateValue(value: any, fieldType: string): Date | null {
    if (value === 'today' || value === 'now') {
      const now = new Date();
      if (fieldType === 'date') {
        now.setHours(0, 0, 0, 0);
      }
      return now;
    }
    
    if (value === 'policyStartDate') {
      const startDate = this.form?.get('policyStartDate')?.value;
      if (startDate) {
        const date = new Date(startDate);
        if (fieldType === 'date') {
          date.setHours(0, 0, 0, 0);
        }
        return date;
      }
      return null;
    }
    
    if (value) {
      const date = new Date(value);
      if (fieldType === 'date') {
        date.setHours(0, 0, 0, 0);
      }
      return date;
    }
    
    return null;
  }



  // private dateValidator(compareDate: Date | null, isMin: boolean): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     if (!compareDate || !control.value) return null;
      
  //     const inputDate = new Date(control.value);
  //     const compareDateUTC = Date.UTC(
  //       compareDate.getFullYear(), 
  //       compareDate.getMonth(), 
  //       compareDate.getDate()
  //     );
      
  //     const inputDateUTC = Date.UTC(
  //       inputDate.getFullYear(), 
  //       inputDate.getMonth(), 
  //       inputDate.getDate()
  //     );

  //     const isValid = isMin ? inputDateUTC >= compareDateUTC : inputDateUTC <= compareDateUTC;
      
  //     return isValid ? null : { dateValidation: true };
  //   };
  // }


  private dateValidator(compareDate: Date | null, isMinValidation: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!compareDate || !control.value) return null;

      const inputDate = new Date(control.value);
      inputDate.setHours(0, 0, 0, 0);

      // Clone compareDate to avoid mutation
      const compareDateCopy = new Date(compareDate);
      compareDateCopy.setHours(0, 0, 0, 0);

      const isValid = isMinValidation 
        ? inputDate >= compareDateCopy
        : inputDate <= compareDateCopy;

      return isValid ? null : { dateValidation: true };
    };
  }

  private dateTimeValidator(
    compareDate: Date | null,
    isMinValidation: boolean,
    fieldType: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!compareDate || !control.value) return null;

      const inputDate = new Date(control.value);
      const compareDateCopy = new Date(compareDate);

      if (fieldType === 'date') {
        // Compare dates only (ignore time)
        inputDate.setHours(0, 0, 0, 0);
        compareDateCopy.setHours(0, 0, 0, 0);
      }

      const isValid = isMinValidation 
        ? inputDate >= compareDateCopy
        : inputDate <= compareDateCopy;

      return isValid ? null : { dateValidation: true };
    };
  }

  getValidationErrors(controlKey: string): string[] {
    const control = this.form.get(controlKey);
    if (!control || !control.errors || !control.touched) return [];
    
    const errorMessages: string[] = [];
    const config = this.config.find(c => c.key === controlKey);
    if (!config?.validations) return [];

    Object.keys(control.errors).forEach(errorKey => {
      let validatorType = errorKey;
      switch (errorKey) {
        case 'minlength': 
          validatorType = 'minLength'; 
          break;
        case 'maxlength': 
          validatorType = 'maxLength'; 
          break;
        case 'dateValidation': 
          const isMin = config.validations?.some(v => v.validator === 'min');
          validatorType = isMin ? 'min' : 'max';
          break;
      }
      
      const validation = config.validations!.find(v => v.validator === validatorType);
      if (validation) errorMessages.push(validation.message);
    });

    return errorMessages;
  }

  // onSearch() {
  //   if (this.form.get('policyNumberSearch')?.valid) {
  //     const policyNumber = this.form.get('policyNumberSearch')?.value;
  //     console.log('Searching for policy:', policyNumber);
  //     // Add your search logic here (e.g., API call)
  //   }
  // }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Value:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}

