import { create } from "zustand";

export type ListItem = {
  id: string;
  title: string;
  description: string;
  isVisible: boolean;
};

type State = {
  visibleCards: ListItem[];
  deletedCards: ListItem[];
};

type Actions = {
  setVisibleCards: (cards: ListItem[]) => void;
  deleteCard: (id: string) => void;
  restoreCard: (id: string) => void;
};

export const useStore = create<State & Actions>((set) => ({
  visibleCards: [],
  deletedCards: [],
  setVisibleCards: (cards) => set({ visibleCards: cards }),
  deleteCard: (id) =>
    set((state) => {
      const deletedCard = state.visibleCards.find((card) => card.id === id);
      if (!deletedCard) return state;

      return {
        visibleCards: state.visibleCards.filter((card) => card.id !== id),
        deletedCards: [...state.deletedCards, deletedCard],
      };
    }),
  restoreCard: (id) =>
    set((state) => {
      const restoredCard = state.deletedCards.find((card) => card.id === id);
      if (!restoredCard) return state;

      return {
        visibleCards: [...state.visibleCards, restoredCard],
        deletedCards: state.deletedCards.filter((card) => card.id !== id),
      };
    }),
}));
