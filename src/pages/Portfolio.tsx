import { useState } from 'react';
import usePortfolioStore from '../store/portfolioStore';

const Portfolio = () => {
  const { positions, addPosition, removePosition } = usePortfolioStore();
  const [pair, setPair] = useState('EUR/USD');
  const [type, setType] = useState<'buy' | 'sell'>('buy');
  const [lotSize, setLotSize] = useState(0.01);
  const [entryPrice, setEntryPrice] = useState(0);

  const handleAdd = () => {
    addPosition({ pair, type, lotSize, entryPrice, currentPrice: entryPrice });
  };

  const calculatePnL = (pos: any) => {
    const diff = pos.currentPrice - pos.entryPrice;
    return pos.type === 'buy' ? diff * pos.lotSize * 100000 : -diff * pos.lotSize * 100000; // Simplified
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Portfolio</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pair"
          value={pair}
          onChange={(e) => setPair(e.target.value)}
          className="mr-2 p-2 bg-gray-700 text-white"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value as 'buy' | 'sell')}
          className="mr-2 p-2 bg-gray-700 text-white"
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <input
          type="number"
          placeholder="Lot Size"
          value={lotSize}
          onChange={(e) => setLotSize(parseFloat(e.target.value))}
          className="mr-2 p-2 bg-gray-700 text-white"
        />
        <input
          type="number"
          placeholder="Entry Price"
          value={entryPrice}
          onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
          className="mr-2 p-2 bg-gray-700 text-white"
        />
        <button onClick={handleAdd} className="p-2 bg-blue-600 text-white">Add Position</button>
      </div>
      <div>
        {positions.map((pos) => (
          <div key={pos.id} className="bg-gray-800 p-4 mb-2 rounded">
            <p>{pos.pair} {pos.type} {pos.lotSize} lots @ {pos.entryPrice}</p>
            <p>Current: {pos.currentPrice.toFixed(4)} | P&L: ${calculatePnL(pos).toFixed(2)}</p>
            <button onClick={() => removePosition(pos.id)} className="mt-2 p-1 bg-red-600 text-white">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;