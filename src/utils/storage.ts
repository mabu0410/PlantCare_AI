// storage.ts — Native platform storage (AsyncStorage)
// Metro tự động resolve file này khi build cho iOS/Android
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StateStorage } from 'zustand/middleware';

const zustandStorage: StateStorage = {
    getItem: (name: string): Promise<string | null> => AsyncStorage.getItem(name),
    setItem: (name: string, value: string): Promise<void> => AsyncStorage.setItem(name, value).then(() => { }),
    removeItem: (name: string): Promise<void> => AsyncStorage.removeItem(name).then(() => { }),
};

export default zustandStorage;
