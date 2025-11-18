import { useState } from 'react';
import svgPaths from "./svg-lpkt0f313i";
import imgEllipse8 from "figma:asset/583c52b3b6f568a354f7ecca523171d3187d7d0a.png";
import imgEllipse9 from "figma:asset/6e2f7516ec26ecc128a55551c7ea6e35b19788e5.png";
import imgRectangle29 from "figma:asset/eaeb088dcb2bf40e3c53938ebf9ca77c4d82ad4e.png";
import imgRectangle30 from "figma:asset/1e4e593d278cc8753a1d1401b0c53bc56398dfa5.png";
import imgRectangle31 from "figma:asset/5734456079688c1be8c67efb3082f3ec5100245d.png";
import imgRectangle15 from "figma:asset/292e7b64f1b430714de9bbaa45d6c0264ca675d6.png";
import imgRectangle49 from "figma:asset/aa31ebde099495e59102b7dbdae867a2e45b46a5.png";
import { MedicineSearch } from '../components/MedicineSearch';
import { HealthTipsSheet } from '../components/HealthTipsSheet';
import { ArrowLeft } from 'lucide-react';
import { MedicineWithImage } from '../components/large-medicine-database';

interface MedicineListPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onCartUpdate: () => void;
  onMedicineSelect: (medicine: MedicineWithImage) => void;
}

function IPhone16Pro({ className, onBack, onNavigate, onCartUpdate, onMedicineSelect }: { className?: string } & MedicineListPageProps) {
  const [healthTipsOpen, setHealthTipsOpen] = useState(false);

  return (
    <div className={`bg-white size-full md:rounded-[20px] overflow-hidden relative ${className}`} data-name="iPhone 16 Pro - 6">
      <div className="absolute h-[724px] left-0 top-[155px] w-[402px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 402 724">
          <path d={svgPaths.p116c6900} fill="var(--fill-0, #05045C)" id="Rectangle 18" />
        </svg>
      </div>
      <div className="absolute bg-[#05045c] h-[160px] left-0 top-0 w-[150px]" />
      <div className="absolute bg-white h-[160px] left-0 rounded-bl-[110px] top-0 w-[402px]" data-name="Rectangle" />
      
      <button
        onClick={onBack}
        className="absolute left-[45px] top-[75px] z-10 bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-all"
      >
        <ArrowLeft className="w-6 h-6 text-[#05045c]" />
      </button>

      <p className="absolute font-['Instrument_Sans:Bold',sans-serif] font-bold leading-[normal] left-[115px] text-[#05045c] text-[30px] text-nowrap top-[80px] tracking-[-0.51px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Medicine List
      </p>
      
      <div className="absolute left-[317px] size-[85px] top-[56px]">
        <img alt="" className="block max-w-none size-full" height="85" src={imgEllipse8} width="85" />
      </div>

      {/* Medicine Search Component */}
      <div className="absolute left-[21px] top-[186px] w-[358px] h-[580px] overflow-hidden">
        <MedicineSearch onCartUpdate={onCartUpdate} onMedicineSelect={onMedicineSelect} />
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bg-[#05045c] h-[82px] left-[22px] rounded-[20px] top-[792px] w-[357px] z-50" />
      <button
        onClick={() => onNavigate('dashboard')}
        className="absolute left-[171px] rounded-[20px] size-[60px] top-[803px] z-[60] hover:scale-110 transition-all"
      >
        <img alt="Home" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle29} />
      </button>
      <button
        onClick={() => onNavigate('account')}
        className="absolute left-[303px] rounded-[20px] size-[60px] top-[803px] z-[60] hover:scale-110 transition-all"
      >
        <img alt="Account" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle30} />
      </button>
      <button
        onClick={() => setHealthTipsOpen(true)}
        className="absolute left-[37px] rounded-[20px] size-[60px] top-[803px] z-[60] hover:scale-110 transition-all"
      >
        <img alt="Health Tips" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[20px] size-full" src={imgRectangle31} />
      </button>

      {/* Health Tips Sheet */}
      <HealthTipsSheet open={healthTipsOpen} onOpenChange={setHealthTipsOpen} />
    </div>
  );
}

export default function IPhone16Pro6(props: MedicineListPageProps) {
  return <IPhone16Pro className="bg-white overflow-clip relative rounded-[20px] size-full" {...props} />;
}
