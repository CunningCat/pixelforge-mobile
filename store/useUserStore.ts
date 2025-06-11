
import { create } from 'zustand';

interface UserState {
  uid: string;
  name: string;
  avatar_url: string;
  isInitialized: boolean;
  setUid: (uid: string) => void;
  setName: (name: string) => void;
  setAvatarUrl: (avatar_url: string) => void;
  setInitialized: (status: boolean) => void;
  
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  uid: '',
  name: '',
  avatar_url: '',
  isInitialized: false,
  setUid: (uid: string) => set({ uid: uid }),
  setName: (name: string) => set({ name: name }),
  setInitialized: (status: boolean) => set({ isInitialized: status }),
  setAvatarUrl: (avatar_url: string) => set({ avatar_url: avatar_url }),
  clearUser: () => set({ uid: '', name: '', avatar_url: '' }),
}));