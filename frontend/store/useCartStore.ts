import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Типизация позиции в корзине
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string; // Опционально, чтобы показывать картинку блюда в корзине
}

// Типизация самого хранилища
interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Добавление товара (если уже есть — увеличиваем количество)
      addItem: (newItem) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === newItem.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
                  : item
              ),
            };
          }
          return { items: [...state.items, { ...newItem, quantity: newItem.quantity || 1 }] };
        });
      },

      // Полное удаление товара из корзины
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      // Изменение количества (если количество падает до 0 и ниже — удаляем товар)
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: quantity <= 0
            ? state.items.filter((item) => item.id !== id)
            : state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }));
      },

      // Очистка корзины (понадобится после успешного оформления заказа)
      clearCart: () => set({ items: [] }),

      // Вычисляемые значения
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'dastorkon-cart-storage', // Имя ключа в localStorage
    }
  )
);