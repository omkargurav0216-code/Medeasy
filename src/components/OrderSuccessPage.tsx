import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import imgImage10 from "figma:asset/49cb6548c73095935e1995f0e2ea0e2aa0aa03b0.png";
import imgEllipse8 from "figma:asset/c5b0f08d9be2d4b3db9bef5500901578c9c9ee10.png";
import imgRectangle29 from "figma:asset/eaeb088dcb2bf40e3c53938ebf9ca77c4d82ad4e.png";
import imgRectangle30 from "figma:asset/1e4e593d278cc8753a1d1401b0c53bc56398dfa5.png";
import imgRectangle31 from "figma:asset/5734456079688c1be8c67efb3082f3ec5100245d.png";
import { HealthTipsSheet } from './HealthTipsSheet';

interface OrderSuccessPageProps {
  onNavigate: (page: string) => void;
}

export function OrderSuccessPage({ onNavigate }: OrderSuccessPageProps) {
  const [healthTipsOpen, setHealthTipsOpen] = useState(false);

  return (
    <div className="bg-[#7c86e4] overflow-clip relative md:rounded-[20px] size-full">
      {/* Header */}
      <p className="absolute font-['Baloo_Bhaijaan:Regular',sans-serif] leading-[normal] left-[120px] not-italic text-[#05045c] text-[42px] text-nowrap top-[52px] tracking-[-0.714px] whitespace-pre z-10">
        MedEasy
      </p>
      
      <button
        onClick={() => onNavigate('dashboard')}
        className="absolute left-[312px] size-[75px] top-[49px] z-20 hover:scale-110 transition-all"
      >
        <img alt="" className="block max-w-none size-full" height="75" src={imgEllipse8} width="75" />
        <ChevronLeft className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#05045c]" />
      </button>

      {/* Success Message */}
      <motion.div
        className="absolute font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] left-[201.5px] text-[30px] text-center text-white top-[147px] tracking-[-0.51px] translate-x-[-50%] z-10"
        style={{ fontVariationSettings: "'wdth' 100" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-0">Ordered Placed</p>
        <p>Successfully</p>
      </motion.div>

      {/* Success Image */}
      <motion.div
        className="absolute left-[24px] pointer-events-none size-[354px] top-[260px] z-10 overflow-hidden"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        <img
          alt="Order Success"
          className="absolute inset-0 max-w-none object-50%-50% object-cover size-full"
          src={imgImage10}
        />
        <div className="absolute inset-0 shadow-[0px_4px_4px_0px_inset_rgba(0,0,0,0.25)]" />
      </motion.div>

      {/* Thank You Text */}
      <motion.p
        className="absolute font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] left-[120px] text-[#05045c] text-[33px] text-nowrap top-[636px] tracking-[-0.561px] whitespace-pre z-10"
        style={{ fontVariationSettings: "'wdth' 100" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Thank You
      </motion.p>

      {/* Bottom Navigation */}
      <div className="absolute bg-[#05045c] h-[82px] left-[21px] rounded-[20px] top-[779px] w-[357px] z-50" />
      
      <button
        onClick={() => onNavigate('dashboard')}
        className="absolute left-[170px] rounded-[20px] size-[60px] top-[790px] z-[60] hover:scale-110 transition-all"
      >
        <img alt="Home" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle29} />
      </button>
      
      <button
        onClick={() => onNavigate('account')}
        className="absolute left-[302px] rounded-[20px] size-[60px] top-[790px] z-[60] hover:scale-110 transition-all"
      >
        <img alt="Account" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle30} />
      </button>
      
      <button
        onClick={() => setHealthTipsOpen(true)}
        className="absolute left-[36px] rounded-[20px] size-[60px] top-[790px] z-[60] hover:scale-110 transition-all"
      >
        <img alt="Health Tips" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle31} />
      </button>

      {/* Health Tips Sheet */}
      <HealthTipsSheet open={healthTipsOpen} onOpenChange={setHealthTipsOpen} />
    </div>
  );
}
