import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { format, parseISO } from "date-fns";

interface TimeSeriesChartProps {
  data: { month: string; count: number }[];
}

export function TimeSeriesChart({ data }: TimeSeriesChartProps) {
  const formattedData = data.map(d => ({
    ...d,
    label: format(parseISO(d.month + "-01"), "MMM yyyy"),
  }));

  return (
    <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-foreground mb-4">
        Crime Trends Over Time
      </h3>
      
      {data.length === 0 ? (
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          No data available for the selected filters
        </div>
      ) : (
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(220, 40%, 20%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(220, 40%, 20%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(220, 15%, 88%)"
              />
              <XAxis
                dataKey="label"
                tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 15%, 88%)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                }}
                labelStyle={{ color: "hsl(220, 25%, 10%)", fontWeight: 600 }}
                itemStyle={{ color: "hsl(220, 40%, 20%)" }}
                formatter={(value: number) => [value.toLocaleString() + " incidents", "Count"]}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="hsl(220, 40%, 20%)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
