import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  newMessage = '';
  teamId : any = null;
  senderId: any = null;
  constructor(private chatSvc: ChatService) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    this.senderId = user.id;
    this.teamId = user.teamId;
    this.getMessages();
  }

  getMessages() {
    this.chatSvc.getMessages(this.teamId).subscribe((messages) => {
      this.messages = messages;
    });
  }

  send() {
    const content = this.newMessage.trim();
    if (!content) return;
    this.chatSvc.sendMessage(this.teamId, content, this.senderId).subscribe((saved) => {
      this.messages.push(saved);
      this.newMessage = '';
      this.getMessages();
    });
  }
}
