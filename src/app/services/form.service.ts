import { Injectable } from '@angular/core';
import { FormRecord } from '../home/home.component';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private records: FormRecord[] = [];
  private localStorageKey = 'formDraft';

  addRecord(record: FormRecord) {
    this.records.push(record);
    console.log(this.records);
  }

  getRecords(): FormRecord[] {
    return this.records;
  }

  saveDraft(data: any) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  getDraft(): any {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '{}');
  }

  clearDraft() {
    localStorage.removeItem(this.localStorageKey);
  }
}
