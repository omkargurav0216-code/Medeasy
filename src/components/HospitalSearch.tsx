import { useState } from 'react';
import { Search, Phone, MapPin, Star, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { appDataService, Hospital } from './app-data-service';
import { toast } from 'sonner@2.0.3';

interface HospitalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HospitalSearch({ open, onOpenChange }: HospitalSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [results, setResults] = useState<Hospital[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const indianStates = [
    'All States', 'Andhra Pradesh', 'Karnataka', 'Delhi', 'Gujarat', 'Haryana',
    'Maharashtra', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'
  ];

  const handleSearch = () => {
    const stateFilter = selectedState === 'all' || selectedState === 'All States' ? undefined : selectedState;
    const hospitals = appDataService.searchHospitals(searchQuery, stateFilter);
    setResults(hospitals);
    setHasSearched(true);
  };

  const handleCall = (hospital: Hospital) => {
    appDataService.addCallHistory(hospital);
    toast.success(`Calling ${hospital.name}`, {
      description: hospital.phone,
      action: {
        label: 'Close',
        onClick: () => {},
      },
    });
    
    // Simulate making a call (in a real app, this would trigger tel: protocol)
    window.location.href = `tel:${hospital.phone}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-[#05045c]">Search Hospitals</DialogTitle>
          <DialogDescription>
            Find hospitals across India with 24/7 emergency services
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Controls */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Search by name, city, or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full"
              />
            </div>
            <Button onClick={handleSearch} className="bg-[#05045c] hover:bg-[#07076e]">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          {/* State Filter */}
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((state) => (
                <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, '-')}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Results */}
          <ScrollArea className="h-[400px]">
            {!hasSearched ? (
              <div className="text-center py-12 text-gray-500">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>Enter a search term to find hospitals</p>
                <p className="text-sm mt-2">Search by name, city, state, or medical specialty</p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MapPin className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>No hospitals found</p>
                <p className="text-sm mt-2">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((hospital) => (
                  <div key={hospital.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-[#05045c]">{hospital.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm">{hospital.rating.toFixed(1)}</span>
                          {hospital.emergency24x7 && (
                            <Badge variant="outline" className="ml-2 border-green-500 text-green-700">
                              <Clock className="w-3 h-3 mr-1" />
                              24/7 Emergency
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => handleCall(hospital)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{hospital.address}, {hospital.city}, {hospital.state}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{hospital.phone}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {hospital.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
