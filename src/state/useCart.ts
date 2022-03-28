import create from 'zustand';

interface Item {
  id: string;
  total: number;
  toppings: string[];
  size: string;
}

interface State {
  items: Item[];
  add: (item: Item) => void;
  remove: (id: string) => void;
}

const useCart = create<State>((set) => ({
  items: [],

  // Add new item
  add: (item: Item) =>
    set((prev: State) => ({
      ...prev,
      items: [...prev.items, item],
    })),

  // Remove from the list
  remove: (id: string) =>
    set((prev: State) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    })),
}));

export default useCart;
