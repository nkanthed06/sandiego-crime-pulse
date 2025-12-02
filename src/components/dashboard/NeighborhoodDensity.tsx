import { cn } from "@/lib/utils";

interface NeighborhoodDensityProps {
  data: { neighborhood: string; count: number }[];
  onNeighborhoodClick?: (neighborhood: string) => void;
}

export function NeighborhoodDensity({ data, onNeighborhoodClick }: NeighborhoodDensityProps) {
  const maxCount = Math.max(...data.map(d => d.count), 1);
  const total = data.reduce((sum, d) => sum + d.count, 0);

  const getIntensityClass = (count: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.8) return "bg-danger";
    if (ratio > 0.6) return "bg-orange-500";
    if (ratio > 0.4) return "bg-warning";
    if (ratio > 0.2) return "bg-yellow-400";
    return "bg-success";
  };

  const getIntensityBg = (count: number) => {
    const ratio = count / maxCount;
    if (ratio > 0.8) return "bg-danger-light";
    if (ratio > 0.6) return "bg-orange-100";
    if (ratio > 0.4) return "bg-amber-100";
    if (ratio > 0.2) return "bg-yellow-100";
    return "bg-safe-light";
  };

  return (
    <div className="bg-card rounded-lg border border-border p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold text-foreground">
          Neighborhood Overview
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-success" />
            Low
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-warning" />
            Medium
          </span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-danger" />
            High
          </span>
        </div>
      </div>
      
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = total > 0 ? ((item.count / total) * 100).toFixed(1) : "0";
          const barWidth = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
          
          return (
            <div
              key={item.neighborhood}
              className={cn(
                "group cursor-pointer rounded-lg p-3 transition-all duration-200",
                "hover:bg-muted/50",
                getIntensityBg(item.count)
              )}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => onNeighborhoodClick?.(item.neighborhood)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground text-sm">
                  {item.neighborhood}
                </span>
                <span className="text-sm text-muted-foreground">
                  {item.count.toLocaleString()} ({percentage}%)
                </span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500 ease-out",
                    getIntensityClass(item.count)
                  )}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
