import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { FormService } from '../services/form.service';
import { Router } from '@angular/router';
import { FormRecord } from '../models/formRecord.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  myForm!: FormGroup;
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
  bonusProducts: string[] = ['Consectetur', 'Adipiscing', 'Elit', 'Sed', 'Do'];

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private router: Router
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
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
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
      ]),
      excludedProducts: this.fb.array([
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
      ]),
      bonusProducts: [''],
      productLimits: [''],
      clients: this.fb.array([
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
      ]),
      excludedClients: this.fb.array([
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
        this.fb.control(false),
      ]),
      clientsLimits: [''],
    });
    const savedFormValue = localStorage.getItem('formDraft');
    if (savedFormValue) {
      try {
        const parsedValue = JSON.parse(savedFormValue);
        this.myForm.patchValue(parsedValue);
      } catch (error) {
        console.error('Error parsing form data from localStorage:', error);
      }
    }

    this.myForm.valueChanges.subscribe((values) => {
      localStorage.setItem('formDraft', JSON.stringify(values));
    });

    const currentRecord = this.formService.getCurrentRecord();
    if (currentRecord) {
      this.myForm.patchValue({
        marketingName: currentRecord.nazwa,
      });
    }
  }

  get products(): FormArray {
    return this.myForm.get('products') as FormArray;
  }

  get clients(): FormArray {
    return this.myForm.get('clients') as FormArray;
  }

  get excludedProducts(): FormArray {
    return this.myForm.get('excludedProducts') as FormArray;
  }

  get excludedClients(): FormArray {
    return this.myForm.get('excludedClients') as FormArray;
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
    return this.myForm.controls[controlName].hasError(errorName);
  }

  onStepChange(event: any, stepper: any) {
    if (
      (event.selectedIndex === 3 || event.selectedIndex === 4) &&
      (!this.myForm.controls['marketingName'].value ||
        !this.myForm.controls['technicalName'].value)
    ) {
      alert(
        'Proszę wypełnić pola "Marketing Name" i "Technical Name" przed przejściem do tego kroku.'
      );
      setTimeout(() => {
        stepper.selectedIndex = event.previousIndex;
      }, 0);
    }
  }

  submitForm() {
    if (this.myForm.valid) {
      const currentRecord = this.formService.getCurrentRecord();
      if (currentRecord) {
        currentRecord.nazwa = this.myForm.value.marketingName;
      } else {
        const newRecord: FormRecord = {
          no: this.formService.getRecords().length + 1,
          nazwa: this.myForm.value.marketingName,
        };
        this.formService.addRecord(newRecord);
      }
      this.router.navigate(['/home']);
      localStorage.removeItem('formDraft');
      this.formService.clearCurrentRecord();
    }
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }
}
