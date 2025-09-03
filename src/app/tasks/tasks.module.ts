import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanComponent } from './kanban/kanban.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [KanbanComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, DragDropModule],
  exports: [KanbanComponent]
})
export class TasksModule { }
