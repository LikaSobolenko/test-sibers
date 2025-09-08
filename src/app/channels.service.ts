import { Injectable } from '@angular/core';
import { Channel, DEMO_CHANNELS, Message } from '../app/models';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private channels: Channel[] = [];

  constructor() {
    this.initializeChannels();
  }

  //Initialize channels from localStorage or demo data
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

  // Load demo channels from Modals
  private loadDemoChannels(): void {
    this.channels = [...DEMO_CHANNELS];
    this.saveToLocalStorage();
  }

  // Save current channels state to localStorage
  private saveToLocalStorage(): void {
    localStorage.setItem('chat_channels', JSON.stringify(this.channels));
  }

  // Get all channels
  getAllChannels(): Channel[] {
    return this.channels;
  }

  // Get channels where user is a member
  getUserChannels(userId: number): Channel[] {
    return this.channels.filter(channel => 
      channel.members.includes(userId)
    );
  }

  // Find channel by its ID
  getChannelById(channelId: string): Channel | undefined {
    return this.channels.find(channel => channel.id === channelId);
  }

  // Create new channel
  createChannel(name: string, creatorId: number, members: number[] = []): Channel {
    const newChannel: Channel = {
      id: this.generateChannelId(),
      name,
      creator: creatorId,
      messages: [],
      members: [creatorId, ...members],
      createdAt: new Date()
    };

    this.channels.push(newChannel);
    this.saveToLocalStorage();
    return newChannel;
  }

  // Update existing channel with new data
  updateChannel(updatedChannel: Channel): void {
    const index = this.channels.findIndex(ch => ch.id === updatedChannel.id);
    if (index !== -1) {
      this.channels[index] = updatedChannel;
      localStorage.setItem('chat_channels', JSON.stringify(this.channels));
    }
  }

  // Add user to channel membership
  addUserToChannel(userId: number, channelId: string): boolean {
    const channel = this.getChannelById(channelId);
    if (channel && !channel.members.includes(userId)) {
      channel.members.push(userId);
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  // Remove user from channel membership
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