import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from '../services/form.service';
import { FormRecord } from '../models/formRecord.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.formService.deleteRecord(record.no);
        this.records = [...this.formService.getRecords()];
        this.cdr.detectChanges();
      }
    });
  }

  refreshRecords() {
    this.records = this.formService.getRecords();
  }
}
