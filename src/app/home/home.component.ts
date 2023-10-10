import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../services/form.service';
import { FormRecord } from '../models/formRecord.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public records: FormRecord[] = [];
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
