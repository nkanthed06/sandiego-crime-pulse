import { Shield, MapPin } from "lucide-react";

export function Header() {
  return (
    <header className="bg-hero text-primary-foreground py-8 md:py-12 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-accent/20 backdrop-blur-sm">
            <Shield className="w-6 h-6 text-accent" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            CrimeWatch SD
          </h1>
        </div>
        <p className="text-primary-foreground/80 text-lg max-w-2xl flex items-center gap-2">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          Interactive crime analytics dashboard for San Diego neighborhoods
        </p>
        <p className="text-primary-foreground/60 text-sm mt-2 max-w-3xl">
          Explore crime patterns across time, neighborhoods, and incident types. 
          Use the filters below to discover when, where, and what types of crimes 
          are happening in the city.
        </p>
      </div>
    </header>
  );
}
