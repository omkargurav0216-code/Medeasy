import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Heart, ShoppingCart, Star } from 'lucide-react';
import { MedicineWithImage } from './large-medicine-database';
import { appDataService } from './app-data-service';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';
import imgEllipse8 from "figma:asset/c5b0f08d9be2d4b3db9bef5500901578c9c9ee10.png";

interface MedicineDetailPageProps {
  medicine: MedicineWithImage;
  onBack: () => void;
  onBuyNow: (medicine: MedicineWithImage) => void;
}

export function MedicineDetailPage({ medicine, onBack, onBuyNow }: MedicineDetailPageProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success('Added to favorites!');
    } else {
      toast.info('Removed from favorites');
    }
  };

  const handleAddToCart = () => {
    appDataService.addToCart(medicine, 1);
    toast.success(`Added ${medicine.name} to cart!`, {
      description: `Price: ₹${medicine.price}`,
    });
  };

  const handleBuyNow = () => {
    // Add to cart first
    appDataService.addToCart(medicine, 1);
    onBuyNow(medicine);
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(medicine.rating);
    const hasHalfStar = medicine.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-6 h-6 fill-yellow-400 text-yellow-400" style={{ opacity: 0.5 }} />
      );
    }
    const remainingStars = 5 - Math.ceil(medicine.rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-6 h-6 text-gray-300" />
      );
    }
    return stars;
  };

  return (
    <div className="bg-[#7c86e4] overflow-clip relative md:rounded-[20px] size-full">
      <div className="absolute bg-white h-[540px] left-1/2 rounded-[50px] top-[calc(50%-2px)] translate-x-[-50%] translate-y-[-50%] w-[362px]" />
      
      {/* Header */}
      <p className="absolute font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] left-[195.5px] text-[#05045c] text-[42px] text-center text-nowrap top-[83px] tracking-[-0.714px] translate-x-[-50%] whitespace-pre z-10" style={{ fontVariationSettings: "'wdth' 100" }}>
        Medicine{" "}
      </p>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute left-[304px] size-[75px] top-[70px] z-20 hover:scale-110 transition-all"
      >
        <img alt="" className="block max-w-none size-full" height="75" src={imgEllipse8} width="75" />
        <ChevronLeft className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#05045c]" />
      </button>

      {/* Medicine Image with Animation */}
      <motion.div
        className="absolute h-[234px] left-[85px] top-[262px] w-[232px] z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <ImageWithFallback
          alt={medicine.name}
          className="absolute inset-0 max-w-none object-contain pointer-events-none size-full rounded-lg"
          src={medicine.imageUrl}
        />
      </motion.div>

      {/* Like Button with Animation */}
      <motion.button
        onClick={handleLike}
        className="absolute left-[289px] size-[58px] top-[191px] z-20"
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isLiked ? 'liked' : 'unliked'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`w-14 h-14 ${isLiked ? 'fill-red-500 text-red-500' : 'fill-white text-gray-300'} transition-colors`}
            />
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Medicine Name */}
      <p className="absolute font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] left-[55px] text-[30px] text-black text-nowrap top-[508px] tracking-[-0.51px] whitespace-pre z-10" style={{ fontVariationSettings: "'wdth' 100" }}>
        {medicine.name}
      </p>

      {/* Price */}
      <p className="absolute font-['Instrument_Sans:Bold','Noto_Sans:Bold',sans-serif] font-bold leading-[normal] left-[55px] text-[30px] text-black text-nowrap top-[557px] tracking-[-0.51px] whitespace-pre z-10" style={{ fontVariationSettings: "'wdth' 100" }}>
        ₹ {medicine.price}/{medicine.unit}
      </p>

      {/* Star Rating */}
      <div className="absolute left-[55px] top-[605px] flex items-center gap-1 z-10">
        {renderStars()}
      </div>
      
      {/* Reviews count */}
      <p className="absolute font-['Instrument_Sans:Regular',sans-serif] font-normal left-[55px] text-[14px] text-gray-600 top-[638px] z-10">
        ({medicine.reviews} reviews)
      </p>

      {/* Add to Cart Button */}
      <motion.button
        onClick={handleAddToCart}
        className="absolute bg-[#f6c43c] h-[50px] left-[81px] rounded-[30px] top-[685px] w-[228px] z-10 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ShoppingCart className="w-5 h-5 text-black" />
        <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal text-[21px] text-black tracking-[-0.357px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Add to Cart
        </p>
      </motion.button>

      {/* Buy Now Button */}
      <motion.button
        onClick={handleBuyNow}
        className="absolute bg-[#f48849] h-[50px] left-[81px] rounded-[30px] top-[748px] w-[228px] z-10 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="font-['Instrument_Sans:Regular',sans-serif] font-normal text-[21px] text-black tracking-[-0.357px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Buy Now
        </p>
      </motion.button>
    </div>
  );
}
