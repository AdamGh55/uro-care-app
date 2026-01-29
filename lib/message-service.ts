export interface Message {
    id: string;
    threadId: string;
    senderRole: 'patient' | 'clinician';
    content: string;
    timestamp: string;
    read: boolean;
}

export interface Thread {
    id: string;
    patientId: string;
    patientName: string;
    lastMessage: string;
    lastMessageTime: string;
    unread: boolean;
}

const STORAGE_KEY_MESSAGES = 'urocare_messages';
const STORAGE_KEY_THREADS = 'urocare_threads';

export const MessageService = {
    getThreads: (): Thread[] => {
        if (typeof window === 'undefined') return [];
        const threads = localStorage.getItem(STORAGE_KEY_THREADS);
        if (!threads) {
            // Initialize with default thread if empty
            const defaultThread = {
                id: 'thread-1',
                patientId: 'P001',
                patientName: 'Ahmed Benali',
                lastMessage: 'Bonjour Docteur',
                lastMessageTime: new Date().toISOString(),
                unread: true
            };
            localStorage.setItem(STORAGE_KEY_THREADS, JSON.stringify([defaultThread]));
            return [defaultThread];
        }
        return JSON.parse(threads);
    },

    getMessages: (threadId: string): Message[] => {
        if (typeof window === 'undefined') return [];
        const allMessages = JSON.parse(localStorage.getItem(STORAGE_KEY_MESSAGES) || '[]');
        return allMessages.filter((m: Message) => m.threadId === threadId).sort((a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    },

    sendMessage: (threadId: string, senderRole: 'patient' | 'clinician', content: string) => {
        if (typeof window === 'undefined') return;

        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            threadId,
            senderRole,
            content,
            timestamp: new Date().toISOString(),
            read: false
        };

        // Save message
        const allMessages = JSON.parse(localStorage.getItem(STORAGE_KEY_MESSAGES) || '[]');
        localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify([...allMessages, newMessage]));

        // Update thread
        const threads = JSON.parse(localStorage.getItem(STORAGE_KEY_THREADS) || '[]');
        const threadIndex = threads.findIndex((t: Thread) => t.id === threadId);

        if (threadIndex >= 0) {
            threads[threadIndex] = {
                ...threads[threadIndex],
                lastMessage: content,
                lastMessageTime: newMessage.timestamp,
                unread: true
            };
            localStorage.setItem(STORAGE_KEY_THREADS, JSON.stringify(threads));
        } else {
            // Create new thread if not exists (should handle this better realworld but ok for now)
        }

        return newMessage;
    }
};
