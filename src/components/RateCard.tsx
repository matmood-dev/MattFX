interface RateCardProps {
  pair: string;
  rate: number;
  change?: number; // For demo, we can calculate or mock
}

const RateCard = ({ pair, rate, change = 0 }: RateCardProps) => {
  const changeColor = change >= 0 ? 'text-green-400' : 'text-red-400';
  const changeSymbol = change >= 0 ? '↑' : '↓';

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{pair}</h3>
      <p className="text-2xl font-bold">{rate.toFixed(4)}</p>
      <p className={`text-sm ${changeColor}`}>
        {changeSymbol} {Math.abs(change).toFixed(4)}
      </p>
    </div>
  );
};

export default RateCard;