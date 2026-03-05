// storage.web.ts — Web platform storage (localStorage only, KHÔNG import AsyncStorage)
// Metro tự động resolve file này khi build cho web platform
import { StateStorage } from 'zustand/middleware';

const zustandStorage: StateStorage = {
    getItem: (name: string): Promise<string | null> => {
        try {
            const value = typeof localStorage !== 'undefined' ? localStorage.getItem(name) : null;
            return Promise.resolve(value);
        } catch {
            return Promise.resolve(null);
        }
    },
    setItem: (name: string, value: string): Promise<void> => {
        try {
            if (typeof localStorage !== 'undefined') localStorage.setItem(name, value);
        } catch { /* ignored */ }
        return Promise.resolve();
    },
    removeItem: (name: string): Promise<void> => {
        try {
            if (typeof localStorage !== 'undefined') localStorage.removeItem(name);
        } catch { /* ignored */ }
        return Promise.resolve();
    },
};

export default zustandStorage;
