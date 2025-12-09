import useForexRates from '../hooks/useForexRates';
import usePortfolioStore from '../store/portfolioStore';
import RateCard from '../components/RateCard';

const Dashboard = () => {
  const { rates, loading, error } = useForexRates();
  const positions = usePortfolioStore((state) => state.positions);

  if (loading) return <p>Loading rates...</p>;
  if (error) return <p>{error}</p>;

  const majorPairs = [
    { pair: 'EUR/USD', rate: rates.EUR },
    { pair: 'GBP/USD', rate: rates.GBP },
    { pair: 'USD/JPY', rate: 1 / rates.JPY },
    { pair: 'USD/CHF', rate: 1 / rates.CHF },
    { pair: 'AUD/USD', rate: rates.AUD },
    { pair: 'USD/CAD', rate: 1 / rates.CAD },
  ];

  const totalPnL = positions.reduce((sum, pos) => {
    const diff = pos.currentPrice - pos.entryPrice;
    const pnl = pos.type === 'buy' ? diff * pos.lotSize * 100000 : -diff * pos.lotSize * 100000;
    return sum + pnl;
  }, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <h2 className="text-xl">Portfolio Summary</h2>
        <p>Total P&L: <span className={totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}>${totalPnL.toFixed(2)}</span></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {majorPairs.map(({ pair, rate }) => (
          <RateCard key={pair} pair={pair} rate={rate} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;