import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { User, Channel } from '../models';
import { UserService } from '../user.service';
import { ChannelService } from '../channels.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-channelslist',
  standalone: true,
  imports: [MatCardModule, MatExpansionModule, MatIconModule, MatButtonModule],
  templateUrl: './channelslist.component.html',
  styleUrl: './channelslist.component.scss'
})

export class ChannelslistComponent implements OnInit, OnDestroy {
  readonly panelOpenState = signal(false);
  currentUser: User | null | undefined;
  isLoaded = false;
  private routeSub?: Subscription;
  userChannels: Channel[] = [];

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
        console.log(this.currentUser)
        
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
    console.log(this.userChannels)
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}