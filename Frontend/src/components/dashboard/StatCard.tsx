interface StatCardProps {
  title: string;
  value: string | number;
}

function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <p className="text-sm text-gray-500 mb-2">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-gray-800">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;