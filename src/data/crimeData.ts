export const neighborhoods = [
  "All Neighborhoods",
  "Downtown",
  "North Park",
  "La Jolla",
  "City Heights",
  "Pacific Beach",
  "Ocean Beach",
  "Hillcrest",
  "Mission Valley",
  "Gaslamp Quarter",
  "Clairemont",
] as const;

export const crimeTypes = [
  "All Types",
  "Theft",
  "Burglary",
  "Assault",
  "Vandalism",
  "Vehicle Break-in",
  "Robbery",
  "Fraud",
] as const;

export type Neighborhood = typeof neighborhoods[number];
export type CrimeType = typeof crimeTypes[number];

export interface CrimeIncident {
  id: string;
  neighborhood: Exclude<Neighborhood, "All Neighborhoods">;
  crimeType: Exclude<CrimeType, "All Types">;
  date: string;
  hour: number;
}

// Generate realistic mock data
function generateMockData(): CrimeIncident[] {
  const incidents: CrimeIncident[] = [];
  const neighborhoodList = neighborhoods.filter(n => n !== "All Neighborhoods") as Exclude<Neighborhood, "All Neighborhoods">[];
  const crimeTypeList = crimeTypes.filter(c => c !== "All Types") as Exclude<CrimeType, "All Types">[];
  
  // Crime weights by neighborhood (some areas have more crime)
  const neighborhoodWeights: Record<string, number> = {
    "Downtown": 1.8,
    "Gaslamp Quarter": 1.6,
    "City Heights": 1.5,
    "North Park": 1.2,
    "Pacific Beach": 1.1,
    "Hillcrest": 1.0,
    "Ocean Beach": 0.9,
    "Mission Valley": 0.8,
    "Clairemont": 0.7,
    "La Jolla": 0.5,
  };

  // Crime type distribution
  const crimeTypeWeights: Record<string, number> = {
    "Theft": 0.35,
    "Vehicle Break-in": 0.20,
    "Burglary": 0.15,
    "Vandalism": 0.12,
    "Assault": 0.08,
    "Robbery": 0.05,
    "Fraud": 0.05,
  };

  // Hour distribution (more crime at night)
  const hourWeights = Array.from({ length: 24 }, (_, hour) => {
    if (hour >= 20 || hour <= 2) return 1.5;
    if (hour >= 17 && hour < 20) return 1.3;
    if (hour >= 3 && hour <= 6) return 0.3;
    return 0.8;
  });

  // Generate incidents for 2024
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-01');
  
  let id = 0;
  
  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    neighborhoodList.forEach(neighborhood => {
      const baseIncidents = 3 + Math.random() * 2;
      const neighborhoodIncidents = Math.round(baseIncidents * neighborhoodWeights[neighborhood]);
      
      for (let i = 0; i < neighborhoodIncidents; i++) {
        // Weighted random crime type
        const rand = Math.random();
        let cumulative = 0;
        let selectedCrimeType = crimeTypeList[0];
        for (const [type, weight] of Object.entries(crimeTypeWeights)) {
          cumulative += weight;
          if (rand <= cumulative) {
            selectedCrimeType = type as Exclude<CrimeType, "All Types">;
            break;
          }
        }

        // Weighted random hour
        const hourRand = Math.random() * hourWeights.reduce((a, b) => a + b, 0);
        let hourCumulative = 0;
        let selectedHour = 12;
        for (let h = 0; h < 24; h++) {
          hourCumulative += hourWeights[h];
          if (hourRand <= hourCumulative) {
            selectedHour = h;
            break;
          }
        }

        incidents.push({
          id: `crime-${id++}`,
          neighborhood,
          crimeType: selectedCrimeType,
          date: date.toISOString().split('T')[0],
          hour: selectedHour,
        });
      }
    });
  }

  return incidents;
}

export const crimeData = generateMockData();

// Helper functions
export function filterCrimeData(
  data: CrimeIncident[],
  filters: {
    neighborhood: Neighborhood;
    crimeType: CrimeType;
    startDate: string;
    endDate: string;
  }
) {
  return data.filter(incident => {
    const matchNeighborhood = filters.neighborhood === "All Neighborhoods" || incident.neighborhood === filters.neighborhood;
    const matchCrimeType = filters.crimeType === "All Types" || incident.crimeType === filters.crimeType;
    const matchDate = incident.date >= filters.startDate && incident.date <= filters.endDate;
    return matchNeighborhood && matchCrimeType && matchDate;
  });
}

export function getCrimesByMonth(data: CrimeIncident[]) {
  const byMonth: Record<string, number> = {};
  
  data.forEach(incident => {
    const month = incident.date.substring(0, 7); // YYYY-MM
    byMonth[month] = (byMonth[month] || 0) + 1;
  });

  return Object.entries(byMonth)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month));
}

export function getCrimesByType(data: CrimeIncident[]) {
  const byType: Record<string, number> = {};
  
  data.forEach(incident => {
    byType[incident.crimeType] = (byType[incident.crimeType] || 0) + 1;
  });

  return Object.entries(byType)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}

export function getCrimesByNeighborhood(data: CrimeIncident[]) {
  const byNeighborhood: Record<string, number> = {};
  
  data.forEach(incident => {
    byNeighborhood[incident.neighborhood] = (byNeighborhood[incident.neighborhood] || 0) + 1;
  });

  return Object.entries(byNeighborhood)
    .map(([neighborhood, count]) => ({ neighborhood, count }))
    .sort((a, b) => b.count - a.count);
}

export function getCrimesByHour(data: CrimeIncident[]) {
  const byHour: Record<number, number> = {};
  
  for (let h = 0; h < 24; h++) {
    byHour[h] = 0;
  }
  
  data.forEach(incident => {
    byHour[incident.hour] = (byHour[incident.hour] || 0) + 1;
  });

  return Object.entries(byHour)
    .map(([hour, count]) => ({ hour: parseInt(hour), count }))
    .sort((a, b) => a.hour - b.hour);
}

export function getSafestTimeBlock(hourlyData: { hour: number; count: number }[]) {
  let minCount = Infinity;
  let safestStart = 0;
  
  // Find 2-hour window with lowest crime
  for (let i = 0; i < 24; i++) {
    const windowCount = hourlyData[i].count + hourlyData[(i + 1) % 24].count;
    if (windowCount < minCount) {
      minCount = windowCount;
      safestStart = i;
    }
  }
  
  return {
    startHour: safestStart,
    endHour: (safestStart + 2) % 24,
    count: minCount,
  };
}

export function getPeakTimeBlock(hourlyData: { hour: number; count: number }[]) {
  let maxCount = 0;
  let peakStart = 0;
  
  // Find 2-hour window with highest crime
  for (let i = 0; i < 24; i++) {
    const windowCount = hourlyData[i].count + hourlyData[(i + 1) % 24].count;
    if (windowCount > maxCount) {
      maxCount = windowCount;
      peakStart = i;
    }
  }
  
  return {
    startHour: peakStart,
    endHour: (peakStart + 2) % 24,
    count: maxCount,
  };
}

export function formatHour(hour: number) {
  if (hour === 0) return "12 AM";
  if (hour === 12) return "12 PM";
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
}
