import { TimelineTask, timelineTasks } from "./mock-data";

const TIMELINE_STORAGE_KEY = "urocare_timeline";

export const TimelineService = {
    getTimeline: (procedure: string, surgeryDate: string): TimelineTask[] => {
        if (typeof window === "undefined") return timelineTasks;

        const saved = localStorage.getItem(TIMELINE_STORAGE_KEY);
        if (!saved) {
            // First time load: save default mock data to local storage
            const initialTasks = timelineTasks; // In real app, generate based on date
            localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(initialTasks));
            return initialTasks;
        }

        return JSON.parse(saved);
    },

    updateTaskStatus: (taskId: string, status: TimelineTask['status']) => {
        if (typeof window === "undefined") return;

        const saved = localStorage.getItem(TIMELINE_STORAGE_KEY);
        if (saved) {
            const tasks: TimelineTask[] = JSON.parse(saved);
            const updatedTasks = tasks.map(t =>
                t.id === taskId ? { ...t, status } : t
            );
            localStorage.setItem(TIMELINE_STORAGE_KEY, JSON.stringify(updatedTasks));
        }
    },

    // Helper to reset timeline for demo purposes
    resetTimeline: () => {
        localStorage.removeItem(TIMELINE_STORAGE_KEY);
    }
};

// Keep the old generator for reference/fallback
export const generateTimeline = (procedure: string, surgeryDate: string) => {
    return timelineTasks;
};
