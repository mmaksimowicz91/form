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
  public records: FormRecord[] = [];

  displayedColumns: string[] = ['no', 'nazwa', 'actions'];

  constructor(private router: Router, private formService: FormService) {}

  ngOnInit(): void {}

  getRecords() {
    this.records = this.formService.getRecords();
  }

  editRecord(record: FormRecord) {
    this.router.navigate(['/form'], { queryParams: { no: record.no } });
  }

  deleteRecord(record: FormRecord) {
    const index = this.records.indexOf(record);
    if (index > -1) {
      this.records.splice(index, 1);
    }
  }
}
