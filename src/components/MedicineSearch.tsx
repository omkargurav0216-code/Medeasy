import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Plus, ShoppingCart, Star } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { appDataService } from './app-data-service';
import { MedicineWithImage } from './large-medicine-database';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MedicineSearchProps {
  onCartUpdate?: () => void;
  onMedicineSelect?: (medicine: MedicineWithImage) => void;
}

export function MedicineSearch({ onCartUpdate, onMedicineSelect }: MedicineSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const allMedicines = appDataService.getMedicines() as MedicineWithImage[];
  const [results, setResults] = useState<MedicineWithImage[]>(allMedicines);

  // Debug: Log medicine count on component mount
  console.log(`Total medicines loaded: ${allMedicines.length}`);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const medicines = appDataService.searchMedicines(query) as MedicineWithImage[];
    setResults(medicines);
  };

  const handleAddToCart = (e: React.MouseEvent, medicine: MedicineWithImage) => {
    e.stopPropagation();
    appDataService.addToCart(medicine, 1);
    toast.success(`${medicine.name} added to cart`, {
      description: `Price: ₹${medicine.price}/${medicine.unit}`,
      icon: <ShoppingCart className="w-4 h-4" />,
    });
    onCartUpdate?.();
  };

  const handleMedicineClick = (medicine: MedicineWithImage) => {
    onMedicineSelect?.(medicine);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Pain Relief': 'bg-red-100 text-red-800',
      'Antibiotic': 'bg-blue-100 text-blue-800',
      'Allergy & Respiratory': 'bg-purple-100 text-purple-800',
      'Cardiovascular': 'bg-pink-100 text-pink-800',
      'Diabetes': 'bg-orange-100 text-orange-800',
      'Digestive': 'bg-green-100 text-green-800',
      'Supplements': 'bg-yellow-100 text-yellow-800',
      'Cough & Cold': 'bg-cyan-100 text-cyan-800',
      'Antacids': 'bg-lime-100 text-lime-800',
      'Mental Health': 'bg-indigo-100 text-indigo-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Search Bar */}
      <div className="relative flex-shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search medicines..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-600 flex-shrink-0">
        Found {results.length} medicine{results.length !== 1 ? 's' : ''}
      </p>

      {/* Results */}
      <div className="grid grid-cols-1 gap-3 overflow-y-auto flex-1 pr-2">
        {results.map((medicine) => (
          <Card 
            key={medicine.id} 
            className="hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
            onClick={() => handleMedicineClick(medicine)}
          >
            <CardHeader className="pb-3">
              <div className="flex gap-3">
                {/* Medicine Image */}
                {medicine.imageUrl && (
                  <motion.div 
                    className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  >
                    <ImageWithFallback
                      src={medicine.imageUrl}
                      alt={medicine.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base truncate">{medicine.name}</CardTitle>
                    <Badge className={`${getCategoryColor(medicine.category)} text-xs flex-shrink-0`}>
                      {medicine.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs mt-1 line-clamp-2">
                    {medicine.description}
                  </CardDescription>
                  
                  {/* Rating */}
                  {medicine.rating && (
                    <div className="flex items-center gap-1 mt-1">
                      {renderStars(medicine.rating)}
                      <span className="text-xs text-gray-500 ml-1">
                        ({medicine.reviews || 0})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-[#05045c]">
                    ₹{medicine.price}
                    <span className="text-sm font-normal text-gray-500">/{medicine.unit}</span>
                  </p>
                  <p className="text-xs text-gray-500">{medicine.manufacturer}</p>
                  {!medicine.inStock && (
                    <Badge variant="destructive" className="mt-1 text-xs">Out of Stock</Badge>
                  )}
                </div>
                <Button
                  onClick={(e) => handleAddToCart(e, medicine)}
                  disabled={!medicine.inStock}
                  size="sm"
                  className="bg-[#05045c] hover:bg-[#07076e]"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {results.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No medicines found</p>
            <p className="text-sm mt-2">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </div>
  );
}
