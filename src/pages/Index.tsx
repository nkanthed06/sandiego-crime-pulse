import { useState, useMemo } from "react";
import { DateRange } from "react-day-picker";
import { Header } from "@/components/dashboard/Header";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { NeighborhoodDensity } from "@/components/dashboard/NeighborhoodDensity";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { CrimeTypeDistribution } from "@/components/dashboard/CrimeTypeDistribution";
import { HourlyChart } from "@/components/dashboard/HourlyChart";
import { AboutSection } from "@/components/dashboard/AboutSection";
import {
  crimeData,
  filterCrimeData,
  getCrimesByMonth,
  getCrimesByType,
  getCrimesByNeighborhood,
  getCrimesByHour,
  getSafestTimeBlock,
  getPeakTimeBlock,
  Neighborhood,
  CrimeType,
} from "@/data/crimeData";

const Index = () => {
  const [neighborhood, setNeighborhood] = useState<Neighborhood>("All Neighborhoods");
  const [crimeType, setCrimeType] = useState<CrimeType>("All Types");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date("2024-01-01"),
    to: new Date("2024-11-30"),
  });

  // Filter data based on selections
  const filteredData = useMemo(() => {
    return filterCrimeData(crimeData, {
      neighborhood,
      crimeType,
      startDate: dateRange?.from?.toISOString().split("T")[0] || "2024-01-01",
      endDate: dateRange?.to?.toISOString().split("T")[0] || "2024-12-31",
    });
  }, [neighborhood, crimeType, dateRange]);

  // Compute aggregations
  const monthlyData = useMemo(() => getCrimesByMonth(filteredData), [filteredData]);
  const typeData = useMemo(() => getCrimesByType(filteredData), [filteredData]);
  const neighborhoodData = useMemo(() => getCrimesByNeighborhood(filteredData), [filteredData]);
  const hourlyData = useMemo(() => getCrimesByHour(filteredData), [filteredData]);

  // Compute insights
  const totalIncidents = filteredData.length;
  const mostCommonType = useMemo(() => {
    if (typeData.length === 0) return null;
    const top = typeData[0];
    return {
      type: top.type,
      percentage: Math.round((top.count / totalIncidents) * 100),
    };
  }, [typeData, totalIncidents]);

  const safestTime = useMemo(() => {
    if (hourlyData.every(d => d.count === 0)) return null;
    return getSafestTimeBlock(hourlyData);
  }, [hourlyData]);

  const peakTime = useMemo(() => {
    if (hourlyData.every(d => d.count === 0)) return null;
    return getPeakTimeBlock(hourlyData);
  }, [hourlyData]);

  // Handlers
  const handleNeighborhoodClick = (clickedNeighborhood: string) => {
    setNeighborhood(clickedNeighborhood as Neighborhood);
  };

  const handleCrimeTypeClick = (clickedType: string) => {
    setCrimeType(clickedType as CrimeType);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Filters */}
        <FilterPanel
          neighborhood={neighborhood}
          crimeType={crimeType}
          dateRange={dateRange}
          onNeighborhoodChange={setNeighborhood}
          onCrimeTypeChange={setCrimeType}
          onDateRangeChange={setDateRange}
        />

        {/* Summary Cards */}
        <SummaryCards
          totalIncidents={totalIncidents}
          mostCommonType={mostCommonType}
          peakTime={peakTime}
          safestTime={safestTime}
        />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Time Series */}
          <TimeSeriesChart data={monthlyData} />
          
          {/* Crime Type Distribution */}
          <CrimeTypeDistribution 
            data={typeData} 
            onTypeClick={handleCrimeTypeClick}
          />
        </div>

        {/* Neighborhood Density */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NeighborhoodDensity 
            data={neighborhoodData}
            onNeighborhoodClick={handleNeighborhoodClick}
          />
          
          {/* Hourly Distribution */}
          <HourlyChart 
            data={hourlyData}
            safestTime={safestTime}
            peakTime={peakTime}
          />
        </div>

        {/* About Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-6 mt-12">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            CrimeWatch SD — A data visualization portfolio project
          </p>
          <p className="text-xs opacity-60 mt-1">
            Built with React, TypeScript, Recharts & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
