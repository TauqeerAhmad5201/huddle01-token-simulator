import { create } from "zustand";

interface DataStore {
  roomID: string;
  setRoomID: (roomID: string) => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  roomID: "",
  setRoomID: (roomID) => set({ roomID }),
  accessToken: "",
  setAccessToken: (accessToken) => set({ accessToken }),
}));
