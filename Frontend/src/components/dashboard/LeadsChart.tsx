import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  stats: any;
}

function LeadsChart({ stats }: Props) {
  const data = [
    {
      name: "New",
      value: stats.newLeads,
    },
    {
      name: "Qualified",
      value: stats.qualifiedLeads,
    },
    {
      name: "Won",
      value: stats.wonLeads,
    },
    {
      name: "Lost",
      value: stats.lostLeads,
    },
  ];

  const COLORS = [
    "#3B82F6",
    "#8B5CF6",
    "#22C55E",
    "#EF4444",
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 h-full">
      <h2 className="text-xl font-bold mb-6">
        Lead Status Distribution
      </h2>

      <div className="flex justify-center items-center">
        <PieChart width={400} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </div>
    </div>
  );
}

export default LeadsChart;