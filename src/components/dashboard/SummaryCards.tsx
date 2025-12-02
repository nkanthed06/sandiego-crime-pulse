import { AlertTriangle, Clock, Shield, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardsProps {
  totalIncidents: number;
  mostCommonType: { type: string; percentage: number } | null;
  peakTime: { startHour: number; endHour: number } | null;
  safestTime: { startHour: number; endHour: number } | null;
}

function formatHour(hour: number) {
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
}

export function SummaryCards({
  totalIncidents,
  mostCommonType,
  peakTime,
  safestTime,
}: SummaryCardsProps) {
  const cards = [
    {
      title: "Total Incidents",
      value: totalIncidents.toLocaleString(),
      subtitle: "in selected period",
      icon: TrendingUp,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "Most Common",
      value: mostCommonType?.type || "N/A",
      subtitle: mostCommonType ? `${mostCommonType.percentage}% of incidents` : "No data",
      icon: AlertTriangle,
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
    },
    {
      title: "Peak Hours",
      value: peakTime ? `${formatHour(peakTime.startHour)} - ${formatHour(peakTime.endHour)}` : "N/A",
      subtitle: "highest activity",
      icon: Clock,
      iconBg: "bg-danger/10",
      iconColor: "text-danger",
    },
    {
      title: "Safest Time",
      value: safestTime ? `${formatHour(safestTime.startHour)} - ${formatHour(safestTime.endHour)}` : "N/A",
      subtitle: "lowest activity",
      icon: Shield,
      iconBg: "bg-success/10",
      iconColor: "text-success",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className={cn(
            "bg-card rounded-lg border border-border p-5 shadow-sm",
            "transition-all duration-300 hover:shadow-md hover:border-accent/30",
            "animate-slide-up"
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                {card.title}
              </p>
              <p className="text-2xl font-display font-bold text-foreground">
                {card.value}
              </p>
              <p className="text-xs text-muted-foreground">{card.subtitle}</p>
            </div>
            <div className={cn("p-2.5 rounded-lg", card.iconBg)}>
              <card.icon className={cn("w-5 h-5", card.iconColor)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
