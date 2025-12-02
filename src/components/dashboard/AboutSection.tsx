import { Info, ExternalLink, AlertCircle } from "lucide-react";

export function AboutSection() {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Info className="w-5 h-5 text-accent" />
        <h3 className="font-display text-lg font-semibold text-foreground">
          About the Data
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Data Source</h4>
            <p className="text-sm text-muted-foreground">
              This dashboard uses simulated crime data inspired by patterns from the 
              San Diego Open Data Portal. In a production environment, this would connect 
              to real-time crime incident reports.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Time Period</h4>
            <p className="text-sm text-muted-foreground">
              The current dataset covers January 2024 through November 2024, 
              with approximately 35,000+ simulated incidents across 10 major 
              San Diego neighborhoods.
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-warning" />
              Limitations
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Not all incidents may be reported to authorities</li>
              <li>Location data may be approximate or redacted for privacy</li>
              <li>Some crime types may be grouped or categorized differently</li>
              <li>Data reflects reported incidents, not convictions</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-2">Methodology</h4>
            <p className="text-sm text-muted-foreground">
              Crime density is calculated based on incident count per neighborhood. 
              "Safest time" represents the 2-hour window with the fewest reported incidents 
              under the current filter selection.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This is a portfolio demonstration project. 
          Do not use this data to make real-world safety decisions. Always consult 
          official sources and local authorities for accurate crime information.
        </p>
      </div>
    </div>
  );
}
