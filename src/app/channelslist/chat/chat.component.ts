import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ChannelService } from '../../channels.service';
import { UserService } from '../../user.service';
import { User, Channel, Message } from '../../models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatIconModule, 
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSidenavModule, 
    MatToolbarModule, 
    MatListModule, 
    DatePipe,
    MatFormFieldModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  @Input() channelId: string = '';
  @Input() userId: number = 0;

  currentchannel: Channel | null | undefined;
  currentUser: User | null | undefined;
  currentDate: Date = new Date();
  users: User[] = [];
  public displayedUsers: User[] = [];
  public searchText: string = '';
  isUserListVisible: boolean = false;
  showFiller = false;
  newMessage: string = '';

  constructor(
      private channelService: ChannelService,
      private userService: UserService
    ) {}

  ngOnInit() {
    this.currentchannel = this.channelService.getChannelById(this.channelId);
    this.loadData(this.userService.getAllUsers());

    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.currentUser = user || null;
      },
      error: (error) => {
        console.error('Error loading user:', error);
      }
    });
  }

  private loadData(observable: Observable<User[]>): void {
    observable.subscribe({
      next: (data) => {
        this.displayedUsers = data.filter(user =>
          this.currentchannel!.members.includes(user.id)
        );
        this.users = this.displayedUsers;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  public applyFilter() {
    const term = this.searchText.toLowerCase();
    this.displayedUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(term)
    );
  }

  public deleteUser(id: number) {
    this.channelService.removeUserFromChannel(id, this.channelId);
    this.displayedUsers = this.displayedUsers.filter(user => user.id !== id);

    this.currentchannel!.members = this.currentchannel!.members.filter(
      memberId => memberId !== id
    );
  }

  sendMessage(): void {
  if (!this.newMessage.trim() || !this.currentUser || !this.currentchannel) return;

  const message: Message = {
    id: this.currentchannel.messages.length+1,
    content: this.newMessage.trim(),
    sender: this.currentUser.name,
    timestamp: new Date(),
  };

  this.currentchannel.messages.push(message);
  this.channelService.updateChannel(this.currentchannel);
  this.newMessage = '';

}

  onKeyPress(event: KeyboardEvent): void {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    this.sendMessage();
  }
}
}
