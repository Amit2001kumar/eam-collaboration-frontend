import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({ providedIn: 'root' })
export class AssistantService {
  constructor(private api: ApiService) {}
  ask(prompt: string) { return this.api.askAssistant(prompt); }
}
