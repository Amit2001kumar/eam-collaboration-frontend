import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projectSummary: any[] = [];
  taskSummary: any[] = [];
  upcomingDeadlines: any[] = [];
  selectedTask: any = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.fetchDashboardSummary();
  }

  fetchDashboardSummary(): void {
    this.dashboardService.getSummary().subscribe(
      (res) => {
        if (res.success) {
          this.projectSummary = res.projectSummary;
          this.taskSummary = res.taskSummary;
          this.upcomingDeadlines = res.upcomingDeadlines;
        } else {
          // Handle failure case
          console.error('Failed to fetch dashboard summary');
        }
      },
      (error) => {
        console.error('Error fetching dashboard summary:', error);
      }
    );
  }

  openModal(task: any): void {
    this.selectedTask = task;
    const modal = document.getElementById('taskModal')!;
    modal.style.display = 'block';
  }

  closeModal(): void {
    const modal = document.getElementById('taskModal')!;
    modal.style.display = 'none';
  }

}
