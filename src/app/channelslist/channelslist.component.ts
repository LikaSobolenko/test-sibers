import { Component, OnInit, OnDestroy, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { User, Channel } from '../models';
import { UserService } from '../user.service';
import { ChannelService } from '../channels.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { ChatComponent } from "./chat/chat.component";
import { MatDialog } from '@angular/material/dialog';
import { NewchannelComponent } from './newchannel/newchannel.component';

@Component({
  selector: 'app-channelslist',
  standalone: true,
  imports: [
    MatCardModule, 
    MatExpansionModule, 
    MatIconModule, 
    MatButtonModule, 
    ChatComponent, 
    MatListModule],
  templateUrl: './channelslist.component.html',
  styleUrl: './channelslist.component.scss'
})

export class ChannelslistComponent implements OnInit, OnDestroy {
  readonly panelOpenState = signal(false);
  readonly dialog = inject(MatDialog);
  currentUser: User | null | undefined;
  isLoaded = false;
  private routeSub?: Subscription;
  userChannels: Channel[] = [];
  allChannels: Channel[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private channelService: ChannelService,
    public router: Router
  ) {}

  ngOnInit() {
    this.routeSub = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          const idNumber = Number(id);
          return this.userService.getUserById(idNumber);
        }
        return [null];
      })
    ).subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isLoaded = true;
        
        if (!user) {
          console.error('User not found');
          this.router.navigate(['/login']);
        }
        
        this.loadChannels();
      },
      error: (error) => {
        console.error('Error loading user:', error);
        this.isLoaded = true;
      }
    });
  }
  
  loadChannels(): void {
    this.userChannels = this.channelService.getUserChannels(this.currentUser!.id);
    this.allChannels = this.channelService.getAllChannels();
  }

  addNewChannel (channelId:string) {
      if (this.currentUser?.id === undefined || this.currentUser?.id === null) {
        return;
      }

      this.channelService.addUserToChannel(this.currentUser.id, channelId);
      this.loadChannels()
  }

  createNewChannel () {
      const dialogRef = this.dialog.open(NewchannelComponent, {
      data: this.currentUser?.id,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadChannels()
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}