import { createContext, useContext, useState, ReactNode } from "react";

export interface TodayMenuItem {
  id: number;
  name: string;
  price: number;
  desc: string;
  category: string;
}

interface TodayMenuContextType {
  todayMenu: TodayMenuItem[];
  addToTodayMenu: (item: TodayMenuItem) => void;
  removeFromTodayMenu: (id: number) => void;
  clearTodayMenu: () => void;
}

const TodayMenuContext = createContext<TodayMenuContextType | undefined>(undefined);

export function TodayMenuProvider({ children }: { children: ReactNode }) {
  const [todayMenu, setTodayMenu] = useState<TodayMenuItem[]>([]);

  const addToTodayMenu = (item: TodayMenuItem) => {
    setTodayMenu((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromTodayMenu = (id: number) => {
    setTodayMenu((prev) => prev.filter((i) => i.id !== id));
  };

  const clearTodayMenu = () => setTodayMenu([]);

  return (
    <TodayMenuContext.Provider value={{ todayMenu, addToTodayMenu, removeFromTodayMenu, clearTodayMenu }}>
      {children}
    </TodayMenuContext.Provider>
  );
}

export function useTodayMenu() {
  const ctx = useContext(TodayMenuContext);
  if (!ctx) throw new Error("useTodayMenu must be used within TodayMenuProvider");
  return ctx;
}
