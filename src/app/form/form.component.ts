import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  definitionForm!: FormGroup;
  products = {
    lorem: false,
    ipsum: false,
    // ... other products ...
  };
  excludeProducts = {
    lorem: false,
    ipsum: false,
    // ... other products ...
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.definitionForm = this.fb.group({
      marketingName: ['', Validators.required],
      technicalName: ['', Validators.required],
      description: ['', Validators.required],
      portal: ['', Validators.required],
      type: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      pricing: ['', Validators.required],
      connectPromotions: [false],
      backPromotions: [false],
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.definitionForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.definitionForm.valid) {
      // Handle your form submission logic here
      console.log(this.definitionForm.value);
    } else {
      // Handle form errors
      console.error('Form is not valid');
    }
  }
}
