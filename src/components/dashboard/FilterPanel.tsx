import { CalendarIcon, MapPin, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { neighborhoods, crimeTypes, Neighborhood, CrimeType } from "@/data/crimeData";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface FilterPanelProps {
  neighborhood: Neighborhood;
  crimeType: CrimeType;
  dateRange: DateRange | undefined;
  onNeighborhoodChange: (value: Neighborhood) => void;
  onCrimeTypeChange: (value: CrimeType) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

export function FilterPanel({
  neighborhood,
  crimeType,
  dateRange,
  onNeighborhoodChange,
  onCrimeTypeChange,
  onDateRangeChange,
}: FilterPanelProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 shadow-sm">
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">
        Filter Data
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Neighborhood Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Neighborhood
          </label>
          <Select value={neighborhood} onValueChange={onNeighborhoodChange}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select neighborhood" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border z-50">
              {neighborhoods.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Crime Type Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Crime Type
          </label>
          <Select value={crimeType} onValueChange={onCrimeTypeChange}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select crime type" />
            </SelectTrigger>
            <SelectContent className="bg-popover border border-border z-50">
              {crimeTypes.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Picker */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <CalendarIcon className="w-4 h-4" />
            Date Range
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-background",
                  !dateRange && "text-muted-foreground"
                )}
              >
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-popover border border-border z-50" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={onDateRangeChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
