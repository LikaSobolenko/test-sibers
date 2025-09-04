export interface User {
    id: number,
    name: string,
    username: string,
    avatar: string, 
    online?: boolean 
}

// Channel Model
export interface Channel {
    id: string;
    name: string;
    creator: number;
    members: number[];
    isPrivate?: boolean;
    createdAt: Date;
    }

// Message Model
export interface MessageSender {
    id: number;
    name: string;
    username: string;
    avatar: string;
}

export interface Message {
    id: string;
    channelId: string;
    sender: MessageSender;
    content: string;
    timestamp: Date;
    type: 'text' | 'system' | 'image';
}

// Chat User
export interface ChatUser {
    id: number;
    name: string;
    username: string;
    avatar: string;
    online: boolean;
}
