// export interface FormConfig {
//     controls: FormControlConfig[];
//   }
  
//   export interface FormControlConfig {
//     key: string;
//     label: string;
//     type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox';
//     value?: string | number | boolean;
//     options?: { value: string; label: string }[];
//     validations?: ValidationRule[];
//     order?: number;
//   }
  
//   export interface ValidationRule {
//     validator: 'required' | 'minLength' | 'maxLength' | 'pattern';
//     message: string;
//     value?: any;
//   }





// // src/app/models/form-config.model.ts
// export interface FormConfig {
//     controls: FormControlConfig[];
//   }
  
//   export interface FormControlConfig {
//     key: string;
//     label: string;
//     type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'date';
//     options?: { value: string; label: string }[];
//     validations?: ValidationRule[];
//     order?: number;
//     value?: string | number | boolean;
//   }
  
//   export interface ValidationRule {
//     validator: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max';
//     message: string;
//     value?: any;
//   }






export interface FormConfig {
    controls: FormControlConfig[];
  }
  
  export interface FormControlConfig {
    key: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'date' | 'textarea' | 'radio' | 'datetime-local' |'file';
    options?: { value: string; label: string }[];
    validations?: ValidationRule[];
    order?: number;
    value?: string | number | boolean;
  }
  
  export interface ValidationRule {
    validator: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max';
    message: string;
    value?: any;
  }