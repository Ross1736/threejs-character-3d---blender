import { create } from "zustand";

type ControllerStore = {
  activeAnimation: string;
  setActiveAnimation: (activeAnimation: string) => void;
};

export const useControllerStore = create<ControllerStore>((set) => ({
  activeAnimation: "idle",
  setActiveAnimation: (activeAnimation: string) => set({ activeAnimation }),
}));
