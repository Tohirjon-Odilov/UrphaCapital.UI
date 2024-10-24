import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../../services/result-services/result.service';

@Component({
  selector: 'app-admin-result',
  templateUrl: './admin-result.component.html',
  styleUrl: './admin-result.component.scss'
})
export class AdminResultComponent implements OnInit {
  results: any[] = [];

  constructor(private resultService: ResultService) {}

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults() {
    this.resultService.getResult(10).subscribe((data) => {
      this.results = data;
    });
  }
}
