import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CrimeTypeDistributionProps {
  data: { type: string; count: number }[];
  onTypeClick?: (type: string) => void;
}

const COLORS = [
  "hsl(220, 40%, 20%)",
  "hsl(38, 95%, 55%)",
  "hsl(0, 72%, 55%)",
  "hsl(160, 60%, 45%)",
  "hsl(200, 70%, 50%)",
  "hsl(280, 60%, 50%)",
  "hsl(340, 70%, 50%)",
];

export function CrimeTypeDistribution({ data, onTypeClick }: CrimeTypeDistributionProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  
  const formattedData = data.map((d, index) => ({
    ...d,
    percentage: total > 0 ? ((d.count / total) * 100).toFixed(1) : "0",
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        Crime Type Distribution
      </h3>
      
      {data.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          No data available for the selected filters
        </div>
      ) : (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                stroke="hsl(220, 15%, 88%)"
              />
              <XAxis
                type="number"
                tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <YAxis
                type="category"
                dataKey="type"
                tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 15%, 88%)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ color: "hsl(220, 25%, 10%)", fontWeight: 600 }}
                formatter={(value: number, name: string, props: any) => [
                  `${value.toLocaleString()} (${props.payload.percentage}%)`,
                  "Incidents",
                ]}
                cursor={{ fill: "hsl(220, 15%, 94%)" }}
              />
              <Bar
                dataKey="count"
                radius={[0, 4, 4, 0]}
                cursor="pointer"
                onClick={(data) => onTypeClick?.(data.type)}
              >
                {formattedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
