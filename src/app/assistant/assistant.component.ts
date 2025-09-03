import { Component } from '@angular/core';
import { AssistantService } from './assistant.service';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent {
  prompt = '';
  answer: string | null = null;
  loading = false;

  constructor(private svc: AssistantService) { }

  ask() {
    if (!this.prompt.trim()) return;
    this.loading = true;
    this.svc.ask(this.prompt).subscribe({
      next: (res: any) => {
        this.answer = res?.answer || JSON.stringify(res),
          this.prompt = '';
      },
      error: () => this.answer = 'Error fetching answer',
      complete: () => this.loading = false
    });
  }
}
