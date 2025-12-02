import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { formatHour } from "@/data/crimeData";
import { Shield, AlertTriangle } from "lucide-react";

interface HourlyChartProps {
  data: { hour: number; count: number }[];
  safestTime: { startHour: number; endHour: number } | null;
  peakTime: { startHour: number; endHour: number } | null;
}

export function HourlyChart({ data, safestTime, peakTime }: HourlyChartProps) {
  const maxCount = Math.max(...data.map(d => d.count), 1);
  
  const formattedData = data.map(d => ({
    ...d,
    label: formatHour(d.hour),
    isSafest: safestTime 
      ? d.hour === safestTime.startHour || d.hour === (safestTime.startHour + 1) % 24
      : false,
    isPeak: peakTime
      ? d.hour === peakTime.startHour || d.hour === (peakTime.startHour + 1) % 24
      : false,
  }));

  const getBarColor = (entry: typeof formattedData[0]) => {
    if (entry.isSafest) return "hsl(160, 60%, 45%)";
    if (entry.isPeak) return "hsl(0, 72%, 55%)";
    return "hsl(220, 40%, 20%)";
  };

  return (
    <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Crime by Hour of Day
        </h3>
        <div className="flex flex-wrap gap-4 text-sm">
          {safestTime && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-safe-light">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-success font-medium">
                Safest: {formatHour(safestTime.startHour)} - {formatHour(safestTime.endHour)}
              </span>
            </div>
          )}
          {peakTime && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-danger-light">
              <AlertTriangle className="w-4 h-4 text-danger" />
              <span className="text-danger font-medium">
                Peak: {formatHour(peakTime.startHour)} - {formatHour(peakTime.endHour)}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="h-[250px] flex items-center justify-center text-muted-foreground">
          No data available for the selected filters
        </div>
      ) : (
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(220, 15%, 88%)"
              />
              <XAxis
                dataKey="label"
                tick={{ fill: "hsl(220, 10%, 45%)", fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval={2}
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
                formatter={(value: number) => [value.toLocaleString() + " incidents", "Count"]}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {formattedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
