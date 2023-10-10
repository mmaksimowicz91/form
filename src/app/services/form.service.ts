import { Injectable } from '@angular/core';
import { FormRecord } from '../models/formRecord.interface';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private records: FormRecord[] = [];
  private localStorageKey = 'formRecords';
  private draftKey = 'formDraft';
  private currentRecord: FormRecord | null = null;

  constructor() {
    this.loadRecordsFromStorage();
  }

  addRecord(record: FormRecord) {
    this.records.push(record);
    this.saveRecordsToStorage();
  }

  getRecords(): FormRecord[] {
    return this.records;
  }

  deleteRecord(no: number) {
    const index = this.records.findIndex((record) => record.no === no);
    if (index !== -1) {
      this.records.splice(index, 1);
      this.saveRecordsToStorage();
    }
  }

  saveDraft(data: any) {
    localStorage.setItem(this.draftKey, JSON.stringify(data));
  }

  getDraft(): any {
    return JSON.parse(localStorage.getItem(this.draftKey) || '{}');
  }

  clearDraft() {
    localStorage.removeItem(this.draftKey);
  }

  setCurrentRecord(record: FormRecord) {
    this.currentRecord = record;
  }

  getCurrentRecord(): FormRecord | null {
    return this.currentRecord;
  }

  clearCurrentRecord() {
    this.currentRecord = null;
  }

  private saveRecordsToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.records));
  }

  private loadRecordsFromStorage() {
    const storedRecords = localStorage.getItem(this.localStorageKey);
    if (storedRecords) {
      this.records = JSON.parse(storedRecords);
    }
  }
}
