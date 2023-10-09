import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Record {
  no: number;
  nazwa: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  records: Record[] = [];

  displayedColumns: string[] = ['no', 'nazwa', 'actions'];

  constructor(private router: Router) {}

  editRecord(record: Record) {
    this.router.navigate(['/form'], { queryParams: { no: record.no } });
  }

  deleteRecord(record: Record) {
    const index = this.records.findIndex((r) => r.no === record.no);
    if (index > -1) {
      this.records.splice(index, 1);
    }
  }
}
