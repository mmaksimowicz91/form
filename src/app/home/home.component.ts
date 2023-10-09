import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router, private formService: FormService) {}

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
    const index = this.records.indexOf(record);
    if (index > -1) {
      this.records.splice(index, 1);
    }
    this.refreshRecords();
  }

  refreshRecords() {
    this.records = this.formService.getRecords();
  }
}
