import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../services/form.service';

export interface FormRecord {
  no: number;
  nazwa: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  records: FormRecord[] = [];

  displayedColumns: string[] = ['no', 'nazwa', 'actions'];

  constructor(
    private router: Router,
    private formService: FormService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getRecords();
  }

  getRecords() {
    this.records = this.formService.getRecords();
  }

  editRecord(record: FormRecord) {
    this.formService.setCurrentRecord(record);
    this.router.navigate(['/form']);
  }

  deleteRecord(record: FormRecord) {
    this.formService.deleteRecord(record.no);
    this.records = [...this.formService.getRecords()];
    this.cdr.detectChanges();
  }

  refreshRecords() {
    this.records = this.formService.getRecords();
  }
}
