import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({ providedIn: 'root' })
export class ChatService {
  constructor(private api: ApiService) {}
  
  getMessages(teamId: string) { return this.api.getMessages(teamId); }
  sendMessage(teamId: string, content: string, senderId?: string) { return this.api.sendMessage(teamId, content, senderId); }
}
