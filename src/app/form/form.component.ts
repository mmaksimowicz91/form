import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  definitionForm!: FormGroup;
  excludedSelectedProducts: string[] = [];
  excludedSelectedClients: string[] = [];

  excludeProducts = {
    lorem: false,
    ipsum: false,
    sit: false,
    dolor: false,
    amet: false,
  };

  excludeClients = {
    aaron: false,
    bert: false,
    randy: false,
    emily: false,
    anne: false,
  };

  productsList: string[] = ['Lorem', 'Ipsum', 'Sit', 'Dolor', 'Amet'];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.definitionForm = this.fb.group({
      marketingName: ['', Validators.required],
      technicalName: ['', Validators.required],
      description: [''],
      portal: [''],
      type: [''],
      startDate: [''],
      endDate: [''],
      pricing: [''],
      connectPromotions: [false],
      backPromotions: [false],
      products: this.fb.array([
        this.fb.control(false), // Lorem
        this.fb.control(false), // Ipsum
        this.fb.control(false), // Sit
        this.fb.control(false), // Dolor
        this.fb.control(false), // Amet
      ]),
      excludedProducts: this.fb.array([
        this.fb.control(false), // Lorem
        this.fb.control(false), // Ipsum
        this.fb.control(false), // Sit
        this.fb.control(false), // Dolor
        this.fb.control(false), // Amet
      ]),
      clients: this.fb.array([
        this.fb.control(false), // Aaron
        this.fb.control(false), // Bert
        this.fb.control(false), // Randy
        this.fb.control(false), // Emily
        this.fb.control(false), // Anne
      ]),
      excludedClients: this.fb.array([
        this.fb.control(false), // Aaron
        this.fb.control(false), // Bert
        this.fb.control(false), // Randy
        this.fb.control(false), // Emily
        this.fb.control(false), // Anne
      ]),
    });
  }

  get products(): FormArray {
    return this.definitionForm.get('products') as FormArray;
  }

  get clients(): FormArray {
    return this.definitionForm.get('clients') as FormArray;
  }

  get excludedProducts(): FormArray {
    return this.definitionForm.get('excludedProducts') as FormArray;
  }

  get excludedClients(): FormArray {
    return this.definitionForm.get('excludedClients') as FormArray;
  }

  getSelectedProducts(): string[] {
    const productNames = ['Lorem', 'Ipsum', 'Sit', 'Dolor', 'Amet'];
    return productNames.filter((name, index) => this.products.at(index).value);
  }

  getSelectedClients(): string[] {
    const clientNames = ['Aaron', 'Bert', 'Randy', 'Emily', 'Anne'];
    return clientNames.filter((name, index) => this.clients.at(index).value);
  }

  getExcludedProducts(): { name: string; index: number }[] {
    const productNames = ['Lorem', 'Ipsum', 'Sit', 'Dolor', 'Amet'];
    return productNames
      .map((name, index) => ({ name, index }))
      .filter(({ name, index }) => !this.products.at(index).value);
  }

  getExcludedSelectedProducts(): string[] {
    const excludedProductInfo = this.getExcludedProducts();
    return excludedProductInfo
      .filter(({ name, index }) => this.excludedProducts.at(index).value)
      .map(({ name }) => name);
  }

  getExcludedClients(): { name: string; index: number }[] {
    const clientNames = ['Aaron', 'Bert', 'Randy', 'Emily', 'Anne'];
    return clientNames
      .map((name, index) => ({ name, index }))
      .filter(({ name, index }) => !this.clients.at(index).value);
  }

  getExcludedSelectedClients(): string[] {
    const excludedClientInfo = this.getExcludedClients();
    return excludedClientInfo
      .filter(({ name, index }) => this.excludedClients.at(index).value)
      .map(({ name }) => name);
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.definitionForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.definitionForm.valid) {
      console.log(this.definitionForm.value);
    } else {
      console.error('Form is not valid');
    }
  }
}
