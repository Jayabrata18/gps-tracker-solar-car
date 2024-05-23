import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  val = 0;
  constructor(
    private http : HttpClient
  ){
    
  }

  ngOnInit(): void {
    this.http.get("/info/1").subscribe((res: any) => {
      this.val = res.row[0]["battery_percentage"];
    })
  }
}
