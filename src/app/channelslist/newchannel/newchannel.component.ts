import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ChannelService } from '../../channels.service';
import { UserService } from '../../user.service';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef
} from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { User, Channel } from '../../models';

@Component({
  selector: 'app-newchannel',
  standalone: true,
  imports: [
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose, 
    MatButtonModule, 
    MatChipsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './newchannel.component.html',
  styleUrl: './newchannel.component.scss'
})
export class NewchannelComponent {
  readonly data = inject(MAT_DIALOG_DATA);
  public channelForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]) ,
    members: new FormControl<number[]>([])
  });
  users: User[] = [];
  members: number[] = [];

  constructor(
    public dialogRef: MatDialogRef<NewchannelComponent>,
    private channelService: ChannelService,
          private userService: UserService
    ) {}


    ngOnInit() {
    this.loadData(this.userService.getAllUsers());
  }

  // Load users data
  private loadData(observable: Observable<User[]>): void {
      observable.subscribe({
        next: (data) => {
          this.users = data
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

  // Toggle user selection for channel membership
  toggleUserSelection(userId: number): void {
    const index = this.members.indexOf(userId);
    
    if (index > -1) {
      this.members.splice(index, 1);
    } else {
      this.members.push(userId);
    }
  }

  isUserSelected(userId: number): boolean {
    return this.members.includes(userId);
  }

  // Create new channel with form data
  createChannel() {
    if (this.channelForm.value.title) {
      if (this.channelForm.valid) {
        const formValue = this.channelForm.value;
          
        this.channelService.createChannel(
          formValue.title!,
          this.data,
          this.members
        );
          
        this.dialogRef.close('success');
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
