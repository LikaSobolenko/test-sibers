import { Injectable } from '@angular/core';
import { Channel, DEMO_CHANNELS } from '../app/models';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private channels: Channel[] = DEMO_CHANNELS;

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

  createChannel(name: string, creatorId: number): Channel {
    const newChannel: Channel = {
      id: this.generateChannelId(),
      name,
      creator: creatorId,
      members: [creatorId],
      isPrivate: false,
      createdAt: new Date()
    };

    this.channels.push(newChannel);
    return newChannel;
  }

  addUserToChannel(userId: number, channelId: string): boolean {
    const channel = this.getChannelById(channelId);
    if (channel && !channel.members.includes(userId)) {
      channel.members.push(userId);
      return true;
    }
    return false;
  }

  private generateChannelId(): string {
    return 'channel_' + Date.now().toString(36);
  }
}