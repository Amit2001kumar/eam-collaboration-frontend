import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssistantComponent } from './assistant.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AssistantComponent],
  imports: [CommonModule, FormsModule , ReactiveFormsModule, RouterModule],
  exports: [AssistantComponent]
})
export class AssistantModule {}
