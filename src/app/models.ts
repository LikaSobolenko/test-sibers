export interface User {
    id: number,
    name: string,
    username: string,
    avatar: string,
    email: string,
    phone: string,
    website:string,
    online?: boolean 
}

// Channel Model
export interface Channel {
    id: string;
    name: string;
    description?: string;
    creator: number;
    members: number[];
    isPrivate: boolean;
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


export const DEMO_CHANNELS: Channel[] = [
    {
        id: 'general',
        name: 'General Chat',
        description: 'Main channel for general discussions',
        creator: 0,
        members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        isPrivate: false,
        createdAt: new Date('2024-01-15')
    },
    {
        id: 'work',
        name: 'Work Discussions',
        description: 'Professional work-related conversations',
        creator: 5,
        members: [5, 12, 18, 24, 30, 36, 42, 48, 54, 60],
        isPrivate: false,
        createdAt: new Date('2024-01-20')
    },
    {
        id: 'random',
        name: 'Random Talk',
        description: 'Casual and off-topic conversations',
        creator: 12,
        members: [12, 14, 15, 16, 17, 18, 19, 22],
        isPrivate: false,
        createdAt: new Date('2024-01-25')
    },
    {
        id: 'project-alpha',
        name: 'Project Alpha',
        description: 'Discussion and coordination for Project Alpha',
        creator: 23,
        members: [23, 29, 35, 47, 53, 65],
        isPrivate: true,
        createdAt: new Date('2024-02-01')
    },
    {
        id: 'tech-support',
        name: 'Tech Support',
        description: 'Technical assistance and problem solving',
        creator: 34,
        members: [34, 36, 37, 38, 39, 41, 42, 43, 44],
        isPrivate: false,
        createdAt: new Date('2024-02-05')
    },
    {
        id: 'design',
        name: 'Design Team',
        description: 'UI/UX design discussions and collaborations',
        creator: 45,
        members: [45,  48, 49, 50, 51],
        isPrivate: true,
        createdAt: new Date('2024-02-10')
    },
    {
        id: 'developers',
        name: 'Developers',
        description: 'Programming and development discussions',
        creator: 56,
        members: [56, 57, 60, 61, 62, 63, 64, 65, 68, 69],
        isPrivate: false,
        createdAt: new Date('2024-02-15')
    },
    {
        id: 'marketing',
        name: 'Marketing',
        description: 'Marketing strategies and campaigns',
        creator: 67,
        members: [67, 68, 69, 70, 71, 72, 73],
        isPrivate: false,
        createdAt: new Date('2024-02-20')
    },
    {
        id: 'hr',
        name: 'HR Announcements',
        description: 'Official HR announcements and updates',
        creator: 78,
        members: [78, 79, 1, 15, 30, 45, 60, 75, 10, 25, 40, 55, 70],
        isPrivate: false,
        createdAt: new Date('2024-02-25')
    },
    {
        id: 'watercooler',
        name: 'Watercooler',
        description: 'Informal social conversations',
        creator: 8,
        members: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 30, 45, 21, 22, 23],
        isPrivate: false,
        createdAt: new Date('2024-03-01')
    }
];