import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Position {
  id: string;
  pair: string;
  type: 'buy' | 'sell';
  lotSize: number;
  entryPrice: number;
  currentPrice: number;
}

interface PortfolioState {
  positions: Position[];
  addPosition: (position: Omit<Position, 'id'>) => void;
  removePosition: (id: string) => void;
  updatePrices: (rates: { [key: string]: number }) => void;
}

const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      positions: [],
      addPosition: (position) =>
        set((state) => ({
          positions: [...state.positions, { ...position, id: Date.now().toString() }],
        })),
      removePosition: (id) =>
        set((state) => ({
          positions: state.positions.filter((pos) => pos.id !== id),
        })),
      updatePrices: (rates) =>
        set((state) => ({
          positions: state.positions.map((pos) => {
            // Update currentPrice based on pair
            const [base, quote] = pos.pair.split('/');
            let currentPrice = pos.currentPrice;
            if (quote === 'USD') {
              currentPrice = rates[base];
            } else if (base === 'USD') {
              currentPrice = 1 / rates[quote];
            } // Add more logic for other pairs
            return { ...pos, currentPrice };
          }),
        })),
    }),
    {
      name: 'portfolio-storage',
    }
  )
);

export default usePortfolioStore;