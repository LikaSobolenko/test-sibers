// Models for types

//User Model
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
    creator: number;
    members: number[];
    messages: Message[];
    createdAt: Date;
}

//Message Model
export interface Message {
    id: number;
    sender: string;
    content: string;
    timestamp: Date;
}

// Channels data
export const DEMO_CHANNELS: Channel[] = [
    {
        id: 'general',
        name: 'General Chat',
        creator: 0,
        members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        messages: [
            {
                id: 1,
                sender: 'Anna Conroy',
                content: 'Hello everyone! Welcome to our general channel!',
                timestamp: new Date('2024-01-15T10:00:00')
            },
            {
                id: 2,
                sender: 'Britney Spinka',
                content: 'Thanks for creating this channel! Looking forward to chatting with everyone.',
                timestamp: new Date('2024-01-15T10:05:00')
            }
        ],
        createdAt: new Date('2024-01-15')
    },
    {
        id: 'work',
        name: 'Work Discussions',
        creator: 5,
        members: [5, 12, 18, 24, 30, 36, 42, 48, 54, 60],
        messages: [
            {
                id: 1,
                sender: 'Audreanne Parisian',
                content: 'Let\'s keep all work-related discussions in this channel for better organization.',
                timestamp: new Date('2024-01-20T09:15:00')
            },
            {
                id: 2,
                sender: 'Dr. Rowena Kreiger',
                content: 'Great idea! I\'ll post updates about the quarterly reports here.',
                timestamp: new Date('2024-01-20T09:20:00')
            }
        ],
        createdAt: new Date('2024-01-20')
    },
    {
        id: 'random',
        name: 'Random Talk',
        creator: 12,
        members: [12, 14, 15, 16, 17, 18, 19, 22],
        messages: [
            {
                id: 1,
                sender: 'Yazmin Kuphal',
                content: 'Anyone watching any good shows lately? I need recommendations!',
                timestamp: new Date('2024-01-25T18:30:00')
            },
            {
                id: 2,
                sender: 'Arnaldo Funk PhD',
                content: 'Just started watching that new sci-fi series on Netflix. It\'s pretty amazing!',
                timestamp: new Date('2024-01-25T18:35:00')
            }
        ],
        createdAt: new Date('2024-01-25')
    },
    {
        id: 'project-alpha',
        name: 'Project Alpha',
        creator: 23,
        members: [23, 29, 35, 47, 53, 65],
        messages: [
            {
                id: 1,
                sender: 'Andy McLaughlin',
                content: 'Welcome to Project Alpha channel. Let\'s discuss the initial requirements here.',
                timestamp: new Date('2024-02-01T11:00:00')
            },
            {
                id: 2,
                sender: 'April Blick',
                content: 'I\'ve reviewed the specs and have some suggestions for the architecture.',
                timestamp: new Date('2024-02-01T11:15:00')
            }
        ],
        createdAt: new Date('2024-02-01')
    },
    {
        id: 'tech-support',
        name: 'Tech Support',
        creator: 34,
        members: [34, 36, 37, 38, 39, 41, 42, 43, 44],
        messages: [
            {
                id: 1,
                sender: 'Alia Baumbach III',
                content: 'This channel is for technical issues and support requests. Please describe your problems in detail.',
                timestamp: new Date('2024-02-05T08:00:00')
            },
            {
                id: 2,
                sender: 'Dr. Rowena Kreiger',
                content: 'Having issues with the database connection. Getting timeout errors frequently.',
                timestamp: new Date('2024-02-05T08:30:00')
            }
        ],
        createdAt: new Date('2024-02-05')
    },
    {
        id: 'design',
        name: 'Design Team',
        creator: 45,
        members: [45, 48, 49, 50, 51],
        messages: [
            {
                id: 1,
                sender: 'Jillian Johnston',
                content: 'Design team assemble! Let\'s share inspiration and feedback here.',
                timestamp: new Date('2024-02-10T14:00:00')
            },
            {
                id: 2,
                sender: 'Kellen Keeling',
                content: 'I\'m working on the new UI mockups. Will share them here for review tomorrow.',
                timestamp: new Date('2024-02-10T14:20:00')
            }
        ],
        createdAt: new Date('2024-02-10')
    },
    {
        id: 'developers',
        name: 'Developers',
        creator: 56,
        members: [56, 57, 60, 61, 62, 63, 64, 65, 68, 69],
        messages: [
            {
                id: 1,
                sender: 'Ms. Savannah Weber',
                content: 'Developer channel activated! Share your code reviews and technical discussions here.',
                timestamp: new Date('2024-02-15T13:00:00')
            },
            {
                id: 2,
                sender: 'Adele Beahan',
                content: 'Just pushed the new authentication middleware. Please review when you have time.',
                timestamp: new Date('2024-02-15T13:15:00')
            }
        ],
        createdAt: new Date('2024-02-15')
    },
    {
        id: 'marketing',
        name: 'Marketing',
        creator: 67,
        members: [67, 68, 69, 70, 71, 72, 73],
        messages: [
            {
                id: 1,
                sender: 'Eleonore Stanton',
                content: 'Marketing team channel! Let\'s coordinate our campaigns and strategies here.',
                timestamp: new Date('2024-02-20T10:00:00')
            },
            {
                id: 2,
                sender: 'Kelsie Heidenreich',
                content: 'The Q2 campaign results are in - we exceeded targets by 15%! Great job everyone!',
                timestamp: new Date('2024-02-20T10:30:00')
            }
        ],
        createdAt: new Date('2024-02-20')
    },
    {
        id: 'hr',
        name: 'HR Announcements',
        creator: 78,
        members: [78, 79, 1, 15, 30, 45, 60, 75, 10, 25, 40, 55, 70],
        messages: [
            {
                id: 1,
                sender: 'Ms. Janelle Berge',
                content: 'Official HR announcements channel. Important updates about benefits and policies will be posted here.',
                timestamp: new Date('2024-02-25T09:00:00')
            },
            {
                id: 2,
                sender: 'Cornelius Emard',
                content: 'Reminder: Open enrollment for health insurance ends this Friday. Please complete your selections.',
                timestamp: new Date('2024-02-25T09:15:00')
            }
        ],
        createdAt: new Date('2024-02-25')
    },
    {
        id: 'watercooler',
        name: 'Watercooler',
        creator: 8,
        members: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 30, 45, 21, 22, 23],
        messages: [
            {
                id: 1,
                sender: 'Weldon Corwin',
                content: 'Welcome to the watercooler channel! Perfect place for casual chats and non-work discussions.',
                timestamp: new Date('2024-03-01T12:00:00')
            },
            {
                id: 2,
                sender: 'Helmer Mitchell',
                content: 'Anyone up for virtual coffee break? I could use a break from these spreadsheets!',
                timestamp: new Date('2024-03-01T12:15:00')
            }
        ],
        createdAt: new Date('2024-03-01')
    }
];