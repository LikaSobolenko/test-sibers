import { Injectable } from '@angular/core';
import { Channel, DEMO_CHANNELS } from '../app/models';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private channels: Channel[] = [];

  constructor() {
    this.initializeChannels();
  }

  private initializeChannels(): void {
    const savedChannels = localStorage.getItem('chat_channels');
    
    if (savedChannels) {
      try {
        this.channels = JSON.parse(savedChannels);
        this.channels.forEach(channel => {
          channel.createdAt = new Date(channel.createdAt);
        });
      } catch (error) {
        console.error('Error parsing saved channels:', error);
        this.loadDemoChannels();
      }
    } else {
      this.loadDemoChannels();
    }
  }

  private loadDemoChannels(): void {
    this.channels = [...DEMO_CHANNELS];
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('chat_channels', JSON.stringify(this.channels));
  }

  getAllChannels(): Channel[] {
    return this.channels;
  }

  getUserChannels(userId: number): Channel[] {
    return this.channels.filter(channel => 
      channel.members.includes(userId)
    );
  }

  getChannelById(channelId: string): Channel | undefined {
    return this.channels.find(channel => channel.id === channelId);
  }

  createChannel(name: string, creatorId: number, members: number[] = []): Channel {
    const newChannel: Channel = {
      id: this.generateChannelId(),
      name,
      creator: creatorId,
      members: [creatorId, ...members],
      createdAt: new Date()
    };

    this.channels.push(newChannel);
    this.saveToLocalStorage();
    return newChannel;
  }

  addUserToChannel(userId: number, channelId: string): boolean {
    const channel = this.getChannelById(channelId);
    if (channel && !channel.members.includes(userId)) {
      channel.members.push(userId);
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  removeUserFromChannel(userId: number, channelId: string): boolean {
    const channel = this.getChannelById(channelId);
    
    if (!channel) {
      console.error('Channel not found');
      return false;
    }

    channel.members = channel.members.filter(id => id !== userId);
    this.saveToLocalStorage();
    
    return true;
  }

  private generateChannelId(): string {
    return 'channel_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

}