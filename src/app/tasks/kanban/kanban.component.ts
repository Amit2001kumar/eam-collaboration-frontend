import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  projectId = '1';
  todo: any[] = [];
  inProgress: any[] = [];
  done: any[] = [];

  constructor(private taskSvc: TaskService) {}

  ngOnInit() { this.load(); }

  load() {
    this.taskSvc.getTasks(this.projectId).subscribe((tasks: any[]) => {
      tasks = tasks || [];
      this.todo = tasks.filter(t => t.status === 'todo');
      this.inProgress = tasks.filter(t => t.status === 'in-progress');
      this.done = tasks.filter(t => t.status === 'done');
    });
  }

  drop(event: CdkDragDrop<any[]>, newStatus: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      const moved = event.container.data[event.currentIndex];
      const id = moved.id || moved._id;
      this.taskSvc.updateTask(id, { status: newStatus }).subscribe();
    }
  }
}
